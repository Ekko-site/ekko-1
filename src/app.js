// server.js

// BASE SETUP
// ==============================================

import express from "express";
import bodyParser from "body-parser";
import raven from "raven";
import cors from "cors";
import path from "path";
import messages from "@/etc/messages";
import { logger } from "@/etc/logger";
import router from "@/etc/router";
import renderSite from "@/etc/render-site";
import downloadSite from "@/etc/download-site";

const ravenURL =
  "https://d843860d83844ce3900cb959145e4e2e:b39570c7ea4c4ab89c3c84e7c0465b89@sentry.io/104015";

const app = express();

const ravenClient = new raven.Client(
  process.env.NODE_ENV == "production" && ravenURL
);
ravenClient.patchGlobal(() => {
  logger.info("Shutting down");
  process.exit(1);
});

const requireHTTPS = (req, res, next) => {
  if (
    req.headers["x-forwarded-proto"] !== "https" &&
    process.env.NODE_ENV === "production"
  ) {
    var secureUrl = "https://" + req.headers["host"] + req.url;
    res.writeHead(301, { Location: secureUrl });
    res.end();
  }
  next();
};

app.use(requireHTTPS);

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use((req, res, next) => {
  logger.info("REQUEST", req.url, req.method);
  next();
});

const onError = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  res.statusCode = 500;
  res.end(res.sentry + "\n");
};

// if(process.env.NODE_ENV == 'production'){
//     app.use(raven.middleware.express.requestHandler(ravenURL))
//     app.use(raven.middleware.express.errorHandler(ravenURL))
// }

app.use(express.static(path.join(__dirname, "/../client/build")));

app.use("/api/:controller", (req, res, next) => {
  return router(req, res, next, ravenClient);
});
app.get("/download/:facebookPageID", downloadSite);
app.get("/s/:facebookPageID", renderSite);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

//app.use(onError)

export default app;

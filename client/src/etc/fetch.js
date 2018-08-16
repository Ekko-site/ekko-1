import store from "@/etc/store";
import fetchAPI from "isomorphic-fetch";
import { toastr } from "react-redux-toastr";

require("es6-promise").polyfill();

const config = process.env;

const authPaths = ["dashboard", "login", "sign-up", "themes", "settings"];

const { API_URL } = config;

let browserHistory;

const inApp = () => {
  let path = window.location.pathname.split("/").pop();
  if (!path) {
    return false;
  }
  return path.match(new RegExp(authPaths.join("|")));
};

export const fetch = (url, opts = {}) => {
  let token = store.get("auth-token"),
    headers = {
      "Content-Type": "application/json"
    };
  if (token) {
    headers["x-access-token"] = token;
  }

  let body = opts.body || null;

  let params = {
    headers
  };

  if (body) {
    params.body = JSON.stringify(body);
    params.method = "POST";
  }

  return fetchAPI(`/${url}`, params)
    .then(response => {
      return response.json().then(json => {
        return {
          status: response.status,
          response: json
        };
      });
    })
    .then(res => {
      if (res.status == 500) {
        throw new Error(res.response.data.error);
      }
      if (res.status == 403) {
        store.clear();
        if (inApp()) {
          browserHistory.push("/login");
          return toastr.error("Sorry", res.response.data.error);
        }
      }
      const { response } = res;
      const { data } = response;
      if (data.user && data.user.token) {
        store.set("user", data.user);
        store.set("auth-token", data.user.token);
      }
      return data || {};
    })
    .catch(error => {
      console.error(error);
      inApp() && toastr.error("Sorry", "Something bad happened");
      throw new Error(error);
    });
};

import React from "react";
import ReactDOMServer from "react-dom/server";
import fse from "fs-extra";
import {
  fetchPublicPage,
  fetchPublicPageForPreview
} from "@/controllers/pages/get";
import Layout from "@/themes/layouts/default";

export default async (
  { params: { facebookPageID }, query: { theme: themeID, preview } },
  res
) => {
  const args = {
    id: facebookPageID,
    themeId: themeID || null
  };
  const { page, theme } = preview
    ? await fetchPublicPageForPreview(args)
    : await fetchPublicPage(args);
  const { name } = theme;
  const themePath = `../themes/${name}`;
  const Theme = await import(`${themePath}/js/layout`);
  const css = await fse.readFile(
    `${__dirname}/../themes/${name}/css/app.css`,
    "utf-8"
  );
  const html = ReactDOMServer.renderToString(
    <Layout data={page.data} css={css}>
      <Theme doc={page} />
    </Layout>
  );
  return res.send(html);
};

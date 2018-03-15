import { fetchSite, render } from "@/etc/render-site";

export default async ({ params: { facebookPageID } }, res) => {
  const site = await fetchSite({ facebookPageID, preview: true });
  const html = await render(site);
  res.set("utf-8");
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Content-disposition": "attachment;filename=index.html"
  });
  res.end(html);
};

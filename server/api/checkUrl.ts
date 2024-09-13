import { parse } from "node-html-parser";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = query.url as string;
  const response = await fetch(url);
  const html = await response.text();
  const root = parse(html);

  // Parse the JSON-LD script
  const jsonLdScript = root.querySelector("script#product-jsonld");
  let productInfo = null;
  if (jsonLdScript) {
    try {
      productInfo = JSON.parse(jsonLdScript.textContent);
    } catch (error) {
      console.error("Error parsing JSON-LD:", error);
    }
  }
  return productInfo;
});

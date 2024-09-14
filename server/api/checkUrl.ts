import { parse } from "node-html-parser";
import { Product, ProductGroup } from "~/types/unifi";
function getProductFromGroup(productGroup: ProductGroup, url: string) {
  const variant = url.split("?variant=")[1];
  const product = productGroup.hasVariant.find((product) => {
    return product.sku.toLowerCase() == variant?.toLowerCase();
  });
  if (!product) {
    return productGroup.hasVariant[0];
  }
  return product;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = query.url as string;
  const response = await fetch(url);
  const html = await response.text();
  const root = parse(html);
  // Parse the JSON-LD script
  const jsonLdScript = root.querySelector("script#product-jsonld");
  if (!jsonLdScript) {
    return createError({
      statusCode: 404,
      message: "Product not found",
    });
  }
  let product: Product;
  try {
    const addToCart = root.querySelector('button[label="Add to Cart"]');
    const productInfo = JSON.parse(jsonLdScript.textContent);
    if (productInfo["@type"] === "ProductGroup") {
      const productGroup = productInfo as ProductGroup;
      product = getProductFromGroup(productGroup, url);
    } else {
      product = productInfo;
    }
    if (addToCart) {
      product.inStock = true;
    }
  } catch (error) {
    console.error("Error parsing JSON-LD:", error);
    throw createError({
      statusCode: 500,
      message: "Error parsing product data",
    });
  }
  return product;
});

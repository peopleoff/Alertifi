import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { TablesInsert, Database } from "@/types/database.types";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);
  const body = await readBody(event);
  const product: TablesInsert<"products"> = {
    url: body.url,
    user_id: user?.id || "",
    title: body.name,
    description: body.description,
    price: body.offers?.priceSpecification?.price,
    image_url: body.image.url,
    in_stock: body.inStock,
    last_checked_date: new Date().toISOString(),
    sku: body.sku,
  };

  const { data, error } = await client.from("products").insert(product).select();

  return { data, error };
});

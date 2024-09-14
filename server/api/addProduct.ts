import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { TablesInsert, Database } from "@/types/database.types";
import { getNotifyCount } from "../utils/getNotifyCount";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);
  const body = await readBody(event);
  const count = await getNotifyCount(event);

  const NUMBER_OF_NOTIFY_PRODUCTS = 3;
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

  //Only default notify if the user has notifies left, and the item is not already in stock.
  if (NUMBER_OF_NOTIFY_PRODUCTS > count && !body.inStock ) {
    product.notify = true;
  }

  const { data, error } = await client.from("products").upsert(product, { onConflict: 'user_id, url' }).select();
  if(error){
    throw createError({
      statusCode: 400,
      message: 'different'
    })
  }

  return { data, error };
});

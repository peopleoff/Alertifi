import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import { getNotifyCount } from "../utils/getNotifyCount";
export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const body = await readBody(event);
  const NUMBER_OF_NOTIFY_PRODUCTS = 3;
  let count = await getNotifyCount(event);
  throw createError({
    statusCode: 500,
    message: "error",
  });
  if (count >= NUMBER_OF_NOTIFY_PRODUCTS && body.checked) {
    throw createError({
      statusCode: 403,
      message: "Max number of notifies",
    });
  }

  const { data, error } = await client
    .from("products")
    .update({
      notify: body.checked,
    })
    .eq("id", body.id)
    .select();
  //on update, increment the count by 1 to match the update.
  if (body.checked) {
    count++;
  } else {
    count--;
  }
  return { data, count, error };
});

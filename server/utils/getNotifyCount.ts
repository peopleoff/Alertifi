import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "@/types/database.types";
import { H3Event, EventHandlerRequest } from 'h3';

export async function getNotifyCount(event: H3Event<EventHandlerRequest>): Promise<number> {
    const client = await serverSupabaseClient<Database>(event);
    
    const { count } = await client
      .from("products")
      .select("id", { count: "exact", head: true })
      .is("notify", true)
      .is("last_text_date", null);
    
    return count || 0;
  }
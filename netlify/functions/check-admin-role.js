// netlify/functions/check-admin-role.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event, context) {
  const id = event.queryStringParameters.id;

  const { data, error } = await supabase
    .from("admin_users")
    .select("role")
    .eq("user_id", id)
    .single();

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ isAdmin: data?.role === "admin" }),
  };
}

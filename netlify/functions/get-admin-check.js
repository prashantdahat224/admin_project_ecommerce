// netlify/functions/checkAdminCode.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event, context) {
  try {
    // Query Supabase for the code where role = "admin_score_1"
    const { data, error } = await supabase
      .from("admin_verify")
      .select("code")
      .eq("role", "admin_score_1")
      .single();

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ code: data?.code }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request" }),
    };
  }
}

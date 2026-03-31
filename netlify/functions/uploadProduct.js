import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
  console.error("here 1"); //  

export async function handler(event) {
  try {
    const body = JSON.parse(event.body); // ✅ works with JSON
    const { name, price, description, about, stock, currency, product_code, featuredPath, productPath, additionalPaths } = body;

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price: parseFloat(price),
          description,
          about,
          stock,
          currency,
          product_code,
          featured_image: featuredPath,
          product_image: productPath,
          additional_images: additionalPaths,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error(error);
      return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ id: data.id }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: "Server error" }) };
  }
}

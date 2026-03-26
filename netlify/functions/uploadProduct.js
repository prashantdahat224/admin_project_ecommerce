// netlify/functions/uploadProduct.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY   // or SERVICE_ROLE_KEY if you need privileged inserts
);

export async function handler(event) {
  try {
    // Parse request body (frontend will send JSON)
    const body = JSON.parse(event.body);
    const {
      name,
      price,
      description,
      about,
      stock,
      currency,
      featuredFile,
      productFile,
      additionalFiles,
    } = body;

    if (!name || !price || !featuredFile || !productFile) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // Upload featured image
    const featuredPath = `featured/${Date.now()}-${featuredFile.name}`;
    await supabase.storage.from("products").upload(featuredPath, featuredFile);

    // Upload product image
    const productPath = `product/${Date.now()}-${productFile.name}`;
    await supabase.storage.from("products").upload(productPath, productFile);

    // Upload additional images
    const additionalPaths = [];
    for (const file of additionalFiles || []) {
      const path = `additional/${Date.now()}-${file.name}`;
      await supabase.storage.from("products").upload(path, file);
      additionalPaths.push(path);
    }

    // Generate product code
    const product_code = `PRD-${Date.now()}`;

    // Insert product record
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

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ productId: data.id }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

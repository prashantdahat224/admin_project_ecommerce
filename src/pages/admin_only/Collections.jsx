import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import back from "../../assets/icon_download_back.png";
import { useNavigate, useParams } from "react-router-dom";
import FullScreenLoader from "../../utils/FullScreenLoader";

export default function Collection() {
  const { sectionName } = useParams();
  const decodedSection = decodeURIComponent(sectionName);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productCode, setProductCode] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("home_collections")
      .select("id, display_order, product_id, products(name, product_code, product_image)")
      .eq("section_name", decodedSection)
      .not("product_id", "is", null)
      .order("display_order", { ascending: true });

    if (!error) {
      // attach public image urls
      const withUrls = (data || []).map(item => {
        if (!item.products?.product_image) return item;
        const { data: urlData } = supabase.storage
          .from("products")
          .getPublicUrl(item.products.product_image);
        return {
          ...item,
          products: { ...item.products, image_url: urlData.publicUrl }
        };
      });
      setProducts(withUrls);
    }
    setLoading(false);
  };

  const handleAddProduct = async () => {
    if (!productCode.trim()) { alert("enter product code"); return; }
    if (!displayOrder) { alert("enter display order"); return; }

    setLoading(true);

    // get product id from product code
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id")
      .eq("product_code", productCode.trim())
      .single();

    if (productError || !product) {
      alert("product not found");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("home_collections")
      .insert([{
        section_name: decodedSection,
        product_id: product.id,
        display_order: Number(displayOrder)
      }]);

    if (error) { alert(error.message); }
    else {
      alert("product added!");
      setProductCode("");
      setDisplayOrder("");
      fetchProducts();
    }
    setLoading(false);
  };

  const handleRemoveProduct = async (id) => {
    if (!window.confirm("Remove this product from collection?")) return;
    setLoading(true);
    const { error } = await supabase
      .from("home_collections")
      .delete()
      .eq("id", id);

    if (error) { alert(error.message); }
    else { fetchProducts(); }
    setLoading(false);
  };

  return (
    <div>
      <div className="sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2 ml-4 p-1">
          <img src={back} className="h-10 w-10" onClick={() => navigate(-1)} />
          <h1 className="text-lg font-semibold">{decodedSection}</h1>
          <button onClick={fetchProducts} className="bg-gray-200 p-1 rounded">Refresh</button>
        </div>
        <hr />
      </div>

      <FullScreenLoader loading={loading} message="loading..." />

      <div className="p-4 max-w-md mx-auto">

        {/* Add product */}
        <p className="font-semibold mb-1">Add product:</p>
        <div className="flex flex-col gap-2 mb-4 border border-gray-300 p-3 rounded">
          <input
            className="border p-2 rounded"
            placeholder="Product code"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Display order (1, 2, 3, 4)"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(e.target.value)}
          />
          <button
            onClick={handleAddProduct}
            className="border border-blue-500 text-blue-500 px-4 py-2 rounded"
          >Add product</button>
        </div>

        <hr />

        {/* Linked products */}
        <p className="font-semibold mt-4 mb-2">
          Linked products: {products.length}
        </p>
        <div className="space-y-2">
          {products.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border p-2 rounded">
              {/* image */}
              {item.products?.image_url ? (
                <img src={item.products.image_url} className="w-14 h-14 object-cover rounded" />
              ) : (
                <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-xs text-gray-400">No img</p>
                </div>
              )}

              {/* info */}
              <div className="flex-1">
                <p className="font-medium text-sm">{item.products?.name || "—"}</p>
                <p className="text-xs text-gray-500">Code: {item.products?.product_code || "—"}</p>
                <p className="text-xs text-gray-500">Order: {item.display_order}</p>
              </div>

              {/* remove */}
              <button
                onClick={() => handleRemoveProduct(item.id)}
                className="border border-red-500 text-red-500 px-2 py-1 rounded text-sm"
              >Remove</button>
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-gray-400 text-sm">No products added yet</p>
          )}
        </div>

      </div>
    </div>
  );
}
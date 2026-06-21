import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import back from "../../assets/icon_download_back.png";
import { useNavigate, useParams } from "react-router-dom";
import FullScreenLoader from "../../utils/FullScreenLoader";

export default function SearchBrandID() {
  const { productIds } = useParams(); // comma-separated brand ids from URL
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrandNames();
  }, []);

  const fetchBrandNames = async () => {
    setLoading(true);

    const ids = productIds ? productIds.split(",") : [];

    const { data, error } = await supabase
      .from("brand")
      .select("id, name")
      .in("id", ids);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setBrands(data || []);
    setLoading(false);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2 ml-4">
          <img src={back} className="h-10 w-10" onClick={() => navigate(-1)} />
          <h1 className="text-lg font-semibold">Linked Brands</h1>
        </div>
        <hr />
      </div>

      <FullScreenLoader loading={loading} message=" loading..." />

      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Brands</h1>

        <div className="space-y-2">
          {brands.length === 0 ? (
            <p className="text-gray-400">No brands found</p>
          ) : (
            brands.map((brand) => (
              <div key={brand.id} className="border p-2 rounded">
                <p className="font-semibold">{brand.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
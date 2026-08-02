//collectionList.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import back from "../../assets/icon_download_back.png";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../../utils/FullScreenLoader";

export default function CollectionsList() {
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("home_collections")
      .select("name")
      .order("display_order", { ascending: true });

    if (!error) {
      // get unique section names only
      const unique = [...new Set(data.map(item => item.name))];
      setCollections(unique);
    }
    setLoading(false);
  };

  const addCollection = async () => {
    if (!name.trim()) { alert("enter section name"); return; }
    if (collections.includes(name.trim())) { alert("collection already exists"); return; }

    setLoading(true);
    // just insert a placeholder row with the section name — admin will add products in Collection.jsx
    const { error } = await supabase
      .from("home_collections")
      .insert([{ name: name.trim(), product_id: null, display_order: 0 }]);

    if (error) { alert(error.message); }
    else { alert("collection created!"); setName(""); fetchCollections(); }
    setLoading(false);
  };

  const deleteCollection = async (sectionName) => {
    if (!window.confirm(`Delete "${sectionName}" and all its products?`)) return;
    setLoading(true);
    const { error } = await supabase
      .from("home_collections")
      .delete()
      .eq("name", sectionName);

    if (error) { alert(error.message); }
    else { fetchCollections(); }
    setLoading(false);
  };

  return (
    <div>
      <div className="sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2 ml-4 p-1">
          <img src={back} className="h-10 w-10" onClick={() => navigate(-1)} />
          <h1 className="text-lg font-semibold">Home Collections</h1>
          <button onClick={fetchCollections} className="bg-gray-200 p-1 rounded">Refresh</button>
        </div>
        <hr />
      </div>

      <FullScreenLoader loading={loading} message="loading..." />

      <div className="p-4 max-w-md mx-auto">

        {/* Add new collection */}
        <p className="font-semibold mb-1">Add new collection:</p>
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="e.g. Top Products"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={addCollection}
            className="border border-blue-500 text-blue-500 px-4 rounded"
          >Add</button>
        </div>

        <hr />

        {/* Existing collections */}
        <p className="font-semibold mt-4 mb-2">Existing collections:</p>
        <div className="space-y-2">
          {collections.map((section) => (
            <div key={section} className="flex justify-between items-center border p-3 rounded">
              <p className="font-medium">{section}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin_only/Collections/${encodeURIComponent(section)}`)}
                  className="border border-blue-500 text-blue-500 px-2 py-1 rounded text-sm"
                >Manage products</button>
                <button
                  onClick={() => deleteCollection(section)}
                  className="border border-red-500 text-red-500 px-2 py-1 rounded text-sm"
                >Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
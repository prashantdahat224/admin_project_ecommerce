import { useNavigate } from "react-router-dom";
//checked / database

function HomePageDesign() { //HomePageDesign
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 space-y-4">
      <h1 className="text-xl font-bold mt-4 mb-6">_choose_a_Page_for_EDIT_</h1>

      <button
         onClick={() => navigate("/admin_only/OfferUploadNew") }
        className="w-40 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
       Offer poster 
      </button>
      <button
         onClick={() => navigate("/admin_only/Design1") }
        className="w-40 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
       design 1
      </button>

     
      <button
        onClick={() => navigate("/")}
        className="bg-gray-500 w-40 text-white w-40 py-2 rounded-md mb-20 "
      >
       go back 
      </button>

      {/* <button
      // onClick={() => navigate("/TestingPage")}
        className="border border-blue-600 w-40 bg-gray-100 text-blue-600 py-2 rounded-md hover:bg-gray-200"
      >
       admin GUIDE
      </button> */}
      
    </div>
  );
}

export default HomePageDesign;

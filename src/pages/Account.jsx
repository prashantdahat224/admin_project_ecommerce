import React from "react";
import { useNavigate } from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux";



const Account = () => {
  const navigate = useNavigate();
  const { isAdmin, loading } = useSelector(state => state.admin);

  
return (
<div className="flex items-center justify-center min-h-screen">

         <div>
        <h1 className="text-lg mb-6">Welcome to Admin Panel of WISHMOS</h1>


<button onClick={() => navigate("/AdminPassword")}
 className="bg-gray-500 text-white px-4 py-3 px-1 rounded hover:bg-gray-600">
Continue
</button>


{isAdmin && (<button onClick={() => navigate("/admin_only/AdminOption")}
 className="mt-4 bg-gray-500 text-white px-4 py-3 px-1 rounded hover:bg-gray-600">
Continue Admin 
</button>)}

</div>
</div>
);




};

export default Account;

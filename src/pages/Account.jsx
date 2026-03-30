import React from "react";
import { useNavigate } from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux";



const Account = () => {
  const navigate = useNavigate();
  const { isAdmin, loading } = useSelector(state => state.admin);

  
return (
<div className="flex items-center justify-center min-h-screen">
      
        <div>
          <div className="flex flex-col items-center justify-center mb-8">
                        <img src="/logo.jpeg" alt="Logo" className="w-15 h-15 mb-4" />

        <h1 className="text-lg mb-6">Welcome to Admin Panel of WISHMOS</h1></div>

 <div className=" flex flex-col items-center justify-center">
<button onClick={() => navigate("/AdminPassword")}
 className="bg-gray-500 text-white px-4 py-3 px-1 rounded  ">
Continue
</button>

{isAdmin && (<button onClick={() => navigate("/admin_only/AdminOption")}
 className="mt-4 bg-gray-500 text-white px-4 py-3 px-1 rounded  ">
Continue Admin 
</button>)}

 </div>
 

</div>
</div>
);




};

export default Account;

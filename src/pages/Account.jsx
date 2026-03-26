import React from "react";
import { useNavigate } from "react-router-dom";
 


const Account = () => {
  const navigate = useNavigate();

  
return (
<div className="flex items-center justify-center min-h-screen">

        <h1 className="text-xl mb-6">Welcome to Admin Panel of WISHMOS</h1>


<button onClick={() => navigate("/AdminPassword")}
 className="bg-gray-500 text-white px-4 py-3 px-1 rounded hover:bg-gray-600">
Click here
</button>
</div>
);




};

export default Account;

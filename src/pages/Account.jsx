import React from "react";
import { useNavigate } from "react-router-dom";
 


const Account = () => {
  const navigate = useNavigate();

  
return (
<div className="flex items-center justify-center min-h-screen">
<button
OnClick={() => navigate("/AdminPassword")}
 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
Click here
</button>
</div>
);




};

export default Account;

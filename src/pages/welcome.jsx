import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl mb-6">Welcome to Admin Panel</h1>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/EmailLogin")}
            className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-md "
          >
            Login
          </button>
          
          <button
            onClick={() => navigate("/EmailRegistration")}
            className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-md  "
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

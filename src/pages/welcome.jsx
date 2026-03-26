import { useNavigate } from "react-router-dom";

const welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome to Admin Panel
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/EmailLogin")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/EmailRegistration")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default welcome;

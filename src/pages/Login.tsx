import React from "react";

const Login: React.FC = () => {
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out flex items-center justify-center"
        >
          <span className="text-sm font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;

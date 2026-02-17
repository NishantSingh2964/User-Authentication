import React, { useContext, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";


const Login = ({isLoggedIn, setIsLoggedIn}) => {

   const [password, setPassowrd] = useState('');
   const [email, setEmail] = useState('');
   const navigate = useNavigate();
   const { login } = useContext(AuthContext);

   const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await login( email, password);

    if (response.success) {
      alert(response.message || "Login Successful");
      navigate("/home");
    } else {
      alert(response.message);
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=> setPassowrd(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={onSubmitHandler}
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4"
        onClick={()=> setIsLoggedIn(!isLoggedIn)}
        >
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

// src/components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({setUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/users/login',{
        email,password,
      });
      localStorage.setItem("token",data.token);
      setUser(data);
      navigate("/Home")
    }catch(error){
      setError(error.response?.data?.message || "server error in login page ")
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20 p-6 rounded-xl shadow-lg backdrop-blur-md bg-white/20 border border-white/30">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? {" "}
        <Link className="text-blue-600 hover:underline" to="/register">Register
        </Link>
      </p>
    </div>
  );
};

export default Login;

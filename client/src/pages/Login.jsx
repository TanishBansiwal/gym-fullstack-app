import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // simple auth (for now)
    if (form.username === "admin" && form.password === "1234") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center text-white">

      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-sm"
      >
        <h1 className="text-2xl mb-6 text-center">Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 rounded bg-gray-800"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-gray-800"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-red-600 py-3 rounded">
          Login
        </button>
      </form>

    </div>
  );
}
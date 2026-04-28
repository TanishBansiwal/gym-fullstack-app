import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://gym-backend-od89.onrender.com/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMessage(data.message);

    setForm({ name: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 text-white outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 text-white outline-none"
            required
          />

          <button
            type="submit"
            className="bg-red-600 py-3 rounded hover:bg-red-700 transition"
          >
            Send Message
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-green-400">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}
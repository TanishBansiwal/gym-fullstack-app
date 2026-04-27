import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white flex justify-between items-center px-8 py-4 shadow-md">

      <h1 className="text-xl font-bold text-red-500">
        GymPro 💪
      </h1>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-red-500">Home</Link>
        <Link to="/contact" className="hover:text-red-500">Contact</Link>
       <Link to="/login" className="hover:text-red-500">Admin</Link>
      </div>

    </nav>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { Navigate } from "react-router-dom";

export default function App() {

  const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin");

  return isAdmin ? children : <Navigate to="/login" />;
};

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

<Route path="/admin" element={<ProtectedRoute> <Admin /> </ProtectedRoute>}/>

        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
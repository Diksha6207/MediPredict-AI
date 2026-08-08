import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import Result from "./pages/Result";
import DiseaseDetails from "./pages/DiseaseDetails";
import Doctors from "./pages/Doctors";
import History from "./pages/History";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "calc(100vh - 140px)",
          background: "#f8fafc",
        }}
      >
        <Routes>

          {/* FIRST PAGE */}
          <Route path="/" element={<Register />} />

          {/* LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* HOME AFTER LOGIN */}
          <Route path="/home" element={<Home />} />

          {/* OTHER PAGES */}
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/predict" element={<Predict />} />

          <Route path="/result" element={<Result />} />

          <Route
            path="/disease/:id"
            element={<DiseaseDetails />}
          />

          <Route path="/doctors" element={<Doctors />} />

          <Route path="/history" element={<History />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
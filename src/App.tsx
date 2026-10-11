import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar, Footer } from "@/components/Layout";
import { Home, Videos, Services } from "@/pages/MainPages";
import { Booking, Reviews } from "@/pages/ActionPages";
import Admin from "@/pages/Admin";
import { AIGenerator } from "@/components/AIGenerator";
import { FloatingContact } from "@/components/CreatorBadge";
import { seedStorage } from "@/data/mockData";

function App() {
  useEffect(() => {
    seedStorage();
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors theme="dark" />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-zinc-950 text-white">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/services" element={<Services />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/generate" element={<AIGenerator />} />
              </Routes>
              <Footer />
              <FloatingContact />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
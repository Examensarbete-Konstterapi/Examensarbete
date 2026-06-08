import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
// import Login from "./pages/login/Login.tsx";
// import Register from "./pages/register/Register.tsx";
// import Layout from "./components/layout/Layout.tsx";
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import { About } from "./pages/about/About.tsx";
import { ArtTherapy } from "./pages/artTherapy/ArtTherapy.tsx";
import { Booking } from "./pages/booking/Booking.tsx";
import { Gallery } from "./pages/gallery/Gallery.tsx";
import { Prices } from "./pages/prices/Prices.tsx";
import { Contact } from "./pages/contact/Contact.tsx";
import { MyPages } from "./pages/dashboard/user/MyPages.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { AdminPanel } from "./pages/dashboard/admin/AdminPanel.tsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          {/* <Layout> */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/logga-in" element={<Login />} /> */}
            {/* <Route path="/registera" element={<Register />} /> */}
            <Route path="/om-mig" element={<About />} />
            <Route path="/konstterapi" element={<ArtTherapy />} />
            <Route path="/boka-tid" element={<Booking />} />
            <Route path="/galleri" element={<Gallery />} />
            <Route path="/priser" element={<Prices />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/mina-sidor" element={<MyPages />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Routes>
          {/* </Layout> */}
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

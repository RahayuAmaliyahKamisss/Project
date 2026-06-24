import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// USER
import Navbar from "./components/Navbar";
import ChatBubble from "./components/ChatBubble";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Destinasi from "./components/Destinasi";
import DestinasiDetail from "./components/DestinasiDetail";
import Tentang from "./pages/Tentang";
import Kontak from "./components/Kontak";
import DetailWisata from "./components/DetailWisata";
import KecamatanDetail from "./pages/kecamatanDetail";
import Cibadak from "./pages/kecamatan/Cibadak";
import Bukitpanenjoan from "./pages/cibadak/bukitpanenjoan";
import ProfilUser from "./pages/ProfilUser";
import Feedback from "./components/FeedbackUser";

import LoginPage from "./pages/loginUser";
import RegisterPage from "./pages/registerUser";
import ForgotPassword from "./pages/forgotPasswordUser";
import NotFound from "./pages/404";

// ADMIN
import AdminNavbar from "./admin/layout/navbarAdmin";
import AdminDashboard from "./admin/pages/dashboardAdmin";
import AdminDestinasi from "./admin/pages/destinasiAdmin";
import AdminUser from "./admin/pages/kelolaUserAdmin";
import AdminPengaturan from "./admin/pages/pengaturanAdmin";
import AdminPesan from "./admin/pages/pesanAdmin";
import FeedbackAdmin from "./admin/pages/feedbackAdmin";
import AdminQuestion from "./admin/pages/questionAdmin";
import ProtectedAdminRoute from "./admin/components/protectAdminRoutes";
import ProtectedUserRoute from "./components/protectUserRoute";

export default function App() {
  const location = useLocation();

  // cek apakah route admin
  const isAdmin = location.pathname.startsWith("/admin");

  // CHECK LOGIN
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isLogin = !!token && !!user;
  // CEK ROUTE VALID USER
  const validUserRoutes = [
    "/",
    "/destinasi",
    "/destinasi/:name",
    "/tentang",
    "/kontak",
    "/login",
    "/register",
    "/forgot-password",
    "/kecamatan/cibadak",
    "/destinasi/kecamatan/bukit-panenjoan",
    "/profil",
    "/feedback",
  ];

  // CEK APAKAH 404
  const isNotFoundPage =
    !isAdmin &&
    !validUserRoutes.includes(location.pathname) &&
    !location.pathname.startsWith("/destinasi/") &&
    !location.pathname.startsWith("/kecamatan/");


  return (
    <div className="min-h-screen">
      
      {/* ================= USER LAYOUT ================= */}
      {!isAdmin && (
        <>
          <div className={`bg-gray-100 ${ !isNotFoundPage ? "pt-20" : "" }`}>
            {!isNotFoundPage && <Navbar />}

            <Routes>
              <Route path="/" element={<ProtectedUserRoute><Home /></ProtectedUserRoute>} />
              <Route path="/destinasi" element={<ProtectedUserRoute><Destinasi /></ProtectedUserRoute>}/>
              <Route path="/destinasi/:id" element={<ProtectedUserRoute><DestinasiDetail /></ProtectedUserRoute>} />
              <Route path="/kecamatan/:slug" element={<KecamatanDetail />} />
              <Route path="/kecamatan/cibadak" element={<Cibadak />} />
              <Route path="/destinasi/kecamatan/bukit-panenjoan" element={<Bukitpanenjoan />} />
              {/* <Route path="/destinasi/:id" element={<DetailWisata />} /> */}
              <Route path="/tentang" element={<ProtectedUserRoute><Tentang /></ProtectedUserRoute>} />
              <Route path="/kontak" element={<Kontak />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ProtectedUserRoute><ForgotPassword /></ProtectedUserRoute>} />
              <Route path="/profil" element={<ProtectedUserRoute><ProfilUser /></ProtectedUserRoute>}/>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster position="top-right" />
            {isLogin && <ChatBubble />}
            {!isNotFoundPage && <Footer />}
          </div>
        </>
      )}

      {/* ================= ADMIN LAYOUT ================= */}
      {isAdmin && (
        <ProtectedAdminRoute>
          <>
            <AdminNavbar />

            <div className="bg-gray-50 px-4 md:px-6 lg:px-8">
              <Routes>

                <Route
                  path="/admin"
                  element={<AdminDashboard />}
                />

                <Route
                  path="/admin/destinasi"
                  element={<AdminDestinasi />}
                />

                <Route
                  path="/admin/user"
                  element={<AdminUser />}
                />

                <Route
                  path="/admin/pengaturan"
                  element={<AdminPengaturan />}
                />

                <Route
                  path="/admin/pesan"
                  element={<AdminPesan />}
                />

                <Route
                  path="/admin/basis-pengetahuan"
                  element={<AdminQuestion />}
                />
                <Route
                  path="/admin/feedback"
                  element={<FeedbackAdmin />}
                />

                <Route path="*" element={<NotFound />} />

              </Routes>
            </div>
          </>
        </ProtectedAdminRoute>
      )}
    </div>
  );
}
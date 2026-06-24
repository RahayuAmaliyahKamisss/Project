import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Menu,
  X,
  User,
  LogIn,
  LogOut,
  ChevronDown,
} from "lucide-react";

import Logo from "../assets/geoexplore.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [profileOpen, setProfileOpen] = useState(false);

  // CHECK LOGIN
  useEffect(() => {
    const checkLogin = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    // SAAT PERTAMA LOAD
    checkLogin();

    // LISTEN LOGIN/LOGOUT
    window.addEventListener("authChanged", checkLogin);

    return () => {
      window.removeEventListener(
        "authChanged",
        checkLogin
      );
    };
  }, []);

  // HANDLE SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChanged"));

    setUser(null);

    navigate("/login");
  };

  // MENU
  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Destinasi", path: "/destinasi" },
    { name: "Tentang", path: "/tentang" },
    // { name: "Kontak", path: "/kontak" },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: show ? 0 : -120 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white shadow-sm border-b border-gray-100"
      >
        <div className="flex justify-between items-center px-6 md:px-10 max-w-7xl mx-auto">

          {/* LOGO */}
          <Link to="/">
            <img
              src={Logo}
              alt="Logo Wisalsu"
              className="w-32 md:w-36 py-2"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-8 text-gray-600 items-center">

            {navLinks.map((link, i) => {
              const isActive =
                location.pathname === link.path;

              return (
                <Link
                  key={i}
                  to={link.path}
                  className={`relative font-medium transition group ${
                    isActive
                      ? "text-blue-600"
                      : "hover:text-blue-600"
                  }`}
                >
                  {link.name}

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}

            {/* AUTH MENU */}
            {!user ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                <LogIn size={18} />
                Login
              </Link>
            ) : (
              <div className="relative">

                <button
                  onClick={() =>
                    setProfileOpen(!profileOpen)
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  <User size={18} />

                  {user.nama}

                  <ChevronDown size={16} />
                </button>

                {/* DROPDOWN */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                      }}
                      className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      <Link
                        to="/profil"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition text-gray-700"
                      >
                        <User size={18} />
                        Profil Saya
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 transition"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700"
          >
            {open ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[76px] left-0 w-full bg-white shadow-md z-40 md:hidden"
          >
            <div className="flex flex-col p-6 gap-5 text-gray-700">

              {navLinks.map((link, i) => {
                const isActive =
                  location.pathname === link.path;

                return (
                  <Link
                    key={i}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`font-medium transition ${
                      isActive
                        ? "text-blue-600"
                        : "hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              {/* MOBILE AUTH */}
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to="/profil"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium"
                  >
                    <User size={18} />
                    {user.nama}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white font-medium"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Menu,
  X,
  LayoutDashboard,
  Map,
  Users,
  Settings,
  Mail,
  MessageCircle,
  User,
  LogOut,
  ChevronDown,
  HelpCircle
} from "lucide-react";

import Logo from "../../assets/geoexplore.png";

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [profileOpen, setProfileOpen] =
    useState(false);

  // ================= CHECK LOGIN =================
  useEffect(() => {
    const checkLogin = () => {
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkLogin();

    window.addEventListener(
      "authChanged",
      checkLogin
    );

    return () => {
      window.removeEventListener(
        "authChanged",
        checkLogin
      );
    };
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.dispatchEvent(
      new Event("authChanged")
    );

    navigate("/login");
  };

  // ================= MENU =================
  const navLinks = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={18} />,
    },

    {
      name: "Destinasi",
      path: "/admin/destinasi",
      icon: <Map size={18} />,
    },

    {
      name: "User",
      path: "/admin/user",
      icon: <Users size={18} />,
    },

    // {
    //   name: "Pesan",
    //   path: "/admin/pesan",
    //   icon: <Mail size={18} />,
    // },
    {
      name: "Feedback",
      path: "/admin/feedback",
      icon: <HelpCircle size={18} />,
    },

    {
      name: "Pertanyaan",
      path: "/admin/basis-pengetahuan",
      icon: <MessageCircle size={18} />,
    },

    {
      name: "Pengaturan",
      path: "/admin/pengaturan",
      icon: <Settings size={18} />,
    },

  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 h-[70px] flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/admin"
            className="flex items-center gap-3 group transition-all duration-300"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-white to-white group-hover:scale-105 transition">
              <img
                src={Logo}
                alt="Logo"
                className="w-full object-contain"
              />
            </div>

            <div className="hidden md:flex flex-col leading-tight">

              {/* NAMA USER */}
              {user && (
                <span className="text-xs text-gray-500 tracking-wide">
                  {user.nama}
                </span>
              )}

              {/* TITLE */}
              <span className="font-semibold text-primary text-lg tracking-wide group-hover:text-secondary transition">
                GeoExplore Panel
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4">

            {/* MENU */}
            <div className="flex items-center gap-3">
              {navLinks.map((link, i) => {
                const isActive =
                  location.pathname === link.path;

                return (
                  <Link
                    key={i}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-fourth text-primary"
                        : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}
            </div>

           
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
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed top-[70px] left-0 w-full bg-white border-b shadow-md z-40 md:hidden">

          <div className="flex flex-col p-4 gap-1">

            {/* USER INFO */}
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-xl">

                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  <User size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {user.nama}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* MENU */}
            {navLinks.map((link, i) => {
              const isActive =
                location.pathname === link.path;

              return (
                <Link
                  key={i}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-fourth text-primary"
                        : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                    }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}

            {/* LOGOUT */}
            {/* <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white font-medium mt-3"
            >
              <LogOut size={18} />
              Logout
            </button> */}

          </div>
        </div>
      )}

      {/* SPACER */}
      <div className="h-[70px]" />
    </>
  );
}
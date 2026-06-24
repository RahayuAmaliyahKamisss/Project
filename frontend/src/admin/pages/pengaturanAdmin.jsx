import { useEffect, useState } from "react";

import {
  Save,
  LogOut,
  User,
  Mail,
  Globe,
  Lock,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

export default function AdminPengaturan() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    // website: "GeoExplore",
    password: "",
    confirmPassword: "",
  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ================= GET USER =================
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        nama: user.nama,
        email: user.email,
      }));
    }
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE PROFILE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // VALIDASI PASSWORD
      if (
        form.password &&
        form.password !== form.confirmPassword
      ) {
        toast.error(
          "Konfirmasi password tidak cocok"
        );

        return;
      }

      // UPDATE USER
      await axios.put(
        `http://localhost:3000/api/users/${user.id}`,
        {
          nama: form.nama,
          email: form.email,
          role: user.role,
        }
      );

      // UPDATE PASSWORD
      if (form.password) {
        await axios.put(
          `http://localhost:3000/api/users/reset-password/${user.id}`,
          {
            password: form.password,
          }
        );
      }

      // UPDATE LOCAL STORAGE
      const updatedUser = {
        ...user,
        nama: form.nama,
        email: form.email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      // UPDATE NAVBAR
      window.dispatchEvent(
        new Event("authChanged")
      );

      toast.success(
        "Pengaturan berhasil disimpan"
      );

      setForm((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toast.error("Gagal menyimpan perubahan");
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGOUT =================
  const [showLogoutModal, setShowLogoutModal] =
  useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.dispatchEvent(
      new Event("authChanged")
    );

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-8 lg:px-12 py-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-gray-200 pb-6">

          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-primary">
              Pengaturan Sistem
            </h1>

            <p className="text-gray-500 mt-1 text-sm">
              Kelola profil admin dan keamanan akun
            </p>
          </div>

          {/* LOGOUT */}
          {/* <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center justify-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 px-5 py-2.5 rounded-2xl transition w-full md:w-auto"
          >
            <LogOut size={18} />
            Logout
          </button> */}
        </div>

        {/* CONTENT */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-10"
        >

          {/* PROFILE */}
          <section className="space-y-6">

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Informasi Profil
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Informasi dasar akun admin
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {/* NAMA */}
              <div className="space-y-2">

                <label className="text-sm text-gray-500">
                  Nama Lengkap
                </label>

                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 bg-white">

                  <User
                    size={18}
                    className="text-gray-400"
                  />

                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Masukkan nama"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-2">

                <label className="text-sm text-gray-500">
                  Email
                </label>

                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 bg-white">

                  <Mail
                    size={18}
                    className="text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                    placeholder="Masukkan email"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* GENERAL */}
          {/* <section className="space-y-6 border-t border-gray-200 pt-8"> */}

            {/* <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Pengaturan Umum
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Konfigurasi website sistem
              </p>
            </div> */}

            {/* <div className="max-w-md">

              <label className="text-sm text-gray-500 block mb-2">
                Nama Website
              </label>

              <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 bg-white">

                <Globe
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div> */}
          {/* </section> */}

          {/* SECURITY */}
          <section className="space-y-6 border-t border-gray-200 pt-8">

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Keamanan
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Ganti password akun admin
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {/* PASSWORD */}
              <div className="space-y-2">

                <label className="text-sm text-gray-500">
                  Password Baru
                </label>

                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 bg-white">

                  <Lock
                    size={18}
                    className="text-gray-400"
                  />

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Masukkan password baru"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="space-y-2">

                <label className="text-sm text-gray-500">
                  Konfirmasi Password
                </label>

                <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 bg-white">

                  <Lock
                    size={18}
                    className="text-gray-400"
                  />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi password"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* ACTION */}
          <div className="flex justify-between border-t border-gray-200 pt-8">



            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center text-sm md:text-base gap-2 bg-primary hover:opacity-90 text-white px-6 py-3 rounded-2xl transition w-full md:w-auto"
            >
              <Save size={18} />

              {loading
                ? "Menyimpan..."
                : "Simpan Perubahan"}
            </button>
            {/* LOGOUT */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center justify-center gap-2 border text-sm md:text-base border-red-200 text-white bg-red-700 hover:bg-red-600 px-6 py-3 rounded-2xl transition w-full md:w-auto"
          >
            <LogOut size={18} />
            Logout
          </button>
          </div>
        </form>
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-7 animate-in fade-in zoom-in duration-200">

            {/* ICON */}
            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-5">
              <LogOut
                size={30}
                className="text-red-500"
              />
            </div>

            {/* TEXT */}
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Logout Akun
              </h2>

              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                Apakah Anda yakin ingin keluar dari
                akun admin?
              </p>
            </div>

            {/* BUTTON */}
            <div className="flex flex-col-reverse md:flex-row gap-3 mt-7">

                  <button
                    onClick={() =>
                      setShowLogoutModal(false)
                    }
                    className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-2xl transition font-medium"
                  >
                    Batal
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition font-medium"
                  >
                    Ya, Logout
                  </button>

                </div>
              </div>
            </div>
          )}
    </div>
  );
}
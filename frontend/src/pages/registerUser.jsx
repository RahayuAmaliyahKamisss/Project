import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  UserPlus,
  Loader2,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDASI PASSWORD
    if (form.password !== form.confirmPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }

    try {
      setLoading(true);

      // KIRIM KE BACKEND
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          nama: form.nama,
          email: form.email,
          password: form.password,
        }
      );

      toast.success(
        response.data.message || "Register berhasil"
      );

      // RESET FORM
      setForm({
        nama: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // REDIRECT KE LOGIN
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Register gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl"
      >
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Buat Akun Baru
          </h1>

          <p className="text-gray-500">
            Daftar untuk menikmati layanan dan
            informasi destinasi wisata terbaik
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* NAMA */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Nama Lengkap
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 focus-within:border-blue-600 transition">
              <User
                size={18}
                className="text-gray-400"
              />

              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full outline-none ml-3 bg-transparent"
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Email
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 focus-within:border-blue-600 transition">
              <Mail
                size={18}
                className="text-gray-400"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="w-full outline-none ml-3 bg-transparent"
                required
              />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Nomor HP
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 focus-within:border-blue-600 transition">
              <Phone
                size={18}
                className="text-gray-400"
              />

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Masukkan nomor HP"
                className="w-full outline-none ml-3 bg-transparent"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Password
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 focus-within:border-blue-600 transition">
              <Lock
                size={18}
                className="text-gray-400"
              />

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full outline-none ml-3 bg-transparent"
                required
              />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Konfirmasi Password
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 focus-within:border-blue-600 transition">
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
                className="w-full outline-none ml-3 bg-transparent"
                required
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 rounded-2xl transition flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Loading...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Daftar Sekarang
              </>
            )}
          </button>
        </form>

        {/* LOGIN */}
        <p className="text-center text-gray-500 mt-8">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
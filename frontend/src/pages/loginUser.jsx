import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Gambar from "../assets/hero.jpg";

export default function LoginPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        form
      );

      // AMBIL DATA
      const { token, user, message } = response.data;

      // SIMPAN TOKEN
      localStorage.setItem("token", token);

      // SIMPAN USER
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("authChanged"));

      toast.success(message || "Login berhasil");

      // REDIRECT
      // if (user.role === "admin") {
      //   navigate("/admin");
      // } else {
      //   navigate("/");
      // }
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
        console.error(error);

        // HAPUS SESSION LAMA
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // UPDATE NAVBAR
        window.dispatchEvent(new Event("authChanged"));

        toast.error(
          error.response?.data?.message || "Login gagal"
        );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-6xl grid md:grid-cols-2 rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
        
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block h-full min-h-[700px]"
        >
          <img
            src={Gambar}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 md:p-12 flex items-center"
        >
          <div className="w-full">

            {/* HEADER */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Login
              </h2>

              <p className="text-gray-500">
                Silakan masuk menggunakan email dan password Anda
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
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

              {/* REMEMBER */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" />
                  Ingat saya
                </label>

                {/* <Link
                  to="/forgot-password"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Lupa password?
                </Link> */}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 rounded-2xl transition flex items-center justify-center gap-2"
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
                    <LogIn size={20} />
                    Masuk
                  </>
                )}
              </button>
            </form>

            {/* REGISTER */}
            <p className="text-center text-gray-500 mt-8">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
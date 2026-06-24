import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password untuk:", email);
  };

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl border border-gray-200 rounded-3xl p-8 md:p-12"
      >
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-8"
        >
          <ArrowLeft size={18} />
          Kembali ke Login
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Lupa Password
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Masukkan email yang terdaftar pada akun Anda. Kami akan
            mengirimkan link untuk reset password ke email tersebut.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Email
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 focus-within:border-blue-600 transition">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full outline-none ml-3 bg-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Kirim Link Reset Password
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm">
          Pastikan email yang Anda masukkan aktif dan dapat menerima pesan.
        </p>
      </motion.div>
    </section>
  );
}

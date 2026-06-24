import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  User,
  Mail,
  Shield,
  Save,
  Lock,
} from "lucide-react";

export default function ProfileUser() {
  const userData = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  // ================= GET USER =================
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/api/users/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm({
        nama: res.data.nama,
        email: res.data.email,
        role: res.data.role,
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengambil data profil");
    }
  };

  useEffect(() => {
    fetchProfile();
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
      if (
        form.password &&
        form.password !== form.confirmPassword
      ) {
        return toast.error("Konfirmasi password tidak cocok");
      }

      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        nama: form.nama,
        email: form.email,
      };

      // kalau password diisi
      if (form.password) {
        payload.password = form.password;
      }

      const res = await axios.put(
        `http://localhost:3000/api/users/${userData.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update localstorage
      const updatedUser = {
        ...userData,
        nama: form.nama,
        email: form.email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      toast.success("Profil berhasil diperbarui");

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Gagal update profil"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-10">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-black">
            Profil Saya
          </h1>

          <p className="text-gray-500 mt-2">
            Kelola informasi akun dan keamanan akun Anda
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">

          {/* TOP */}
          <div className="border-b border-gray-100 px-6 md:px-10 py-8">
            <div className="flex flex-col md:flex-row md:items-center gap-5">

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-blue-600/10 flex items-center justify-center">
                <User
                  size={40}
                  className="text-black"
                />
              </div>

              {/* Info */}
              <div>
                <h2 className="text-2xl font-semibold text-black">
                  {form.nama || "-"}
                </h2>

                <p className="text-gray-500 mt-1">
                  {form.email || "-"}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 bg-blue-50 text-black px-4 py-2 rounded-xl text-sm font-medium">
                  <Shield size={16} />
                  {form.role}
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-10 space-y-10"
          >

            {/* PROFILE */}
            <div className="space-y-6">

              <div>
                <h3 className="text-lg font-semibold text-black">
                  Informasi Profil
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Data akun yang digunakan pada sistem
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* NAMA */}
                <div>
                  <label className="text-sm text-gray-500 block mb-2">
                    Nama Lengkap
                  </label>

                  <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-blue-600 transition">
                    <User
                      size={18}
                      className="text-gray-400"
                    />

                    <input
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      className="w-full ml-3 outline-none bg-transparent"
                      placeholder="Masukkan nama"
                      required
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-sm text-gray-500 block mb-2">
                    Email
                  </label>

                  <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-blue-600 transition">
                    <Mail
                      size={18}
                      className="text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full ml-3 outline-none bg-transparent"
                      placeholder="Masukkan email"
                      required
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-6 border-t border-gray-100 pt-8">

              <div>
                <h3 className="text-lg font-semibold text-black">
                  Keamanan
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Kosongkan jika tidak ingin mengganti password
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* PASSWORD */}
                <div>
                  <label className="text-sm text-gray-500 block mb-2">
                    Password Baru
                  </label>

                  <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-blue-600 transition">
                    <Lock
                      size={18}
                      className="text-gray-400"
                    />

                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full ml-3 outline-none bg-transparent"
                      placeholder="Masukkan password baru"
                    />
                  </div>
                </div>

                {/* CONFIRM */}
                <div>
                  <label className="text-sm text-gray-500 block mb-2">
                    Konfirmasi Password
                  </label>

                  <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-blue-600 transition">
                    <Lock
                      size={18}
                      className="text-gray-400"
                    />

                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full ml-3 outline-none bg-transparent"
                      placeholder="Ulangi password"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end border-t border-gray-100 pt-8">

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-secondary text-white px-6 py-3 rounded-2xl transition"
              >
                <Save size={18} />

                {loading
                  ? "Menyimpan..."
                  : "Simpan Perubahan"}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
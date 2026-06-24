import { useMemo, useState } from "react";
import axios from "axios";
import {
  MessageSquare,
  Send,
  Star,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

const feedbackData = {
  "Tampilan Aplikasi": [
    "Tampilan aplikasi terlalu ramai",
    "Warna aplikasi kurang nyaman dilihat",
    "Ukuran teks terlalu kecil",
    "Dark mode perlu ditambahkan",
    "Tampilan mobile kurang responsif",
    "Navigasi menu membingungkan",
    "Desain aplikasi sudah bagus",
    "Dashboard perlu dibuat lebih sederhana",
  ],

  "Performa Sistem": [
    "Aplikasi terasa lambat",
    "Loading halaman terlalu lama",
    "Sistem sering error",
    "Performa aplikasi sudah baik",
    "Chatbot terlalu lama merespon",
    "Website terasa berat",
    "Perlu optimasi performa",
    "Aplikasi kadang force close",
  ],

  "Informasi Wisata": [
    "Informasi wisata kurang lengkap",
    "Harga tiket perlu diperbarui",
    "Deskripsi wisata terlalu singkat",
    "Foto wisata perlu ditambah",
    "Lokasi wisata kurang akurat",
    "Informasi sudah sangat membantu",
    "Tambahkan info fasilitas wisata",
    "Tambahkan rekomendasi wisata terdekat",
  ],

  "Tiket & Pembayaran": [
    "Pembayaran terlalu rumit",
    "Tambahkan metode QRIS",
    "Tambahkan pembayaran e-wallet",
    "Riwayat pembayaran perlu ditambahkan",
    "Harga tiket sudah jelas",
    "Konfirmasi pembayaran terlalu lama",
    "Perlu fitur refund tiket",
    "Tiket digital sangat membantu",
  ],

  "Navigasi & Peta": [
    "Peta lokasi kurang akurat",
    "Navigasi sulit digunakan",
    "Tambahkan petunjuk arah",
    "Tambahkan integrasi Google Maps",
    "Lokasi wisata sulit ditemukan",
    "Navigasi sudah sangat membantu",
    "Tambahkan estimasi waktu perjalanan",
    "Tambahkan fitur wisata terdekat",
  ],

  "Chatbot & Bantuan": [
    "Jawaban chatbot kurang sesuai",
    "Chatbot sangat membantu",
    "Tambahkan fitur live chat admin",
    "Chatbot terlalu lambat",
    "Bahasa chatbot kurang natural",
    "Tambahkan dukungan suara",
    "Chatbot sulit dipahami",
    "Tambahkan rekomendasi wisata otomatis",
  ],

  "Akun & Login": [
    "Login terlalu rumit",
    "OTP tidak masuk",
    "Registrasi gagal",
    "Lupa password sulit digunakan",
    "Tambahkan login Google",
    "Session login terlalu cepat habis",
    "Sistem login sudah bagus",
    "Tambahkan edit foto profil",
  ],

  "Saran Fitur Baru": [
    "Tambahkan dark mode",
    "Tambahkan AI rekomendasi wisata",
    "Tambahkan forum pengguna",
    "Tambahkan fitur review wisata",
    "Tambahkan upload foto wisata",
    "Tambahkan fitur check-in wisata",
    "Tambahkan leaderboard wisata",
    "Tambahkan mode offline",
  ],

  "Laporan Bug": [
    "Tombol tidak berfungsi",
    "Halaman blank putih",
    "Data tidak muncul",
    "Error saat login",
    "Error saat booking",
    "Aplikasi crash",
    "Chatbot error",
    "Peta tidak muncul",
  ],
};

const categoryIcons = {
  "Tampilan Aplikasi": "🎨",
  "Performa Sistem": "⚡",
  "Informasi Wisata": "🏝️",
  "Tiket & Pembayaran": "💳",
  "Navigasi & Peta": "🗺️",
  "Chatbot & Bantuan": "🤖",
  "Akun & Login": "🔐",
  "Saran Fitur Baru": "✨",
  "Laporan Bug": "🐞",
};

export default function FeedbackPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const suggestions = useMemo(() => {
    return feedbackData[selectedCategory] || [];
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Ambil data user login jika ada
      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        user_id: user?.id || null,
        username: user?.username || user?.name || "Guest",
        email: user?.email || null,

        category: selectedCategory,
        suggestion: selectedSuggestion,
        message: message,
        rating: rating,
      };

      const response = await axios.post(
        "http://localhost:3000/api/feedback",
        payload
      );

      if (response.data.success) {
        setSuccess(true);

        setSelectedCategory("");
        setSelectedSuggestion("");
        setRating(0);
        setMessage("");

        setTimeout(() => {
          setSuccess(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Gagal mengirim feedback"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-blue-600/10 p-4">
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">
            Feedback & Saran GeoExplore
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Bantu kami meningkatkan kualitas sistem GeoExplore dengan
            memberikan masukan, kritik, dan saran terbaik Anda.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <h2 className="mb-5 text-lg font-semibold text-slate-800">
              Kategori Feedback
            </h2>

            <div className="grid gap-3">
              {Object.keys(feedbackData).map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSelectedSuggestion("");
                  }}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 hover:scale-[1.02]
                  
                  ${
                    selectedCategory === category
                      ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                      : "border-slate-200 bg-white hover:border-blue-600/40"
                  }`}
                >
                  <span className="text-xl">
                    {categoryIcons[category]}
                  </span>

                  <div>
                    <p className="font-medium">{category}</p>

                    <p
                      className={`text-sm ${
                        selectedCategory === category
                          ? "text-white/80"
                          : "text-slate-500"
                      }`}
                    >
                      {feedbackData[category].length} pilihan saran
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Kirim Feedback
                </h2>

                <p className="mt-1 text-slate-500">
                  Pilih kategori dan saran yang sesuai.
                </p>
              </div>

              {/* Category */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Kategori
                </label>

                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedSuggestion("");
                    }}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-600 focus:bg-white"
                    required
                  >
                    <option value="">
                      Pilih kategori feedback
                    </option>

                    {Object.keys(feedbackData).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Suggestion */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Isi Saran
                </label>

                <div className="grid gap-3 md:grid-cols-2">
                  {suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() =>
                          setSelectedSuggestion(item)
                        }
                        className={`rounded-2xl border p-4 text-left transition-all duration-200
                        
                        ${
                          selectedSuggestion === item
                            ? "border-blue-600 bg-blue-600 text-white shadow-md"
                            : "border-slate-200 hover:border-blue-600/40 hover:bg-slate-50"
                        }`}
                      >
                        {item}
                      </button>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-400 md:col-span-2">
                      Pilih kategori terlebih dahulu
                    </div>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-5">
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Rating Kepuasan
                </label>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Message */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Pesan Tambahan
                </label>

                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tambahkan detail tambahan jika diperlukan..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-600 focus:bg-white"
                />
              </div>

              {/* Success */}
              {success && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />

                  <p className="text-sm font-medium">
                    Feedback berhasil dikirim. Terima kasih atas
                    masukan Anda.
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  !selectedCategory ||
                  !selectedSuggestion ||
                  loading
                }
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.01] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-5 w-5" />

                {loading
                  ? "Mengirim Feedback..."
                  : "Kirim Feedback"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
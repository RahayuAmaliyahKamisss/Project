import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
// Menggunakan Tailwind biasa tanpa shadcn/ui
const Card = ({ children, className = "" }) => (
  <div className={`bg-white ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);
const Button = ({ children, className = "", variant = "default", ...props }) => (
  <button
    className={`px-4 py-2 font-medium transition rounded-xl border ${
      variant === "outline"
        ? "border-slate-300 bg-white hover:bg-slate-50"
        : "bg-slate-900 text-white hover:bg-slate-800"
    } ${className}`}
    {...props}>
    {children}
  </button>
);
const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200 ${className}`}
    {...props}
  />
);
const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200 ${className}`}
    {...props}
  />
);
import { Search, Plus, Pencil, Trash2, Database } from "lucide-react";

const API_URL = "http://localhost:3000/api/knowledge-base";

export default function QuestionAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "",
    keyword: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setData(res.data.data || []);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data knowledge base");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      question: "",
      answer: "",
      category: "",
      keyword: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.question || !form.answer) {
      alert("Question dan Answer wajib diisi");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        alert("Data berhasil diperbarui");
      } else {
        await axios.post(API_URL, form);
        alert("Data berhasil ditambahkan");
      }

      resetForm();
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      question: item.question || "",
      answer: item.answer || "",
      category: item.category || "",
      keyword: item.keyword || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Data berhasil dihapus");
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };

  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.question?.toLowerCase().includes(keyword) ||
      item.category?.toLowerCase().includes(keyword) ||
      item.keyword?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Knowledge Base Admin
            </h1>
            <p className="text-slate-500 mt-1">
              Kelola pertanyaan dan jawaban chatbot GeoExplore
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white shadow-sm border px-4 py-3">
            <Database className="w-5 h-5" />
            <span className="font-medium">{data.length} Data</span>
          </div>
        </motion.div>

        <Card className="rounded-2xl shadow-sm border-0">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Knowledge Base" : "Tambah Knowledge Base"}
              </h2>

              <div>
                <label className="text-sm font-medium">Question</label>
                <Textarea
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  placeholder="Masukkan pertanyaan"
                  className="mt-2 min-h-[100px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Answer</label>
                <Textarea
                  name="answer"
                  value={form.answer}
                  onChange={handleChange}
                  placeholder="Masukkan jawaban"
                  className="mt-2 min-h-[140px]"
                />
              </div>

              <div className="grid md:grid-cols-1 gap-4">
                {/* <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Contoh: Tiket Masuk"
                    className="mt-2"
                  />
                </div> */}


                <div>
                  <label className="text-sm font-medium">Keyword</label>
                  <Input
                    name="keyword"
                    value={form.keyword}
                    onChange={handleChange}
                    placeholder="Contoh: tiket, harga, curug"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Category
                </label>

                <div className="relative">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none appearance-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-primary/40">
                    <option value="" disabled hidden></option>

                    <option value="informasi umum">Informasi Umum</option>
                    <option value="tiket">Tiket</option>
                    <option value="sejarah">Sejarah</option>
                    <option value="fasilitas">Fasilitas</option>
                    <option value="biaya parkir">Biaya Parkir</option>
                    <option value="jam operasional">Jam Operasional</option>
                    <option value="lokasi">Lokasi</option>
                  </select>

                  {/* Custom Arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Placeholder */}
                  {!form.category && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 pointer-events-none">
                      Pilih Category
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="rounded-xl flex items-center" variant="default">
                  <Plus className="w-4 h-4 mr-2" />
                  {editingId ? "Update Data" : "Tambah Data"}
                </Button>

                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl"
                    onClick={resetForm}
                  >
                    Batal
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* card kedua */}
        <Card className="rounded-3xl border border-slate-200 bg-white">
          <CardContent className="p-4 md:p-6 space-y-6">
            
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />

              <Input
                placeholder="Cari question, category, keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 rounded-2xl border-slate-200 bg-slate-50 focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:border-slate-300 text-sm md:text-base"
              />
            </div>

            {/* List */}
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <p className="text-slate-500 text-sm">Loading...</p>
                </div>
              ) : filteredData.length === 0 ? (
                <div className="border border-dashed border-slate-200 rounded-3xl py-14 text-center bg-slate-50">
                  <p className="text-slate-500 text-sm md:text-base">
                    Belum ada data tersedia
                  </p>
                </div>
              ) : (
                filteredData.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="
                      group
                      border border-slate-200
                      rounded-3xl
                      p-5 md:p-6
                      bg-white
                      hover:border-slate-300
                      transition-all
                    "
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-slate-800 text-base md:text-lg leading-relaxed">
                            {item.question}
                          </h3>

                          <p className="text-slate-600 whitespace-pre-line leading-relaxed text-sm md:text-[15px]">
                            {item.answer}
                          </p>
                        </div>

                        {/* Info */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs md:text-sm">
                            <span className="font-medium text-slate-700">
                              Category:
                            </span>{" "}
                            {item.category || "-"}
                          </div>

                          <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs md:text-sm">
                            <span className="font-medium text-slate-700">
                              Keyword:
                            </span>{" "}
                            {item.keyword || "-"}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 lg:flex-col">
                        <Button
                          variant="outline"
                          className="
                            h-11 w-11
                            rounded-2xl
                            border-slate-200
                            hover:bg-slate-100
                            hover:border-slate-300
                            transition-all
                          "
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="w-4 h-4 text-slate-700" />
                        </Button>

                        <Button
                          variant="outline"
                          className="
                            h-11 w-11
                            rounded-2xl
                            border-slate-200
                            hover:bg-red-50
                            hover:border-red-200
                            transition-all
                          "
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

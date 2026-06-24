import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  Search,
  Filter,
  Star,
  MessageSquareMore,
  BrainCircuit,
  Trash2,
  Eye,
  Mail,
  X,
} from "lucide-react";

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua");

  const [selectedFeedback, setSelectedFeedback] =
    useState(null);

  const [selectedMessage, setSelectedMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openMessageModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeMessageModal = () => {
    setIsModalOpen(false);
    setSelectedMessage("");
  };

  // =========================
  // FETCH FEEDBACK
  // =========================
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/feedback"
      );

      console.log(response.data);

      if (response.data.success) {
        setFeedbacks(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // =========================
  // DELETE FEEDBACK
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus feedback ini?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/feedback/${id}`
      );

      setFeedbacks((prev) =>
        prev.filter((item) => item.id !== id)
      );

      if (selectedFeedback?.id === id) {
        setSelectedFeedback(null);
      }
    } catch (error) {
      console.log(error);

      alert("Gagal menghapus feedback");
    }
  };

  // =========================
  // UPDATE STATUS
  // =========================
  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:3000/api/feedback/${id}`,
        {
          status,
        }
      );

      setFeedbacks((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      if (selectedFeedback?.id === id) {
        setSelectedFeedback((prev) => ({
          ...prev,
          status,
        }));
      }
    } catch (error) {
      console.log(error);

      alert("Gagal update status");
    }
  };

  // =========================
  // FILTER DATA
  // =========================
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((item) => {
      const matchSearch =
        item.username
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.suggestion
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        selectedStatus === "Semua"
          ? true
          : item.status === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [feedbacks, search, selectedStatus]);

  // =========================
  // STATS
  // =========================
  const totalFeedback = feedbacks.length;

  const pendingCount = feedbacks.filter(
    (item) => item.status === "Pending"
  ).length;

  const dipelajariCount = feedbacks.filter(
    (item) => item.status === "Dipelajari"
  ).length;

  const selesaiCount = feedbacks.filter(
    (item) => item.status === "Selesai"
  ).length;


  useEffect(() => {
  console.log(feedbacks);
}, [feedbacks]);
  // =========================
  // STATUS COLOR
  // =========================
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "Dipelajari":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "Selesai":
        return "bg-green-100 text-green-700 border-green-200";

      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            {/* <div className="mb-3 inline-flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-2 text-primary">
              <BrainCircuit className="h-5 w-5" />

              <span className="text-sm font-semibold">
                AI Learning Feedback
              </span>
            </div> */}

            <h1 className="text-3xl font-bold text-slate-800">
              Feedback Pengguna GeoExplore
            </h1>

            <p className="mt-2 text-slate-500">
              Kelola masukan pengguna untuk meningkatkan
              kualitas sistem dan pembelajaran chatbot
              GeoExplore.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">
                Total Feedback
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                {totalFeedback}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <h2 className="mt-1 text-2xl font-bold text-yellow-600">
                {pendingCount}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">
                Dipelajari
              </p>

              <h2 className="mt-1 text-2xl font-bold text-blue-600">
                {dipelajariCount}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">
                Selesai
              </p>

              <h2 className="mt-1 text-2xl font-bold text-green-600">
                {selesaiCount}
              </h2>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Cari feedback pengguna..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white"
              />
            </div>

            {/* Filter */}
            <div className="relative min-w-[220px]">
              <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value)
                }
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white"
              >
                <option value="Semua">
                  Semua Status
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Dipelajari">
                  Dipelajari
                </option>

                <option value="Selesai">
                  Selesai
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Pengguna
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Kategori
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Saran
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Rating
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Tanggal
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading &&
                  filteredFeedbacks.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-100 transition hover:bg-slate-50"
                    >
                      {/* User */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 font-semibold text-primary">
                            {item.nama?.charAt(0) || "U"}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {item.nama || "Guest"}
                            </p>

                            <p className="text-sm text-slate-500">
                              User
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="h-4 w-4" />
                          {item.email}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5">
                        <div className="inline-flex rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                          {item.category}
                        </div>
                      </td>

                      {/* Suggestion */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-medium text-slate-800">
                            {item.suggestion}
                          </p>

                          <button
                            onClick={() => openMessageModal(item.message)}
                            className="mt-1 max-w-sm text-left text-sm text-slate-500 line-clamp-2 hover:text-primary transition"
                          >
                            {item.message}
                          </button>

                          {/* <p className="mt-2 text-xs text-primary font-medium">
                            Klik untuk melihat selengkapnya
                          </p> */}
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= item.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleUpdateStatus(
                              item.id,
                              e.target.value
                            )
                          }
                          className={`rounded-xl border px-3 py-2 text-sm font-medium outline-none ${getStatusColor(
                            item.status
                          )}`}
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Dipelajari">
                            Dipelajari
                          </option>

                          <option value="Selesai">
                            Selesai
                          </option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-slate-500">
                        {new Date(
                          item.created_at
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              setSelectedFeedback(item)
                            }
                            className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                          >
                            <Eye className="h-5 w-5" />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            className="rounded-xl border border-red-200 p-2 text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-16 text-center text-slate-500">
              Memuat feedback...
            </div>
          )}

          {/* Empty */}
          {!loading &&
            filteredFeedbacks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <MessageSquareMore className="mb-4 h-14 w-14 text-slate-300" />

                <h3 className="text-lg font-semibold text-slate-700">
                  Feedback tidak ditemukan
                </h3>

                <p className="mt-2 text-slate-500">
                  Coba gunakan kata kunci atau filter
                  lainnya.
                </p>
              </div>
            )}
        </div>
      </div>

      {/* MODAL DETAIL */}
      {selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Detail Feedback
                </h2>

                <p className="mt-1 text-slate-500">
                  Informasi lengkap feedback pengguna
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedFeedback(null)
                }
                className="rounded-xl p-2 transition hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div>
                <p className="mb-1 text-sm text-slate-500">
                  Nama Pengguna
                </p>

                <h3 className="font-semibold text-slate-800">
                  {selectedFeedback.username}
                </h3>
              </div>

              <div>
                <p className="mb-1 text-sm text-slate-500">
                  Email
                </p>

                <h3 className="font-semibold text-slate-800">
                  {selectedFeedback.email}
                </h3>
              </div>

              <div>
                <p className="mb-1 text-sm text-slate-500">
                  Kategori
                </p>

                <div className="inline-flex rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                  {selectedFeedback.category}
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm text-slate-500">
                  Saran
                </p>

                <h3 className="font-semibold text-slate-800">
                  {selectedFeedback.suggestion}
                </h3>
              </div>

              <div>
                <p className="mb-1 text-sm text-slate-500">
                  Pesan Lengkap
                </p>

                <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                  {selectedFeedback.message}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-slate-500">
                  Rating
                </p>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= selectedFeedback.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl p-6 mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800">
              Detail Pesan
            </h3>

            <button
              onClick={closeMessageModal}
              className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 transition"
            >
              ✕
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            <p className="whitespace-pre-wrap text-slate-600 leading-relaxed">
              {selectedMessage || "Tidak ada pesan"}
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={closeMessageModal}
              className="rounded-xl bg-primary px-5 py-2 text-white hover:opacity-90 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
    
    
);
}

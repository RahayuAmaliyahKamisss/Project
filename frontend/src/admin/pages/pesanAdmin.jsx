import { useState } from "react";
import { Search, Eye, Trash2, Mail, User, MessageSquare } from "lucide-react";

export default function AdminKelolaPesan() {
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      nama: "Ahmad Fauzi",
      email: "ahmad@email.com",
      pesan:
        "Saya ingin mengetahui informasi lebih lengkap mengenai destinasi Curug Cikaso dan jam operasionalnya.",
      tanggal: "01 Mei 2026",
      status: "Belum Dibaca",
    },
    {
      id: 2,
      nama: "Siti Rahma",
      email: "siti@email.com",
      pesan:
        "Website sangat membantu, namun saya ingin ada fitur booking wisata secara langsung.",
      tanggal: "30 April 2026",
      status: "Sudah Dibaca",
    },
    {
      id: 3,
      nama: "Budi Santoso",
      email: "budi@email.com",
      pesan:
        "Apakah tersedia informasi wisata keluarga dengan fasilitas anak-anak di Sukabumi?",
      tanggal: "29 April 2026",
      status: "Belum Dibaca",
    },
  ]);

  const handleDelete = (id) => {
    setMessages(messages.filter((item) => item.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleView = (message) => {
    setSelectedMessage(message);

    setMessages((prev) =>
      prev.map((item) =>
        item.id === message.id
          ? { ...item, status: "Sudah Dibaca" }
          : item
      )
    );
  };

  const filteredMessages = messages.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Kelola Pesan
            </h1>
            <p className="text-slate-500 mt-1">
              Manajemen pesan, saran, dan pertanyaan dari pengguna sistem
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
            <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">Total Pesan</p>
              <p className="text-xl font-bold text-slate-800">{messages.length}</p>
            </div>
            <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">Belum Dibaca</p>
              <p className="text-xl font-bold text-slate-800">
                {messages.filter((m) => m.status === "Belum Dibaca").length}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-slate-100 text-slate-700 text-sm">
                <tr>
                  <th className="text-left px-6 py-4">No</th>
                  <th className="text-left px-6 py-4">Nama</th>
                  <th className="text-left px-6 py-4">Email</th>
                  <th className="text-left px-6 py-4">Pesan</th>
                  <th className="text-left px-6 py-4">Tanggal</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-center px-6 py-4">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredMessages.map((item, index) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {item.nama}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.email}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                      {item.pesan}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.tanggal}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "Belum Dibaca"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleView(item)}
                          className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Detail */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800">
                  Detail Pesan
                </h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-slate-400 hover:text-slate-700 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-700">
                  <User size={18} />
                  <span>{selectedMessage.nama}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-700">
                  <Mail size={18} />
                  <span>{selectedMessage.email}</span>
                </div>

                <div className="flex items-start gap-3 text-slate-700">
                  <MessageSquare size={18} className="mt-1" />
                  <p className="leading-relaxed">{selectedMessage.pesan}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { wisata } from "../data/dataHero";
import CardDestinasi from "./CardDestinasi";
import { Search } from "lucide-react";

export default function BerandaWisata() {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");

  const navigate = useNavigate();

  const kategoriList = [
    "Semua",
    "Pantai",
    "Gunung",
    "Air Terjun",
    "Danau",
    "Geopark",
    "Wisata Alam",
    "Edukasi"
  ];

  const filteredData = wisata.filter((item) => {
    const matchSearch = item.nama
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchKategori =
      kategori === "Semua" || item.kategori === kategori;

    return matchSearch && matchKategori;
  });

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen">
      
      {/* HERO */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
        >
          Jelajahi <span className="text-blue-600">Wisata Kecamatan Ciemas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 max-w-2xl mx-auto text-lg"
        >
          Temukan destinasi wisata terbaik dengan pengalaman modern, cepat,
          dan berbasis teknologi AI.
        </motion.p>
      </section>

      {/* SEARCH */}
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex justify-center">
          <div className="flex items-center w-full md:w-1/2 bg-white rounded-xl shadow-md px-4 py-2 border focus-within:ring-2 focus-within:ring-blue-500">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari destinasi..."
              className="w-full px-3 py-2 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* GRID DESTINASI */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <CardDestinasi key={index} item={item} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Tidak ada destinasi ditemukan.
            </p>
          )}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Siap Berpetualang?
        </h2>
        <p className="text-gray-600 mb-6">
          Temukan pengalaman wisata terbaikmu sekarang juga.
        </p>
        <button
          onClick={() => navigate("/destinasi")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg transition"
        >
          Mulai Jelajah
        </button>
      </section>

    </div>
  );
}
import { MapPin, Star } from "lucide-react";

export default function HomeDestinasi({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden group">
      
      {/* Image */}
      <div className="relative">
        <img
          src={item.gambar}
          className="w-full h-48 object-cover group-hover:scale-105 transition"
        />

        Badge rating
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-sm flex items-center gap-1 shadow">
          <Star size={14} className="text-yellow-500" />
          {item.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-blue-600 mb-1">
          {item.nama}
        </h3>

        <div className="flex items-center text-sm text-gray-500 gap-1 mb-3">
          <MapPin size={14} /> {item.lokasi}
        </div>

        {/* Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Lihat Detail
        </button>
      </div>
    </div>
  );
}
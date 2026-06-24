import { MapPin, Star } from "lucide-react";

export default function CardPreview({ item }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
      <img src={item.gambar} className="w-full h-32 object-cover" />

      <div className="p-3">
        <h3 className="text-sm font-semibold text-blue-600">
          {item.nama}
        </h3>

        <div className="flex items-center text-xs text-gray-500 gap-1">
          <MapPin size={12} /> {item.lokasi}
        </div>

        <div className="flex items-center text-yellow-500 text-xs mt-1">
          <Star size={12} /> {item.rating}
        </div>
      </div>
    </div>
  );
}
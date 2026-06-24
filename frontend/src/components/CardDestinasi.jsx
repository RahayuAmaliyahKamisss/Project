// import { MapPin, Star } from "lucide-react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function CardDestinasi({ item }) {
//   const navigate = useNavigate();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden group border border-gray-100"
//     >
//       {/* Image */}
//       <div className="relative overflow-hidden">
//         <img
//           src={item.gambar}
//           alt={item.nama}
//           className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
//       </div>

//       {/* Content */}
//       <div className="p-5">
//         <h3 className="font-semibold text-lg text-gray-800 mb-1 group-hover:text-blue-600 transition">
//           {item.nama}
//         </h3>

//         <div className="flex items-center text-sm text-gray-500 gap-1 mb-4">
//           <MapPin size={14} className="text-blue-500" />
//           <span>{item.lokasi}</span>
//         </div>

//         {/* Button */}
//         <button
//           onClick={() => navigate(`/destinasi/${item.id}`)}
//           className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-xl font-medium tracking-wide hover:scale-[1.02] active:scale-95 transition-all shadow-md hover:shadow-lg"
//         >
//           Lihat Detail
//         </button>
//       </div>
//     </motion.div>
//   );
// }



import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CardDestinasi({ item }) {
  const navigate = useNavigate();

  // fungsi ubah nama jadi slug (contoh: "Cikidang" -> "cikidang")
  const toSlug = (text) =>
    text.toLowerCase().replace(/\s+/g, "-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden group border border-gray-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={item.gambar}
          alt={item.nama}
          className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-800 mb-1 group-hover:text-blue-600 transition">
          {item.nama}
        </h3>

        <div className="flex items-center text-sm text-gray-500 gap-1 mb-4">
          <MapPin size={14} className="text-blue-500" />
          <span>{item.lokasi}</span>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate(`/kecamatan/${toSlug(item.nama)}`)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-xl font-medium tracking-wide hover:scale-[1.02] active:scale-95 transition-all shadow-md hover:shadow-lg"
        >
          Lihat Detail
        </button>
      </div>
    </motion.div>
  );
}
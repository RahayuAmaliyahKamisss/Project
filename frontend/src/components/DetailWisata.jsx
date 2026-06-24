import { useParams } from "react-router-dom";
import { wisata } from "../data/dataHero";

export default function DetailWisata() {
  const { nama } = useParams();

  const data = wisata.find(
    (item) => item.nama === nama
  );

  if (!data) {
    return <p className="text-center mt-10">Data tidak ditemukan</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      
      <img
        src={data.gambar}
        className="w-full h-[400px] object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{data.nama}</h1>
      <p className="text-gray-500 mb-2">{data.lokasi}</p>
      <p className="text-yellow-500 mb-4">⭐ {data.rating}</p>

      <p className="text-gray-700 leading-relaxed">
        {data.deskripsi}
      </p>
    </div>
  );
}
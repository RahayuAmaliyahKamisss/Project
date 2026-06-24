import heroImage from "../assets/hero.jpg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <img
        src={heroImage}
        className="w-full h-[400px] object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex flex-col justify-center px-16">
        <h1 className="text-white text-4xl font-bold mb-4">
          Wisata Alam Kecamatan Ciemas
        </h1>
        <p className="text-white mb-6">
          Temukan destinasi terbaik dengan mudah
        </p>
        <button
          onClick={() => navigate("/destinasi")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg w-48 hover:bg-blue-700 shadow-lg transition"
        >
          Eksplor Sekarang
        </button>
      </div>
    </div>
  );
}
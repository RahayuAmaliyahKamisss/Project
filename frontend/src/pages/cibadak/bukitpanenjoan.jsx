import { MapPin, Star } from "lucide-react";
import panenjoan2 from "../../assets/panenjoan2.jpg"
import panenjoan from "../../assets/panenjoan.webp"
import panenjoan1 from "../../assets/panenjoan1.jpg"
import panenjoan3 from "../../assets/panenjoan3.jpg"

const Bukitpanenjoan = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HERO IMAGE */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={panenjoan2}
          alt="Situ Cibadak"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">
            Bukit Panenjoan
          </h1>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <MapPin size={16} />
            <span>Cibadak, Sukabumi</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* LEFT CONTENT */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Tentang Wisata
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Bukit Panenjoan Cibadak di Desa Tenjojaya, Sukabumi, adalah
              destinasi wisata alam tersembunyi yang menawarkan pemandangan
              pektakuler deretan perbukitan, hamparan hijau, dan lautan awan. 
            </p>

            <p className="text-gray-600 leading-relaxed">
              Tempat ini populer sebagai lokasi healing gratis
              dengan udara sejuk, panorama kota Cibadak dari ketinggian,
              dan jembatan kayu yang fotogenik.
            </p>
          </div>

          {/* RIGHT INFO CARD */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Informasi
            </h2>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Lokasi</span>
                <span className="font-medium text-gray-800">
                  Cibadak
                </span>
              </div>

              {/* <div className="flex justify-between">
                <span>Rating</span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} /> 4.5
                </span>
              </div> */}

              <div className="flex justify-between">
                <span>Fasilitas</span>
                <span className="font-medium text-gray-800">
                  Mushola
                </span>
              </div>

              <div className="flex justify-between">
                <span>Jam Buka</span>
                <span className="font-medium text-gray-800">
                  08.00 - 17.00
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tiket</span>
                <span className="font-medium text-gray-800">
                  Rp 10.000
                </span>
              </div>
            </div>

            {/* BUTTON
            <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl hover:scale-105 transition">
              Kunjungi Sekarang
            </button> */}
          </div>
        </div>

        {/* GALERI */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Galeri
          </h2>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            <img
              src={panenjoan}
              alt="kuya"
              className="rounded-xl object-cover w-full h-48"
            />
            <img
              src={panenjoan1}
              className="rounded-xl object-cover w-full h-48"
            />
            <img
              src={panenjoan3}
              className="rounded-xl object-cover w-full h-48"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bukitpanenjoan;
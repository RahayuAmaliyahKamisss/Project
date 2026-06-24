import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {
  MapPin,
  Star,
  Clock3,
  Ticket,
  Search,
  ImageOff,
   X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function DestinasiUser() {
  const [destinations, setDestinations] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [selectedDestination, setSelectedDestination] =
  useState(null);

  const [selectedImage, setSelectedImage] = useState(0);

  // =========================
  // FETCH DESTINATIONS
  // =========================
  const fetchDestinations = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/destinations"
      );

      if (response.data.success) {
        setDestinations(response.data.data);
        setFilteredData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    fetchDestinations();
  }, []);

  // =========================
  // SEARCH
  // =========================
  useEffect(() => {
    const filtered = destinations.filter((item) => {
      return (
        item.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.location
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredData(filtered);
  }, [search, destinations]);

  // =========================
  // FORMAT PRICE
  // =========================
  const formatPrice = (price) => {
    if (!price) return "Gratis";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-800 md:text-4xl">
              Destinasi Wisata
            </h1>

            <p className="mt-3 text-slate-500">
              Temukan berbagai destinasi wisata menarik yang
              tersedia di GeoExplore.
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Cari destinasi wisata..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-700 outline-none transition focus:border-blue-600 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* LOADING */}
        {loading && (
          <div className="py-20 text-center text-slate-500">
            Memuat destinasi...
          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          filteredData.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <ImageOff className="mb-4 h-16 w-16 text-slate-300" />

              <h2 className="text-xl font-semibold text-slate-700">
                Destinasi tidak ditemukan
              </h2>

              <p className="mt-2 text-slate-500">
                Coba gunakan kata kunci lain.
              </p>
            </div>
          )}

        {/* GRID */}
        {!loading &&
          filteredData.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredData.map((item) => {
                let images = [];

                  try {
                    images =
                      typeof item.images === "string"
                        ? JSON.parse(item.images)
                        : item.images || [];
                  } catch {
                    images = [];
                  }

                const image =
                images.length > 0
                  ? `http://localhost:3000${images[0].image_url}`
                  : null;

                return (
                  <div
  key={item.id}
  className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/40"
>
  {/* IMAGE */}
  <div className="relative h-60 w-full flex-shrink-0 overflow-hidden bg-slate-100">
    {image ? (
      <img
        src={image}
        alt={item.name}
        className="h-full w-full object-cover transition duration-300 hover:scale-105"
      />
    ) : (
      <div className="flex h-full items-center justify-center">
        <ImageOff className="h-12 w-12 text-slate-300" />
      </div>
    )}

    {/* CATEGORY */}
    {/* <div className="absolute left-4 top-4 rounded-xl bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
      {item.category || "Wisata"}
    </div> */}
  </div>

  {/* BODY */}
  <div className="flex flex-1 flex-col p-5">
    {/* TITLE */}
    <div className="min-h-[70px]">
      <h2 className="line-clamp-1 text-lg font-bold text-slate-800">
        {item.name}
      </h2>

      <div className="mt-2 flex items-start gap-2 text-sm text-slate-500">
        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />

        <span className="line-clamp-2">
          {item.regency}, {item.province}
        </span>
      </div>
    </div>

    {/* DESCRIPTION
    <div className="mt-3 min-h-[72px]">
      <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
        {item.description}
      </p>
    </div> */}

    {/* INFO
    <div className="mt-5 grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="mb-1 flex items-center gap-2 text-slate-500">
          <Ticket className="h-4 w-4" />

          <span className="text-xs">
            Harga Tiket
          </span>
        </div>

        <p className="line-clamp-1 text-sm font-semibold text-slate-800">
          {formatPrice(item.ticket_price)}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="mb-1 flex items-center gap-2 text-slate-500">
          <MapPin className="h-4 w-4" />

          <span className="text-xs">
            Lokasi
          </span>
        </div>

        <p className="text-sm font-semibold text-slate-800">
          {item.district || "0"}
        </p>
      </div>
    </div> */}

    {/* OPEN HOURS
    <div className="mt-4 min-h-[74px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
      <div className="flex items-start gap-2">
        <Clock3 className="mt-0.5 h-4 w-4 flex-shrink-0" />

        <span className="line-clamp-2">
          {item.opening_hours ||
            "Jam operasional belum tersedia"}
        </span>
      </div>
    </div> */}

    {/* BUTTON */}
    <button
      onClick={() =>
        navigate(`/destinasi/${item.id}`)
      }
      className="mt-auto pt-5"
    >
      <div className="w-full rounded-2xl bg-blue-800 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-600">
        Lihat Detail
      </div>
    </button>
  </div>
</div>
                );
              })}
            </div>
          )}
      </div>




      {/* DETAIL MODAL */}
{selectedDestination && (
  <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
    <div className="mx-auto max-w-5xl rounded-3xl bg-white">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {selectedDestination.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-slate-500">
            <MapPin className="h-4 w-4" />

            <span>
              {selectedDestination.location}
            </span>
          </div>
        </div>

        <button
          onClick={() =>
            setSelectedDestination(null)
          }
          className="rounded-2xl border border-slate-200 p-2 transition hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 p-5 lg:grid-cols-2">
        {/* LEFT */}
        <div>
          {(() => {
            let images = [];

            try {
              images = JSON.parse(
                selectedDestination.images || "[]"
              );
            } catch {
              images = [];
            }

            const currentImage =
              images[selectedImage];

            return (
              <>
                {/* MAIN IMAGE */}
                <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                  {currentImage ? (
                    <img
                      src={`http://localhost:3000/${currentImage}`}
                      alt={
                        selectedDestination.name
                      }
                      className="h-[350px] w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-[350px] items-center justify-center">
                      <ImageOff className="h-14 w-14 text-slate-300" />
                    </div>
                  )}

                  {/* NAVIGATION */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImage((prev) =>
                            prev === 0
                              ? images.length - 1
                              : prev - 1
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <button
                        onClick={() =>
                          setSelectedImage((prev) =>
                            prev ===
                            images.length - 1
                              ? 0
                              : prev + 1
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* THUMBNAIL */}
                {images.length > 1 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setSelectedImage(index)
                        }
                        className={`overflow-hidden rounded-2xl border-2 ${
                          selectedImage === index
                            ? "border-blue-600"
                            : "border-slate-200"
                        }`}
                      >
                        <img
                          src={`http://localhost:3000/${img}`}
                          alt=""
                          className="h-20 w-24 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>

        {/* RIGHT */}
        <div>
          {/* CATEGORY */}
          <div className="mb-4 inline-flex rounded-2xl bg-blue-600/10 px-4 py-2 text-sm font-semibold text-blue-600">
            {selectedDestination.category}
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-bold text-slate-800">
              Deskripsi
            </h3>

            <p className="leading-relaxed text-slate-600">
              {selectedDestination.description}
            </p>
          </div>

          {/* INFO */}
         <div className="mt-5 grid grid-cols-2 gap-3">
          {/* HARGA TIKET */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Ticket className="h-4 w-4" />

              <span className="text-xs">
                Harga Tiket
              </span>
            </div>

            <p className="line-clamp-1 text-sm font-semibold text-slate-800">
              {formatPrice(item.ticket_price)}
            </p>
          </div>

          {/* LOKASI */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <MapPin className="h-4 w-4" />

              <span className="text-xs">
                Lokasi
              </span>
            </div>

            <p className="line-clamp-2 text-sm font-semibold text-slate-800">
              {item.district || "-"}
            </p>
          </div>
        </div>

          {/* OPEN HOURS */}
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <Clock3 className="h-4 w-4" />

              <span className="text-sm">
                Jam Operasional
              </span>
            </div>

            <p className="font-semibold text-slate-800">
              {selectedDestination.open_hours ||
                "Belum tersedia"}
            </p>
          </div>

          {/* FACILITIES */}
          {selectedDestination.facilities && (
            <div className="mt-6">
              <h3 className="mb-3 text-lg font-bold text-slate-800">
                Fasilitas
              </h3>

              <div className="flex flex-wrap gap-2">
                {selectedDestination.facilities
                  .split(",")
                  .map((facility, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700"
                    >
                      {facility.trim()}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
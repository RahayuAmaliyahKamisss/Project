import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
  MapPin,
  Clock3,
  Ticket,
  ArrowLeft,
  ImageOff,
  ChevronLeft,
  ChevronRight,
  Camera,
} from "lucide-react";

export default function DestinasiDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] =
    useState(0);

  // =========================
  // FETCH DETAIL
  // =========================
  const fetchDetail = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3000/api/destinations/${id}`
      );

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

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

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Memuat detail destinasi...
      </div>
    );
  }

  // =========================
  // NO DATA
  // =========================
  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Destinasi tidak ditemukan
      </div>
    );
  }

  // =========================
  // IMAGES
  // =========================
  const images = data.images || [];

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">

          {/* <button
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />

            Kembali
          </button> */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {data.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-5 text-slate-500">

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />

                  <span>
                    {data.regency},{" "}
                    {data.province}
                  </span>
                </div>

              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 text-primary">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5" />

                <span className="font-semibold">
                  {images.length} Foto
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">

        <div className="grid gap-8 lg:grid-cols-2">

          {/* LEFT */}
          <div>

            {/* MAIN IMAGE */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">

              {images.length > 0 ? (
                <img
                  src={`http://localhost:3000${images[selectedImage].image_url}`}
                  alt={data.name}
                  className="h-[450px] w-full object-cover transition-all duration-300"
                />
              ) : (
                <div className="flex h-[450px] items-center justify-center bg-slate-100">
                  <ImageOff className="h-16 w-16 text-slate-300" />
                </div>
              )}

              {/* NAVIGATION */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 backdrop-blur transition hover:scale-105"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 backdrop-blur transition hover:scale-105"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* THUMBNAIL SLIDER */}
            {images.length > 1 && (
              <div className="relative mt-4">

                {/* LEFT BUTTON */}
                <button
                  onClick={() => {
                    document
                      .getElementById("thumbnail-slider")
                      ?.scrollBy({
                        left: -300,
                        behavior: "smooth",
                      });
                  }}
                  className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* RIGHT BUTTON */}
                <button
                  onClick={() => {
                    document
                      .getElementById("thumbnail-slider")
                      ?.scrollBy({
                        left: 300,
                        behavior: "smooth",
                      });
                  }}
                  className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* THUMBNAIL CONTAINER */}
                <div
                  id="thumbnail-slider"
                  className="flex gap-3 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                >

                  {images.map((img, index) => (
                    <button
                      key={img.id || index}
                      onClick={() =>
                        setSelectedImage(index)
                      }
                      className={`flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
                        selectedImage === index
                          ? "border-primary scale-95"
                          : "border-slate-200"
                      }`}
                    >
                      <img
                        src={`http://localhost:3000${img.image_url}`}
                        alt=""
                        className="h-24 w-32 object-cover"
                      />
                    </button>
                  ))}

                </div>
              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {/* DESCRIPTION */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6">

              <h2 className="mb-4 text-xl font-bold text-slate-800">
                Deskripsi
              </h2>

              <p className="leading-relaxed text-slate-600">
                {data.description}
              </p>

            </div>

            {/* INFO GRID */}
            <div className="grid gap-4 sm:grid-cols-2">

              <InfoCard
                icon={<Ticket className="h-4 w-4" />}
                title="Harga Tiket"
                value={formatPrice(
                  data.ticket_price
                )}
              />

              <InfoCard
                icon={<Clock3 className="h-4 w-4" />}
                title="Jam Operasional"
                value={
                  data.opening_hours || "-"
                }
              />

              <InfoCard
                icon={<MapPin className="h-4 w-4" />}
                title="Lokasi"
                value={`${data.village}, ${data.district}`}
              />

              {/* <InfoCard
                icon={<MapPin className="h-4 w-4" />}
                title="Kabupaten"
                value={`${data.regency}, ${data.province}`}
              /> */}

            </div>

            {/* FACILITIES */}
            {data.facilities && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6">

                <h2 className="mb-4 text-xl font-bold text-slate-800">
                  Fasilitas
                </h2>

                <div className="flex flex-wrap gap-3">

                  {data.facilities
                    .split(",")
                    .map((item, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {item.trim()}
                      </div>
                    ))}

                </div>
              </div>
            )}

            {/* ADDRESS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6">

              <h2 className="mb-3 text-xl font-bold text-slate-800">
                Alamat Lengkap
              </h2>

              <p className="leading-relaxed text-slate-600">
                {data.address}
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// =========================
// INFO CARD
// =========================
function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-primary/30">

      <div className="mb-3 flex items-center gap-2 text-slate-500">
        {icon}

        <span className="text-sm font-medium">
          {title}
        </span>
      </div>

      <p className="text-sm font-semibold leading-relaxed text-slate-800">
        {value}
      </p>

    </div>
  );
}
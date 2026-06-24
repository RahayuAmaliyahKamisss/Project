import { useEffect, useState } from "react";
import axios from "axios";

import {
  MapPin,
  Mountain,
  Trees,
  Camera,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function HomePage() {
  const [destinations, setDestinations] =
    useState([]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/destinations"
      );

      if (response.data.success) {
        setDestinations(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">

        <img
          src={
            destinations?.[0]?.images?.[0]?.image_url
              ? `http://localhost:3000${destinations[0].images[1].image_url}`
              : "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          }
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-4xl text-center text-white">

            {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 backdrop-blur">
              <Mountain className="h-4 w-4" />

              Wisata Alam Geopark Ciemas
            </div> */}

            <h1 className="text-5xl font-bold md:text-7xl">
              Jelajahi Keindahan
              <br />
              GeoExplore
            </h1>

            <p className="mt-6 text-lg text-white/90">
              Temukan destinasi wisata alam terbaik
              dengan panorama pegunungan, air
              terjun, pantai, dan keindahan lainnya  di
              Kecamatan Ciemas.
            </p>

              <button onClick={() => (window.location.href = "/destinasi")} className="mt-12 rounded-2xl bg-blue-700 px-8 py-4 font-semibold text-white transition hover:opacity-90 hover:cursor-pointer">
                Jelajahi Sekarang
              </button>

          </div>
        </div>
      </section>

      {/* DESTINASI UNGGULAN */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="mb-12 text-center">

          <h2 className="text-4xl font-bold text-slate-800">
            Destinasi Unggulan
          </h2>

          <p className="mt-3 text-slate-500">
            Geser untuk melihat destinasi wisata
          </p>

        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
          }}
          loop={true}
          spaceBetween={25}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {destinations.map((item) => (
            <SwiperSlide key={item.id}>

              <div className="group relative overflow-hidden rounded-3xl">

                <img
                  src={
                    item.images?.[0]?.image_url
                      ? `http://localhost:3000${item.images[0].image_url}`
                      : "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                  }
                  alt=""
                  className="h-[450px] w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

                  {/* <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium">
                    Wisata Alam
                  </span> */}

                  <h3 className="mt-3 text-2xl font-bold">
                    {item.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-white/80">
                    <MapPin className="h-4 w-4" />
                    {item.regency},{" "}
                    {item.province}
                  </div>

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* STATISTIK */}
      <section className="bg-slate-50 py-20">

        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <Trees className="mx-auto mb-4 h-10 w-10 text-primary" />

            <h3 className="text-4xl font-bold">
              {destinations.length}+
            </h3>

            <p className="mt-2 text-slate-500">
              Destinasi Wisata
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <Camera className="mx-auto mb-4 h-10 w-10 text-primary" />

            <h3 className="text-4xl font-bold">
              100+
            </h3>

            <p className="mt-2 text-slate-500">
              Spot Foto Alam
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <Mountain className="mx-auto mb-4 h-10 w-10 text-primary" />

            <h3 className="text-4xl font-bold">
              Sukabumi
            </h3>

            <p className="mt-2 text-slate-500">
              Destinasi Alam Terbaik
            </p>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          <div>

            {/* <span className="rounded-full bg-primary/10 px-4 py-2 font-medium text-primary">
              Tentang GeoExplore
            </span> */}

            <h2 className="mt-6 text-4xl font-bold text-slate-800">
              Platform Informasi Wisata Alam
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              GeoExplore merupakan platform
              informasi destinasi wisata alam yang
              menyediakan informasi seperti lokasi,
              nama destinasi, fasilitas, harga tiket, jam
              operasional dan galeri wisata dalam
              satu tempat.
            </p>

          </div>

          <img
            src={
              destinations?.[1]?.images?.[0]
                ?.image_url
                ? `http://localhost:3000${destinations[1].images[0].image_url}`
                : "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            }
            alt=""
            className="h-[500px] w-full rounded-3xl object-cover"
          />

        </div>

      </section>

    </div>
  );
}
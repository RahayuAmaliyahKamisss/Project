import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24">

      {/* WAVE
      <div className="absolute -top-24 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 320"
          className="h-24 w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#2563eb"
            d="M0,224L60,197.3C120,171,240,117,360,112C480,107,600,149,720,170.7C840,192,960,192,1080,165.3C1200,139,1320,85,1380,58.7L1440,32L1440,320L0,320Z"
          />
        </svg>
      </div> */}

      {/* CONTENT */}
      <div className="bg-gradient-to-br from-blue-800 via-blue-800 to-blue-800 text-white">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="flex gap-28 justify-center">

            {/* BRAND */}
            <div className="w-[400px]">
              <h2 className="text-3xl font-bold">
                GeoExplore
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-white">
                Platform informasi wisata alam yang
                membantu wisatawan menemukan destinasi
                terbaik di Kecamatan Ciemas dengan informasi
                lengkap, galeri foto, dan panduan wisata.
              </p>
            </div>

<div className="flex gap-4 items-between md:gap-10 lg:gap-28 justify-between">
            {/* MENU */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Navigasi
              </h3>

              <ul className="space-y-3 text-white">
                <li>
                  <a
                    href="/"
                    className="transition hover:text-blue-600"
                  >
                    Beranda
                  </a>
                </li>

                <li>
                  <a
                    href="/destinasi"
                    className="transition hover:text-blue-600"
                  >
                    Destinasi
                  </a>
                </li>

                <li>
                  <a
                    href="/tentang"
                    className="transition hover:text-blue-600"
                  >
                    Tentang
                  </a>
                </li>

                <li>
                  <a
                    href="/feedback"
                    className="transition hover:text-blue-600"
                  >
                    Feedback
                  </a>
                </li>
              </ul>
            </div>

            {/* KONTAK */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Kontak
              </h3>

              <div className="space-y-4 text-white">

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />

                  <span>
                    Sukabumi, Jawa Barat
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />

                  <span>
                    info@geoexplore.com
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />

                  <span>
                    +62 812 8772 2537
                  </span>
                </div>

              </div>
            </div>

            {/* SOCIAL
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Ikuti Kami
              </h3>

              <p className="mb-5 text-sm text-white">
                Dapatkan informasi wisata terbaru.
              </p>

              <div className="flex gap-3">

                <a
                  href="#"
                  className="rounded-2xl bg-white/10 p-3 backdrop-blur transition hover:bg-white hover:text-blue-600"
                >
                  <Facebook size={20} />
                </a>

                <a
                  href="#"
                  className="rounded-2xl bg-white/10 p-3 backdrop-blur transition hover:bg-white hover:text-blue-600"
                >
                  <Instagram size={20} />
                </a>

                <a
                  href="#"
                  className="rounded-2xl bg-white/10 p-3 backdrop-blur transition hover:bg-white hover:text-blue-600"
                >
                  <Youtube size={20} />
                </a>

              </div>
            </div> */}

          </div>

</div>

          {/* COPYRIGHT */}
          <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white">
            © {new Date().getFullYear()} GeoExplore —
            Explore Nature, Create Memories.
          </div>

        </div>
      </div>
    </footer>
  );
}
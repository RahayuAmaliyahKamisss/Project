import { motion } from "framer-motion";
import {
  Mountain,
  MapPin,
  Compass,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Tentang() {
  const navigate = useNavigate();

  return (
    <section
      id="tentang"
      className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-blue-50 py-28"
    >
      {/* Background Blur */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          {/* <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <Mountain size={16} />
            Geopark Ciletuh-Palabuhanratu
          </span> */}

          <h2 className="mt-6 text-4xl font-bold text-slate-800 md:text-6xl">
            Tentang <span className="text-blue-600">GeoExplore</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            GeoExplore merupakan platform informasi wisata alam yang
            menghadirkan berbagai destinasi unggulan di kawasan
            Kecamatan Ciemas, Kabupaten Sukabumi. Platform ini
            membantu wisatawan menemukan tempat terbaik untuk
            berpetualang, menikmati keindahan alam, dan merencanakan
            perjalanan dengan lebih mudah.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-3xl bg-white p-8 shadow-xl shadow-blue-100">
              <h3 className="mb-5 text-3xl font-bold text-slate-800">
                Menjelajahi Keajaiban Alam Sukabumi
              </h3>

              <p className="mb-5 leading-relaxed text-slate-600">
                Kawasan Geopark Ciletuh-Palabuhanratu dikenal sebagai
                salah satu destinasi geowisata terbaik di Indonesia
                dengan panorama pegunungan, air terjun, pantai, serta
                kekayaan geologi yang mendunia.
              </p>

              <p className="leading-relaxed text-slate-600">
                GeoExplore hadir sebagai media informasi yang
                memudahkan wisatawan menemukan berbagai destinasi
                menarik, mengetahui lokasi, fasilitas, harga tiket,
                serta informasi penting lainnya dalam satu platform.
              </p>
            </div>
          </motion.div>

          {/* Right Cards */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="grid gap-6"
          >
            <FeatureCard
              icon={<MapPin size={26} />}
              title="Destinasi Lengkap"
              desc="Informasi berbagai wisata alam terbaik di kawasan Kecamatan Ciemas, Kabupaten Sukabumi."
              color="bg-blue-100 text-blue-600"
            />

            <FeatureCard
              icon={<Compass size={26} />}
              title="Mudah Dijelajahi"
              desc="Temukan lokasi wisata, harga tiket, dan informasi penting dengan cepat."
              color="bg-cyan-100 text-cyan-600"
            />

            <FeatureCard
              icon={<Leaf size={26} />}
              title="Wisata Berkelanjutan"
              desc="Mendukung promosi wisata alam yang berkelanjutan dan ramah lingkungan."
              color="bg-emerald-100 text-emerald-600"
            />
          </motion.div>
        </div>

        {/* Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-24 rounded-[32px] bg-white p-10 text-center text-white shadow-2xl"
        >
          <h3 className="mb-4 text-3xl font-bold">
            Mengapa Memilih GeoExplore?
          </h3>

          <p className="mx-auto max-w-4xl text-lg leading-relaxed text-blue-50">
            GeoExplore dirancang untuk memberikan pengalaman eksplorasi
            wisata yang lebih praktis, informatif, dan menarik.
            Temukan destinasi alam terbaik, nikmati informasi yang
            lengkap, dan rencanakan perjalanan Anda dengan lebih mudah
            dalam satu platform.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h3 className="mb-5 text-3xl font-bold text-slate-800">
            Siap Menjelajahi Kecamatan Ciemas?
          </h3>

          <p className="mb-8 text-slate-600">
            Temukan destinasi alam terbaik dan mulai petualangan Anda.
          </p>

          <button
            onClick={() => navigate("/destinasi")}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-300 transition hover:-translate-y-1 hover:bg-blue-700"
          >
            Jelajahi Destinasi
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  color,
}) {
  return (
    <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
      >
        {icon}
      </div>

      <h4 className="mb-2 text-xl font-bold text-slate-800">
        {title}
      </h4>

      <p className="leading-relaxed text-slate-600">
        {desc}
      </p>
    </div>
  );
}
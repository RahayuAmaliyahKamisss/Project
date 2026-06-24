export default function NotFoundPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] flex items-center justify-center px-6 py-20">
      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl w-full text-center">

        {/* 404 */}
        <div className="relative inline-block">
          <h1 className="text-[120px] md:text-[220px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-blue-400 to-blue-700 leading-none drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            404
          </h1>

          <div className="absolute inset-0 blur-3xl opacity-30 bg-cyan-400" />
        </div>

        {/* Title */}
        <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white tracking-wide">
          Halaman Tidak Ditemukan
        </h2>

        {/* Description */}
        <p className="mt-5 max-w-2xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed">
          Sistem tidak dapat menemukan halaman yang Anda cari.
          Mungkin halaman telah dipindahkan, dihapus,
          atau URL yang dimasukkan tidak valid.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">
              Kembali ke Beranda
            </span>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/10" />
          </a>

          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 rounded-2xl border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 transition-all duration-300 hover:scale-105"
          >
            Halaman Sebelumnya
          </button>
        </div>

        {/* Floating Card */}
        <div className="mt-16 max-w-xl mx-auto border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>

          <div className="space-y-3 font-mono text-sm md:text-base">
            <p className="text-cyan-300">
              ERROR_CODE: 404_NOT_FOUND
            </p>

            <p className="text-gray-300">
              Request failed while trying to access resource.
            </p>

            <p className="text-gray-500">
              Please return to the main system dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

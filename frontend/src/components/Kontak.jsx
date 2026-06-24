// export default function Kontak() {
//   return (
//     <div id="kontak" className="mt-16 px-10 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">Kontak Kami</h2>

//       <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
//         <input
//           type="text"
//           placeholder="Nama"
//           className="w-full border rounded-lg px-4 py-2 outline-none"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border rounded-lg px-4 py-2 outline-none"
//         />
//         <textarea
//           placeholder="Pesan"
//           className="w-full border rounded-lg px-4 py-2 outline-none h-32"
//         ></textarea>
//         <button className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full">
//           Kirim Pesan
//         </button>
//       </div>
//     </div>
//   );
// }


import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function Kontak() {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Pesan berhasil dikirim!");
  };

  return (
    <section
      id="kontak"
      className="bg-gradient-to-b from-white via-blue-50 to-white py-24 px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Hubungi <span className="text-blue-600">Kami</span>
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Punya pertanyaan, saran, atau ingin bekerja sama? Tim kami siap
            membantu Anda. Kirimkan pesan melalui form ini dan kami akan
            merespon secepat mungkin.
          </p>

          <div className="space-y-4 text-gray-600">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" />
              <span>support@wisalaksu.com</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="text-blue-600" />
              <span>Customer Service 24/7</span>
            </div>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-100"
        >
          {/* Nama */}
          <div className="mb-5 relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              name="nama"
              placeholder="Nama Lengkap"
              value={form.nama}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5 relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Pesan */}
          <div className="mb-6 relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
            <textarea
              name="pesan"
              placeholder="Tulis pesan Anda..."
              value={form.pesan}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition h-32 resize-none"
              required
            ></textarea>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition"
          >
            <Send size={18} /> Kirim Pesan
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

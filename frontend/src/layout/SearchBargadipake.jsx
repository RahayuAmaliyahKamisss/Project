import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative -mt-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-4 flex gap-3 w-[60%]">
        <div className="flex items-center gap-2 border px-3 rounded-lg w-full">
          <Search size={18} />
          <input
            type="text"
            placeholder="Cari wisata..."
            className="outline-none w-full"
          />
        </div>
        <select className="border px-3 rounded-lg">
          <option>Semua</option>
          <option>Pantai</option>
          <option>Gunung</option>
          <option>Air Terjun</option>
        </select>
        <button className="bg-blue-600 text-white px-6 rounded-lg">
          Cari
        </button>
      </div>
    </div>
  );
}
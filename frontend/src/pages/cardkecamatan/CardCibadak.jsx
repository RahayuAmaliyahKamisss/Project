import { useNavigate } from "react-router-dom";
import panenjoan2 from "../../assets/panenjoan2.jpg"

const CardCibadak = () => {
  const navigate = useNavigate();

  const wisataCibadak = [
    {
      id: 1,
      nama: "Bukit Panenjoan",
      lokasi: "Cibadak",
      gambar: panenjoan2,
    },
    
  ];

  // fungsi slug biar URL rapi
  const toSlug = (text) =>
    text.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Grid Card */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {wisataCibadak.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={item.gambar}
                alt={item.nama}
                className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {item.nama}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                {item.lokasi}
              </p>

              <button
                onClick={() =>
                  navigate(`/destinasi/kecamatan/${toSlug(item.nama)}`)
                }
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCibadak;
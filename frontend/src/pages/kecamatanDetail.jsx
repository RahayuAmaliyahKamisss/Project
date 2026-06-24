import { useParams } from "react-router-dom";

export default function KecamatanDetail() {
  const { slug } = useParams();

  // ubah slug jadi nama kecamatan (biar tampil rapi)
  const formatNama = (text) =>
    text
      .split("-")
      .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1))
      .join(" ");

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">
         {formatNama(slug)}
      </h1>

      <p className="text-gray-600">
        Ini adalah halaman detail untuk {formatNama(slug)}.
      </p>
    </div>
  );
}
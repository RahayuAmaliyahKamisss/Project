import CardCibadak from "../cardkecamatan/CardCibadak";

const cibadak = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Detail Kecamatan Cibadak
      </h1>
      <p className="text-gray-600">
        Ini adalah halaman detail untuk Kecamatan Cibadak.
      </p>
        <CardCibadak />
    </div>
  );
};

export default cibadak;
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  MapPinned,
  X,
  Upload,
} from "lucide-react";

export default function DestinasiAdmin() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    village: "",
    district: "",
    regency: "",
    province: "",
    ticket_price: "",
    opening_hours: "",
    facilities: "",
    is_active: 1,
    maps_link: "",
contact_number: "",
  });

  const [images, setImages] = useState([]);

  // ============================
  // FETCH DESTINATIONS
  // ============================
  const fetchDestinations = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/destinations"
      );

      if (response.data.success) {
        setDestinations(response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // ============================
  // HANDLE INPUT
  // ============================
  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]:
      name === "is_active"
        ? Number(value)
        : value,
  }));
};

  // ============================
  // HANDLE IMAGE
  // ============================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages((prev) => [
      ...prev,
      ...previews,
    ]);
  };

  // ============================
  // REMOVE IMAGE
  // ============================
  const removeImage = (index) => {
    const preview = previewImages[index];

    // gambar lama dari database
    if (
      preview.startsWith(
        "http://localhost:3000/uploads"
      )
    ) {
      const imageData = existingImages.find(
        (img) =>
          `http://localhost:3000${img.image_url}` ===
          preview
      );

      if (imageData) {
        setDeletedImages((prev) => [
          ...prev,
          imageData.id,
        ]);
      }
    } else {
      // gambar baru yang belum tersimpan
      const updatedImages = [...images];
      updatedImages.splice(index, 1);

      setImages(updatedImages);
    }

    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);

    setPreviewImages(updatedPreviews);
  };

  // ============================
  // RESET FORM
  // ============================
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      address: "",
      village: "",
      district: "",
      regency: "",
      province: "",
      ticket_price: "",
      opening_hours: "",
      facilities: "",
      is_active: 1,
      maps_link: "",
contact_number: "",
    });

    setImages([]);
    setPreviewImages([]);
    setExistingImages([]);
    setDeletedImages([]);
    setEditingId(null);
  };

  // ============================
  // SUBMIT
  // ============================
  const handleSubmit = async (e) => {
  e.preventDefault();
    console.log("deletedImages", deletedImages);
  try {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append(
      "deletedImages",
      JSON.stringify(deletedImages)
    );

    images.forEach((image) => {
      formData.append("images", image);
    });
// resetForm()
    images.forEach((image) => {
      formData.append("images", image);
    });

    if (editingId) {
      await axios.put(
        `http://localhost:3000/api/destinations/${editingId}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );
    } else {
      await axios.post(
        "http://localhost:3000/api/destinations",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );
    }

    await fetchDestinations();

    setShowModal(false);

    resetForm();

    alert(
      editingId
        ? "Destinasi berhasil diupdate"
        : "Destinasi berhasil ditambahkan"
    );

  } catch (error) {
    console.log(error);

    console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
        "Gagal menyimpan destinasi"
    );
  }
};

  // ============================
  // DELETE
  // ============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus destinasi?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/destinations/${id}`
      );

      fetchDestinations();

    } catch (error) {
      console.log(error);

      alert("Gagal menghapus destinasi");
    }
  };

  // ============================
  // EDIT
  // ============================
  const handleEdit = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/destinations/${id}`
    );

    const data = response.data.data;

    setEditingId(id);

    setForm({
      name: data.name || "",
      description: data.description || "",
      address: data.address || "",
      village: data.village || "",
      district: data.district || "",
      regency: data.regency || "",
      province: data.province || "",
      ticket_price: data.ticket_price || "",
      opening_hours: data.opening_hours || "",
      facilities: data.facilities || "",
      is_active: Number(data.is_active) || 0,
      maps_link: data.maps_link || "",
contact_number: data.contact_number || "",
    });

    // reset image baru
    setImages([]);

    // preview gambar lama
    if (data.images && data.images.length > 0) {
      setExistingImages(data.images);

      setPreviewImages(
        data.images.map(
          (img) =>
            `http://localhost:3000${img.image_url}`
        )
      );
    } else {
      setExistingImages([]);
      setPreviewImages([]);
    }

    setDeletedImages([]);

    setShowModal(true);

  } catch (error) {
    console.log(error);

    alert("Gagal mengambil data destinasi");
  }
};

  // ============================
  // FILTER
  // ============================
  const filteredDestinations = destinations.filter(
    (item) =>
      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            {/* <div className="mb-3 inline-flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-2 text-primary">
              <MapPinned className="h-5 w-5" />

              <span className="text-sm font-semibold">
                Destination Management
              </span>
            </div> */}

            <h1 className="text-3xl font-bold text-slate-800">
              Kelola Destinasi Wisata
            </h1>

            <p className="mt-2 text-slate-500">
              Tambah dan kelola destinasi wisata GeoExplore.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <Plus className="h-5 w-5" />

            Tambah Destinasi
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Cari destinasi..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left">
                    Destinasi
                  </th>

                  <th className="px-6 py-4 text-left">
                    Lokasi
                  </th>

                  <th className="px-6 py-4 text-left">
                    Harga Tiket
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading &&
                  filteredDestinations.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {item.name}
                          </p>

                          <p className="mt-1 max-w-sm line-clamp-2 text-sm text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {item.regency}, {item.province}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-slate-700">
                        Rp {item.ticket_price}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-xl px-3 py-2 text-sm font-medium
                          ${
                            item.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.is_active
                            ? "Aktif"
                            : "Nonaktif"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">

                          <button
                            onClick={() =>
                              handleEdit(item.id)
                            }
                            className="rounded-xl border border-blue-200 p-2 text-blue-600 transition hover:bg-blue-50"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            className="rounded-xl border border-red-200 p-2 text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {loading && (
            <div className="py-16 text-center text-slate-500">
              Memuat data destinasi...
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6">

            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {editingId
                    ? "Edit Destinasi"
                    : "Tambah Destinasi"}
                </h2>

                <p className="mt-1 text-slate-500">
                  Kelola informasi destinasi wisata.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="rounded-xl p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">

                <InputField
                  label="Nama Destinasi"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />

                <InputField
                  label="Harga Tiket"
                  name="ticket_price"
                  value={form.ticket_price}
                  onChange={handleChange}
                />

                <InputField
                  label="Desa"
                  name="village"
                  value={form.village}
                  onChange={handleChange}
                />

                <InputField
                  label="Kecamatan"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                />

                <InputField
                  label="Kabupaten"
                  name="regency"
                  value={form.regency}
                  onChange={handleChange}
                />

                <InputField
                  label="Provinsi"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                />

                <InputField
                  label="Jam Operasional"
                  name="opening_hours"
                  value={form.opening_hours}
                  onChange={handleChange}
                />

                {/* STATUS */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select
                    name="is_active"
                    value={form.is_active}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Nonaktif</option> 
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Alamat
                  </label>

                  <textarea
                    rows={3}
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Deskripsi
                  </label>

                  <textarea
                    rows={5}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Fasilitas
                  </label>

                  <textarea
                    rows={3}
                    name="facilities"
                    value={form.facilities}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                {/* IMAGES */}
                <div className="md:col-span-2">
                  <label className="mb-3 block text-sm font-medium text-slate-700">
                    Upload Gambar
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 transition hover:border-primary">
                    <Upload className="mb-3 h-10 w-10 text-slate-400" />

                    <p className="font-medium text-slate-700">
                      Klik untuk upload gambar
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      PNG, JPG, JPEG
                    </p>

                    <input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {/* PREVIEW */}
                  {previewImages.length > 0 && (
                    <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
                      {previewImages.map((img, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-2xl border border-slate-200"
                        >
                          <img
                            src={img}
                            alt=""
                            className="h-40 w-full object-cover"
                          />

                          {/* DELETE BUTTON */}
                          <button
                            type="button"
                            onClick={() =>
                              removeImage(index)
                            }
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition group-hover:opacity-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* BUTTON */}
              <div className="mt-8 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-2xl border border-slate-200 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
                >
                  {editingId
                    ? "Update Destinasi"
                    : "Simpan Destinasi"}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================
// INPUT COMPONENT
// ============================
function InputField({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:bg-white"
      />
    </div>
  );
}
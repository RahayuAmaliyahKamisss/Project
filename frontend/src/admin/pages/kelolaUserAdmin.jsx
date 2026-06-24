import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  KeyRound,
} from "lucide-react";

export default function AdminUser() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [editId, setEditId] = useState(null);

  const [resetPasswordId, setResetPasswordId] =
    useState(null);

  const [newPassword, setNewPassword] =
    useState("");

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    role: "user",
  });

  // ================= GET USERS =================
  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users"
      );

      setUsers(response.data);
    } catch (error) {
      toast.error("Gagal mengambil user");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:3000/api/users/${editId}`,
          {
            nama: form.nama,
            email: form.email,
            role: form.role,
          }
        );

        toast.success("User berhasil diupdate");
      } else {
        await axios.post(
          "http://localhost:3000/api/users",
          form
        );

        toast.success("User berhasil ditambahkan");
      }

      setOpenModal(false);

      setEditId(null);

      setForm({
        nama: "",
        email: "",
        password: "",
        role: "user",
      });

      getUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Terjadi kesalahan"
      );
    }
  };

  // ================= EDIT =================
  const handleEdit = (user) => {
    setEditId(user.id);

    setForm({
      nama: user.nama,
      email: user.email,
      password: "",
      role: user.role,
    });

    setOpenModal(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus user?")) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/users/${id}`
      );

      toast.success("User berhasil dihapus");

      getUsers();
    } catch (error) {
      toast.error("Gagal menghapus user");
    }
  };

  // ================= RESET PASSWORD =================
  const handleResetPassword = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/users/reset-password/${resetPasswordId}`,
        {
          password: newPassword,
        }
      );

      toast.success("Password berhasil direset");

      setResetPasswordId(null);

      setNewPassword("");
    } catch (error) {
      toast.error("Gagal reset password");
    }
  };

  // ================= FILTER =================
  const filteredUsers = users.filter((user) =>
    user.nama
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-primary">
            Manajemen User
          </h1>

          <p className="text-gray-500 mt-1">
            Kelola data pengguna sistem
          </p>
        </div>

        <button
          onClick={() => {
            setEditId(null);

            setForm({
              nama: "",
              email: "",
              password: "",
              role: "user",
            });

            setOpenModal(true);
          }}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-secondary transition"
        >
          <Plus size={18} />
          Tambah User
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3">
        <Search className="text-gray-400" />

        <input
          type="text"
          placeholder="Cari user..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full outline-none text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">
                No
              </th>

              <th className="text-left px-4 py-3">
                Nama
              </th>

              <th className="text-left px-4 py-3">
                Email
              </th>

              <th className="text-left px-4 py-3">
                Role
              </th>

              <th className="text-center px-4 py-3">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  {index + 1}
                </td>

                <td className="px-4 py-3 font-medium">
                  {user.nama}
                </td>

                <td className="px-4 py-3">
                  {user.email}
                </td>

                <td className="px-4 py-3">
                  {user.role}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        handleEdit(user)
                      }
                      className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() =>
                        setResetPasswordId(user.id)
                      }
                      className="p-2 rounded-lg hover:bg-yellow-100 text-yellow-600"
                    >
                      <KeyRound size={16} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(user.id)
                      }
                      className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl w-full max-w-md">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">
                {editId
                  ? "Edit User"
                  : "Tambah User"}
              </h2>

              <button
                onClick={() =>
                  setOpenModal(false)
                }
              >
                <X />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                type="text"
                name="nama"
                placeholder="Nama"
                value={form.nama}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
                required
              />

              {!editId && (
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                  required
                />
              )}

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="user">
                  User
                </option>

                <option value="admin">
                  Admin
                </option>
              </select>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-xl"
              >
                {editId
                  ? "Update User"
                  : "Tambah User"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RESET PASSWORD MODAL */}
      {resetPasswordId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl w-full max-w-md">

            <h2 className="text-xl font-semibold mb-5">
              Reset Password
            </h2>

            <input
              type="password"
              placeholder="Password baru"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 mb-4"
            />

            <div className="flex gap-3">

              <button
                onClick={() =>
                  setResetPasswordId(null)
                }
                className="w-full border py-3 rounded-xl"
              >
                Batal
              </button>

              <button
                onClick={handleResetPassword}
                className="w-full bg-primary text-white py-3 rounded-xl"
              >
                Reset
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
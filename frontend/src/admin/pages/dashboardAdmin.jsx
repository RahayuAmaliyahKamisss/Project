import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import {
  Users,
  MapPin,
  Image,
  Activity,
} from "lucide-react";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDestinations: 0,
    totalGallery: 0,

    monthlyUsers: [],
    monthlyDestinations: [],

    latestActivities: [],
  });

  // =========================
  // FETCH DASHBOARD
  // =========================
  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/dashboard/stats"
      );

      setStats({
        totalUsers:
          res.data.totalUsers || 0,

        totalDestinations:
          res.data.totalDestinations ||
          0,

        totalGallery:
          res.data.totalGallery || 0,

        monthlyUsers:
          res.data.monthlyUsers || [],

        monthlyDestinations:
          res.data
            .monthlyDestinations || [],

        latestActivities:
          res.data.latestActivities ||
          [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // INIT
  // =========================
  useEffect(() => {
    fetchDashboard();

    const interval = setInterval(() => {
      fetchDashboard();
    }, 5000);

    return () =>
      clearInterval(interval);
  }, []);

  // =========================
  // CARD DATA
  // =========================
  const cards = [
    {
      title: "Total User",
      value: stats.totalUsers,
      icon: Users,
    },

    {
      title: "Destinasi",
      value:
        stats.totalDestinations,
      icon: MapPin,
    },

    {
      title: "Galeri",
      value: stats.totalGallery,
      icon: Image,
    },

    // {
    //   title: "Aktivitas User",
    //   value:
    //     stats.latestActivities
    //       ?.length || 0,
    //   icon: Activity,
    // },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard Admin
        </h1>

        <p className="mt-2 text-slate-500">
          Monitoring data sistem
          GeoExplore secara realtime
        </p>
      </div>

      {/* STATISTIC CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              className="rounded-3xl border border-slate-200 bg-white p-6"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-slate-800">
                    {card.value}
                  </h2>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CHART SECTION */}
      <div className="mt-8 grid gap-5">

        {/* USER CHART */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="rounded-3xl border border-slate-200 bg-white p-6"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              Statistik User
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Pertumbuhan user
              setiap bulan
            </p>
          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart
              data={
                stats.monthlyUsers
              }
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="total"
                radius={[
                  10,
                  10,
                  0,
                  0,
                ]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/*
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="rounded-3xl border border-slate-200 bg-white p-6"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800">
              Statistik Destinasi
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Penambahan
              destinasi tiap bulan
            </p>
          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <LineChart
              data={
                stats.monthlyDestinations
              }
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="total"
                strokeWidth={3}
                dot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        */}
      </div>

      
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="mt-8 rounded-3xl border border-slate-200 bg-white p-6"
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-800">
            Aktivitas User
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Data user terbaru yang
            terdaftar
          </p>
        </div>

        <div className="space-y-4">

          {stats.latestActivities
            ?.length > 0 ? (
            stats.latestActivities.map(
              (user, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      index * 0.1,
                  }}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {user.nama}
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
                    User
                  </div>
                </motion.div>
              )
            )
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-slate-400">
              Belum ada aktivitas
              user
            </div>
          )}

        </div>
      </motion.div>
      
    </div>
  );
}
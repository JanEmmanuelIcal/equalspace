"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Sidebar } from "@/components/sidebar";
import { DashboardCard } from "@/components/dashboard-card";

const activity = [
  { name: "Jan", users: 32, stories: 18 },
  { name: "Feb", users: 42, stories: 22 },
  { name: "Mar", users: 51, stories: 28 },
  { name: "Apr", users: 63, stories: 35 },
  { name: "May", users: 72, stories: 42 }
];

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Admin overview</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Dashboard</h1>
          </div>
          <button className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white">Export report</button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <DashboardCard title="Total users" value="2,481" detail="+12% from last month" tone="violet" />
          <DashboardCard title="Stories submitted" value="138" detail="24 pending" tone="emerald" />
          <DashboardCard title="Poll responses" value="4,620" detail="+9% from last month" tone="sky" />
          <DashboardCard title="Quiz attempts" value="912" detail="65% completion" tone="amber" />
        </div>

        <div className="mt-8 rounded-[30px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">User activity</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activity}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="users" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="stories" fill="#34d399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

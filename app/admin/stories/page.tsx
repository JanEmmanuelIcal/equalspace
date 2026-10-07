import { stories } from "@/lib/data";

export default function AdminStoriesPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden min-h-screen w-72 border-r border-slate-200 bg-slate-50 p-5 lg:block dark:border-slate-800 dark:bg-slate-950" />
      <div className="flex-1 bg-slate-50 p-6 dark:bg-slate-950">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">Moderation</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Stories</h1>
          </div>
          <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">Export</button>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3">Story</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story) => (
                <tr key={story.id} className="border-t border-slate-200 dark:border-slate-800">
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">{story.title}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{story.category}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{story.date}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700 dark:bg-amber-950/30 dark:text-amber-200">
                      {story.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white">Approve</button>
                      <button className="rounded-full bg-rose-500 px-2.5 py-1 text-xs font-semibold text-white">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

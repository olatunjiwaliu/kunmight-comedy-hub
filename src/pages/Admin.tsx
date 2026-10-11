import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { House, VideoCamera, CalendarDots, Star, Plus, Trash, CheckCircle, XCircle, Upload, PencilSimple, SignOut, Eye, Users, Lightning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { getFromStorage, setToStorage, generateId, getVideos, getBookings, getReviews, resetStorage } from "@/data/mockData";
import type { Video, Booking, Review } from "@/types";

export default function Admin() {
  const [tab, setTab] = useState<"videos" | "bookings" | "reviews" | "settings">("videos");
  const [videos, setVideos] = useState<Video[]>(getVideos());
  const [bookings, setBookings] = useState<Booking[]>(getBookings());
  const [reviews, setReviews] = useState<Review[]>(getReviews());
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [videoForm, setVideoForm] = useState({ title: "", description: "", thumbnail: "", videoUrl: "", category: "Comedy Skit", duration: "" });

  const stats = [
    { label: "Total Videos", value: videos.length, icon: VideoCamera, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { label: "Bookings", value: bookings.length, icon: CalendarDots, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Reviews", value: reviews.length, icon: Star, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "Total Views", value: videos.reduce((a, v) => a + v.views, 0).toLocaleString(), icon: Eye, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.videoUrl) {
      toast.error("Title and video URL are required");
      return;
    }
    const newVideo: Video = {
      id: generateId(),
      title: videoForm.title,
      description: videoForm.description || "New video upload",
      thumbnail: videoForm.thumbnail || "https://storage.googleapis.com/dala-prod-public-storage/generated-images/f725ed9b-adcd-4562-ab69-2fb17f83a5d7/hero-bg-bdfd623d-1775850884719.webp",
      videoUrl: videoForm.videoUrl,
      category: videoForm.category as Video["category"],
      duration: videoForm.duration || "1:00",
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      featured: false,
    };
    const updated = [newVideo, ...videos];
    setVideos(updated);
    setToStorage("videos", updated);
    setVideoForm({ title: "", description: "", thumbnail: "", videoUrl: "", category: "Comedy Skit", duration: "" });
    setShowAddVideo(false);
    toast.success("Video uploaded successfully!");
  };

  const handleDeleteVideo = (id: string) => {
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    setToStorage("videos", updated);
    toast.success("Video deleted");
  };

  const handleBookingStatus = (id: string, status: Booking["status"]) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    setToStorage("bookings", updated);
    toast.success(`Booking ${status}`);
  };

  const handleReviewApprove = (id: string) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, approved: !r.approved } : r));
    setReviews(updated);
    setToStorage("reviews", updated);
    toast.success("Review updated");
  };

  const handleReviewDelete = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    setToStorage("reviews", updated);
    toast.success("Review deleted");
  };

  const handleReset = () => {
    resetStorage();
    setVideos(getVideos());
    setBookings(getBookings());
    setReviews(getReviews());
    toast.success("Storage reset to seed data");
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-800 p-4 md:p-6 flex md:flex-col flex-row md:gap-2 gap-1 overflow-x-auto md:overflow-visible">
        <div className="hidden md:flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-lg">K</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Admin Panel</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Kunmightpro Digital</p>
          </div>
        </div>

        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
          <House size={18} /> <span className="hidden md:inline">Back to Site</span>
        </Link>
        {[
          { id: "videos" as const, label: "Videos", icon: VideoCamera },
          { id: "bookings" as const, label: "Bookings", icon: CalendarDots },
          { id: "reviews" as const, label: "Reviews", icon: Star },
          { id: "settings" as const, label: "Settings", icon: PencilSimple },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              tab === item.id ? "bg-emerald-500/10 text-emerald-400" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <item.icon size={18} /> <span className="hidden md:inline">{item.label}</span>
          </button>
        ))}

        <div className="hidden md:block mt-auto pt-8">
          <Button variant="outline" className="w-full border-zinc-800 text-zinc-400 hover:text-white rounded-xl" onClick={handleReset}>
            <Lightning size={16} className="mr-2" /> Reset Data
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
            >
              <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon size={18} className={s.color} />
              </div>
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Videos Tab */}
        <AnimatePresence mode="wait">
          {tab === "videos" && (
            <motion.div key="videos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Manage Videos</h2>
                <Button onClick={() => setShowAddVideo(!showAddVideo)} className="bg-emerald-500 text-zinc-950 font-bold rounded-xl hover:bg-emerald-400">
                  <Plus size={16} className="mr-1" /> Add Video
                </Button>
              </div>

              {showAddVideo && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleAddVideo}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Title *</Label>
                      <Input value={videoForm.title} onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" placeholder="Video title" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Category</Label>
                      <select value={videoForm.category} onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })} className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-md text-white text-sm">
                        <option>Comedy Skit</option>
                        <option>Short Animation</option>
                        <option>Viral Clip</option>
                        <option>Character Series</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Video URL *</Label>
                      <Input value={videoForm.videoUrl} onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" placeholder="https://..." required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Thumbnail URL</Label>
                      <Input value={videoForm.thumbnail} onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" placeholder="https://..." />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Duration</Label>
                      <Input value={videoForm.duration} onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" placeholder="2:30" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Description</Label>
                      <Input value={videoForm.description} onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })} className="bg-zinc-950 border-zinc-800 text-white" placeholder="Brief description" />
                    </div>
                  </div>
                  <Button type="submit" className="bg-emerald-500 text-zinc-950 font-bold rounded-xl hover:bg-emerald-400">
                    <Upload size={16} className="mr-2" /> Upload Video
                  </Button>
                </motion.form>
              )}

              {/* Video List */}
              <div className="space-y-3">
                {videos.map((v) => (
                  <div key={v.id} className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                    <img src={v.thumbnail} alt="" className="w-20 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{v.title}</p>
                      <p className="text-xs text-zinc-500">{v.category} - {v.duration} - {v.views.toLocaleString()} views</p>
                    </div>
                    <button onClick={() => handleDeleteVideo(v.id)} className="p-2 text-zinc-500 hover:text-red-400 transition-colors">
                      <Trash size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "bookings" && (
            <motion.div key="bookings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-white mb-6">Bookings ({bookings.length})</h2>
              {bookings.length === 0 ? (
                <div className="text-center py-16 bg-zinc-900 border border-zinc-800 rounded-2xl">
                  <CalendarDots size={48} weight="duotone" className="text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500">No bookings yet. They will appear here when clients submit.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-white text-sm">{b.name}</p>
                          <p className="text-xs text-zinc-500">{b.email} | {b.whatsapp}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${statusColors[b.status]}`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-300 mb-2">{b.serviceType}</p>
                      {b.notes && <p className="text-xs text-zinc-500 mb-3 italic">{b.notes}</p>}
                      <div className="flex items-center gap-2 text-xs text-zinc-600 mb-3">
                        <CalendarDots size={12} /> {b.date || "No date"} {b.time && `at ${b.time}`}
                      </div>
                      {b.status === "pending" && (
                        <div className="flex gap-2">
                          <button onClick={() => handleBookingStatus(b.id, "approved")} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium hover:bg-emerald-500/20">
                            <CheckCircle size={14} /> Approve
                          </button>
                          <button onClick={() => handleBookingStatus(b.id, "rejected")} className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/20">
                            <XCircle size={14} /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {tab === "reviews" && (
            <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-white mb-6">Review Moderation</h2>
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div key={r.id} className={`bg-zinc-900 border rounded-xl p-4 ${r.approved ? "border-zinc-800" : "border-amber-500/30"}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-white text-sm">{r.author}</p>
                        <Badge variant="secondary" className="text-[10px] bg-zinc-800 text-zinc-400">{r.service}</Badge>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={12} weight={i < r.rating ? "fill" : "regular"} className={i < r.rating ? "text-amber-400" : "text-zinc-700"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">{r.title}</p>
                    <p className="text-xs text-zinc-400 mb-3">{r.text}</p>
                    <div className="flex gap-2">
                      <button onClick={() => handleReviewApprove(r.id)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${r.approved ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"}`}>
                        <CheckCircle size={14} /> {r.approved ? "Hide" : "Approve"}
                      </button>
                      <button onClick={() => handleReviewDelete(r.id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/20">
                        <Trash size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === "settings" && (
            <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-white mb-6">Storage Settings</h2>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
                <div>
                  <p className="text-sm text-zinc-400 mb-2">All data is stored locally in your browser. Use the buttons below to manage your data.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                      <p className="text-sm font-bold text-white mb-1">Videos</p>
                      <p className="text-xs text-zinc-500">{videos.length} videos in storage</p>
                    </div>
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                      <p className="text-sm font-bold text-white mb-1">Bookings</p>
                      <p className="text-xs text-zinc-500">{bookings.length} bookings stored</p>
                    </div>
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                      <p className="text-sm font-bold text-white mb-1">Reviews</p>
                      <p className="text-xs text-zinc-500">{reviews.length} reviews stored</p>
                    </div>
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                      <p className="text-sm font-bold text-white mb-1">Comments</p>
                      <p className="text-xs text-zinc-500">{getFromStorage("comments", []).length} comments stored</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4 border-t border-zinc-800">
                  <Button onClick={handleReset} className="bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 rounded-xl">
                    <Lightning size={16} className="mr-2" /> Reset to Seed Data
                  </Button>
                  <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-white rounded-xl">
                    <SignOut size={16} className="mr-2" /> Clear All Data
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

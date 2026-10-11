import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Lightning, ArrowRight, MagnifyingGlass, VideoCamera, Users, Star } from "@phosphor-icons/react";
import { getVideos, getServices, getReviews, getLikedVideos, setToStorage, getFromStorage } from "@/data/mockData";
import { VideoCard, ServiceCard, ReviewCard, SectionTitle } from "@/components/Cards";
import { VideoPlayerModal } from "@/components/VideoPlayerModal";
import { CreatorBanner } from "@/components/CreatorBadge";
import { Sparkle } from "@phosphor-icons/react";
import type { Video } from "@/types";

export function Home() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [likedVideos, setLikedVideos] = useState<string[]>(getLikedVideos());
  const videos = useMemo(() => getVideos().filter((v) => v.featured).slice(0, 4), []);
  const services = useMemo(() => getServices(), []);
  const reviews = useMemo(() => getReviews().filter((r) => r.approved).slice(0, 3), []);

  const handleLike = (videoId: string) => {
    const updated = likedVideos.includes(videoId)
      ? likedVideos.filter((id) => id !== videoId)
      : [...likedVideos, videoId];
    setLikedVideos(updated);
    setToStorage("likedVideos", updated);
  };

  return (
    <>
      <CreatorBanner />
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/f725ed9b-adcd-4562-ab69-2fb17f83a5d7/hero-bg-bdfd623d-1775850884719.webp"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950" />
        </div>
        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-6">
              <Lightning size={16} weight="fill" />
              Home of Creative Animation & Viral Content
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] max-w-4xl mx-auto"
          >
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400">
              Kunmightpro Digital
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-zinc-400 mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We turn ideas into viral animated comedy skits that millions love to watch.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Link
              to="/videos"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-500 text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play size={18} weight="fill" /> Watch Videos
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-zinc-800 text-white font-bold rounded-xl border border-zinc-700 hover:bg-zinc-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Book a Service <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center justify-center gap-8 mt-16 text-center"
          >
            {[
              { label: "Total Views", value: "8.4M+", icon: VideoCamera },
              { label: "Happy Clients", value: "120+", icon: Users },
              { label: "Avg Rating", value: "4.9", icon: Star },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <s.icon size={20} weight="duotone" className="text-emerald-400 mb-1" />
                <span className="text-2xl font-black text-white">{s.value}</span>
                <span className="text-xs text-zinc-500 mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Studio Promo Band */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/40 p-8 md:p-12"
        >
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-10 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold mb-4">
                <Sparkle size={14} weight="fill" /> Free AI Generation Studio
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Created by Kunmightpro Digital</h3>
              <p className="text-zinc-400 mt-2 max-w-xl">
                Describe your vision and watch our AI bring an animation concept to life in 15 seconds. No signup, instant results, ready to share.
              </p>
            </div>
            <Link
              to="/generate"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-500 text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              Try AI Studio <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Trending Videos */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <SectionTitle title="Trending Now" subtitle="Our most-watched animations this month" />
          <Link to="/videos" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 mb-10">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {videos.map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              isLiked={likedVideos.includes(v.id)}
              onPlay={setActiveVideo}
              onLike={handleLike}
            />
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="container mx-auto px-4 py-20">
        <SectionTitle title="Our Packages" subtitle="From quick social clips to full viral campaigns" centered />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} onBook={() => window.location.href = "/booking"} />
          ))}
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <SectionTitle title="What Clients Say" subtitle="Real reviews from real creators" />
          <Link to="/reviews" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 mb-10">
            All Reviews <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-10 md:p-16 text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 relative">Ready to Go Viral?</h2>
          <p className="text-zinc-400 max-w-lg mx-auto mb-8 relative">Let us create animated content that makes your brand unforgettable.</p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 relative hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Your Project <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      <VideoPlayerModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}

export function Videos() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [likedVideos, setLikedVideos] = useState<string[]>(getLikedVideos());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const allVideos = useMemo(() => getVideos(), []);

  const categories = ["All", "Comedy Skit", "Short Animation", "Viral Clip", "Character Series"];

  const filtered = allVideos.filter((v) => {
    const matchCat = category === "All" || v.category === category;
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleLike = (videoId: string) => {
    const updated = likedVideos.includes(videoId)
      ? likedVideos.filter((id) => id !== videoId)
      : [...likedVideos, videoId];
    setLikedVideos(updated);
    setToStorage("likedVideos", updated);
  };

  return (
    <div className="pt-28 pb-20 container mx-auto px-4">
      <SectionTitle title="Video Library" subtitle="Browse all our animated comedy content" />

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                category === c
                  ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <VideoCamera size={48} weight="duotone" className="text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500">No videos found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              isLiked={likedVideos.includes(v.id)}
              onPlay={setActiveVideo}
              onLike={handleLike}
            />
          ))}
        </div>
      )}

      <VideoPlayerModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}

export function Services() {
  const services = useMemo(() => getServices(), []);

  return (
    <div className="pt-28 pb-20 container mx-auto px-4">
      <SectionTitle
        title="Animation Packages"
        subtitle="Choose the perfect package for your content needs"
        centered
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} onBook={() => window.location.href = "/booking"} />
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto mt-20">
        <h3 className="text-2xl font-black text-white text-center mb-8">Common Questions</h3>
        {[
          { q: "How long does delivery take?", a: "Basic packages deliver in 7 days, Standard in 14 days, and Premium in 30 days." },
          { q: "Can I request revisions?", a: "Yes! Basic gets 2 revisions, Standard gets 5, and Premium has unlimited revisions." },
          { q: "Do you provide voiceover?", a: "Voiceover is included in Standard and Premium packages. It can be added to Basic for extra cost." },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-4"
          >
            <p className="font-bold text-white text-sm mb-2">{item.q}</p>
            <p className="text-zinc-400 text-sm">{item.a}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
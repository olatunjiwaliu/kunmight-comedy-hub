import { motion } from "framer-motion";
import { Play, Heart, Eye, Clock, Star, Rocket, VideoCamera, CheckCircle } from "@phosphor-icons/react";
import type { Video, Service, Review } from "@/types";

interface VideoCardProps {
  video: Video;
  isLiked: boolean;
  onPlay: (video: Video) => void;
  onLike: (videoId: string) => void;
}

export function VideoCard({ video, isLiked, onPlay, onLike }: VideoCardProps) {
  const formatViews = (v: number) => {
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
    if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
    return v.toString();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-emerald-500/30 transition-all shadow-lg hover:shadow-emerald-500/5"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => onPlay(video)}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 bg-emerald-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Play size={24} weight="fill" className="text-white ml-1" />
          </div>
        </div>
        {/* Duration */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded-md text-xs text-white font-medium flex items-center gap-1">
          <Clock size={12} /> {video.duration}
        </div>
        {/* Featured Badge */}
        {video.featured && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500/90 rounded-md text-xs text-zinc-950 font-bold">
            Featured
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 mb-2 group-hover:text-emerald-300 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1"><Eye size={14} /> {formatViews(video.views)}</span>
            <span className="px-2 py-0.5 bg-zinc-800 rounded text-zinc-400">{video.category}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onLike(video.id); }}
            className={`flex items-center gap-1 text-xs transition-colors ${isLiked ? "text-red-400" : "text-zinc-500 hover:text-red-400"}`}
          >
            <Heart size={16} weight={isLiked ? "fill" : "regular"} />
            {formatViews(video.likes + (isLiked ? 1 : 0))}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

interface ServiceCardProps {
  service: Service;
  onBook: () => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  const tierColors = {
    Basic: "from-cyan-500 to-blue-500",
    Standard: "from-emerald-500 to-cyan-500",
    Premium: "from-amber-500 to-orange-500",
  };
  const tierIcons = { Basic: VideoCamera, Standard: Star, Premium: Rocket };
  const IconComp = tierIcons[service.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`relative bg-zinc-900 rounded-3xl p-6 border transition-all shadow-xl ${
        service.tier === "Premium"
          ? "border-amber-500/30 shadow-amber-500/5"
          : "border-zinc-800/50 hover:border-emerald-500/20"
      }`}
    >
      {service.tier === "Premium" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-xs font-bold text-zinc-950">
          Most Popular
        </div>
      )}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tierColors[service.tier]} flex items-center justify-center mb-4 shadow-lg`}>
        <IconComp size={22} weight="fill" className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
      <p className="text-sm text-zinc-400 mb-4">{service.description}</p>
      <div className="text-3xl font-black text-white mb-6">
        ${service.price}
        <span className="text-sm font-normal text-zinc-500 ml-1">USD</span>
      </div>
      <ul className="space-y-2 mb-6">
        {service.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
            <CheckCircle size={16} weight="fill" className="text-emerald-400 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={onBook}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
          service.tier === "Premium"
            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 hover:shadow-lg hover:shadow-amber-500/25"
            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
        }`}
      >
        Book Now
      </button>
    </motion.div>
  );
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800/50 hover:border-cyan-500/20 transition-all"
    >
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            weight={i < review.rating ? "fill" : "regular"}
            className={i < review.rating ? "text-amber-400" : "text-zinc-700"}
          />
        ))}
      </div>
      <h4 className="font-bold text-white text-sm mb-1">{review.title}</h4>
      <p className="text-sm text-zinc-400 leading-relaxed mb-3">{review.text}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-cyan-400">{review.author}</span>
        <span className="text-[10px] text-zinc-600">{review.service}</span>
      </div>
    </motion.div>
  );
}

export function SectionTitle({ title, subtitle, centered }: { title: string; subtitle?: string; centered?: boolean }) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-zinc-400 mt-2 max-w-lg mx-auto text-sm md:text-base">{subtitle}</p>}
    </div>
  );
}

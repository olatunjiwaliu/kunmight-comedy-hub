import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ChatCircleText, ShareNetwork, Eye, Clock } from "@phosphor-icons/react";
import { toast } from "sonner";
import { getFromStorage, setToStorage, generateId } from "@/data/mockData";
import type { Video, Comment } from "@/types";

interface Props {
  video: Video | null;
  onClose: () => void;
}

export function VideoPlayerModal({ video, onClose }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [liked, setLiked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    if (video) {
      const allComments = getFromStorage<Comment[]>("comments", []);
      setComments(allComments.filter((c) => c.videoId === video.id));
      const likedVideos = getFromStorage<string[]>("likedVideos", []);
      setLiked(likedVideos.includes(video.id));
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [video]);

  if (!video) return null;

  const handleLike = () => {
    const likedVideos = getFromStorage<string[]>("likedVideos", []);
    let updated: string[];
    if (likedVideos.includes(video.id)) {
      updated = likedVideos.filter((id) => id !== video.id);
      setLiked(false);
    } else {
      updated = [...likedVideos, video.id];
      setLiked(true);
      toast.success("Added to your likes!");
    }
    setToStorage("likedVideos", updated);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commenterName.trim()) {
      toast.error("Please fill in your name and comment");
      return;
    }
    const allComments = getFromStorage<Comment[]>("comments", []);
    const comment: Comment = {
      id: generateId(),
      videoId: video.id,
      author: commenterName.trim(),
      text: newComment.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...allComments, comment];
    setToStorage("comments", updated);
    setComments(updated.filter((c) => c.videoId === video.id));
    setNewComment("");
    toast.success("Comment posted!");
  };

  const handleShare = (platform: string) => {
    const url = `${window.location.origin}/videos?video=${video.id}`;
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(video.title)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`Check out: ${video.title} - ${url}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      copy: "",
    };
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
    setShareOpen(false);
  };

  const formatViews = (v: number) => {
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
    if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
    return v.toString();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-zinc-900/80 backdrop-blur-sm rounded-full text-zinc-400 hover:text-white transition-colors">
            <X size={20} />
          </button>

          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <video
              src={video.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
              poster={video.thumbnail}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Title & Meta */}
            <h2 className="text-xl font-bold text-white mb-2">{video.title}</h2>
            <p className="text-sm text-zinc-400 mb-4">{video.description}</p>

            <div className="flex items-center gap-4 text-xs text-zinc-500 mb-6">
              <span className="flex items-center gap-1"><Eye size={14} /> {formatViews(video.views)} views</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {video.duration}</span>
              <span className="px-2 py-0.5 bg-zinc-800 rounded text-zinc-400">{video.category}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  liked ? "bg-red-500/15 text-red-400 border border-red-500/30" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
                }`}
              >
                <Heart size={18} weight={liked ? "fill" : "regular"} />
                {formatViews(video.likes + (liked ? 1 : 0))}
              </button>
              <button
                onClick={() => setShareOpen(!shareOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700 transition-all"
              >
                <ShareNetwork size={18} /> Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                <ChatCircleText size={18} /> {comments.length}
              </button>
            </div>

            {/* Share Panel */}
            <AnimatePresence>
              {shareOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700"
                >
                  <p className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wider">Share via</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleShare("twitter")} className="px-3 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-500/20">Twitter</button>
                    <button onClick={() => handleShare("whatsapp")} className="px-3 py-2 bg-green-500/10 text-green-400 rounded-lg text-xs font-medium hover:bg-green-500/20">WhatsApp</button>
                    <button onClick={() => handleShare("facebook")} className="px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-medium hover:bg-indigo-500/20">Facebook</button>
                    <button onClick={() => handleShare("copy")} className="px-3 py-2 bg-zinc-700 text-zinc-300 rounded-lg text-xs font-medium hover:bg-zinc-600">Copy Link</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Comments Section */}
            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-sm font-bold text-white mb-4">Comments ({comments.length})</h3>

              {/* Add Comment */}
              <form onSubmit={handleComment} className="mb-6 space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50"
                  />
                  <button type="submit" className="px-4 py-2.5 bg-emerald-500 text-zinc-950 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-colors">
                    Post
                  </button>
                </div>
              </form>

              {/* Comment List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <p className="text-sm text-zinc-600 text-center py-4">No comments yet. Be the first!</p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {c.author[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{c.author}</p>
                        <p className="text-sm text-zinc-400 mt-0.5">{c.text}</p>
                        <p className="text-[10px] text-zinc-600 mt-1">{new Date(c.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

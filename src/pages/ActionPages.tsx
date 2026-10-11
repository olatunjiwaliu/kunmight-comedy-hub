import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { CalendarDots, Star, Plus, Phone, Envelope, ChatCircleText } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SectionTitle, ReviewCard } from "@/components/Cards";
import { getFromStorage, setToStorage, generateId, getReviews, getServices } from "@/data/mockData";
import type { Booking, Review } from "@/types";

export function Booking() {
  const services = useMemo(() => getServices(), []);
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    serviceType: "",
    notes: "",
    date: "",
    time: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.serviceType) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const bookings = getFromStorage<Booking[]>("bookings", []);
      const newBooking: Booking = {
        id: generateId(),
        ...form,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      setToStorage("bookings", [...bookings, newBooking]);

      // Add notification
      const notifications = getFromStorage("notifications", []);
      setToStorage("notifications", [
        {
          id: generateId(),
          type: "booking",
          title: "New Booking Received",
          message: `${form.name} booked ${form.serviceType}`,
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...notifications,
      ]);

      toast.success("Booking submitted! We will contact you on WhatsApp shortly.");
      setForm({ name: "", email: "", whatsapp: "", serviceType: "", notes: "", date: "", time: "" });
      setSubmitting(false);
    }, 1200);
  };

  const generateWhatsAppLink = () => {
    if (!form.name || !form.serviceType) {
      toast.error("Fill in your name and service first");
      return;
    }
    const msg = encodeURIComponent(
      `Hi! I'm ${form.name}. I'd like to book: ${form.serviceType}. Date: ${form.date || "Flexible"}. Notes: ${form.notes || "None"}`
    );
    window.open(`https://wa.me/2349068190825?text=${msg}`, "_blank");
  };

  return (
    <div className="pt-28 pb-20 container mx-auto px-4 max-w-4xl">
      <SectionTitle
        title="Book a Service"
        subtitle="Fill out the form and our team will reach out within 24 hours via WhatsApp."
        centered
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-zinc-300 flex items-center gap-2"><Phone size={14} /> Full Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="John Doe"
                className="bg-zinc-950 border-zinc-800 text-white py-6"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300 flex items-center gap-2"><Envelope size={14} /> Email *</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john@example.com"
                className="bg-zinc-950 border-zinc-800 text-white py-6"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-zinc-300">WhatsApp Number</Label>
              <Input
                value={form.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                placeholder="+234 800 000 0000"
                className="bg-zinc-950 border-zinc-800 text-white py-6"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Service Type *</Label>
              <select
                value={form.serviceType}
                onChange={(e) => handleChange("serviceType", e.target.value)}
                className="w-full px-3 py-6 bg-zinc-950 border border-zinc-800 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                required
              >
                <option value="">Select a package</option>
                {services.map((s) => (
                  <option key={s.id} value={s.title}>{s.title} - ${s.price}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-zinc-300 flex items-center gap-2"><CalendarDots size={14} /> Preferred Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="bg-zinc-950 border-zinc-800 text-white py-6"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Preferred Time</Label>
              <Input
                type="time"
                value={form.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="bg-zinc-950 border-zinc-800 text-white py-6"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300 flex items-center gap-2"><ChatCircleText size={14} /> Project Notes</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Tell us about your project, style preferences, references..."
              className="bg-zinc-950 border-zinc-800 text-white min-h-[100px]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 py-6 rounded-xl"
            >
              {submitting ? "Submitting..." : "Submit Booking"}
            </Button>
            <Button
              type="button"
              onClick={generateWhatsAppLink}
              className="flex-1 bg-green-600 text-white font-bold hover:bg-green-500 py-6 rounded-xl"
            >
              <Phone size={18} className="mr-2" /> Book via WhatsApp
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(getReviews().filter((r) => r.approved));
  const [dialogOpen, setDialogOpen] = useState(false);
  const services = useMemo(() => getServices(), []);
  const [form, setForm] = useState({ author: "", rating: 5, title: "", text: "", service: "" });

  const avgRating = reviews.length > 0
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author || !form.text || !form.title) {
      toast.error("Please fill in all required fields");
      return;
    }
    const allReviews = getFromStorage<Review[]>("reviews", []);
    const newReview: Review = {
      id: generateId(),
      ...form,
      approved: true,
      createdAt: new Date().toISOString(),
    };
    const updated = [newReview, ...allReviews];
    setToStorage("reviews", updated);
    setReviews(updated.filter((r) => r.approved));
    setForm({ author: "", rating: 5, title: "", text: "", service: "" });
    setDialogOpen(false);
    toast.success("Review submitted! Thanks for your feedback.");
  };

  return (
    <div className="pt-28 pb-20 container mx-auto px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
        <SectionTitle
          title="Client Reviews"
          subtitle={`${reviews.length} reviews with an average of ${avgRating} stars`}
        />
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 rounded-xl px-5"
        >
          <Plus size={18} className="mr-1" /> Leave a Review
        </Button>
      </div>

      {/* Rating Summary */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 flex items-center gap-6">
        <div className="text-center">
          <p className="text-4xl font-black text-white">{avgRating}</p>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} weight={i < Math.round(Number(avgRating)) ? "fill" : "regular"} className="text-amber-400" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => r.rating === star).length;
              const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-500 w-3">{star}</span>
                  <Star size={12} weight="fill" className="text-amber-400" />
                  <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-zinc-500 w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review Grid */}
      {reviews.length === 0 ? (
        <div className="text-center py-16">
          <Star size={48} weight="duotone" className="text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500">No reviews yet. Be the first to leave one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}

      {/* Review Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Leave a Review</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-zinc-300">Your Name *</Label>
              <Input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Jane Doe"
                className="bg-zinc-950 border-zinc-800 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Rating</Label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setForm({ ...form, rating: i + 1 })}
                    className="p-1"
                  >
                    <Star
                      size={28}
                      weight={i < form.rating ? "fill" : "regular"}
                      className={i < form.rating ? "text-amber-400" : "text-zinc-600 hover:text-zinc-400 transition-colors"}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Title *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Great experience!"
                className="bg-zinc-950 border-zinc-800 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Review *</Label>
              <Textarea
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="Tell us about your experience..."
                className="bg-zinc-950 border-zinc-800 text-white min-h-[80px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Service Used</Label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                <option value="">Select service (optional)</option>
                {services.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 rounded-xl py-6">
              Submit Review
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

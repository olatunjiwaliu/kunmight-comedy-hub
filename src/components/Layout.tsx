import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { House, VideoCamera, Briefcase, CalendarDots, Star, Gear, Bell, List, X, YoutubeLogo, InstagramLogo, TiktokLogo, FacebookLogo, Envelope, Phone, Sparkle } from "@phosphor-icons/react";
import { getNotifications, getFromStorage, setToStorage, generateId } from "@/data/mockData";
import type { Notification } from "@/types";

const navLinks = [
  { name: "Home", path: "/", icon: House },
  { name: "Videos", path: "/videos", icon: VideoCamera },
  { name: "Services", path: "/services", icon: Briefcase },
  { name: "Booking", path: "/booking", icon: CalendarDots },
  { name: "Reviews", path: "/reviews", icon: Star },
  { name: "AI Studio", path: "/generate", icon: Sparkle },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(getNotifications());
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setNotifications(getNotifications());
  }, [location.pathname]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    setToStorage("notifications", updated);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50 py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-500/20">
            <span className="text-white font-black text-lg">K</span>
          </div>
          <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 hidden sm:block">
            Kunmightpro
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-emerald-400 ${location.pathname === link.path ? "text-emerald-400" : "text-zinc-400"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Bell size={22} weight="duotone" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-emerald-500 text-zinc-950 text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                    <h3 className="text-sm font-bold text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-emerald-400 hover:text-emerald-300">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-zinc-500 text-sm p-4 text-center">No notifications</p>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className={`px-4 py-3 border-b border-zinc-800/50 ${!n.read ? "bg-emerald-500/5" : ""}`}>
                          <p className="text-xs font-semibold text-white">{n.title}</p>
                          <p className="text-xs text-zinc-400 mt-0.5">{n.message}</p>
                          <p className="text-[10px] text-zinc-600 mt-1">
                            {new Date(n.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/admin" className="p-2 text-zinc-400 hover:text-white transition-colors hidden sm:block">
            <Gear size={20} />
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            {mobileOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.path ? "bg-emerald-500/10 text-emerald-400" : "text-zinc-300 hover:bg-zinc-800"}`}
                >
                  <link.icon size={18} weight="duotone" />
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-800"
              >
                <Gear size={18} weight="duotone" />
                Admin Panel
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  const settings = getFromStorage("settings", {
    siteName: "Kunmightpro Digital",
    tagline: "Welcome to Kunmightpro Digital - Home of Creative Animation & Viral Content!",
    whatsappNumber: "+234 906 819 0825",
    email: "kunmightprodigital@gmail.com",
    socialLinks: { youtube: "#", tiktok: "#", instagram: "#", facebook: "#" },
  });

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">K</span>
              </div>
              <span className="font-bold text-white">{settings.siteName}</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">{settings.tagline}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link key={l.path} to={l.path} className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors">
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a href={settings.socialLinks.youtube} target="_blank" rel="noreferrer" className="p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-all">
                <YoutubeLogo size={20} weight="fill" />
              </a>
              <a href={settings.socialLinks.tiktok} target="_blank" rel="noreferrer" className="p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                <TiktokLogo size={20} weight="fill" />
              </a>
              <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" className="p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-pink-400 hover:bg-pink-400/10 transition-all">
                <InstagramLogo size={20} weight="fill" />
              </a>
              <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer" className="p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                <FacebookLogo size={20} weight="fill" />
              </a>
            </div>
            <div className="flex flex-col gap-2 text-sm text-zinc-400">
              <span className="flex items-center gap-2"><Phone size={14} weight="duotone" /> {settings.whatsappNumber}</span>
              <span className="flex items-center gap-2"><Envelope size={14} weight="duotone" /> {settings.email}</span>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-zinc-800/50 text-center">
          <p className="text-xs text-zinc-600">&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
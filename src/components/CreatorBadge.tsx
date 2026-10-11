import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Mail, Sparkles } from "lucide-react";

export const CreatorBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-purple-900/60 via-zinc-900/80 to-blue-900/60 border-b border-purple-500/20 py-3 px-4"
    >
      <div className="container mx-auto flex items-center justify-center gap-3 flex-wrap">
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span className="text-sm text-zinc-300">
          <span className="font-bold text-white">Created by Kunmightpro Digital</span>
          <span className="mx-2 text-zinc-600">|</span>
          Premier Animation & Digital Content Agency
        </span>
        <a
          href="https://wa.me/2349068190825?text=Hello%20Kunmightpro%20Digital%2C%20I%20have%20an%20inquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-green-600/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full hover:bg-green-600/30 transition-colors font-medium"
        >
          Contact Us
        </a>
      </div>
    </motion.div>
  );
};

export const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-2xl w-64"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-bold text-sm">Quick Contact</h4>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <a
                href="https://wa.me/2349068190825?text=Hello%20Kunmightpro%20Digital%2C%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-green-600/10 border border-green-500/20 hover:bg-green-600/20 transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-green-300">WhatsApp</p>
                  <p className="text-zinc-500 text-xs">+234 906 819 0825</p>
                </div>
              </a>
              <a
                href="mailto:kunmightprodigital@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium group-hover:text-blue-300">Email</p>
                  <p className="text-zinc-500 text-xs">kunmightprodigital@gmail.com</p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-shadow"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
};

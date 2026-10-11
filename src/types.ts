export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: "Comedy Skit" | "Short Animation" | "Viral Clip" | "Character Series";
  duration: string;
  views: number;
  likes: number;
  createdAt: string;
  featured: boolean;
}

export interface Comment {
  id: string;
  videoId: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  tier: "Basic" | "Standard" | "Premium";
  icon: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  serviceType: string;
  notes: string;
  date: string;
  time: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  text: string;
  service: string;
  approved: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: "video" | "promo" | "booking";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AdminSettings {
  siteName: string;
  tagline: string;
  whatsappNumber: string;
  email: string;
  socialLinks: {
    youtube: string;
    tiktok: string;
    instagram: string;
    facebook: string;
  };
}

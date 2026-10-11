import type { Video, Comment, Service, Booking, Review, Notification, AdminSettings } from "@/types";

const PREFIX = "kmp_";

export function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // storage full or unavailable
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

// --- Seed Data ---

const SEED_VIDEOS: Video[] = [
  {
    id: "v1",
    title: "When the Client Says Make It Go Viral",
    description: "A hilarious skit about animators dealing with impossible client requests. Watch as expectations meet reality!",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/f725ed9b-adcd-4562-ab69-2fb17f83a5d7/video-thumb-1-111729f5-1775850885002.webp",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "Comedy Skit",
    duration: "1:24",
    views: 1240000,
    likes: 45000,
    createdAt: "2024-11-15T10:00:00Z",
    featured: true,
  },
  {
    id: "v2",
    title: "Life of an Animator: Expectations vs Reality",
    description: "What people think animators do vs what actually happens at 3am with 47 browser tabs open.",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/f725ed9b-adcd-4562-ab69-2fb17f83a5d7/video-thumb-2-95232c65-1775850885530.webp",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    category: "Short Animation",
    duration: "2:10",
    views: 890000,
    likes: 32000,
    createdAt: "2024-11-10T14:30:00Z",
    featured: true,
  },
  {
    id: "v3",
    title: "Viral Dance Challenge: Animated Edition",
    description: "Our characters take on the latest viral dance trend. Spoiler: it gets weird.",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/f725ed9b-adcd-4562-ab69-2fb17f83a5d7/hero-bg-bdfd623d-1775850884719.webp",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    category: "Viral Clip",
    duration: "0:45",
    views: 2500000,
    likes: 120000,
    createdAt: "2024-11-20T08:00:00Z",
    featured: true,
  },
  {
    id: "v4",
    title: "Captain Procrastinate: Episode 1",
    description: "Meet the hero who saves the world... eventually. First episode of our new character series.",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/f725ed9b-adcd-4562-ab69-2fb17f83a5d7/video-thumb-1-111729f5-1775850885002.webp",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    category: "Character Series",
    duration: "5:32",
    views: 340000,
    likes: 18000,
    createdAt: "2024-11-25T12:00:00Z",
    featured: false,
  },
  {
    id: "v5",
    title: "POV: You Are the Background Character",
    description: "Ever wondered what it's like to be that one guy in the corner of every scene?",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/f725ed9b-adcd-4562-ab69-2fb17f83a5d7/video-thumb-2-95232c65-1775850885530.webp",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    category: "Comedy Skit",
    duration: "1:05",
    views: 780000,
    likes: 28000,
    createdAt: "2024-12-01T09:00:00Z",
    featured: false,
  },
  {
    id: "v6",
    title: "AI Took My Job (Animation Edition)",
    description: "A satirical short about what happens when AI tries to replace animators.",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/f725ed9b-adcd-4562-ab69-2fb17f83a5d7/hero-bg-bdfd623d-1775850884719.webp",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    category: "Short Animation",
    duration: "3:15",
    views: 1100000,
    likes: 52000,
    createdAt: "2024-12-05T16:00:00Z",
    featured: true,
  },
];

const SEED_SERVICES: Service[] = [
  {
    id: "s1",
    title: "Basic Animation Package",
    description: "Perfect for social media content and quick brand videos.",
    price: 150,
    currency: "USD",
    features: ["1 Animated Video (up to 60s)", "Custom Character Design", "2 Revisions", "Social Media Optimized", "7-Day Delivery"],
    tier: "Basic",
    icon: "film",
  },
  {
    id: "s2",
    title: "Standard Content Package",
    description: "Ideal for businesses building their content library.",
    price: 400,
    currency: "USD",
    features: ["3 Animated Videos (up to 90s each)", "2 Custom Characters", "Voiceover Included", "5 Revisions", "Background Music", "14-Day Delivery"],
    tier: "Standard",
    icon: "star",
  },
  {
    id: "s3",
    title: "Premium Viral Package",
    description: "Full-scale production for maximum viral potential.",
    price: 900,
    currency: "USD",
    features: ["5 Animated Videos (up to 3min each)", "Full Character Series", "Professional Voiceover", "Unlimited Revisions", "Original Soundtrack", "Social Media Strategy", "Priority Support", "30-Day Delivery"],
    tier: "Premium",
    icon: "rocket",
  },
];

const SEED_REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Aisha Bello",
    rating: 5,
    title: "Absolutely Hilarious!",
    text: "Kunmightpro made our brand animations and they went viral overnight. The comedy timing is unmatched!",
    service: "Premium Viral Package",
    approved: true,
    createdAt: "2024-11-01T10:00:00Z",
  },
  {
    id: "r2",
    author: "David Okonkwo",
    rating: 5,
    title: "Best Animation Studio in Africa",
    text: "The character designs are incredible and the delivery was faster than promised. 10/10 would recommend.",
    service: "Standard Content Package",
    approved: true,
    createdAt: "2024-11-15T14:00:00Z",
  },
  {
    id: "r3",
    author: "Sarah Mensah",
    rating: 4,
    title: "Great Quality, Quick Turnaround",
    text: "Our social media engagement tripled after using their animations. Minor revision delays but worth it.",
    service: "Basic Animation Package",
    approved: true,
    createdAt: "2024-12-01T09:00:00Z",
  },
  {
    id: "r4",
    author: "Emeka Chukwu",
    rating: 5,
    title: "They Get Comedy",
    text: "Finally a studio that understands timing and humor in animation. Our skits get millions of views now!",
    service: "Premium Viral Package",
    approved: true,
    createdAt: "2024-12-10T11:00:00Z",
  },
];

const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "video",
    title: "New Video Released!",
    message: "Check out our latest skit: AI Took My Job (Animation Edition)",
    read: false,
    createdAt: "2024-12-05T16:00:00Z",
  },
  {
    id: "n2",
    type: "promo",
    title: "Holiday Special: 20% Off",
    message: "Book any Premium package before Dec 31 and get 20% off!",
    read: false,
    createdAt: "2024-12-01T08:00:00Z",
  },
  {
    id: "n3",
    type: "video",
    title: "Captain Procrastinate: Ep 2 Coming Soon",
    message: "The sequel is in production. Stay tuned for January release!",
    read: true,
    createdAt: "2024-11-28T12:00:00Z",
  },
];

const SEED_COMMENTS: Comment[] = [
  { id: "c1", videoId: "v1", author: "ComedyKing99", text: "This is literally my life with clients 😂", createdAt: "2024-11-16T10:00:00Z" },
  { id: "c2", videoId: "v1", author: "AnimatorLife", text: "The 'make the logo bigger' scene killed me", createdAt: "2024-11-16T12:00:00Z" },
  { id: "c3", videoId: "v3", author: "ViralVibes", text: "Already shared this 5 times. Pure gold!", createdAt: "2024-11-21T09:00:00Z" },
  { id: "c4", videoId: "v3", author: "DanceMaster", text: "The frame-by-frame animation on that spin move?? Chef's kiss", createdAt: "2024-11-21T15:00:00Z" },
  { id: "c5", videoId: "v6", author: "TechBro2024", text: "AI can never replace this level of creativity. Beautiful work!", createdAt: "2024-12-06T11:00:00Z" },
];

const SEED_SETTINGS: AdminSettings = {
  siteName: "Kunmightpro Digital",
  tagline: "Welcome to Kunmightpro Digital - Home of Creative Animation & Viral Content!",
  whatsappNumber: "+234 906 819 0825",
  email: "kunmightprodigital@gmail.com",
  socialLinks: {
    youtube: "https://youtube.com/@kunmightpro",
    tiktok: "https://tiktok.com/@kunmightpro",
    instagram: "https://instagram.com/kunmightpro",
    facebook: "https://facebook.com/kunmightpro",
  },
};

// --- Initialize Storage ---

export function seedStorage(): void {
  if (!getFromStorage("seeded", false)) {
    setToStorage("videos", SEED_VIDEOS);
    setToStorage("services", SEED_SERVICES);
    setToStorage("reviews", SEED_REVIEWS);
    setToStorage("notifications", SEED_NOTIFICATIONS);
    setToStorage("comments", SEED_COMMENTS);
    setToStorage("bookings", [] as Booking[]);
    setToStorage("likedVideos", [] as string[]);
    setToStorage("settings", SEED_SETTINGS);
    setToStorage("seeded", true);
  }
}

export function resetStorage(): void {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(PREFIX))
    .forEach((k) => localStorage.removeItem(k));
  seedStorage();
}

// --- Data Accessors ---

export function getVideos(): Video[] {
  return getFromStorage<Video[]>("videos", SEED_VIDEOS);
}

export function getServices(): Service[] {
  return getFromStorage<Service[]>("services", SEED_SERVICES);
}

export function getReviews(): Review[] {
  return getFromStorage<Review[]>("reviews", SEED_REVIEWS);
}

export function getBookings(): Booking[] {
  return getFromStorage<Booking[]>("bookings", []);
}

export function getNotifications(): Notification[] {
  return getFromStorage<Notification[]>("notifications", SEED_NOTIFICATIONS);
}

export function getComments(): Comment[] {
  return getFromStorage<Comment[]>("comments", SEED_COMMENTS);
}

export function getSettings(): AdminSettings {
  return getFromStorage<AdminSettings>("settings", SEED_SETTINGS);
}

export function getLikedVideos(): string[] {
  return getFromStorage<string[]>("likedVideos", []);
}
export type Shot = {
  id: string;
  title: string;
  image: string;
  author: string;
  authorAvatar: string;
  likes: number;
  views: number;
  category: string;
  tags: string[];
  description?: string;
  pro?: boolean;
};

export type Designer = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  location: string;
  role: string;
  shots: number;
  followers: number;
  available: boolean;
};

export type Service = {
  id: string;
  title: string;
  provider: string;
  avatar: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: "Full-Time" | "Contract" | "Freelance";
  remote: boolean;
  salary: string;
  posted: string;
};

const CATEGORIES = [
  "Product Design",
  "Web Design",
  "Animation",
  "Branding",
  "Illustration",
  "Mobile",
  "Typography",
  "Print",
];

const FIRST_NAMES = ["Alex", "Maya", "Jordan", "Sam", "Riley", "Casey", "Taylor", "Morgan", "Drew", "Avery", "Quinn", "Sage", "Reese", "Sky", "Noa", "Kai"];
const LAST_NAMES = ["Chen", "Patel", "Kim", "Garcia", "Müller", "Silva", "Walker", "Bennett", "Hayes", "Cole", "Reed", "Foster", "Lane", "Ross", "Knox", "Wells"];

const seedRand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const pick = <T,>(arr: T[], r: () => number) => arr[Math.floor(r() * arr.length)];

const SHOT_TITLES = [
  "Onboarding Flow Exploration",
  "Crypto Dashboard 2.0",
  "Brand Identity for Lumen",
  "Mobile Banking App",
  "Editorial Magazine Layout",
  "3D Character Design",
  "Landing Page Concept",
  "E-commerce Checkout",
  "Travel App UI",
  "Fintech Hero Animation",
  "Music Player Redesign",
  "Health Tracker Interface",
  "AI Assistant Chat UI",
  "SaaS Pricing Page",
  "Restaurant Menu Card",
  "Podcast Cover Art",
  "Logo Mark Concepts",
  "Newsletter Template",
  "Portfolio Case Study",
  "Settings Modal",
  "Calendar Widget",
  "Analytics Dashboard",
  "NFT Marketplace",
  "Smart Home App",
];

export const SHOTS: Shot[] = Array.from({ length: 60 }).map((_, i) => {
  const r = seedRand(i + 7);
  const fn = pick(FIRST_NAMES, r);
  const ln = pick(LAST_NAMES, r);
  const cat = CATEGORIES[i % CATEGORIES.length];
  return {
    id: `shot-${i + 1}`,
    title: SHOT_TITLES[i % SHOT_TITLES.length] + (i > 23 ? ` v${Math.floor(i / 24) + 1}` : ""),
    image: `https://images.unsplash.com/photo-${[
      "1559028012-481c04fa702d",
      "1545239351-1141bd82e8a6",
      "1517292987719-0369a794ec0f",
      "1558655146-9f40138edfeb",
      "1561070791-2526d30994b8",
      "1550745165-9bc0b252726f",
      "1618005182384-a83a8bd57fbe",
      "1513542789411-b6a5d4f31634",
      "1523437113738-bbd3cc89fb19",
      "1542744173-8e7e53415bb0",
      "1607799279861-4dd421887fb3",
      "1551288049-bebda4e38f71",
    ][i % 12]}?w=800&h=600&fit=crop&auto=format&q=80`,
    author: `${fn} ${ln}`,
    authorAvatar: `https://i.pravatar.cc/80?img=${(i % 70) + 1}`,
    likes: Math.floor(r() * 2400) + 50,
    views: Math.floor(r() * 18000) + 500,
    category: cat,
    tags: [cat.toLowerCase().replace(/\s/g, "-"), "ui", "design"],
    description: "A creative exploration pushing the boundaries of modern interface design.",
    pro: r() > 0.6,
  };
});

export const DESIGNERS: Designer[] = Array.from({ length: 24 }).map((_, i) => {
  const r = seedRand(i + 101);
  const fn = pick(FIRST_NAMES, r);
  const ln = pick(LAST_NAMES, r);
  return {
    id: `designer-${i + 1}`,
    name: `${fn} ${ln}`,
    handle: `${fn.toLowerCase()}${ln.toLowerCase()}`,
    avatar: `https://i.pravatar.cc/200?img=${(i % 70) + 1}`,
    location: pick(["New York, USA", "London, UK", "Berlin, DE", "Tokyo, JP", "Lagos, NG", "São Paulo, BR", "Toronto, CA", "Lisbon, PT"], r),
    role: pick(["Product Designer", "Brand Designer", "Illustrator", "UI/UX Designer", "Motion Designer"], r),
    shots: Math.floor(r() * 200) + 5,
    followers: Math.floor(r() * 50000) + 100,
    available: r() > 0.5,
  };
});

export const SERVICES: Service[] = Array.from({ length: 18 }).map((_, i) => {
  const r = seedRand(i + 333);
  return {
    id: `service-${i + 1}`,
    title: pick(["Logo & Brand Identity", "Web Design Package", "Mobile App UI Kit", "Illustration Set", "Pitch Deck Design", "Social Media Templates"], r),
    provider: `${pick(FIRST_NAMES, r)} ${pick(LAST_NAMES, r)}`,
    avatar: `https://i.pravatar.cc/80?img=${(i % 70) + 10}`,
    price: Math.floor(r() * 800) + 99,
    rating: 4 + r(),
    reviews: Math.floor(r() * 200) + 5,
    image: SHOTS[i % SHOTS.length].image,
    category: pick(CATEGORIES, r),
  };
});

export const JOBS: Job[] = Array.from({ length: 16 }).map((_, i) => {
  const r = seedRand(i + 555);
  return {
    id: `job-${i + 1}`,
    title: pick(["Senior Product Designer", "Brand Designer", "UX Researcher", "Design Lead", "Illustrator", "Motion Designer"], r),
    company: pick(["Linear", "Stripe", "Notion", "Figma", "Vercel", "Arc", "Loom", "Framer"], r),
    logo: `https://api.dicebear.com/7.x/shapes/svg?seed=${i}`,
    location: pick(["Remote", "New York", "San Francisco", "London", "Berlin"], r),
    type: pick(["Full-Time", "Contract", "Freelance"] as const, r),
    remote: r() > 0.4,
    salary: `$${Math.floor(r() * 80) + 80}k - $${Math.floor(r() * 60) + 160}k`,
    posted: `${Math.floor(r() * 14) + 1} days ago`,
  };
});

export const CATEGORY_LIST = CATEGORIES;

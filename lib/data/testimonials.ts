export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Aarav Sharma",
    role: "Founder, Brew & Bean Coffee",
    quote:
      "Uploaded our label artwork, picked the roll option, and had 2,000 bottle labels delivered in four days. The proof photo before dispatch sealed the deal for us.",
    avatar: "https://i.pravatar.cc/120?img=12",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Marketing Lead, Nimbus Studio",
    quote:
      "Transparent pricing and live tracking — no more chasing a printer on WhatsApp. The business cards came out crisp and exactly on brand.",
    avatar: "https://i.pravatar.cc/120?img=45",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Event Manager, Spotlight Events",
    quote:
      "Ordered badges, tickets and posters for a 500-person conference in one cart. The half-advance payment option was a lifesaver for our budgeting.",
    avatar: "https://i.pravatar.cc/120?img=33",
    rating: 4,
  },
  {
    name: "Sneha Patel",
    role: "Owner, Bloom Boutique",
    quote:
      "I'm not a designer, but uploading my file and choosing units in inches was effortless. Repeat orders take me under two minutes now.",
    avatar: "https://i.pravatar.cc/120?img=20",
    rating: 5,
  },
];

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  HelpCircle,
  ChevronDown,
  Search,
  PhoneCall,
  Flame,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface FaqPageProps {
  onBack: () => void;
  onExploreMenu: () => void;
  onContactUs: () => void;
}

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "f-1",
    category: "Food & Ingredients",
    question: "Do you really use 100% pure cow desi ghee?",
    answer:
      "Yes, absolutely. We have an ironclad policy of zero palm oil and zero cheap vegetable oils. Every yellow dal tadka, tawa roti brushing, and aromatic pulao uses 100% pure cow desi ghee sourced directly from local dairy co-ops.",
  },
  {
    id: "f-2",
    category: "Ordering & Delivery",
    question: "How hot will my food arrive?",
    answer:
      "Every thali is sealed immediately upon leaving the flame into food-grade, insulated heat-lock compartments. Our delivery riders carry thermal delivery bags, ensuring your dal and soft rotis arrive steaming hot (above 65°C) within 25–30 minutes.",
  },
  {
    id: "f-3",
    category: "Food & Ingredients",
    question: "Is your food 100% Vegetarian? What about Jain options?",
    answer:
      "Yes, Anima’s Kitchen is a strictly 100% Pure Vegetarian kitchen. We have separate preparation areas for Jain orders with zero onion, zero garlic, and zero root vegetables—simply add a note or select Jain preferences during checkout.",
  },
  {
    id: "f-4",
    category: "Subscriptions & Tiffins",
    question: "How does the Weekday Tiffin Pass work?",
    answer:
      "Our Tiffin Pass offers flexible 7-day and 30-day meal plans for office goers and residents. You receive a daily home-cooked lunch delivered right to your desk or home between 12:30 PM – 1:30 PM. You can pause or skip days up to 8:00 AM on the delivery morning with zero penalties.",
  },
  {
    id: "f-5",
    category: "Ordering & Delivery",
    question: "What is your delivery coverage area?",
    answer:
      "Our primary cloud kitchen hub is in Indiranagar, Bengaluru. We currently deliver across a 6 km radius including Indiranagar, Domlur, Ulsoor, Koramangala, CV Raman Nagar, and HAL Old Airport Road with ₹0 delivery fees on orders above ₹149.",
  },
  {
    id: "f-6",
    category: "Food & Ingredients",
    question: "Can I customize the spice level of my thali?",
    answer:
      "Yes! When you click on any thali card or the Eye button, you can choose between Mild (subtle, kid-friendly), Medium (authentic home style), or Desi Spicy (extra green chili & fresh ginger tadka). You can also request cooking notes like 'less salt' or 'extra ghee'.",
  },
  {
    id: "f-7",
    category: "Packaging & Hygiene",
    question: "What cooking vessels do you use?",
    answer:
      "We cook all our dals, gravies, and curries in heavy traditional brass degchis (handis), and all our rotis and parathas on cast iron tawas. This preserves natural vitamins and infuses the classic Indian slow-cooked taste.",
  },
  {
    id: "f-8",
    category: "Ordering & Delivery",
    question: "How can I track my live order?",
    answer:
      "As soon as you place your order, our Kitchen Display System (KDS) gives you live status updates (KOT Generated → Cooking on Flame → Heat-Locked in Box → Out for Delivery). You can also view live delivery rider location with real-time OTP verification.",
  },
];

export const FaqPage: React.FC<FaqPageProps> = ({ onBack, onExploreMenu, onContactUs }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<string[]>(["f-1", "f-2"]);

  const categories = ["All", "Food & Ingredients", "Ordering & Delivery", "Subscriptions & Tiffins", "Packaging & Hygiene"];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream text-ink pb-24 sm:pb-12">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-frost/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="grid size-9 place-items-center rounded-full border border-ink/15 bg-frost text-ink hover:bg-ink hover:text-cream transition-all"
            >
              <ArrowLeft className="size-4" />
            </button>
            <div>
              <h1 className="font-display text-xl font-black text-ink leading-tight">
                Frequently Asked Questions
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                Help · Ingredients · Subscriptions · Delivery
              </p>
            </div>
          </div>

          <Button
            onClick={onExploreMenu}
            size="sm"
            className="rounded-full bg-spice text-cream hover:bg-ink text-xs font-semibold px-4 gap-1.5"
          >
            <span>Order Food</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </header>

      {/* Hero Search Section */}
      <div className="border-b border-ink/10 bg-gradient-to-r from-saffron/20 via-frost to-cream py-12">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-spice/25 bg-white/90 px-3.5 py-1 text-xs font-mono font-bold text-spice shadow-sm mb-3">
            <HelpCircle className="size-3.5" />
            24/7 KITCHEN HELPDESK
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-ink">
            How Can We Help You Today?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-ink/70 max-w-md mx-auto">
            Everything you need to know about our slow-simmered thalis, pure cow desi ghee, and daily lunch subscriptions.
          </p>

          {/* Search bar */}
          <div className="relative mt-6 max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-ink/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for desi ghee, rotis, tiffin pass, delivery..."
              className="w-full rounded-2xl border border-ink/15 bg-white py-3 pl-11 pr-4 text-xs font-medium placeholder:text-ink/40 focus:border-spice focus:outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Category Pills & FAQ List */}
      <div className="mx-auto max-w-4xl px-5 py-10">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-ink/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-ink text-cream shadow-sm"
                  : "border border-ink/15 bg-frost/70 text-ink/70 hover:border-spice hover:text-spice"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="mt-8 space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-2xl border border-ink/10 bg-frost/85 backdrop-blur-md transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-ink/5"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="grid size-7 place-items-center rounded-xl bg-cream text-spice shrink-0 font-mono text-xs font-bold border border-ink/5">
                      ?
                    </span>
                    <span className="font-display text-base font-bold text-ink">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`size-4 text-ink/50 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-spice" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-ink/5 px-5 pb-5 pt-3 text-xs sm:text-sm leading-relaxed text-ink/75 bg-cream/30">
                    <p>{faq.answer}</p>
                    <span className="mt-3 inline-block rounded-md bg-cream px-2.5 py-0.5 font-mono text-[9px] font-bold text-spice border border-ink/5">
                      CATEGORY: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="py-12 text-center text-ink/60">
              <p className="font-display text-lg">No matching questions found.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-2 text-xs text-spice underline"
              >
                Clear search filters
              </button>
            </div>
          )}
        </div>

        {/* Still have questions? Contact Box */}
        <div className="mt-14 rounded-3xl border border-ink/10 bg-frost p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6 shadow-md">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-spice">
              HAVE A SPECIAL REQUEST?
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-ink">
              Still have questions about our kitchen?
            </h3>
            <p className="mt-1 text-xs text-ink/60 max-w-md">
              Speak directly with our head kitchen manager or drop our customer care team a line on WhatsApp.
            </p>
          </div>
          <Button
            onClick={onContactUs}
            className="mt-4 sm:mt-0 rounded-full bg-ink text-cream hover:bg-spice font-bold px-6 h-11 shrink-0 gap-2"
          >
            <PhoneCall className="size-4" />
            <span>Contact Kitchen</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

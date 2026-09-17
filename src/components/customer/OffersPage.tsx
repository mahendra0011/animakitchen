import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tag, Copy, Check, Sparkles, Percent, Gift, Clock, Flame, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface OffersPageProps {
  onBack: () => void;
  onExploreMenu: () => void;
}

interface PromoOffer {
  code: string;
  title: string;
  discount: string;
  minOrder: string;
  description: string;
  tag: string;
  validTill: string;
  featured?: boolean;
}

const OFFERS: PromoOffer[] = [
  {
    code: "PEHLITHALI",
    title: "First Order Welcome Discount",
    discount: "20% OFF",
    minOrder: "Min order ₹199",
    description: "Enjoy a flat 20% discount (up to ₹100) on your very first order of our slow-cooked thalis.",
    tag: "NEW USER EXCLUSIVE",
    validTill: "Valid on first order",
    featured: true,
  },
  {
    code: "DESIGHEE50",
    title: "Pure Cow Desi Ghee Special",
    discount: "FLAT ₹50 OFF",
    minOrder: "Min order ₹299",
    description: "Get flat ₹50 off on any Deluxe Thali or combo meals cooked in 100% cow desi ghee.",
    tag: "THALI SPECIAL",
    validTill: "Valid till Sunday",
    featured: true,
  },
  {
    code: "GULABFREE",
    title: "Complimentary Hot Gulab Jamun",
    discount: "FREE DESSERT",
    minOrder: "Min order ₹249",
    description: "Get a portion of 2 warm melt-in-mouth Gulab Jamuns soaked in cardamom saffron syrup free!",
    tag: "SWEET TREAT",
    validTill: "Limited time offer",
  },
  {
    code: "TIFFINWEEK",
    title: "Weekday Lunch Tiffin Pass Offer",
    discount: "1 DAY FREE",
    minOrder: "On 7-Day Meal Plan",
    description: "Subscribe to our 7-day or 30-day corporate lunch pass and get your 1st day completely free!",
    tag: "SUBSCRIPTION PASS",
    validTill: "Limited seats per hub",
  },
  {
    code: "FAMILYCOMBO",
    title: "Grand Weekend Family Feast",
    discount: "FLAT ₹150 OFF",
    minOrder: "Min order ₹699",
    description: "Ordering for the whole family? Enjoy flat ₹150 off on order of 3 or more thalis + dessert spread.",
    tag: "WEEKEND SAVINGS",
    validTill: "Friday to Sunday",
  },
  {
    code: "FREESHIP",
    title: "Insulated Box Zero Delivery",
    discount: "FREE DELIVERY",
    minOrder: "Min order ₹149",
    description: "Free express delivery in heat-lock insulated packaging anywhere within 6km of Indiranagar Hub.",
    tag: "EVERYDAY PERK",
    validTill: "Always active",
  },
];

export const OffersPage: React.FC<OffersPageProps> = ({ onBack, onExploreMenu }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code "${code}" copied to clipboard!`, {
      description: "Paste it during checkout to claim your savings.",
    });
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="min-h-screen bg-cream text-ink pb-24 sm:pb-12">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-frost/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="grid size-9 place-items-center rounded-full border border-ink/15 bg-frost text-ink hover:bg-ink hover:text-cream transition-all"
            >
              <ArrowLeft className="size-4" />
            </button>
            <div>
              <h1 className="font-display text-xl font-black text-ink leading-tight">
                Exclusive Deals & Offers
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                Anima's Kitchen Promo Codes · 100% Desi Ghee
              </p>
            </div>
          </div>

          <Button
            onClick={onExploreMenu}
            size="sm"
            className="rounded-full bg-spice text-cream hover:bg-ink text-xs font-semibold px-4 gap-1.5"
          >
            <span>Explore Menu</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="border-b border-ink/10 bg-gradient-to-r from-saffron/25 via-spice/15 to-frost py-12">
        <div className="mx-auto max-w-5xl px-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-4 text-spice" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-spice">
              SAVINGS & SPECIALS
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-ink tracking-tight">
            SAVOR HOMEMADE TASTE, <br />
            <span className="text-spice font-serif italic">WITH SWEET SAVINGS.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-ink/75 leading-relaxed">
            Every coupon code is crafted to make your daily lunch and dinner healthy, affordable, and full of authentic Indian warmth.
          </p>
        </div>
      </div>

      {/* Offers List */}
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {OFFERS.map((offer) => {
            const isCopied = copiedCode === offer.code;
            return (
              <div
                key={offer.code}
                className={`relative flex flex-col justify-between rounded-3xl border p-6 backdrop-blur-md transition-all hover:shadow-xl hover:-translate-y-1 ${
                  offer.featured
                    ? "border-spice/30 bg-gradient-to-br from-white to-spice/5 shadow-md"
                    : "border-ink/10 bg-frost/80 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 font-mono text-[10px] font-bold text-spice border border-spice/20">
                      <Tag className="size-3" />
                      {offer.tag}
                    </span>
                    <span className="font-mono text-[10px] text-ink/50 flex items-center gap-1">
                      <Clock className="size-3" />
                      {offer.validTill}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl sm:text-3xl font-black text-ink">
                      {offer.discount}
                    </span>
                    <span className="font-mono text-xs text-ink/60">
                      • {offer.minOrder}
                    </span>
                  </div>

                  <h3 className="mt-1 font-display text-lg font-bold text-ink">
                    {offer.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-ink/70">
                    {offer.description}
                  </p>
                </div>

                {/* Coupon Code Strip */}
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-dashed border-ink/20 bg-cream/90 p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-ink/40">CODE:</span>
                    <span className="font-mono text-sm font-black tracking-wider text-spice">
                      {offer.code}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    variant={isCopied ? "default" : "outline"}
                    onClick={() => handleCopy(offer.code)}
                    className={`h-8 rounded-xl px-3.5 text-xs font-bold transition-all ${
                      isCopied
                        ? "bg-emerald-700 text-white hover:bg-emerald-800"
                        : "border-ink/20 hover:border-spice hover:text-spice bg-white"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="size-3.5 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="size-3 mr-1" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-12 rounded-3xl border border-ink/10 bg-ink text-cream p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6 shadow-xl">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-cream">
              Ready to claim your hot thali?
            </h3>
            <p className="mt-1 text-xs text-cream/70 max-w-lg">
              Pick your favorite dal tadka, handi biryani or weekday tiffin pass and apply your coupon code at checkout.
            </p>
          </div>
          <Button
            onClick={onExploreMenu}
            size="lg"
            className="mt-4 sm:mt-0 rounded-full bg-spice text-cream hover:bg-cream hover:text-ink font-bold px-8 h-12 shadow-lg"
          >
            Order Now & Save
          </Button>
        </div>
      </div>
    </div>
  );
};

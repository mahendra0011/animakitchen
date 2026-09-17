import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Heart, ShieldCheck, Flame, Utensils, CheckCircle2, Award, Clock, ArrowRight } from "lucide-react";
import heroImage from "@/assets/animas-hero-thali.jpg";
import kitchenImage from "@/assets/animas-spice-kitchen.jpg";
import rotiImage from "@/assets/animas-roti-tawa.jpg";

interface AboutUsPageProps {
  onBack: () => void;
  onExploreMenu: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBack, onExploreMenu }) => {
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
                About Anima’s Kitchen
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                Our Story · Heritage · Pure Desi Ghee Cooking
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

      {/* Hero Story Banner */}
      <div className="border-b border-ink/10 bg-gradient-to-b from-frost via-cream to-cream py-16">
        <div className="mx-auto max-w-5xl px-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-spice/25 bg-white/90 px-3.5 py-1 text-xs font-mono font-bold text-spice shadow-sm mb-4">
            <Heart className="size-3.5 fill-spice" />
            ROOTED IN HOME TRADITIONS
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-ink leading-[1.08]">
            SLOW COOKED IN BRASS. <br />
            <span className="text-spice font-serif italic">SERVED WITH UNCONDITIONAL LOVE.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink/75 leading-relaxed">
            Anima’s Kitchen was born out of a simple, universal longing: the taste of genuine home-cooked food that doesn't upset your stomach or taste like industrial catering.
          </p>
        </div>
      </div>

      {/* Visual Story Split */}
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div className="space-y-4 text-sm text-ink/80 leading-relaxed">
            <h3 className="font-display text-2xl font-bold text-ink">
              The Philosophy Behind Every Thali
            </h3>
            <p>
              Founded with the recipes passed down from grandmother Anima Devi, our kitchen refuses the shortcuts taken by modern commercial restaurants. We don't use frozen tomato purees, commercial preservatives, or artificial food colorings.
            </p>
            <p>
              Every morning at 6:00 AM, our chefs stone-grind fresh whole spices: cumin seeds, coriander, green cardamoms, and whole Kashmiri red chilies. Our yellow dals and rajmas simmer slowly in heavy-bottom brass degchis, allowing every grain to absorb the tempering of pure cow desi ghee and fresh garlic.
            </p>
            <div className="rounded-2xl border border-ink/10 bg-frost p-4 font-mono text-xs text-ink/70">
              <span className="font-bold text-spice">"Food cooked in haste is just fuel. Food cooked with patience is medicine."</span>
              <span className="block mt-1 text-[10px] text-ink/40">— Anima Devi’s Kitchen Creed</span>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-ink/10 shadow-xl">
            <img
              src={kitchenImage}
              alt="Anima's Kitchen Brass Degchi and Fresh Spices"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-cream">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-saffron">
                Hub #01 · Indiranagar, Bengaluru
              </span>
              <p className="font-display text-lg font-bold">100% Brass Degchis & Cast Iron Tawas</p>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-spice font-bold">
              OUR UNCOMPROMISING STANDARDS
            </span>
            <h3 className="mt-1 font-display text-3xl font-black text-ink">
              Four Pillars of Anima's Kitchen
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-ink/10 bg-frost/90 p-6 shadow-sm">
              <div className="grid size-12 place-items-center rounded-2xl bg-amber-100 text-amber-800 mb-4">
                <Sparkles className="size-6" />
              </div>
              <h4 className="font-display text-lg font-bold text-ink">100% Desi Cow Ghee</h4>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                Zero cheap vegetable oils or palm oils. We only use pure cow ghee sourced directly from certified dairy farms.
              </p>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-frost/90 p-6 shadow-sm">
              <div className="grid size-12 place-items-center rounded-2xl bg-orange-100 text-orange-800 mb-4">
                <Flame className="size-6" />
              </div>
              <h4 className="font-display text-lg font-bold text-ink">Brass Pot Cooking</h4>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                Slow cooking in traditional brass handis retains 93% of micronutrients and infuses an unmistakable earthen aroma.
              </p>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-frost/90 p-6 shadow-sm">
              <div className="grid size-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-800 mb-4">
                <ShieldCheck className="size-6" />
              </div>
              <h4 className="font-display text-lg font-bold text-ink">Small-Batch Fresh</h4>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                Cooked 3 times daily: 11:30 AM lunch, 4 PM snack, and 7 PM dinner. No yesterday's leftovers, guaranteed.
              </p>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-frost/90 p-6 shadow-sm">
              <div className="grid size-12 place-items-center rounded-2xl bg-blue-100 text-blue-800 mb-4">
                <Clock className="size-6" />
              </div>
              <h4 className="font-display text-lg font-bold text-ink">Heat-Lock Boxes</h4>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                Every thali is packed in insulated, eco-friendly heat-lock compartments that keep rotis soft and dal piping hot.
              </p>
            </div>
          </div>
        </div>

        {/* Hygiene & Kitchen Stats */}
        <div className="mt-16 rounded-3xl border border-ink/10 bg-gradient-to-r from-saffron/15 via-spice/10 to-leaf/10 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="font-display text-3xl sm:text-4xl font-black text-ink">14,200+</span>
              <span className="mt-1 block font-mono text-xs text-ink/60">Happy Foodies Served</span>
            </div>
            <div>
              <span className="font-display text-3xl sm:text-4xl font-black text-spice">4.9 ★</span>
              <span className="mt-1 block font-mono text-xs text-ink/60">Average Customer Rating</span>
            </div>
            <div>
              <span className="font-display text-3xl sm:text-4xl font-black text-leaf">100%</span>
              <span className="mt-1 block font-mono text-xs text-ink/60">Pure Desi Cow Ghee</span>
            </div>
            <div>
              <span className="font-display text-3xl sm:text-4xl font-black text-ink">24 min</span>
              <span className="mt-1 block font-mono text-xs text-ink/60">Avg Delivery Speed</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="font-display text-2xl font-bold text-ink">
            Taste the difference of true homemade cooking
          </h3>
          <p className="mt-2 text-xs text-ink/60 max-w-md mx-auto">
            Experience our legendary Dal Tadka Deluxe Thali, hand-rolled hot rotis and rich paneer tikka today.
          </p>
          <Button
            onClick={onExploreMenu}
            size="lg"
            className="mt-6 rounded-full bg-spice text-cream hover:bg-ink font-bold px-8 h-12 shadow-lg"
          >
            Explore Today's Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

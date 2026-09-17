import React, { useState, useMemo } from "react";
import { useDemoStore } from "@/context/DemoStoreContext";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  Clock,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  Flame,
  Sparkles,
  ShieldCheck,
  Share2,
} from "lucide-react";
import type { SelectedAddon } from "@/types/kitchen";

interface DishDetailPageProps {
  dishId: string;
  onBack: () => void;
}

export const DishDetailPage: React.FC<DishDetailPageProps> = ({ dishId, onBack }) => {
  const { menuItems, thaliAddons, addToCart, cartCount, setCartDrawerOpen } = useDemoStore();

  const item = useMemo(() => {
    return menuItems.find((m) => m.id === dishId) || menuItems[0];
  }, [menuItems, dishId]);

  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [spiceLevel, setSpiceLevel] = useState<"Mild" | "Medium" | "Desi Spicy">("Medium");
  const [cookingNote, setCookingNote] = useState("");
  const [addedToast, setAddedToast] = useState(false);

  if (!item) return null;

  // Project-relevant size options for this item
  const sizeVariants = item.sizeVariants && item.sizeVariants.length > 0
    ? item.sizeVariants
    : item.isThali
      ? [
          { name: "Regular Thali (3 Rotis + Rice)", priceOffset: 0 },
          { name: "Hungry Thali (4 Rotis + Extra Dal)", priceOffset: 49 },
        ]
      : [
          { name: "Regular", priceOffset: 0 },
          { name: "Large Portion", priceOffset: 59 },
        ];

  const currentSize = sizeVariants[selectedSize] || sizeVariants[0];
  const sizeOffset = currentSize.priceOffset || 0;

  // Allowed authentic add-ons for this dish
  const allowedAddons = item.allowedAddons && item.allowedAddons.length > 0
    ? thaliAddons.filter((a) => item.allowedAddons!.includes(a.id))
    : thaliAddons.slice(0, 8);

  const selectedAddonsList: SelectedAddon[] = selectedAddonIds
    .map((id) => thaliAddons.find((a) => a.id === id))
    .filter(Boolean)
    .map((addon) => ({ addon: addon!, quantity: 1 }));

  const addonsTotal = selectedAddonsList.reduce((sum, sa) => sum + sa.addon.price, 0);
  const unitPrice = item.price + sizeOffset + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(
        item,
        selectedAddonsList.length > 0 ? selectedAddonsList : undefined,
        `${currentSize.name}${item.isThali ? ` · ${spiceLevel} spice` : ""}${
          cookingNote ? ` · Note: ${cookingNote}` : ""
        }`,
      );
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
    setCartDrawerOpen(true);
  };

  // Nutrition data fallback if not present
  const nutrition = item.nutrition || {
    calories: item.isThali ? 520 : 340,
    protein: item.isThali ? "18g" : "12g",
    carbs: item.isThali ? "72g" : "48g",
    fat: item.isThali ? "16g" : "10g",
  };

  return (
    <div className="min-h-screen bg-cream text-ink pb-24 sm:pb-12">
      {/* ─── STICKY NAVIGATION BAR ─── */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-frost/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-xs font-bold text-ink shadow-xs hover:border-spice hover:text-spice transition-all"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Menu</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-ink font-display text-xs font-bold text-cream">
              A
            </span>
            <span className="font-display text-sm font-black tracking-tight text-ink hidden sm:inline">
              ANIMA'S KITCHEN
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartDrawerOpen(true)}
              className="relative rounded-full border border-ink/15 bg-white text-ink hover:bg-frost"
            >
              <ShoppingBag className="size-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-spice font-mono text-[9px] text-cream">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* ─── TOAST NOTIFICATION ─── */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-xs font-bold text-cream shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <Check className="size-4 text-emerald-400" />
          <span>Added {item.name} to your cart!</span>
        </div>
      )}

      {/* ─── MAIN PRODUCT DETAIL SECTION ─── */}
      <main className="mx-auto max-w-6xl px-5 py-8 lg:py-12">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-2 font-mono text-[11px] text-ink/50 uppercase tracking-wider">
          <button onClick={onBack} className="hover:text-spice">Home</button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-spice">{item.category}</button>
          <span>/</span>
          <span className="text-ink font-bold">{item.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ════════════ LEFT COLUMN: IMAGE & INCLUSIONS ════════════ */}
          <div className="lg:col-span-6 space-y-6">
            {/* Food Image Card */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-3xl border border-ink/10 bg-white p-3 shadow-xl">
              <div className="relative size-full overflow-hidden rounded-2xl bg-ink/5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60" />

                {/* Top Badges */}
                <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-leaf border border-leaf/20 shadow-sm backdrop-blur-md">
                    <span className="size-2 rounded-full bg-emerald-600" />
                    Pure Veg
                  </span>

                  {item.badge && (
                    <span className="rounded-full bg-spice px-3 py-1 font-mono text-xs font-black uppercase tracking-wider text-cream shadow-sm">
                      {item.badge}
                    </span>
                  )}

                  {item.isTodaySpecial && !item.badge && (
                    <span className="rounded-full bg-saffron px-3 py-1 font-mono text-xs font-bold text-ink shadow-sm">
                      🔥 TODAY'S SPECIAL
                    </span>
                  )}
                </div>

                {/* Prep Time Bottom Right */}
                <div className="absolute bottom-3.5 right-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 font-mono text-xs font-bold text-cream backdrop-blur-md">
                    <Clock className="size-3.5 text-saffron" />
                    {item.preparationTimeMinutes} min fresh
                  </span>
                </div>
              </div>
            </div>

            {/* What's Included in this Thali (For Thali Dishes) */}
            {item.includedItems && item.includedItems.length > 0 && (
              <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-ink/8 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-spice block">
                      HOMESTYLE THALI SPREAD
                    </span>
                    <h3 className="font-display text-xl font-extrabold text-ink mt-0.5">
                      What's Included in this Thali
                    </h3>
                  </div>
                  <span className="rounded-full bg-leaf/10 border border-leaf/20 px-3 py-1 font-mono text-xs font-bold text-leaf">
                    {item.includedItems.length} items
                  </span>
                </div>

                <p className="text-xs text-ink/70">
                  Every bowl is freshly prepared using cold-pressed oils, pure cow desi ghee, and ground spices:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {item.includedItems.map((inc) => (
                    <div
                      key={inc}
                      className="flex items-center gap-2.5 rounded-2xl border border-ink/8 bg-frost p-3"
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf/15 text-leaf">
                        <Check className="size-3.5" />
                      </span>
                      <span className="text-xs font-bold text-ink">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality & Hygeine Promise Card */}
            <div className="rounded-3xl border border-ink/10 bg-gradient-to-r from-saffron/10 via-white to-spice/5 p-5 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-spice/10 text-spice shrink-0">
                <ShieldCheck className="size-6 text-spice" />
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-ink">
                  100% Homestyle Hygiene Promise
                </h4>
                <p className="text-xs text-ink/65 mt-0.5">
                  No artificial preservatives, no palm oil, and packed hot in sealed food-grade containers.
                </p>
              </div>
            </div>
          </div>

          {/* ════════════ RIGHT COLUMN: CUSTOMIZATION & NUTRITION ════════════ */}
          <div className="lg:col-span-6 space-y-6">
            {/* Title & Rating */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-ink/5 px-3 py-1 font-mono text-xs font-semibold text-ink/70">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900 border border-amber-200">
                  <Star className="size-3.5 fill-amber-500 text-amber-500" />
                  <span>{item.rating}</span>
                  <span className="text-amber-700/60 font-normal">({item.reviewCount}+ ratings)</span>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
                {item.name}
              </h1>

              <p className="text-sm sm:text-base text-ink/75 leading-relaxed pt-1">
                {item.description}
              </p>
            </div>

            {/* Price Row */}
            <div className="rounded-2xl border border-ink/10 bg-white p-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-ink/50 block">
                  Total Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl sm:text-4xl font-black text-spice">
                    ₹{unitPrice}
                  </span>
                  {sizeOffset > 0 && (
                    <span className="font-mono text-xs text-ink/50">
                      (Base ₹{item.price} + Size ₹{sizeOffset})
                    </span>
                  )}
                </div>
              </div>

              <span className="rounded-xl bg-spice/10 px-3 py-1 text-xs font-bold text-spice font-mono">
                Tax & Packaging Included
              </span>
            </div>

            {/* Size Variants (Authentic Homestyle Options) */}
            <div className="space-y-2.5">
              <label className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70 block">
                Select Size
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sizeVariants.map((sv, idx) => {
                  const isSelected = selectedSize === idx;
                  return (
                    <button
                      key={sv.name}
                      type="button"
                      onClick={() => setSelectedSize(idx)}
                      className={`flex items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? "border-spice bg-spice/10 font-bold text-spice shadow-xs scale-[1.01]"
                          : "border-ink/12 bg-white text-ink/80 hover:border-ink/25"
                      }`}
                    >
                      <span className="text-xs font-semibold">{sv.name}</span>
                      <span className="font-mono text-xs font-bold">
                        {sv.priceOffset > 0 ? `+₹${sv.priceOffset}` : "Standard"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spice Level (For Thali & Main Dishes) */}
            {item.isThali && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70 flex items-center gap-1.5">
                    <Flame className="size-3.5 text-spice" />
                    Spice Level
                  </label>
                  <span className="text-[10px] text-ink/50 font-mono">Chef customized</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {(["Mild", "Medium", "Desi Spicy"] as const).map((lvl) => {
                    const isSelected = spiceLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSpiceLevel(lvl)}
                        className={`rounded-2xl border p-3 text-center transition-all ${
                          isSelected
                            ? "border-spice bg-spice/10 font-bold text-spice shadow-xs scale-[1.01]"
                            : "border-ink/12 bg-white text-ink/70 hover:border-ink/25"
                        }`}
                      >
                        <p className="text-xs font-bold">{lvl}</p>
                        <span className="text-[10px] text-ink/50 block mt-0.5">
                          {lvl === "Mild" ? "Mild Hing" : lvl === "Medium" ? "Balanced" : "Extra Tadka"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Authentic Add-ons Grid (Project-specific accompaniments) */}
            {allowedAddons.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70 flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-saffron" />
                    Add-ons & Fresh Extras (Optional)
                  </label>
                  <span className="text-[10px] text-ink/50 font-mono">Hot per plate</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {allowedAddons.map((addon) => {
                    const isSelected = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-center justify-between rounded-2xl border p-3 cursor-pointer select-none transition-all ${
                          isSelected
                            ? "border-spice bg-spice/10 shadow-xs"
                            : "border-ink/10 bg-white hover:border-ink/25"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <span className="block text-xs font-bold text-ink truncate">
                            {addon.name}
                          </span>
                          <span className="text-[10px] text-ink/50 font-mono">
                            {addon.portion}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-xs font-bold text-spice">
                            +₹{addon.price}
                          </span>
                          <span
                            className={`grid size-5 place-items-center rounded-full border text-[10px] ${
                              isSelected
                                ? "border-spice bg-spice text-cream"
                                : "border-ink/20 text-transparent"
                            }`}
                          >
                            ✓
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper + Add to Cart Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <div className="flex items-center justify-between sm:justify-start gap-2 rounded-2xl border border-ink/15 bg-white px-3 py-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="grid size-9 place-items-center rounded-xl text-ink hover:bg-frost transition-colors"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center font-mono text-base font-bold text-ink">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="grid size-9 place-items-center rounded-xl text-ink hover:bg-frost transition-colors"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!item.isAvailable}
                className="flex-1 rounded-2xl bg-spice hover:bg-ink text-cream font-bold py-4 h-auto text-base shadow-xl shadow-spice/25 transition-all gap-2"
              >
                <ShoppingBag className="size-5" />
                <span>Add to Cart — ₹{totalPrice}</span>
              </Button>
            </div>

            {/* ════════════ WHAT'S INSIDE NUTRITION SECTION (EXACT USER SPEC) ════════════ */}
            <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/50 block">
                    NUTRITIONAL TRANSPARENCY
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-ink mt-0.5">
                    What's Inside
                  </h3>
                </div>
                <span className="font-mono text-xs text-spice font-bold bg-spice/10 px-3 py-1 rounded-full">
                  100% Homestyle
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {/* Calories */}
                <div className="rounded-2xl border border-ink/8 bg-frost p-3.5 text-center">
                  <span className="block font-display text-xl sm:text-2xl font-black text-ink">
                    {nutrition.calories}kcal
                  </span>
                  <span className="block text-xs font-semibold text-ink/60 mt-1">
                    Calories
                  </span>
                </div>

                {/* Protein */}
                <div className="rounded-2xl border border-ink/8 bg-frost p-3.5 text-center">
                  <span className="block font-display text-xl sm:text-2xl font-black text-spice">
                    {nutrition.protein}
                  </span>
                  <span className="block text-xs font-semibold text-ink/60 mt-1">
                    Protein
                  </span>
                </div>

                {/* Carbs */}
                <div className="rounded-2xl border border-ink/8 bg-frost p-3.5 text-center">
                  <span className="block font-display text-xl sm:text-2xl font-black text-saffron">
                    {nutrition.carbs}
                  </span>
                  <span className="block text-xs font-semibold text-ink/60 mt-1">
                    Carbs
                  </span>
                </div>

                {/* Fat */}
                <div className="rounded-2xl border border-ink/8 bg-frost p-3.5 text-center">
                  <span className="block font-display text-xl sm:text-2xl font-black text-leaf">
                    {nutrition.fat}
                  </span>
                  <span className="block text-xs font-semibold text-ink/60 mt-1">
                    Fat
                  </span>
                </div>
              </div>

              {/* Exact user requested disclaimer */}
              <p className="text-xs text-ink/50 italic text-center sm:text-left">
                * Approximate values. Actual nutrition may vary by size and add-ons.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ─── ANDROID MOBILE STICKY BOTTOM ACTION BAR ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink/10 bg-cream/95 p-3.5 backdrop-blur-xl shadow-2xl lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div className="flex items-center justify-between gap-1 rounded-2xl border border-ink/15 bg-white px-2 py-1.5 shadow-xs shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="grid size-9 place-items-center rounded-xl text-ink hover:bg-frost transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-7 text-center font-mono text-base font-bold text-ink">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="grid size-9 place-items-center rounded-xl text-ink hover:bg-frost transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!item.isAvailable}
            className="flex-1 rounded-2xl bg-spice hover:bg-ink text-cream font-bold py-3.5 h-auto text-sm shadow-lg shadow-spice/25 transition-all gap-2"
          >
            <ShoppingBag className="size-4" />
            <span>Add — ₹{totalPrice}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

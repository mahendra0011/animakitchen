import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  Plus,
  ShoppingBag,
  Sparkles,
  Timer,
  User,
  Navigation,
  LogOut,
  Flame,
  Star,
  ShieldCheck,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { DemoStoreProvider, useDemoStore } from "@/context/DemoStoreContext";
import { CustomerMenuSection } from "@/components/customer/CustomerMenuSection";
import { ThaliCustomizerModal } from "@/components/customer/ThaliCustomizerModal";
import { CartDrawer } from "@/components/customer/CartDrawer";
import { CheckoutModal } from "@/components/customer/CheckoutModal";
import { LiveTrackingView } from "@/components/customer/LiveTrackingView";
import { FullMenuPage } from "@/components/customer/FullMenuPage";
import { DishDetailPage } from "@/components/customer/DishDetailPage";
import { OffersPage } from "@/components/customer/OffersPage";
import { AboutUsPage } from "@/components/customer/AboutUsPage";
import { ReviewsPage } from "@/components/customer/ReviewsPage";
import { FaqPage } from "@/components/customer/FaqPage";
import { ContactPage } from "@/components/customer/ContactPage";
import { TiffinSubscriptionSection } from "@/components/customer/TiffinSubscriptionSection";
import { CustomerProfileDrawer } from "@/components/customer/CustomerProfileDrawer";
import { CustomerDashboardView } from "@/components/customer/CustomerDashboardView";
import { DeliveryPartnerView } from "@/components/delivery/DeliveryPartnerView";
import { AdminDashboardView } from "@/components/admin/AdminDashboardView";
import { AuthModal } from "@/components/auth/AuthModal";

import heroThali from "@/assets/animas-hero-thali.jpg";
import dalSpecial from "@/assets/animas-dal-special.jpg";
import rotiImage from "@/assets/animas-roti-tawa.jpg";
import rajmaImage from "@/assets/animas-rajma-chawal.jpg";
import spiceKitchenImage from "@/assets/animas-spice-kitchen.jpg";
import gulabJamunImage from "@/assets/animas-gulab-jamun.jpg";
import lunchSpreadImage from "@/assets/animas-lunch-spread.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anima’s Kitchen — Hot, Warm, Homemade Indian Food & Tiffin" },
      {
        name: "description",
        content:
          "Order fresh Indian home food, thalis with customizable add-ons, weekday tiffin subscriptions, and live GPS delivery tracking.",
      },
      { property: "og:title", content: "Anima’s Kitchen — Hot, Warm, Homemade" },
      {
        property: "og:description",
        content:
          "Order fresh Indian home food, thalis with customizable add-ons, weekday tiffin subscriptions, and live GPS delivery tracking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <DemoStoreProvider>
      <MainAppContent />
      <Toaster position="top-right" richColors />
    </DemoStoreProvider>
  );
}

function MainAppContent() {
  const {
    activeRole,
    isAuthenticated,
    currentUser,
    logout,
    setAuthModalOpen,
    setAuthModalTab,
    trackingViewOpen,
    setTrackingViewOpen,
    cartCount,
    setCartDrawerOpen,
    setProfileDrawerOpen,
    activeOrder,
    menuItems,
    setThaliModalItem,
    addToCart,
  } = useDemoStore();

  const [areaChecked, setAreaChecked] = useState(false);
  type CustomerPage = "home" | "menu" | "offers" | "about" | "reviews" | "faq" | "contact" | "dashboard";
  const [customerPage, setCustomerPage] = useState<CustomerPage>("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedDishPageId, setSelectedDishPageId] = useState<string | null>(null);

  return (
    <main className="min-h-screen overflow-x-hidden bg-cream text-ink pb-20 lg:pb-0">
      {/* Role-Based Rendering */}
      {activeRole === "rider" && <DeliveryPartnerView />}

      {activeRole === "admin" && <AdminDashboardView initialTab="overview" />}

      {activeRole === "kds" && <AdminDashboardView initialTab="kds" />}

      {activeRole === "customer" && (
        <>
          {trackingViewOpen ? (
            <LiveTrackingView />
          ) : selectedDishPageId ? (
            <DishDetailPage
              dishId={selectedDishPageId}
              onBack={() => setSelectedDishPageId(null)}
            />
          ) : customerPage === "dashboard" ? (
            <CustomerDashboardView
              onBackToStore={() => setCustomerPage("home")}
              onOpenDishPage={(id) => setSelectedDishPageId(id)}
            />
          ) : customerPage === "menu" ? (
            <FullMenuPage
              onBack={() => setCustomerPage("home")}
              onOpenDishPage={(id) => setSelectedDishPageId(id)}
            />
          ) : customerPage === "offers" ? (
            <OffersPage
              onBack={() => setCustomerPage("home")}
              onExploreMenu={() => setCustomerPage("menu")}
            />
          ) : customerPage === "about" ? (
            <AboutUsPage
              onBack={() => setCustomerPage("home")}
              onExploreMenu={() => setCustomerPage("menu")}
            />
          ) : customerPage === "reviews" ? (
            <ReviewsPage
              onBack={() => setCustomerPage("home")}
              onExploreMenu={() => setCustomerPage("menu")}
            />
          ) : customerPage === "faq" ? (
            <FaqPage
              onBack={() => setCustomerPage("home")}
              onExploreMenu={() => setCustomerPage("menu")}
              onContactUs={() => setCustomerPage("contact")}
            />
          ) : customerPage === "contact" ? (
            <ContactPage
              onBack={() => setCustomerPage("home")}
              onExploreMenu={() => setCustomerPage("menu")}
            />
          ) : (
            <>
              {/* Customer App Navigation Header */}
              <header className="sticky top-0 z-40 border-b border-ink/10 bg-frost/90 backdrop-blur-xl transition-all">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3">
                  {/* Left: Brand Logo */}
                  <button
                    onClick={() => setCustomerPage("home")}
                    className="flex items-center gap-2.5 sm:gap-3 text-left shrink-0"
                    aria-label="Anima’s Kitchen home"
                  >
                    <span className="grid size-9 sm:size-10 place-items-center rounded-2xl bg-ink font-display text-lg font-bold leading-none text-cream shadow-sm">
                      A
                    </span>
                    <div>
                      <span className="block font-display text-lg sm:text-xl font-extrabold leading-none tracking-tight text-ink">
                        ANIMA’S KITCHEN
                      </span>
                      <span className="mt-1 hidden sm:block font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50">
                        home food · since the stove
                      </span>
                    </div>
                  </button>

                  {/* Center: Desktop Navigation Links (Cleanly spaced, whitespace-nowrap) */}
                  <nav
                    className="hidden items-center gap-5 xl:gap-7 font-body text-sm font-semibold text-ink/75 lg:flex"
                    aria-label="Main navigation"
                  >
                    <button
                      onClick={() => setCustomerPage("menu")}
                      className={`whitespace-nowrap transition-colors hover:text-spice ${
                        customerPage === "menu" ? "text-spice font-bold" : ""
                      }`}
                    >
                      Menu
                    </button>
                    <button
                      onClick={() => setCustomerPage("offers")}
                      className={`whitespace-nowrap transition-colors hover:text-spice ${
                        customerPage === "offers" ? "text-spice font-bold" : ""
                      }`}
                    >
                      Offers
                    </button>
                    <button
                      onClick={() => setCustomerPage("about")}
                      className={`whitespace-nowrap transition-colors hover:text-spice ${
                        customerPage === "about" ? "text-spice font-bold" : ""
                      }`}
                    >
                      About Us
                    </button>
                    <button
                      onClick={() => setCustomerPage("reviews")}
                      className={`whitespace-nowrap transition-colors hover:text-spice ${
                        customerPage === "reviews" ? "text-spice font-bold" : ""
                      }`}
                    >
                      Reviews
                    </button>
                    <button
                      onClick={() => setCustomerPage("faq")}
                      className={`whitespace-nowrap transition-colors hover:text-spice ${
                        customerPage === "faq" ? "text-spice font-bold" : ""
                      }`}
                    >
                      FAQ
                    </button>
                    <button
                      onClick={() => setCustomerPage("contact")}
                      className={`whitespace-nowrap transition-colors hover:text-spice ${
                        customerPage === "contact" ? "text-spice font-bold" : ""
                      }`}
                    >
                      Contact
                    </button>
                  </nav>

                  {/* Right: Actions (Responsive for Mobile & Desktop) */}
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    {/* Desktop Auth State */}
                    {!isAuthenticated ? (
                      <div className="hidden lg:flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setAuthModalTab("login");
                            setAuthModalOpen(true);
                          }}
                          className="rounded-full px-3.5 text-xs font-semibold text-ink hover:text-spice hover:bg-cream/80"
                        >
                          Sign In
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setAuthModalTab("signup");
                            setAuthModalOpen(true);
                          }}
                          className="rounded-full bg-spice px-4 text-xs font-semibold text-cream hover:bg-ink shadow-sm"
                        >
                          Create Account
                        </Button>
                      </div>
                    ) : (
                      <div className="hidden lg:flex items-center gap-2">
                        <button
                          onClick={() => setCustomerPage("dashboard")}
                          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                            customerPage === "dashboard"
                              ? "border-spice bg-spice/10 text-spice font-bold shadow-xs"
                              : "border-ink/15 bg-white/80 text-ink hover:border-spice"
                          }`}
                          title="Open Customer Dashboard"
                        >
                          <span className="grid size-5 place-items-center rounded-full bg-ink text-cream text-[10px] font-bold">
                            {currentUser?.name?.charAt(0) || "U"}
                          </span>
                          <span className="truncate max-w-[100px]">
                            {currentUser?.name?.split(" ")[0]}
                          </span>
                          <span className="text-[10px] text-spice font-mono uppercase font-bold">
                            Dashboard
                          </span>
                        </button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={logout}
                          className="h-8 rounded-full px-2.5 text-xs font-medium text-ink/70 hover:text-red-600 hover:bg-red-50 gap-1"
                          title="Logout"
                        >
                          <LogOut className="size-3.5" />
                          <span>Logout</span>
                        </Button>
                      </div>
                    )}

                    {/* Cart Trigger (Always visible on mobile & desktop) */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative size-9 rounded-full border border-ink/12 bg-white/80 text-ink hover:bg-white shadow-xs shrink-0"
                      onClick={() => setCartDrawerOpen(true)}
                      aria-label={`Open cart with ${cartCount} items`}
                    >
                      <ShoppingBag className="size-4" />
                      {cartCount > 0 && (
                        <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-spice font-mono text-[9px] font-bold text-cream animate-in zoom-in">
                          {cartCount}
                        </span>
                      )}
                    </Button>

                    {/* Mobile User Icon / Dashboard Trigger (Visible only on mobile/tablet) */}
                    <button
                      onClick={() => {
                        if (isAuthenticated) {
                          setCustomerPage("dashboard");
                        } else {
                          setAuthModalTab("login");
                          setAuthModalOpen(true);
                        }
                      }}
                      className="grid size-9 place-items-center rounded-full border border-ink/12 bg-white/80 text-ink hover:bg-white shadow-xs lg:hidden shrink-0"
                      aria-label={isAuthenticated ? "Open Dashboard" : "Sign In"}
                      title={isAuthenticated ? "Open Dashboard" : "Sign In"}
                    >
                      {isAuthenticated ? (
                        <span className="grid size-6 place-items-center rounded-full bg-ink text-cream text-[10px] font-bold">
                          {currentUser?.name?.charAt(0) || "U"}
                        </span>
                      ) : (
                        <User className="size-4 text-ink/80" />
                      )}
                    </button>

                    {/* Mobile Navigation Menu Toggle */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9 rounded-full border border-ink/12 bg-white/80 text-ink hover:bg-white shadow-xs lg:hidden shrink-0"
                      onClick={() => setMobileNavOpen((o) => !o)}
                      aria-label="Toggle Navigation Menu"
                    >
                      {mobileNavOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
                    </Button>

                    {/* Order Thali Button - Only on Desktop/Tablet to avoid mobile crowding */}
                    <Button
                      className="hidden md:inline-flex rounded-full bg-ink px-4 py-2 font-body text-xs font-bold text-cream shadow-none transition-all hover:-translate-y-0.5 hover:bg-spice shrink-0"
                      onClick={() => {
                        const dalThali = menuItems[0];
                        if (dalThali) setThaliModalItem(dalThali);
                      }}
                    >
                      Order Thali
                    </Button>
                  </div>
                </div>

                {/* Mobile Navigation Dropdown Drawer */}
                {mobileNavOpen && (
                  <div className="border-t border-ink/10 bg-frost/98 px-4 py-4 backdrop-blur-2xl shadow-xl lg:hidden animate-in slide-in-from-top-2 duration-200">
                    {/* User Card if Authenticated or Sign In CTA */}
                    <div className="mb-3">
                      {isAuthenticated ? (
                        <div className="flex items-center justify-between rounded-2xl bg-ink p-3 text-cream">
                          <div className="flex items-center gap-2.5">
                            <span className="grid size-8 place-items-center rounded-full bg-cream text-ink font-bold text-xs">
                              {currentUser?.name?.charAt(0) || "U"}
                            </span>
                            <div>
                              <span className="text-xs font-bold block">{currentUser?.name}</span>
                              <span className="text-[10px] text-cream/60 font-mono block">Customer Account</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setCustomerPage("dashboard");
                                setMobileNavOpen(false);
                              }}
                              className="rounded-lg bg-spice px-2.5 py-1 text-[11px] font-bold text-cream hover:bg-white hover:text-ink transition-colors"
                            >
                              Dashboard
                            </button>
                            <button
                              onClick={logout}
                              className="rounded-lg bg-white/10 p-1 text-cream hover:bg-red-600 transition-colors"
                              title="Logout"
                            >
                              <LogOut className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-ink/10 bg-cream/70 p-2.5">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setAuthModalTab("login");
                              setAuthModalOpen(true);
                              setMobileNavOpen(false);
                            }}
                            className="rounded-xl border-ink/20 text-xs font-bold bg-white text-ink"
                          >
                            Sign In
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setAuthModalTab("signup");
                              setAuthModalOpen(true);
                              setMobileNavOpen(false);
                            }}
                            className="rounded-xl bg-spice text-xs font-bold text-cream hover:bg-ink"
                          >
                            Create Account
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Nav Link List */}
                    <div className="flex flex-col gap-1 font-body text-sm font-semibold">
                      <button
                        onClick={() => {
                          setCustomerPage("dashboard");
                          setMobileNavOpen(false);
                        }}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                          customerPage === "dashboard"
                            ? "bg-spice text-cream font-bold"
                            : "text-ink hover:bg-cream/60"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <User className="size-4 text-spice" />
                          <span>👤 My Customer Dashboard</span>
                        </span>
                        <ArrowRight className="size-3.5 opacity-50" />
                      </button>

                      <button
                        onClick={() => {
                          setCustomerPage("menu");
                          setMobileNavOpen(false);
                        }}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                          customerPage === "menu"
                            ? "bg-spice text-cream font-bold"
                            : "text-ink hover:bg-cream/60"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span>🍽️</span>
                          <span>Complete Menu (20+ Dishes)</span>
                        </span>
                        <ArrowRight className="size-3.5 opacity-50" />
                      </button>

                      <button
                        onClick={() => {
                          setCustomerPage("offers");
                          setMobileNavOpen(false);
                        }}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                          customerPage === "offers"
                            ? "bg-spice text-cream font-bold"
                            : "text-ink hover:bg-cream/60"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span>🏷️</span>
                          <span>Deals & Promo Codes</span>
                        </span>
                        <ArrowRight className="size-3.5 opacity-50" />
                      </button>

                      <button
                        onClick={() => {
                          setCustomerPage("about");
                          setMobileNavOpen(false);
                        }}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                          customerPage === "about"
                            ? "bg-spice text-cream font-bold"
                            : "text-ink hover:bg-cream/60"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span>📖</span>
                          <span>About Anima’s Kitchen</span>
                        </span>
                        <ArrowRight className="size-3.5 opacity-50" />
                      </button>

                      <button
                        onClick={() => {
                          setCustomerPage("reviews");
                          setMobileNavOpen(false);
                        }}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                          customerPage === "reviews"
                            ? "bg-spice text-cream font-bold"
                            : "text-ink hover:bg-cream/60"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span>⭐</span>
                          <span>Customer Reviews (4.9★)</span>
                        </span>
                        <ArrowRight className="size-3.5 opacity-50" />
                      </button>

                      <button
                        onClick={() => {
                          setCustomerPage("faq");
                          setMobileNavOpen(false);
                        }}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                          customerPage === "faq"
                            ? "bg-spice text-cream font-bold"
                            : "text-ink hover:bg-cream/60"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span>❓</span>
                          <span>Frequently Asked Questions</span>
                        </span>
                        <ArrowRight className="size-3.5 opacity-50" />
                      </button>

                      <button
                        onClick={() => {
                          setCustomerPage("contact");
                          setMobileNavOpen(false);
                        }}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                          customerPage === "contact"
                            ? "bg-spice text-cream font-bold"
                            : "text-ink hover:bg-cream/60"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span>📍</span>
                          <span>Contact & WhatsApp Help</span>
                        </span>
                        <ArrowRight className="size-3.5 opacity-50" />
                      </button>
                    </div>

                    {/* Quick Order Button in Drawer */}
                    <div className="mt-3 pt-3 border-t border-ink/10">
                      <Button
                        className="w-full rounded-xl bg-spice py-3 text-xs font-bold text-cream hover:bg-ink shadow-sm"
                        onClick={() => {
                          setMobileNavOpen(false);
                          const dalThali = menuItems[0];
                          if (dalThali) setThaliModalItem(dalThali);
                        }}
                      >
                        Order Dal Tadka Thali — ₹180
                      </Button>
                    </div>
                  </div>
                )}
              </header>

              {/* Premium Culinary Hero Section */}
              <section id="top" className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FDFBF7] to-[#F5EFE6] py-12 md:py-20 border-b border-ink/10">
                {/* Subtle, refined ambient warmth */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-saffron/15 blur-[90px]" />
                  <div className="absolute -bottom-20 left-10 h-80 w-80 rounded-full bg-spice/10 blur-[80px]" />
                </div>

                <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-12">
                  {/* Left Column: Headline, Story & Direct Actions */}
                  <div className="md:col-span-6 lg:col-span-6 space-y-6">
                    {/* Live Kitchen Status Pill */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-spice/20 bg-white/90 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spice opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-spice" />
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-spice">
                        Indiranagar Hub #01 Live
                      </span>
                      <span className="text-ink/20 font-mono">|</span>
                      <span className="font-mono text-[11px] font-semibold text-ink/70">
                        100% Desi Cow Ghee
                      </span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-ink">
                      HOT. FRESH. <br />
                      <span className="text-spice italic font-serif font-bold">HOMEMADE</span> <span className="text-spice">THALIS.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="max-w-[46ch] font-body text-sm sm:text-base text-ink/75 leading-relaxed">
                      Steel thalis that arrive steaming hot — slow-simmered yellow dal tadka, charred paneer tikka, hand-rolled desi ghee rotis and aromatic jeera rice. Cooked in small brass & iron batches, never frozen.
                    </p>

                    {/* Action CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
                      <Button
                        className="w-full sm:w-auto rounded-full bg-spice px-7 py-3.5 font-body text-sm font-bold text-cream shadow-lg shadow-spice/25 transition-all hover:-translate-y-0.5 hover:bg-ink hover:shadow-xl h-auto justify-center"
                        onClick={() => {
                          const dalThali = menuItems[0];
                          if (dalThali) setSelectedDishPageId(dalThali.id);
                        }}
                      >
                        <span>Customize Your Thali</span>
                        <ArrowRight className="size-4 ml-2" />
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full sm:w-auto rounded-full border-ink/20 bg-white/80 px-6 py-3.5 font-body text-sm font-bold text-ink backdrop-blur shadow-sm hover:border-spice hover:bg-white hover:text-spice h-auto justify-center"
                        onClick={() => setCustomerPage("menu")}
                      >
                        <span>Explore Menu</span>
                        <ArrowRight className="size-4 ml-1.5" />
                      </Button>
                    </div>

                    {/* Trust & Performance Metrics */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-ink/10 pt-5 font-mono text-xs">
                      <div>
                        <span className="font-display text-lg sm:text-xl font-bold text-ink block">24 Mins</span>
                        <span className="text-[10px] sm:text-[11px] text-ink/60">Avg Delivery</span>
                      </div>
                      <div>
                        <span className="font-display text-lg sm:text-xl font-bold text-emerald-700 block">4.9 ★</span>
                        <span className="text-[10px] sm:text-[11px] text-ink/60">14k+ Foodies</span>
                      </div>
                      <div>
                        <span className="font-display text-lg sm:text-xl font-bold text-spice block">100% Fresh</span>
                        <span className="text-[10px] sm:text-[11px] text-ink/60">No Preservatives</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Mouth-Watering Visual Thali Showcase */}
                  <div className="md:col-span-6 lg:col-span-6 flex justify-center">
                    <div className="relative w-full max-w-lg rounded-[36px] bg-white/90 p-3.5 shadow-2xl shadow-ink/10 border border-ink/10 backdrop-blur-md">
                      {/* Animated Steam */}
                      <div className="absolute -top-7 left-1/2 flex -translate-x-1/2 gap-2.5 pointer-events-none z-20">
                        <span className="steam block h-16 w-2 rounded-full bg-white/80 blur-[2px]" />
                        <span className="steam block h-20 w-3 rounded-full bg-white/80 blur-[2px] [animation-delay:-1.2s]" />
                        <span className="steam block h-14 w-2.5 rounded-full bg-white/80 blur-[2px] [animation-delay:-2.4s]" />
                      </div>

                      {/* Main Photo Container */}
                      <div className="relative overflow-hidden rounded-[28px] aspect-square w-full">
                        <img
                          src={heroThali}
                          alt="Authentic Indian Dal Tadka Thali with Paneer and Roti"
                          width={1200}
                          height={1200}
                          className="size-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {/* Soft bottom vignette so card text stays crisp */}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20 pointer-events-none" />

                        {/* Top Left Floating Tag */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 font-mono text-[10px] font-bold text-saffron backdrop-blur-md border border-white/10 shadow-md">
                            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            COOKING IN BRASS POTS
                          </span>
                        </div>

                        {/* Top Right Tag */}
                        <div className="absolute top-4 right-4">
                          <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold text-ink backdrop-blur-md shadow-md">
                            PURE COW GHEE
                          </span>
                        </div>

                        {/* Clean Integrated Bottom Food Card (No Overflow / No Awkward Hanging) */}
                        <div
                          onClick={() => {
                            const dalThali = menuItems[0];
                            if (dalThali) setSelectedDishPageId(dalThali.id);
                          }}
                          className="absolute bottom-3.5 left-3.5 right-3.5 rounded-2xl border border-white/30 bg-white/95 p-3.5 shadow-xl backdrop-blur-xl flex items-center justify-between gap-3 cursor-pointer hover:bg-white transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-spice bg-spice/10 px-2 py-0.5 rounded-md">
                                TODAY'S BESTSELLER
                              </span>
                              <span className="font-mono text-[10px] text-emerald-700 font-bold">
                                ★ 4.9 (850+)
                              </span>
                            </div>
                            <h3 className="font-display text-base font-bold text-ink leading-tight truncate">
                              Dal Tadka Deluxe Thali
                            </h3>
                            <p className="text-[11px] text-ink/60 truncate">
                              Yellow Dal Tadka + 2 Desi Ghee Rotis + Jeera Rice
                            </p>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0">
                            <span className="font-mono text-base font-bold text-ink">₹180</span>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                const dalThali = menuItems[0];
                                if (dalThali) addToCart(dalThali);
                              }}
                              className="rounded-xl bg-spice text-white hover:bg-spice/90 text-xs font-bold px-3.5 h-8 shadow-sm gap-1"
                            >
                              <Plus className="size-3.5" />
                              <span>Add</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Complete Interactive Menu Section with Add-ons Bar */}
              <CustomerMenuSection
                onOpenDishPage={(id) => setSelectedDishPageId(id)}
                onViewFullMenu={() => setCustomerPage("menu")}
              />

              {/* Fresh From The Tawa Section */}
              <section id="tawa" className="border-y border-ink/10 bg-saffron/20 py-16">
                <div className="mx-auto max-w-6xl px-5">
                  <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
                    <img
                      src={rotiImage}
                      alt="Fresh puffed rotis on a hot iron tawa with ghee"
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-[min(3vw,28px)] object-cover shadow-xl shadow-ink/10"
                    />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-spice">
                        (d) — straight off the tawa
                      </p>
                      <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl">
                        Soft rotis.
                        <br />
                        <span className="text-spice">Pure Desi Ghee.</span>
                      </h2>
                      <p className="mt-4 max-w-[38ch] font-body text-sm leading-6 text-ink/70">
                        Every roti is hand-rolled, puffed on iron tawa, and brushed with pure desi cow ghee just before leaving our kitchen in insulated containers.
                      </p>
                      <Button
                        className="mt-6 rounded-full bg-ink px-6 py-2.5 font-body text-sm font-semibold text-cream shadow-none hover:bg-spice"
                        onClick={() => {
                          const tawaRoti = menuItems.find((m) => m.name.includes("Tawa Roti")) || menuItems[0];
                          addToCart(tawaRoti);
                        }}
                      >
                        Add Desi Ghee Rotis · ₹60 <Plus className="size-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Comfort Bowl Section */}
              <section id="comfort" className="bg-cream py-16">
                <div className="mx-auto max-w-6xl px-5">
                  <div className="grid items-center gap-8 md:grid-cols-2">
                    <div className="order-2 md:order-1">
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-leaf font-bold">
                        (e) — ghar jaisa lunch
                      </p>
                      <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl">
                        Jammu Rajma Chawal,
                        <br />
                        <span className="text-leaf">no shortcuts.</span>
                      </h2>
                      <p className="mt-4 max-w-[38ch] font-body text-sm leading-6 text-ink/70">
                        Red kidney beans simmered low and slow, fluffy basmati rice, sharp pickled onions and a spoonful of homemade mango pickle—the kind of lunch that brings back childhood memories.
                      </p>
                      <div className="mt-6 flex items-center gap-4">
                        <span className="font-display text-3xl">₹180</span>
                        <Button
                          className="rounded-full bg-leaf px-6 py-2.5 font-body text-sm font-semibold text-cream shadow-none hover:bg-ink"
                          onClick={() => {
                            const rajma = menuItems.find((m) => m.name.includes("Rajma")) || menuItems[0];
                            addToCart(rajma);
                          }}
                        >
                          Add to Order <Plus className="size-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                    <img
                      src={rajmaImage}
                      alt="Rajma chawal with onion salad and pickle in a brass thali"
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="order-1 aspect-[4/3] w-full rounded-[min(3vw,28px)] object-cover shadow-xl md:order-2"
                    />
                  </div>
                </div>
              </section>

              {/* Kitchen Standards & Philosophy */}
              <section id="kitchen" className="bg-ink text-cream py-16">
                <div className="mx-auto max-w-6xl px-5">
                  <div className="grid items-center gap-8 md:grid-cols-[0.85fr_1.15fr]">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-saffron">
                        (f) — the kitchen standard
                      </p>
                      <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl">
                        Stone-ground spices.
                        <br />
                        Always.
                      </h2>
                      <p className="mt-4 max-w-[38ch] font-body text-sm leading-6 text-cream/70">
                        We roast whole spices daily, make curries in heavy-bottomed brass utensils and cook only what can be dispatched fresh within 25 minutes. Zero artificial food color. Zero frozen gravies.
                      </p>
                      <div className="mt-7 grid max-w-sm grid-cols-2 gap-3 font-mono text-xs text-cream/70">
                        <span className="border-l-2 border-saffron pl-3">
                          <b className="block font-display text-2xl text-cream">12</b>whole roasted spices
                        </span>
                        <span className="border-l-2 border-saffron pl-3">
                          <b className="block font-display text-2xl text-cream">0</b>frozen shortcuts
                        </span>
                      </div>
                    </div>
                    <img
                      src={spiceKitchenImage}
                      alt="Whole Indian spices beside a simmering copper cooking pot"
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-[min(3vw,28px)] object-cover shadow-2xl shadow-black/40"
                    />
                  </div>
                </div>
              </section>

              {/* Tiffin Subscriptions Section */}
              <TiffinSubscriptionSection />

              {/* Sweet Finish Section */}
              <section id="sweet" className="bg-saffron/20 py-16">
                <div className="mx-auto max-w-6xl px-5">
                  <div className="grid items-center gap-8 md:grid-cols-2">
                    <img
                      src={gulabJamunImage}
                      alt="Warm gulab jamun topped with pistachio and saffron"
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-[min(3vw,28px)] object-cover shadow-xl"
                    />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-spice">
                        (h) — end on a sweet note
                      </p>
                      <h2 className="mt-3 font-display text-4xl leading-none tracking-tight sm:text-5xl">
                        Shahi Gulab Jamun?
                        <br />
                        <span className="text-spice">Always a yes.</span>
                      </h2>
                      <p className="mt-4 max-w-[38ch] font-body text-sm leading-6 text-ink/70">
                        Pure khoya dumplings dipped in saffron & cardamom syrup, finished with hand-sliced pistachios. The ideal ending to an honest thali meal.
                      </p>
                      <Button
                        className="mt-6 rounded-full bg-spice px-6 py-2.5 font-body text-sm font-semibold text-cream shadow-none hover:bg-ink"
                        onClick={() => {
                          const jamun = menuItems.find((m) => m.name.includes("Gulab Jamun")) || menuItems[0];
                          addToCart(jamun);
                        }}
                      >
                        Add Dessert · ₹90 <Plus className="size-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Live Offers Marquee Banner */}
              <section id="offers" className="bg-spice py-4 overflow-hidden border-y border-ink/20">
                <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl uppercase tracking-tight text-cream">
                  <span>Flat ₹120 off on your first order (Code: ANIMA120)</span>
                  <span className="text-cream/40">✦</span>
                  <span>Free delivery on orders above ₹199</span>
                  <span className="text-cream/40">✦</span>
                  <span>Complimentary Gulab Jamun on 5-Day Tiffin Pass</span>
                  <span className="text-cream/40">✦</span>
                  <span>Flat ₹120 off on your first order (Code: ANIMA120)</span>
                  <span className="text-cream/40">✦</span>
                  <span>Free delivery on orders above ₹199</span>
                </div>
              </section>

              {/* Delivery Guarantee Section */}
              <section id="delivery" className="border-b border-ink/10 bg-cream py-16">
                <div className="mx-auto max-w-6xl px-5">
                  <div className="grid gap-8 md:grid-cols-3 items-center">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-spice">
                        (i) — delivery promise
                      </p>
                      <h2 className="mt-3 font-display text-3xl sm:text-4xl tracking-tight">
                        We deliver warm, or your next thali is free.
                      </h2>
                      <p className="mt-3 font-body text-sm text-ink/70">
                        Insulated double-walled steel carriers, timed dispatch and a 25-minute delivery window across Indiranagar, Domlur, and Old Airport Road.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-6 rounded-full border-ink/15 bg-frost/60 text-ink hover:border-spice hover:bg-frost hover:text-spice"
                        onClick={() => setAreaChecked((c) => !c)}
                      >
                        <MapPin className="size-4 mr-1.5" />
                        {areaChecked ? "✓ You are in our primary 6km zone" : "Check my delivery area"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:col-span-2">
                      <div className="rounded-3xl border border-ink/10 bg-frost/80 p-5 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                            Avg Dispatch Time
                          </p>
                          <Timer className="size-4 text-spice" />
                        </div>
                        <p className="mt-2 font-display text-3xl text-ink">25 min</p>
                      </div>

                      <div className="rounded-3xl border border-ink/10 bg-frost/80 p-5 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                            Delivery Radius
                          </p>
                          <MapPin className="size-4 text-spice" />
                        </div>
                        <p className="mt-2 font-display text-3xl text-ink">6.0 km</p>
                      </div>

                      <div className="rounded-3xl border border-ink/10 bg-frost/80 p-5 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                            Kitchen Service
                          </p>
                          <Sparkles className="size-4 text-spice" />
                        </div>
                        <p className="mt-2 font-display text-3xl text-ink">11 AM – 10 PM</p>
                      </div>

                      <div className="rounded-3xl border border-ink/10 bg-frost/80 p-5 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                            Delivery Charge
                          </p>
                          <ShoppingBag className="size-4 text-spice" />
                        </div>
                        <p className="mt-2 font-display text-3xl text-emerald-700">₹0 (Free)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="bg-ink text-cream py-14">
                <div className="mx-auto max-w-6xl px-5">
                  <div className="grid gap-10 md:grid-cols-4">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-full bg-cream font-display text-lg leading-none text-ink">
                          A
                        </span>
                        <p className="font-display text-2xl tracking-tight">ANIMA’S KITCHEN</p>
                      </div>
                      <p className="mt-4 max-w-[36ch] font-body text-sm text-cream/60">
                        Warm Indian home food, cooked in small batches and delivered while it still steams.
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
                        Explore
                      </p>
                      <ul className="mt-4 space-y-2 font-body text-sm text-cream/70">
                        <li>
                          <button
                            onClick={() => setCustomerPage("menu")}
                            className="hover:text-saffron transition-colors text-left"
                          >
                            Full Menu (20+ Dishes)
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setCustomerPage("offers")}
                            className="hover:text-saffron transition-colors text-left"
                          >
                            Deals & Promo Codes
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setCustomerPage("about")}
                            className="hover:text-saffron transition-colors text-left"
                          >
                            About Us & Heritage
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setCustomerPage("reviews")}
                            className="hover:text-saffron transition-colors text-left"
                          >
                            Customer Reviews (4.9★)
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setCustomerPage("faq")}
                            className="hover:text-saffron transition-colors text-left"
                          >
                            Frequently Asked Questions
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => setCustomerPage("contact")}
                            className="hover:text-saffron transition-colors text-left"
                          >
                            Contact & WhatsApp Help
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/40">
                        Kitchen Hub
                      </p>
                      <ul className="mt-4 space-y-2 font-body text-sm text-cream/70">
                        <li>#428, 100ft Road, Indiranagar</li>
                        <li>Bengaluru, Karnataka 560038</li>
                        <li>+91 98765 43210</li>
                        <li>
                          <button
                            onClick={() => setCustomerPage("contact")}
                            className="text-saffron hover:underline font-mono text-xs block mt-1"
                          >
                            Open Kitchen Map & Contact →
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-cream/40 md:flex-row md:justify-between">
                    <span>© 2026 Anima’s Kitchen · Cloud Kitchen Prototype</span>
                    <span>Hot · Warm · Homemade</span>
                  </div>
                </div>
              </footer>

            </>
          )}

          {/* ─── ANDROID MOBILE STICKY BOTTOM NAVIGATION BAR FOR STOREFRONT ─── */}
          {customerPage !== "dashboard" && !trackingViewOpen && !selectedDishPageId && (
            <nav
              className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-ink/10 bg-frost/95 py-2 px-1 backdrop-blur-xl shadow-2xl lg:hidden"
              aria-label="Mobile Bottom Navigation"
            >
              <button
                onClick={() => {
                  setCustomerPage("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium transition-colors ${
                  customerPage === "home" ? "text-spice font-bold" : "text-ink/60 hover:text-ink"
                }`}
              >
                <span className="text-base">🏠</span>
                <span>Home</span>
              </button>

              <button
                onClick={() => setCustomerPage("menu")}
                className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium transition-colors ${
                  customerPage === "menu" ? "text-spice font-bold" : "text-ink/60 hover:text-ink"
                }`}
              >
                <span className="text-base">🍽️</span>
                <span>Menu</span>
              </button>

              <button
                onClick={() => setCustomerPage("offers")}
                className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium transition-colors ${
                  customerPage === "offers" ? "text-spice font-bold" : "text-ink/60 hover:text-ink"
                }`}
              >
                <span className="text-base">🏷️</span>
                <span>Offers</span>
              </button>

              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium text-ink/70 hover:text-spice transition-colors"
              >
                <span className="relative">
                  <ShoppingBag className="size-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 grid size-4 place-items-center rounded-full bg-spice text-[9px] font-mono font-bold text-cream">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span>Cart</span>
              </button>

              <button
                onClick={() => setCustomerPage("dashboard")}
                className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-medium transition-colors ${
                  customerPage === "dashboard" ? "text-spice font-bold" : "text-ink/60 hover:text-ink"
                }`}
              >
                <User className="size-4" />
                <span>Account</span>
              </button>
            </nav>
          )}

          {/* Customer Modals & Drawers - available in all customer screens */}
          <ThaliCustomizerModal />
          <CartDrawer />
          <CheckoutModal />
          <CustomerProfileDrawer />
        </>
      )}

      {/* Account / Role Authentication Modal */}
      <AuthModal />
    </main>
  );
}
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
  Utensils,
  BookOpen,
  ArrowDown,
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

import heroBgImage from "@/assets/animas-hero-bg.png";
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

              {/* Premium Culinary Hero Section with Background from ChatGPT Reference */}
              <section
                id="top"
                className="relative overflow-hidden min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] flex items-center bg-[#1A140E] border-b border-ink/10"
                style={{
                  backgroundImage: `url(${heroBgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center right",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Soft dark vignette on left side for 100% crisp typography and button contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent pointer-events-none md:max-w-[70%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                <div className="relative mx-auto max-w-6xl w-full px-5 sm:px-8 py-14 sm:py-20 z-10">
                  <div className="max-w-xl lg:max-w-2xl space-y-6 sm:space-y-7">
                    {/* Location & Purity Pill Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 shadow-lg backdrop-blur-md">
                      <MapPin className="size-3.5 text-[#E25C1D] fill-[#E25C1D]" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                        INDIRANAGAR HUB #01
                      </span>
                      <span className="text-white/30 font-mono">|</span>
                      <span className="font-mono text-xs font-medium text-white/90">
                        100% Desi Cow Ghee
                      </span>
                    </div>

                    {/* Main Headline matching reference image */}
                    <div>
                      <h1 className="font-serif text-4xl sm:text-6xl lg:text-[76px] font-bold leading-[1.08] tracking-tight text-white drop-shadow-md">
                        Ghar jaisa swaad.
                      </h1>
                      <div className="relative inline-block mt-1 sm:mt-2">
                        <span className="font-serif italic text-4xl sm:text-6xl lg:text-[76px] font-bold text-[#E27D22] drop-shadow-md">
                          Har din.
                        </span>
                        {/* Curved Swoosh Underline SVG */}
                        <svg
                          className="absolute -bottom-2.5 sm:-bottom-3.5 left-0 w-full h-3 sm:h-4 text-[#E27D22]"
                          viewBox="0 0 220 14"
                          fill="none"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M3 11C60 3 160 3 217 11"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Subtitle */}
                    <p className="font-body text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-lg drop-shadow-sm pt-1">
                      Desi thalis, made with love and traditional recipes. Freshly cooked, just like home.
                    </p>

                    {/* Action CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 sm:pt-3">
                      <Button
                        className="rounded-full bg-[#E25C1D] hover:bg-[#c94d14] text-white px-8 py-3.5 sm:py-4 font-body text-sm sm:text-base font-bold shadow-xl shadow-orange-950/40 transition-all hover:scale-105 h-auto justify-center gap-2.5"
                        onClick={() => {
                          const dalThali = menuItems[0];
                          if (dalThali) setThaliModalItem(dalThali);
                        }}
                      >
                        <Utensils className="size-4" />
                        <span>Order Thali</span>
                        <ArrowRight className="size-4" />
                      </Button>

                      <Button
                        variant="outline"
                        className="rounded-full border border-white/60 bg-black/25 hover:bg-white/15 hover:border-white text-white px-7 py-3.5 sm:py-4 font-body text-sm sm:text-base font-bold backdrop-blur-md transition-all hover:scale-105 h-auto justify-center gap-2.5"
                        onClick={() => {
                          const menuEl = document.getElementById("menu-section");
                          if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
                          else setCustomerPage("menu");
                        }}
                      >
                        <BookOpen className="size-4" />
                        <span>View Menu</span>
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>

                    {/* Metrics Bar with Clean Dividers */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-white/90 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🛵</span>
                        <div>
                          <span className="font-bold text-sm sm:text-base text-white block leading-tight">24 Mins</span>
                          <span className="text-[10px] sm:text-[11px] text-white/70">Avg Delivery</span>
                        </div>
                      </div>

                      <span className="text-white/30 font-mono text-lg hidden sm:inline">|</span>

                      <div className="flex items-center gap-2">
                        <span className="text-xl">⭐</span>
                        <div>
                          <span className="font-bold text-sm sm:text-base text-emerald-400 block leading-tight">4.9 ★</span>
                          <span className="text-[10px] sm:text-[11px] text-white/70">14K+ Foodies</span>
                        </div>
                      </div>

                      <span className="text-white/30 font-mono text-lg hidden sm:inline">|</span>

                      <div className="flex items-center gap-2">
                        <span className="text-xl">🌱</span>
                        <div>
                          <span className="font-bold text-sm sm:text-base text-white block leading-tight">100% Fresh</span>
                          <span className="text-[10px] sm:text-[11px] text-white/70">No Preservatives</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mouse Scroll Down Indicator at Bottom Center */}
                <div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer z-20 group"
                  onClick={() => {
                    const menuEl = document.getElementById("menu-section");
                    if (menuEl) menuEl.scrollIntoView({ behavior: "smooth" });
                    else setCustomerPage("menu");
                  }}
                  title="Scroll to Menu"
                >
                  <div className="w-5 h-8 rounded-full border-2 border-white/60 flex items-start justify-center p-1 group-hover:border-white transition-colors">
                    <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
                  </div>
                  <ArrowDown className="size-3.5 text-white/70 group-hover:text-white animate-pulse" />
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
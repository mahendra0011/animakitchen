import React, { useState } from "react";
import { useDemoStore } from "@/context/DemoStoreContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  User,
  MapPin,
  Clock,
  RotateCw,
  ShoppingBag,
  MessageSquare,
  Send,
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  Star,
  LogOut,
  Gift,
  Award,
  Wallet,
  Share2,
  LifeBuoy,
  Plus,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { TicketIssueType } from "@/types/kitchen";

export const CustomerProfileDrawer: React.FC = () => {
  const {
    profileDrawerOpen,
    setProfileDrawerOpen,
    customerProfile,
    orders,
    addToCart,
    setCartDrawerOpen,
    setActiveOrderId,
    setTrackingViewOpen,
    logout,
    loyaltyProfile,
    redeemLoyaltyPoints,
    customerWallet,
    addWalletMoney,
    hasKitchenPass,
    setHasKitchenPass,
    supportTickets,
    createSupportTicket,
  } = useDemoStore();

  const [activeTab, setActiveTab] = useState<
    "orders" | "loyalty" | "referral" | "wallet" | "tickets" | "support"
  >("orders");

  // Support ticket form
  const [ticketIssue, setTicketIssue] = useState<TicketIssueType>("missing_item");
  const [ticketOrderNum, setTicketOrderNum] = useState<string>(
    orders[0]?.orderNumber || "#AK-8491"
  );
  const [ticketDesc, setTicketDesc] = useState<string>("");
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

  // Chat messages
  const [supportMessage, setSupportMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: "user" | "support"; text: string; time: string }>
  >([
    {
      sender: "support",
      text: "Namaste! Welcome to Anima's Kitchen support. How can we serve you?",
      time: "Just now",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;

    const userText = supportMessage;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setSupportMessage("");

    setTimeout(() => {
      let reply = "Our head chef has received your note! We cook fresh within 15 minutes.";
      if (userText.toLowerCase().includes("where") || userText.toLowerCase().includes("track")) {
        reply = "Delivery partner Rajesh Kumar is on 100ft Road and will reach in ~12 mins!";
      } else if (userText.toLowerCase().includes("cancel")) {
        reply = "Orders can be cancelled within 2 minutes of dispatch by calling +91 98765 43210.";
      }
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "support",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 800);
  };

  const handleReorder = (order: (typeof orders)[0]) => {
    order.items.forEach((item) => {
      addToCart(item.menuItem, item.selectedAddons, item.specialInstructions);
    });
    setProfileDrawerOpen(false);
    setCartDrawerOpen(true);
    toast.success(`Re-ordered items from #${order.orderNumber}!`);
  };

  const handleRedeem = (points: number, rewardLabel: string) => {
    const success = redeemLoyaltyPoints(points, rewardLabel);
    if (success) {
      toast.success(`Redeemed ${points} points for "${rewardLabel}"!`);
    } else {
      toast.error("Not enough loyalty points available.");
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketDesc.trim()) return;
    createSupportTicket({
      customerName: customerProfile.name,
      phone: customerProfile.phone,
      orderNumber: ticketOrderNum,
      issueType: ticketIssue,
      description: ticketDesc,
      status: "open",
    });
    setTicketSuccess("Support grievance ticket raised successfully! Ops team assigned.");
    setTicketDesc("");
    setTimeout(() => setTicketSuccess(null), 3000);
  };

  const handleShareReferral = () => {
    const text = `Hey! Order authentic home-style thalis from Anima's Kitchen using my referral code ${loyaltyProfile.referralCode} and get ₹50 off your first meal! https://animas-kitchen.in`;
    navigator.clipboard.writeText(text);
    toast.success("Referral link copied to clipboard! Share on WhatsApp.");
  };

  return (
    <Sheet open={profileDrawerOpen} onOpenChange={setProfileDrawerOpen}>
      <SheetContent className="flex w-full flex-col justify-between p-0 sm:max-w-md bg-frost text-ink border-l border-ink/10 shadow-2xl">
        {/* Profile Header */}
        <SheetHeader className="border-b border-ink/10 bg-cream/90 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-ink font-display text-xl text-cream">
                {customerProfile.name.charAt(0)}
              </div>
              <div>
                <SheetTitle className="font-display text-xl text-ink">
                  {customerProfile.name}
                </SheetTitle>
                <p className="text-xs text-ink/60 flex items-center gap-2">
                  <span>+91 {customerProfile.phone}</span>
                  <span>·</span>
                  <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[9px] font-mono font-bold">
                    {loyaltyProfile.tier.toUpperCase()} TIER
                  </Badge>
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                setProfileDrawerOpen(false);
                toast.success("Logged out successfully");
              }}
              className="h-8 rounded-full border-red-200 bg-red-50/50 px-2.5 text-xs font-semibold text-red-600 hover:bg-red-100 hover:text-red-700 gap-1"
            >
              <LogOut className="size-3.5" />
              <span>Logout</span>
            </Button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono">
            <div className="rounded-xl border border-ink/10 bg-frost p-2">
              <span className="text-[9px] text-ink/50 block uppercase font-bold">Wallet</span>
              <span className="font-display text-base text-spice font-bold">
                ₹{customerWallet.balance}
              </span>
            </div>
            <div className="rounded-xl border border-ink/10 bg-frost p-2">
              <span className="text-[9px] text-ink/50 block uppercase font-bold">Rewards</span>
              <span className="font-display text-base text-emerald-700 font-bold">
                {loyaltyProfile.points} Pts
              </span>
            </div>
            <div className="rounded-xl border border-ink/10 bg-frost p-2">
              <span className="text-[9px] text-ink/50 block uppercase font-bold">Pass</span>
              <span className="font-display text-xs text-ink font-bold block mt-0.5">
                {hasKitchenPass ? "Active 👑" : "₹99/mo"}
              </span>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="mt-4 flex border-b border-ink/10 overflow-x-auto scrollbar-none gap-1">
            {[
              { id: "orders", label: "Orders" },
              { id: "loyalty", label: "Loyalty" },
              { id: "referral", label: "Referral" },
              { id: "wallet", label: "Wallet" },
              { id: "tickets", label: "Support" },
              { id: "support", label: "Chat" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-2.5 pb-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "border-b-2 border-spice text-spice font-bold"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </SheetHeader>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: PAST ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="rounded-2xl border border-ink/10 bg-cream/40 p-4 transition-all hover:border-ink/20 hover:bg-cream/60 space-y-2"
                >
                  <div className="flex items-start justify-between border-b border-ink/5 pb-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-ink">
                        {ord.orderNumber}
                      </span>
                      <p className="text-[10px] text-ink/50 font-mono">
                        {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[9px] uppercase font-mono font-semibold"
                    >
                      {ord.status.replace(/_/g, " ")}
                    </Badge>
                  </div>

                  <div className="text-xs text-ink/70 space-y-0.5">
                    {ord.items.map((it) => (
                      <p key={it.id} className="font-medium text-ink">
                        {it.quantity}x {it.menuItem.name}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-ink/5 pt-2">
                    <span className="font-display text-base text-ink font-bold">₹{ord.finalTotal}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setActiveOrderId(ord.id);
                          setProfileDrawerOpen(false);
                          setTrackingViewOpen(true);
                        }}
                        className="h-7 rounded-full text-[11px] border-ink/15 text-ink"
                      >
                        Live Map
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleReorder(ord)}
                        className="h-7 rounded-full bg-ink text-cream text-[11px] hover:bg-spice gap-1"
                      >
                        <RotateCw className="size-3" />
                        <span>Re-order</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: LOYALTY & REWARDS */}
          {activeTab === "loyalty" && (
            <div className="space-y-4">
              <div className="rounded-3xl bg-gradient-to-br from-amber-600 to-amber-700 text-white p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="size-5 text-amber-200" />
                    <span className="font-display text-base font-bold">
                      {loyaltyProfile.tier} Foodie Pass
                    </span>
                  </div>
                  <Badge className="bg-white/20 text-white font-mono text-[10px]">
                    10 PTS / ₹100
                  </Badge>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] uppercase font-mono text-white/70 block">
                    Available Rewards Balance
                  </span>
                  <p className="font-display text-3xl font-bold">
                    {loyaltyProfile.points} Points
                  </p>
                </div>

                <p className="text-[11px] text-white/80 leading-relaxed border-t border-white/20 pt-2">
                  Earn points automatically with every authentic thali you enjoy. Redeem points for instant billing credits.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-ink uppercase tracking-wider font-mono">
                  Redeem Rewards:
                </h4>

                <div className="p-3.5 rounded-2xl bg-white border border-ink/10 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-ink block">₹50 Off Next Thali</span>
                    <span className="text-[10px] text-ink/50 font-mono">Cost: 150 Points</span>
                  </div>
                  <Button
                    size="sm"
                    disabled={loyaltyProfile.points < 150}
                    onClick={() => handleRedeem(150, "₹50 Discount Voucher")}
                    className="h-7 text-xs rounded-xl bg-spice text-white hover:bg-spice/90"
                  >
                    Redeem
                  </Button>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-ink/10 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-ink block">Free Desi Gulab Jamun (2 pcs)</span>
                    <span className="text-[10px] text-ink/50 font-mono">Cost: 100 Points</span>
                  </div>
                  <Button
                    size="sm"
                    disabled={loyaltyProfile.points < 100}
                    onClick={() => handleRedeem(100, "Free Gulab Jamun")}
                    className="h-7 text-xs rounded-xl bg-spice text-white hover:bg-spice/90"
                  >
                    Redeem
                  </Button>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-ink/10 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-ink block">₹100 Off Cart Total</span>
                    <span className="text-[10px] text-ink/50 font-mono">Cost: 300 Points</span>
                  </div>
                  <Button
                    size="sm"
                    disabled={loyaltyProfile.points < 300}
                    onClick={() => handleRedeem(300, "₹100 Discount Voucher")}
                    className="h-7 text-xs rounded-xl bg-spice text-white hover:bg-spice/90"
                  >
                    Redeem
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REFERRAL PROGRAM */}
          {activeTab === "referral" && (
            <div className="space-y-4">
              <div className="rounded-3xl bg-white border border-ink/10 p-5 shadow-sm text-center space-y-3">
                <div className="size-12 rounded-2xl bg-spice/10 text-spice grid place-items-center mx-auto">
                  <Gift className="size-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">
                  Invite Friends & Earn ₹50
                </h3>
                <p className="text-xs text-ink/70 leading-relaxed max-w-xs mx-auto">
                  Give friends ₹50 off on their first thali order. You get ₹50 directly credited into your wallet when their order is delivered!
                </p>

                <div className="p-3 rounded-2xl bg-frost border border-dashed border-ink/20 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-spice tracking-wider">
                    {loyaltyProfile.referralCode}
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    YOUR CODE
                  </Badge>
                </div>

                <Button
                  onClick={handleShareReferral}
                  className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-2 shadow-md h-10"
                >
                  <Share2 className="size-4" />
                  <span>Share on WhatsApp</span>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-3 rounded-2xl bg-white border border-ink/10">
                  <span className="text-[10px] text-ink/50 font-mono block">Referrals Made</span>
                  <span className="font-mono text-base font-bold text-ink">
                    {loyaltyProfile.totalReferrals} Friends
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-ink/10">
                  <span className="text-[10px] text-ink/50 font-mono block">Earned Credits</span>
                  <span className="font-mono text-base font-bold text-emerald-700">
                    ₹{loyaltyProfile.referralEarnings}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WALLET & KITCHEN PASS */}
          {activeTab === "wallet" && (
            <div className="space-y-4">
              <div className="rounded-3xl bg-ink text-cream p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase font-bold text-saffron">
                    Anima's Fast-Pay Wallet
                  </span>
                  <Wallet className="size-4 text-saffron" />
                </div>
                <div>
                  <span className="text-[10px] text-cream/60 block">Available Cash Balance</span>
                  <p className="font-display text-3xl font-bold text-cream">
                    ₹{customerWallet.balance}
                  </p>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    onClick={() => {
                      addWalletMoney(100);
                      toast.success("Added ₹100 to your wallet!");
                    }}
                    className="flex-1 rounded-xl bg-cream/15 text-cream hover:bg-cream/25 text-xs font-semibold"
                  >
                    +₹100 Top-up
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      addWalletMoney(500);
                      toast.success("Added ₹500 to your wallet!");
                    }}
                    className="flex-1 rounded-xl bg-saffron text-ink hover:bg-saffron/90 text-xs font-bold"
                  >
                    +₹500 Top-up
                  </Button>
                </div>
              </div>

              {/* Anima's Kitchen Pass */}
              <div className="rounded-3xl border border-purple-200 bg-purple-50/70 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="size-4 text-purple-700" />
                    <span className="font-display text-sm font-bold text-purple-950">
                      Anima's Kitchen Pass
                    </span>
                  </div>
                  <Badge className="bg-purple-700 text-white font-mono text-[9px]">
                    ₹99 / MONTH
                  </Badge>
                </div>

                <ul className="text-xs text-purple-900 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-purple-700 shrink-0" />
                    <span>100% Free Doorstep Delivery on all orders</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-purple-700 shrink-0" />
                    <span>2x Loyalty Points on every meal</span>
                  </li>
                </ul>

                <Button
                  onClick={() => {
                    setHasKitchenPass(!hasKitchenPass);
                    toast.success(
                      hasKitchenPass
                        ? "Kitchen Pass deactivated"
                        : "Anima's Kitchen Pass activated! Enjoy free deliveries."
                    );
                  }}
                  className={`w-full rounded-xl text-xs font-semibold ${
                    hasKitchenPass
                      ? "bg-purple-200 text-purple-900 hover:bg-purple-300"
                      : "bg-purple-700 text-white hover:bg-purple-800"
                  }`}
                >
                  {hasKitchenPass ? "Pass Active (Cancel)" : "Activate Pass for ₹99"}
                </Button>
              </div>
            </div>
          )}

          {/* TAB 5: GRIEVANCE TICKETS */}
          {activeTab === "tickets" && (
            <div className="space-y-4">
              {ticketSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>{ticketSuccess}</span>
                </div>
              )}

              <form onSubmit={handleCreateTicket} className="p-4 rounded-3xl bg-white border border-ink/10 shadow-sm space-y-3">
                <div className="flex items-center gap-2 border-b border-ink/10 pb-2">
                  <LifeBuoy className="size-4 text-spice" />
                  <h4 className="font-display text-sm font-bold text-ink">
                    Raise Grievance Ticket
                  </h4>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-ink">Issue Type</label>
                  <select
                    value={ticketIssue}
                    onChange={(e) => setTicketIssue(e.target.value as TicketIssueType)}
                    className="w-full text-xs rounded-xl border border-ink/20 p-2 bg-frost focus:outline-none"
                  >
                    <option value="missing_item">Missing Food Item / Side</option>
                    <option value="wrong_item">Wrong Meal Received</option>
                    <option value="delayed_delivery">Order Delayed &gt; 30 Mins</option>
                    <option value="food_quality">Food Quality / Taste Issue</option>
                    <option value="payment_refund">Payment Deducted Twice</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-ink">Order Number</label>
                  <Input
                    value={ticketOrderNum}
                    onChange={(e) => setTicketOrderNum(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-ink">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Tell us what happened with your meal..."
                    value={ticketDesc}
                    onChange={(e) => setTicketDesc(e.target.value)}
                    required
                    className="w-full text-xs rounded-xl border border-ink/20 p-2 focus:outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl bg-spice text-white hover:bg-spice/90 text-xs font-semibold h-9"
                >
                  Submit Ticket
                </Button>
              </form>

              {/* Past Tickets */}
              <div className="space-y-2">
                <h5 className="text-[11px] font-mono font-bold text-ink/60 uppercase">
                  Your Past Grievances ({supportTickets.length}):
                </h5>
                {supportTickets.map((t) => (
                  <div key={t.id} className="p-3 rounded-2xl bg-white border border-ink/10 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-spice">{t.ticketNumber}</span>
                      <Badge
                        variant="outline"
                        className={`text-[9px] font-mono ${
                          t.status === "resolved"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {t.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-ink/80">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LIVE HELP / SUPPORT CHAT */}
          {activeTab === "support" && (
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-spice text-cream rounded-tr-none"
                          : "bg-cream text-ink border border-ink/10 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-ink/40 mt-1 font-mono">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Ask chef about spices, order..."
                  className="h-9 rounded-full border-ink/15 text-xs bg-white"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="size-9 shrink-0 rounded-full bg-ink text-cream hover:bg-spice"
                >
                  <Send className="size-3.5" />
                </Button>
              </form>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

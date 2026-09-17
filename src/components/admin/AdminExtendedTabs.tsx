import React, { useState } from "react";
import { useDemoStore } from "@/context/DemoStoreContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  Star,
  Tag,
  Gift,
  Bell,
  Settings,
  ShoppingBag,
  Truck,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  AlertCircle,
  Copy,
  Trash2,
  Edit2,
  Check,
  ChevronRight,
  Sparkles,
  Building,
} from "lucide-react";
import { toast } from "sonner";

/* =========================================================================
   1. Category & Combo Management Tab
   ========================================================================= */
export const AdminCategoriesTab: React.FC = () => {
  const [combos, setCombos] = useState([
    {
      id: "combo-1",
      name: "Daily Working Lunch Combo",
      price: 149,
      items: ["4 Phulka Rotis", "Yellow Dal Tadka", "Steamed Rice", "Aloo Gobi Sabzi", "Kachumber Salad"],
      ordersCount: 342,
      active: true,
    },
    {
      id: "combo-2",
      name: "Deluxe Paneer Feast Combo",
      price: 219,
      items: ["3 Ghee Parathas", "Paneer Butter Masala", "Jeera Rice", "Dal Makhani", "Gulab Jamun"],
      ordersCount: 189,
      active: true,
    },
    {
      id: "combo-3",
      name: "Homely Diet Bowl Combo",
      price: 169,
      items: ["Brown Rice", "Double Dal Tadka", "Tawa Salad", "Roasted Papad"],
      ordersCount: 94,
      active: true,
    },
  ]);

  const [newComboName, setNewComboName] = useState("");
  const [newComboPrice, setNewComboPrice] = useState("");

  const handleAddCombo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComboName || !newComboPrice) return;
    setCombos([
      ...combos,
      {
        id: `combo-${Date.now()}`,
        name: newComboName,
        price: Number(newComboPrice),
        items: ["4 Rotis", "Dal Tadka", "Rice", "Seasonal Sabzi"],
        ordersCount: 0,
        active: true,
      },
    ]);
    setNewComboName("");
    setNewComboPrice("");
    toast.success("New Combo created successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-frost/90 border border-ink/10 p-5 rounded-2xl">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">Meal Combos & Thali Bundles</h3>
          <p className="text-xs text-ink/60">
            Create pre-packaged lunch boxes, corporate combos, and daily thali specials with custom pricing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {combos.map((combo) => (
          <div key={combo.id} className="bg-frost/90 border border-ink/10 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-bold text-ink">{combo.name}</span>
              <span className="font-display text-lg font-bold text-spice">₹{combo.price}</span>
            </div>

            <div className="space-y-1 bg-cream/60 p-3 rounded-xl border border-ink/5">
              <span className="font-mono text-[10px] uppercase text-ink/50 block font-bold">
                Included Items:
              </span>
              <ul className="text-xs text-ink/80 space-y-0.5">
                {combo.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-spice" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-ink/10 text-xs">
              <span className="font-mono text-ink/60">{combo.ordersCount} orders placed</span>
              <Badge className="bg-emerald-500/15 text-emerald-700 font-mono text-[10px] border-none">
                Active in Store
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Combo Card */}
      <form onSubmit={handleAddCombo} className="bg-frost/70 border border-dashed border-ink/20 rounded-2xl p-5 space-y-3">
        <h4 className="font-display text-sm font-bold text-ink flex items-center gap-1.5">
          <Plus className="size-4 text-spice" /> Add New Fast Lunch Combo
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Combo Name (e.g. Executive Lunch Box)"
            value={newComboName}
            onChange={(e) => setNewComboName(e.target.value)}
            className="rounded-xl border border-ink/15 bg-cream/70 px-3 py-2 text-xs text-ink placeholder:text-ink/40"
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={newComboPrice}
            onChange={(e) => setNewComboPrice(e.target.value)}
            className="rounded-xl border border-ink/15 bg-cream/70 px-3 py-2 text-xs text-ink placeholder:text-ink/40"
          />
          <Button type="submit" size="sm" className="bg-ink hover:bg-spice text-cream rounded-xl text-xs">
            Create Combo
          </Button>
        </div>
      </form>
    </div>
  );
};

/* =========================================================================
   2. Supplier & Purchase Management Tab
   ========================================================================= */
export const AdminSuppliersTab: React.FC = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: "PO-8041",
      supplier: "Nandini Dairy Co-op",
      item: "Fresh Malai Paneer & Curd",
      quantity: "35 kg",
      totalCost: "₹11,200",
      status: "Delivered & Stocked",
      date: "17 Sep 2026",
    },
    {
      id: "PO-8042",
      supplier: "Annapurna Sharbati Flour Mill",
      item: "Sharbati Wheat Flour (Atta)",
      quantity: "200 kg",
      totalCost: "₹8,400",
      status: "In Transit",
      date: "17 Sep 2026",
    },
    {
      id: "PO-8043",
      supplier: "Malnad Pure Desi Ghee Traders",
      item: "A2 Vedic Gir Cow Bilona Ghee",
      quantity: "40 Litres",
      totalCost: "₹34,000",
      status: "Order Sent",
      date: "16 Sep 2026",
    },
  ]);

  const handleCreatePO = () => {
    const newPO = {
      id: `PO-${Math.floor(1000 + Math.random() * 9000)}`,
      supplier: "Mysore Agro Spices Co.",
      item: "Guntur Red Chillies & Cumin Seeds",
      quantity: "15 kg",
      totalCost: "₹4,850",
      status: "Order Sent",
      date: "Today",
    };
    setPurchaseOrders([newPO, ...purchaseOrders]);
    toast.success(`Purchase Order ${newPO.id} generated & dispatched to supplier.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-frost/90 border border-ink/10 p-5 rounded-2xl">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">Suppliers & Purchase Orders</h3>
          <p className="text-xs text-ink/60">
            Automated restocking workflow: Low Stock Trigger → Purchase Request → Supplier Fulfillment → Direct Inventory Credit.
          </p>
        </div>
        <Button onClick={handleCreatePO} size="sm" className="bg-ink hover:bg-spice text-cream rounded-xl text-xs gap-1.5">
          <Plus className="size-3.5" /> Generate Purchase Order
        </Button>
      </div>

      <div className="bg-frost/90 border border-ink/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-ink/10 flex items-center justify-between font-display text-sm font-bold text-ink">
          <span>Active Purchase Orders & Procurement Flow</span>
          <span className="font-mono text-xs text-ink/60 font-normal">3 Verified Vendor Partners</span>
        </div>
        <div className="divide-y divide-ink/10">
          {purchaseOrders.map((po) => (
            <div key={po.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-spice">{po.id}</span>
                  <span className="font-bold text-ink">{po.supplier}</span>
                </div>
                <p className="text-ink/70">
                  Item: <span className="font-semibold text-ink">{po.item}</span> · Qty: {po.quantity}
                </p>
                <span className="font-mono text-[10px] text-ink/50">Placed: {po.date}</span>
              </div>
              <div className="flex sm:flex-col items-end justify-between gap-1">
                <span className="font-display text-sm font-bold text-ink">{po.totalCost}</span>
                <Badge
                  className={`font-mono text-[10px] border-none ${
                    po.status.includes("Delivered")
                      ? "bg-emerald-500/15 text-emerald-700"
                      : po.status.includes("Transit")
                      ? "bg-amber-500/15 text-amber-700"
                      : "bg-blue-500/15 text-blue-700"
                  }`}
                >
                  {po.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. Customer Management & CRM Tab
   ========================================================================= */
export const AdminCustomersTab: React.FC = () => {
  const customers = [
    {
      name: "Rahul Sharma",
      phone: "+91 98765 12345",
      ordersCount: 42,
      totalSpent: "₹8,450",
      averageOrder: "₹201.20",
      lastOrder: "Today (1:15 PM)",
      subscription: "Active Monthly Lunch",
      loyaltyPoints: 920,
      tier: "VIP Customer",
      favourite: "Dal Tadka Thali",
    },
    {
      name: "Priya Patel",
      phone: "+91 98450 67890",
      ordersCount: 28,
      totalSpent: "₹5,620",
      averageOrder: "₹200.70",
      lastOrder: "Yesterday",
      subscription: "Active Weekly Dinner",
      loyaltyPoints: 560,
      tier: "Regular",
      favourite: "Rajma Chawal Bowl",
    },
    {
      name: "Vikram Sen",
      phone: "+91 99887 44332",
      ordersCount: 16,
      totalSpent: "₹3,940",
      averageOrder: "₹246.25",
      lastOrder: "3 days ago",
      subscription: "None",
      loyaltyPoints: 340,
      tier: "Occasional",
      favourite: "Paneer Butter Masala Thali",
    },
    {
      name: "Ananya Iyer",
      phone: "+91 97412 88990",
      ordersCount: 35,
      totalSpent: "₹7,210",
      averageOrder: "₹206.00",
      lastOrder: "Today (12:40 PM)",
      subscription: "Active Monthly Lunch",
      loyaltyPoints: 810,
      tier: "VIP Customer",
      favourite: "Dal Tadka Thali + Roti Pack",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-frost/90 border border-ink/10 p-5 rounded-2xl">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">Customer Database & CRM Profiles</h3>
          <p className="text-xs text-ink/60">
            Real-time customer metrics: lifetime spending, order velocity, active tiffin plan, and favorite items.
          </p>
        </div>
        <div className="font-mono text-xs text-ink/70 bg-cream/60 px-3 py-1.5 rounded-xl border border-ink/10">
          Total Customers: <span className="font-bold text-ink">1,480+</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map((c, idx) => (
          <div key={idx} className="bg-frost/90 border border-ink/10 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-ink text-cream font-display text-sm font-bold">
                  {c.name.charAt(0)}
                </span>
                <div>
                  <h4 className="font-display text-sm font-bold text-ink">{c.name}</h4>
                  <span className="font-mono text-[11px] text-ink/60">{c.phone}</span>
                </div>
              </div>
              <Badge
                className={`font-mono text-[10px] border-none ${
                  c.tier === "VIP Customer" ? "bg-amber-500/20 text-amber-800" : "bg-blue-500/10 text-blue-700"
                }`}
              >
                {c.tier}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-cream/60 p-3 rounded-xl border border-ink/5 text-center">
              <div>
                <span className="font-mono text-[9px] uppercase text-ink/50 block">Total Orders</span>
                <span className="font-display text-sm font-bold text-ink">{c.ordersCount}</span>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase text-ink/50 block">Total Spent</span>
                <span className="font-display text-sm font-bold text-spice">{c.totalSpent}</span>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase text-ink/50 block">Loyalty Pts</span>
                <span className="font-display text-sm font-bold text-amber-600">⭐ {c.loyaltyPoints}</span>
              </div>
            </div>

            <div className="text-xs space-y-1 text-ink/75 pt-1">
              <p>
                <span className="text-ink/50 font-mono">Tiffin Plan:</span>{" "}
                <span className="font-semibold text-emerald-700">{c.subscription}</span>
              </p>
              <p>
                <span className="text-ink/50 font-mono">Favorite:</span>{" "}
                <span className="font-semibold">{c.favourite}</span>
              </p>
              <p>
                <span className="text-ink/50 font-mono">Last Order:</span>{" "}
                <span>{c.lastOrder}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   4. Subscriptions / Tiffin Management Tab
   ========================================================================= */
export const AdminSubscriptionsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-frost/90 border border-ink/10 p-5 rounded-2xl">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">Tiffin & Subscription Control Room</h3>
          <p className="text-xs text-ink/60">
            Daily meal schedule, batch dispatch timers, meal pauses, and delivery route optimization.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/15 text-emerald-700 font-mono text-xs px-3 py-1 border-none">
            48 Active Tiffins Tomorrow
          </Badge>
        </div>
      </div>

      {/* Tiffin Schedule Calendar View */}
      <div className="bg-frost/90 border border-ink/10 rounded-2xl p-5 shadow-sm space-y-4">
        <h4 className="font-display text-sm font-bold text-ink">Weekly Tiffin Delivery Calendar</h4>
        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {[
            { day: "Mon", status: "Active", count: "52 meals", icon: "✅" },
            { day: "Tue", status: "Active", count: "48 meals", icon: "✅" },
            { day: "Wed", status: "Paused", count: "44 meals", icon: "⏸" },
            { day: "Thu", status: "Active", count: "50 meals", icon: "✅" },
            { day: "Fri", status: "Active", count: "54 meals", icon: "✅" },
            { day: "Sat", status: "Weekend Special", count: "24 meals", icon: "🍛" },
            { day: "Sun", status: "Closed", count: "Kitchen Rest", icon: "❌" },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-cream/70 border border-ink/10 rounded-xl space-y-1">
              <span className="font-display font-bold text-sm block text-ink">{item.day}</span>
              <span className="text-base block">{item.icon}</span>
              <span className="font-mono text-[10px] text-ink/60 block">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   5. Reviews & Ratings Moderation Tab
   ========================================================================= */
export const AdminReviewsTab: React.FC = () => {
  const reviews = [
    {
      id: "rev-1",
      customer: "Mahendra Singh",
      rating: 5,
      food: "Dal Tadka Thali",
      comment: "Hot, genuine desi ghee smell, and soft tawa rotis! Best homemade food experience in Bangalore.",
      time: "2 hours ago",
      verified: true,
    },
    {
      id: "rev-2",
      customer: "Sneha Reddy",
      rating: 5,
      food: "Monthly Tiffin Subscription",
      comment: "Daily on-time at 1:00 PM sharp. The dabba packaging keeps food steaming hot.",
      time: "5 hours ago",
      verified: true,
    },
    {
      id: "rev-3",
      customer: "Arun K.",
      rating: 4,
      food: "Rajma Chawal Bowl",
      comment: "Super tasty and hearty portion. A bit more onion salad would be perfect!",
      time: "Yesterday",
      verified: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-frost/90 border border-ink/10 p-5 rounded-2xl">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">Customer Reviews & Ratings Hub</h3>
          <p className="text-xs text-ink/60">
            Overall Rating: 4.9★ across 1,240+ verified customer reviews.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-frost/90 border border-ink/10 rounded-2xl p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-ink">{rev.customer}</span>
                <span className="font-mono text-[10px] text-ink/50">· {rev.time}</span>
                {rev.verified && (
                  <Badge className="bg-emerald-500/10 text-emerald-700 font-mono text-[9px] border-none">
                    Verified Order
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-500" />
                ))}
              </div>
            </div>
            <p className="text-xs text-ink/80">{rev.comment}</p>
            <div className="flex items-center justify-between text-[11px] text-ink/60 pt-1 border-t border-ink/5">
              <span>Item: <strong className="text-ink">{rev.food}</strong></span>
              <Button variant="ghost" size="sm" className="h-6 text-[11px] text-spice hover:underline p-0">
                Reply as Kitchen →
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   6. Marketing / CRM Campaign Segments Tab
   ========================================================================= */
export const AdminMarketingTab: React.FC = () => {
  const [sentCampaign, setSentCampaign] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-frost/90 border border-ink/10 p-5 rounded-2xl">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">Marketing & Customer Retention Engine</h3>
          <p className="text-xs text-ink/60">
            Launch targeted WhatsApp & SMS promos to re-engage lapsed customers and boost lunch order volume.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Inactive 15+ Days Segment",
            count: "142 Customers",
            offer: "₹75 OFF on Orders above ₹249",
            code: "WELCOMEBACK75",
          },
          {
            title: "Weekday Lunch Subscribers",
            count: "380 Customers",
            offer: "Free Gulab Jamun on Friday Thali",
            code: "SWEETFRIDAY",
          },
          {
            title: "High-Spending VIPs (₹5K+)",
            count: "68 Customers",
            offer: "Double Loyalty Points Weekend",
            code: "VIPDOUBLE",
          },
        ].map((camp, idx) => (
          <div key={idx} className="bg-frost/90 border border-ink/10 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <Badge className="bg-spice/10 text-spice font-mono text-[10px] border-none uppercase">
                {camp.code}
              </Badge>
              <span className="font-mono text-xs text-ink/60">{camp.count}</span>
            </div>
            <h4 className="font-display text-sm font-bold text-ink">{camp.title}</h4>
            <p className="text-xs text-ink/75 bg-cream/60 p-2.5 rounded-xl border border-ink/5">
              "{camp.offer}"
            </p>
            <Button
              size="sm"
              onClick={() => {
                setSentCampaign(true);
                toast.success(`Broadcast dispatched to ${camp.count}!`);
              }}
              className="w-full bg-ink hover:bg-spice text-cream text-xs rounded-xl h-8"
            >
              Send WhatsApp & SMS Broadcast
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   7. Business Settings Tab
   ========================================================================= */
export const AdminSettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-frost/90 border border-ink/10 p-5 rounded-2xl space-y-4">
        <h3 className="font-display text-lg font-bold text-ink">Kitchen & Business Settings</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-ink">Kitchen Operating Timings</label>
            <input
              type="text"
              defaultValue="10:30 AM – 10:30 PM (Daily)"
              className="w-full rounded-xl border border-ink/15 bg-cream/70 px-3 py-2 text-ink"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-semibold text-ink">Delivery Radius</label>
            <input
              type="text"
              defaultValue="7.5 km Geofence (Indiranagar / Domlur / Koramangala)"
              className="w-full rounded-xl border border-ink/15 bg-cream/70 px-3 py-2 text-ink"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-semibold text-ink">GSTIN Registration</label>
            <input
              type="text"
              defaultValue="29ABCDE1234F1Z5 (Food Services 5% GST)"
              className="w-full rounded-xl border border-ink/15 bg-cream/70 px-3 py-2 text-ink"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-semibold text-ink">Delivery Charge Rule</label>
            <input
              type="text"
              defaultValue="Free above ₹299 · ₹25 below ₹299"
              className="w-full rounded-xl border border-ink/15 bg-cream/70 px-3 py-2 text-ink"
            />
          </div>
        </div>

        <Button
          onClick={() => toast.success("Kitchen settings saved!")}
          className="bg-ink hover:bg-spice text-cream rounded-xl text-xs h-9 px-4"
        >
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

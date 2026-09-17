import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import {
  REQUIRED_THALI_ADDONS,
  INITIAL_MENU_ITEMS,
  INITIAL_DELIVERY_PARTNERS,
  INITIAL_COUPONS,
  INITIAL_TIFFIN_PLANS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_DEMO_ORDER,
  INITIAL_CUSTOMER_PROFILE,
  KITCHEN_LOCATION,
  INITIAL_INVENTORY_ITEMS,
  INITIAL_RECIPE_COSTING,
  INITIAL_STAFF_MEMBERS,
  INITIAL_BRANCHES,
  INITIAL_DELIVERY_ZONES,
  INITIAL_SUPPORT_TICKETS,
  INITIAL_KOT_TICKETS,
  INITIAL_LOYALTY_PROFILE,
  INITIAL_CUSTOMER_WALLET,
  INITIAL_WHATSAPP_LOGS,
} from "@/data/mockKitchenData";
import type {
  MenuItem,
  ThaliAddon,
  CartItem,
  Order,
  OrderStatus,
  DeliveryStep,
  DeliveryPartner,
  Coupon,
  ActiveSubscription,
  CustomerProfile,
  ActivityLog,
  DeliveryAddress,
  SelectedAddon,
  InventoryItem,
  RecipeCosting,
  StaffMember,
  Branch,
  DeliveryZone,
  SupportTicket,
  KOTTicket,
  LoyaltyProfile,
  CustomerWallet,
  WhatsAppLog,
} from "@/types/kitchen";
import { toast } from "sonner";

export type RoleType = "customer" | "rider" | "admin" | "kds";

interface DemoStoreContextType {
  activeRole: RoleType;
  setActiveRole: (role: RoleType) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  currentUser: { name: string; role: RoleType; phone: string; email: string } | null;
  loginAsRole: (role: RoleType, credentials?: { identifier?: string; password?: string }) => void;
  logout: () => void;
  isPhoneFrame: boolean;
  setIsPhoneFrame: (val: boolean | ((prev: boolean) => boolean)) => void;

  // UI Drawers & Modals
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalTab: "login" | "signup";
  setAuthModalTab: (tab: "login" | "signup") => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  checkoutModalOpen: boolean;
  setCheckoutModalOpen: (open: boolean) => void;
  profileDrawerOpen: boolean;
  setProfileDrawerOpen: (open: boolean) => void;
  trackingViewOpen: boolean;
  setTrackingViewOpen: (open: boolean) => void;
  thaliModalItem: MenuItem | null;
  setThaliModalItem: (item: MenuItem | null) => void;
  demoModalOpen: boolean;
  setDemoModalOpen: (open: boolean) => void;
  riderAlertOpen: boolean;
  setRiderAlertOpen: (open: boolean) => void;

  // Enterprise Cloud Kitchen Modules
  inventoryItems: InventoryItem[];
  updateInventoryStock: (itemId: string, delta: number) => void;
  recordWastage: (itemId: string, amount: number, reason: string) => void;
  recipeCostings: RecipeCosting[];

  staffList: StaffMember[];
  toggleStaffDuty: (staffId: string) => void;

  branches: Branch[];
  activeBranchId: string;
  setActiveBranchId: (branchId: string) => void;

  deliveryZones: DeliveryZone[];

  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: Omit<SupportTicket, "id" | "ticketNumber" | "createdAt">) => void;
  updateSupportTicketStatus: (ticketId: string, status: "open" | "in_progress" | "resolved") => void;

  kotTickets: KOTTicket[];
  updateKotTicketStatus: (kotId: string, status: "new" | "preparing" | "ready") => void;
  rushHourMode: boolean;
  setRushHourMode: (active: boolean) => void;

  loyaltyProfile: LoyaltyProfile;
  redeemLoyaltyPoints: (points: number, rewardLabel: string) => boolean;

  customerWallet: CustomerWallet;
  addWalletMoney: (amount: number) => void;
  useWalletDiscount: boolean;
  setUseWalletDiscount: (use: boolean) => void;
  hasKitchenPass: boolean;
  setHasKitchenPass: (has: boolean) => void;

  orderType: "delivery" | "pickup";
  setOrderType: (type: "delivery" | "pickup") => void;
  scheduledTime: string | null;
  setScheduledTime: (time: string | null) => void;

  whatsappLogs: WhatsAppLog[];
  triggerWhatsAppSimulatedMessage: (event: WhatsAppLog["event"], details: string) => void;

  // Data
  menuItems: MenuItem[];
  thaliAddons: ThaliAddon[];
  cart: CartItem[];
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrderId: (id: string | null) => void;
  deliveryPartners: DeliveryPartner[];
  activeRider: DeliveryPartner;
  coupons: Coupon[];
  subscriptions: ActiveSubscription[];
  customerProfile: CustomerProfile;
  activityLogs: ActivityLog[];
  isSimulationPlaying: boolean;

  // Cart operations
  addToCart: (item: MenuItem, selectedAddons?: SelectedAddon[], specialInstructions?: string) => void;
  updateCartItemQty: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Order operations
  placeOrder: (
    address: DeliveryAddress,
    paymentMethod: "upi" | "card" | "netbanking" | "cod",
    couponCode?: string,
    instructions?: string,
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, customMessage?: string) => void;
  assignDeliveryPartner: (orderId: string, partnerId: string) => void;
  advanceDeliveryStep: (orderId: string) => void;
  verifyDeliveryOtp: (orderId: string, inputOtp: string) => boolean;
  cancelOrder: (orderId: string, reason?: string) => void;

  // Admin & Menu operations
  toggleMenuItemStock: (itemId: string) => void;
  updateMenuItem: (item: MenuItem) => void;
  addMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  createCoupon: (coupon: Coupon) => void;

  // Subscriptions & Profile
  addSubscription: (planId: string, mealSlot: "lunch" | "dinner" | "both", address: DeliveryAddress) => void;
  togglePauseSubscriptionDate: (subId: string, dateStr: string) => void;
  submitOrderReview: (orderId: string, rating: number, feedback: string) => void;
  addDeliveryAddress: (address: DeliveryAddress) => void;

  // Demo simulator
  autoPlayOrderSimulation: (orderId: string) => void;
  resetDemoData: () => void;
  loadScenario: (scenarioKey: "thali_order" | "rider_assign" | "out_for_delivery" | "delivered") => void;
}

const STORAGE_KEY = "animas_kitchen_prototype_v1";

const safeGetItem = (key: string) => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSetItem = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {}
};

const safeRemoveItem = (key: string) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {}
};

const DemoStoreContext = createContext<DemoStoreContextType | undefined>(undefined);

export const DemoStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<RoleType>("customer");
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_auth`);
    return saved ? JSON.parse(saved) : false;
  });
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: RoleType;
    phone: string;
    email: string;
  } | null>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : null;
  });

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [trackingViewOpen, setTrackingViewOpen] = useState(false);
  const [thaliModalItem, setThaliModalItem] = useState<MenuItem | null>(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [riderAlertOpen, setRiderAlertOpen] = useState(false);

  // Core Data
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_menu`);
    if (!saved) return INITIAL_MENU_ITEMS;
    try {
      const parsed: MenuItem[] = JSON.parse(saved);
      const merged = INITIAL_MENU_ITEMS.map((initItem) => {
        const existing = parsed.find((p) => p.id === initItem.id);
        if (!existing) return initItem;
        return {
          ...initItem,
          isAvailable: existing.isAvailable ?? initItem.isAvailable,
        };
      });
      const customItems = parsed.filter(
        (p) => !INITIAL_MENU_ITEMS.some((i) => i.id === p.id)
      );
      return [...merged, ...customItems];
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [thaliAddons] = useState<ThaliAddon[]>(REQUIRED_THALI_ADDONS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_cart`);
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_orders`);
    return saved ? JSON.parse(saved) : [INITIAL_DEMO_ORDER];
  });

  const [activeOrderId, setActiveOrderId] = useState<string | null>(() => {
    return orders[0]?.id || null;
  });

  const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartner[]>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_partners`);
    return saved ? JSON.parse(saved) : INITIAL_DELIVERY_PARTNERS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_coupons`);
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [subscriptions, setSubscriptions] = useState<ActiveSubscription[]>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_subs`);
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });

  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMER_PROFILE;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: "log-init",
      timestamp: "Just now",
      role: "system",
      action: "System Initialized",
      details: "Anima's Kitchen live prototype ready for testing.",
    },
  ]);

  const [isSimulationPlaying, setIsSimulationPlaying] = useState(false);

  // Enterprise Cloud Kitchen States
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_inventory`);
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY_ITEMS;
  });

  const [recipeCostings] = useState<RecipeCosting[]>(INITIAL_RECIPE_COSTING);

  const [staffList, setStaffList] = useState<StaffMember[]>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_staff`);
    return saved ? JSON.parse(saved) : INITIAL_STAFF_MEMBERS;
  });

  const [branches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [activeBranchId, setActiveBranchId] = useState<string>("branch-indiranagar");

  const [deliveryZones] = useState<DeliveryZone[]>(INITIAL_DELIVERY_ZONES);

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_tickets`);
    return saved ? JSON.parse(saved) : INITIAL_SUPPORT_TICKETS;
  });

  const [kotTickets, setKotTickets] = useState<KOTTicket[]>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_kot`);
    return saved ? JSON.parse(saved) : INITIAL_KOT_TICKETS;
  });

  const [rushHourMode, setRushHourMode] = useState<boolean>(false);

  const [loyaltyProfile, setLoyaltyProfile] = useState<LoyaltyProfile>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_loyalty`);
    return saved ? JSON.parse(saved) : INITIAL_LOYALTY_PROFILE;
  });

  const [customerWallet, setCustomerWallet] = useState<CustomerWallet>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_wallet`);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMER_WALLET;
  });

  const [useWalletDiscount, setUseWalletDiscount] = useState<boolean>(false);
  const [hasKitchenPass, setHasKitchenPass] = useState<boolean>(false);
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [scheduledTime, setScheduledTime] = useState<string | null>(null);

  const [whatsappLogs, setWhatsappLogs] = useState<WhatsAppLog[]>(() => {
    const saved = safeGetItem(`${STORAGE_KEY}_whatsapp`);
    return saved ? JSON.parse(saved) : INITIAL_WHATSAPP_LOGS;
  });

  // Sync to local storage
  useEffect(() => {
    safeSetItem(`${STORAGE_KEY}_menu`, JSON.stringify(menuItems));
    safeSetItem(`${STORAGE_KEY}_cart`, JSON.stringify(cart));
    safeSetItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
    safeSetItem(`${STORAGE_KEY}_partners`, JSON.stringify(deliveryPartners));
    safeSetItem(`${STORAGE_KEY}_coupons`, JSON.stringify(coupons));
    safeSetItem(`${STORAGE_KEY}_subs`, JSON.stringify(subscriptions));
    safeSetItem(`${STORAGE_KEY}_profile`, JSON.stringify(customerProfile));
    safeSetItem(`${STORAGE_KEY}_inventory`, JSON.stringify(inventoryItems));
    safeSetItem(`${STORAGE_KEY}_staff`, JSON.stringify(staffList));
    safeSetItem(`${STORAGE_KEY}_tickets`, JSON.stringify(supportTickets));
    safeSetItem(`${STORAGE_KEY}_kot`, JSON.stringify(kotTickets));
    safeSetItem(`${STORAGE_KEY}_loyalty`, JSON.stringify(loyaltyProfile));
    safeSetItem(`${STORAGE_KEY}_wallet`, JSON.stringify(customerWallet));
    safeSetItem(`${STORAGE_KEY}_whatsapp`, JSON.stringify(whatsappLogs));
  }, [
    menuItems,
    cart,
    orders,
    deliveryPartners,
    coupons,
    subscriptions,
    customerProfile,
    inventoryItems,
    staffList,
    supportTickets,
    kotTickets,
    loyaltyProfile,
    customerWallet,
    whatsappLogs,
  ]);

  const logActivity = useCallback((role: ActivityLog["role"], action: string, details: string, relatedOrderId?: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      role,
      action,
      details,
      relatedOrderId,
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  }, []);

  const activeOrder = useMemo(() => {
    if (!activeOrderId) return orders[0] || null;
    return orders.find((o) => o.id === activeOrderId) || orders[0] || null;
  }, [orders, activeOrderId]);

  const activeRider = useMemo(() => {
    return deliveryPartners[0] || INITIAL_DELIVERY_PARTNERS[0];
  }, [deliveryPartners]);

  // Cart Calculations
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.itemTotal * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // Cart operations
  const addToCart = useCallback(
    (item: MenuItem, selectedAddons: SelectedAddon[] = [], specialInstructions?: string) => {
      const addonsPrice = selectedAddons.reduce((acc, a) => acc + a.addon.price * a.quantity, 0);
      const singleItemTotal = item.price + addonsPrice;

      setCart((prev) => {
        // If exact same item with same addons exists, increment qty
        const addonKey = selectedAddons
          .map((a) => `${a.addon.id}:${a.quantity}`)
          .sort()
          .join("|");

        const existingIdx = prev.findIndex(
          (ci) =>
            ci.menuItem.id === item.id &&
            ci.selectedAddons
              .map((a) => `${a.addon.id}:${a.quantity}`)
              .sort()
              .join("|") === addonKey,
        );

        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx].quantity += 1;
          return updated;
        }

        const newCartItem: CartItem = {
          id: `ci-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          menuItem: item,
          quantity: 1,
          selectedAddons,
          specialInstructions,
          itemTotal: singleItemTotal,
        };
        return [...prev, newCartItem];
      });

      // Automatically open right sidebar cart drawer
      setCartDrawerOpen(true);

      toast.success(`Added ${item.name} to cart!`, {
        description: selectedAddons.length > 0 ? `With ${selectedAddons.length} delicious add-ons` : undefined,
      });
      logActivity("customer", "Added to Cart", `${item.name} (${selectedAddons.length} add-ons)`);
    },
    [logActivity, setCartDrawerOpen],
  );

  const updateCartItemQty = useCallback((cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Place Order
  const placeOrder = useCallback(
    (
      address: DeliveryAddress,
      paymentMethod: "upi" | "card" | "netbanking" | "cod" | "wallet",
      couponCode?: string,
      instructions?: string,
    ): Order => {
      const orderNum = `AK-${Math.floor(1000 + Math.random() * 9000)}`;
      const subtotal = cartTotal;
      const tax = Math.round(subtotal * 0.05);

      let discount = 0;
      if (couponCode) {
        const foundCoupon = coupons.find((c) => c.code.toUpperCase() === couponCode.toUpperCase());
        if (foundCoupon) {
          if (foundCoupon.discountType === "flat") {
            discount = foundCoupon.discountValue;
          } else {
            discount = Math.round((subtotal * foundCoupon.discountValue) / 100);
            if (foundCoupon.maxDiscount && discount > foundCoupon.maxDiscount) {
              discount = foundCoupon.maxDiscount;
            }
          }
        }
      }

      const deliveryFee = subtotal > 299 || hasKitchenPass || orderType === "pickup" ? 0 : 20;
      let preWalletAmt = Math.max(0, subtotal + tax + deliveryFee - discount);
      let walletDeduction = 0;

      if ((paymentMethod === "wallet" || useWalletDiscount) && customerWallet.balance > 0) {
        walletDeduction = Math.min(customerWallet.balance, preWalletAmt);
        preWalletAmt = Math.max(0, preWalletAmt - walletDeduction);

        setCustomerWallet((prev) => ({
          balance: prev.balance - walletDeduction,
          transactions: [
            {
              id: `tx-${Date.now()}`,
              type: "debit",
              amount: walletDeduction,
              description: `Paid for Order #${orderNum}`,
              date: "Today",
            },
            ...prev.transactions,
          ],
        }));
      }

      const finalAmt = preWalletAmt;
      const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

      // Automatic Recipe-based Inventory Stock Deduction!
      setInventoryItems((prev) => {
        let updated = [...prev];
        cart.forEach((cartItem) => {
          const recipe = INITIAL_RECIPE_COSTING.find((rc) => rc.itemId === cartItem.menuItem.id);
          if (recipe) {
            recipe.requirements.forEach((req) => {
              const needed = req.quantityNeeded * cartItem.quantity;
              updated = updated.map((inv) => {
                if (inv.id === req.rawMaterialId) {
                  return {
                    ...inv,
                    currentStock: Math.max(0, Number((inv.currentStock - needed).toFixed(2))),
                  };
                }
                return inv;
              });
            });
          }
        });
        return updated;
      });

      // Earn Loyalty Points (10 points per ₹100)
      const earnedPts = Math.floor(finalAmt / 10);
      if (earnedPts > 0) {
        setLoyaltyProfile((prev) => ({
          ...prev,
          points: prev.points + earnedPts,
        }));
      }

      // Generate KOT Ticket for Kitchen Display System
      const kotItems = cart.map((c) => ({
        name: c.menuItem.name,
        quantity: c.quantity,
        notes: c.specialInstructions,
      }));
      const newKot: KOTTicket = {
        id: `kot-${Date.now()}`,
        orderNumber: orderNum,
        items: kotItems,
        station: cart.some((c) => c.menuItem.name.includes("Thali") || c.menuItem.name.includes("Roti"))
          ? "Tawa Station"
          : "Handi & Curry",
        prepTimeMinutes: rushHourMode ? 25 : 16,
        isPriority: hasKitchenPass || finalAmt > 350,
        isDelayed: false,
        notes: instructions || (orderType === "pickup" ? "Self Pickup" : "Delivery packing"),
        status: "new",
        createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setKotTickets((prev) => [newKot, ...prev]);

      // Automated WhatsApp Notification Log
      const newWaLog: WhatsAppLog = {
        id: `wa-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recipientPhone: customerProfile.phone,
        recipientName: customerProfile.name,
        event: "order_confirmed",
        message: `🍱 *Anima's Kitchen*: Namaste ${customerProfile.name}! Order #${orderNum} confirmed (${orderType === "pickup" ? "Self Pickup" : "Doorstep Delivery"}). Preparation started at Indiranagar Hub.`,
      };
      setWhatsappLogs((prev) => [newWaLog, ...prev]);

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: orderNum,
        createdAt: new Date().toISOString(),
        customerName: customerProfile.name,
        customerPhone: customerProfile.phone,
        deliveryAddress: address,
        items: [...cart],
        itemTotal: subtotal,
        taxAmount: tax,
        deliveryFee,
        discountAmount: discount,
        appliedCoupon: couponCode,
        finalTotal: finalAmt,
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
        status: "placed",
        deliveryOtp: randomOtp,
        estimatedDeliveryMinutes: rushHourMode ? 35 : 24,
        orderType,
        scheduledTime: scheduledTime || undefined,
        walletDeduction,
        kotTicketId: newKot.id,
        timeline: [
          {
            status: "placed",
            label: "Order Placed",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            description: `Order received via ${paymentMethod.toUpperCase()}${walletDeduction > 0 ? ` (₹${walletDeduction} from wallet)` : ""}`,
          },
        ],
        coordinates: {
          kitchen: KITCHEN_LOCATION,
          currentRider: KITCHEN_LOCATION,
          customer: address.coordinates || { lat: 12.9784, lng: 77.6408 },
          progressRatio: 0,
        },
        currentDeliveryStep: "assigned",
        deliveryInstructions: instructions,
      };

      setOrders((prev) => [newOrder, ...prev]);
      setActiveOrderId(newOrder.id);
      clearCart();
      setCheckoutModalOpen(false);
      setCartDrawerOpen(false);
      setTrackingViewOpen(true);

      logActivity("customer", "Placed New Order", `Order #${orderNum} for ₹${finalAmt}`, newOrder.id);
      toast.success(`Order Placed Successfully!`, {
        description: `Order #${orderNum} sent to Kitchen. Raw materials auto-deducted!`,
      });

      return newOrder;
    },
    [
      cart,
      cartTotal,
      coupons,
      customerProfile,
      clearCart,
      logActivity,
      hasKitchenPass,
      orderType,
      scheduledTime,
      useWalletDiscount,
      customerWallet.balance,
      rushHourMode,
    ],
  );

  // Status Advancement
  const updateOrderStatus = useCallback(
    (orderId: string, status: OrderStatus, customMessage?: string) => {
      setOrders((prev) =>
        prev.map((ord) => {
          if (ord.id !== orderId) return ord;

          const labelMap: Record<OrderStatus, string> = {
            placed: "Order Placed",
            confirmed: "Confirmed by Kitchen",
            preparing: "Food Preparing",
            ready: "Food Packed & Ready",
            picked_up: "Picked Up by Rider",
            out_for_delivery: "Out for Delivery",
            delivered: "Delivered Successfully",
            cancelled: "Order Cancelled",
          };

          const newTimelineEvent = {
            status,
            label: labelMap[status],
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            description: customMessage || `Status changed to ${labelMap[status]}`,
          };

          return {
            ...ord,
            status,
            timeline: [...ord.timeline, newTimelineEvent],
          };
        }),
      );
      logActivity("admin", `Status Updated to ${status}`, `Order #${orderId}`, orderId);
    },
    [logActivity],
  );

  // Assign Delivery Partner
  const assignDeliveryPartner = useCallback(
    (orderId: string, partnerId: string) => {
      const partner = deliveryPartners.find((p) => p.id === partnerId);
      if (!partner) return;

      setOrders((prev) =>
        prev.map((ord) => {
          if (ord.id !== orderId) return ord;
          return {
            ...ord,
            deliveryPartnerId: partnerId,
            currentDeliveryStep: "assigned",
            timeline: [
              ...ord.timeline,
              {
                status: ord.status,
                label: "Rider Assigned",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                description: `${partner.name} (${partner.vehicle.model}) assigned to deliver`,
              },
            ],
          };
        }),
      );

      // Trigger rider alert modal if role is rider or notify
      setRiderAlertOpen(true);
      toast.info(`Rider ${partner.name} assigned to Order #${orderId}`);
      logActivity("admin", "Rider Assigned", `${partner.name} assigned to order`, orderId);
    },
    [deliveryPartners, logActivity],
  );

  // Advance Delivery Step (Rider Workflow)
  const advanceDeliveryStep = useCallback(
    (orderId: string) => {
      setOrders((prev) =>
        prev.map((ord) => {
          if (ord.id !== orderId) return ord;

          let nextStep: DeliveryStep = ord.currentDeliveryStep;
          let nextStatus: OrderStatus = ord.status;
          let progress = ord.coordinates.progressRatio;
          let desc = "";

          switch (ord.currentDeliveryStep) {
            case "assigned":
              nextStep = "accepted";
              desc = "Rider accepted the delivery request";
              break;
            case "accepted":
              nextStep = "arrived_at_kitchen";
              desc = "Rider reached Anima's Kitchen Hub";
              break;
            case "arrived_at_kitchen":
              nextStep = "picked_up";
              nextStatus = "picked_up";
              desc = "Rider picked up the hot insulated thali box";
              break;
            case "picked_up":
              nextStep = "out_for_delivery";
              nextStatus = "out_for_delivery";
              progress = 0.35;
              desc = "Rider started navigation towards customer location";
              break;
            case "out_for_delivery":
              nextStep = "reached_customer";
              progress = 0.95;
              desc = "Rider arrived at customer doorstep. Awaiting OTP.";
              break;
            case "reached_customer":
              nextStep = "otp_verified";
              desc = "Customer OTP verified successfully";
              break;
            case "otp_verified":
              nextStep = "delivered";
              nextStatus = "delivered";
              progress = 1.0;
              desc = "Order handed over to customer. Bon Appétit!";
              break;
            default:
              return ord;
          }

          // Calculate interpolated rider coordinates for map animation
          const kLat = ord.coordinates.kitchen.lat;
          const kLng = ord.coordinates.kitchen.lng;
          const cLat = ord.coordinates.customer.lat;
          const cLng = ord.coordinates.customer.lng;

          const currentRider = {
            lat: kLat + (cLat - kLat) * progress,
            lng: kLng + (cLng - kLng) * progress,
          };

          return {
            ...ord,
            status: nextStatus,
            currentDeliveryStep: nextStep,
            coordinates: {
              ...ord.coordinates,
              currentRider,
              progressRatio: progress,
            },
            timeline: [
              ...ord.timeline,
              {
                status: nextStatus,
                label: nextStep.replace(/_/g, " ").toUpperCase(),
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                description: desc,
              },
            ],
          };
        }),
      );
      logActivity("rider", "Delivery Step Advanced", `Order #${orderId}`);
    },
    [logActivity],
  );

  // OTP Verification
  const verifyDeliveryOtp = useCallback(
    (orderId: string, inputOtp: string): boolean => {
      const order = orders.find((o) => o.id === orderId);
      if (!order) return false;

      if (order.deliveryOtp.trim() === inputOtp.trim()) {
        advanceDeliveryStep(orderId);
        // also mark delivered
        setTimeout(() => {
          advanceDeliveryStep(orderId);
        }, 500);

        toast.success("OTP Verified! Order marked as Delivered.", {
          description: "Payment credited to delivery partner wallet.",
        });

        // Add earning to rider
        setDeliveryPartners((prev) =>
          prev.map((p) => {
            if (p.id === order.deliveryPartnerId || p.id === "partner-rajesh") {
              return {
                ...p,
                todayEarnings: p.todayEarnings + 65,
                totalDeliveries: p.totalDeliveries + 1,
                walletBalance: p.walletBalance + 65,
              };
            }
            return p;
          }),
        );
        return true;
      } else {
        toast.error("Invalid Delivery OTP!", {
          description: `Customer's OTP is ${order.deliveryOtp}. Please re-check.`,
        });
        return false;
      }
    },
    [orders, advanceDeliveryStep],
  );

  const cancelOrder = useCallback(
    (orderId: string, reason?: string) => {
      updateOrderStatus(orderId, "cancelled", reason || "Order cancelled by user/admin");
      toast.info(`Order #${orderId} has been cancelled.`);
    },
    [updateOrderStatus],
  );

  // Menu Management
  const toggleMenuItemStock = useCallback((itemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextVal = !item.isAvailable;
          toast.info(`${item.name} is now ${nextVal ? "IN STOCK" : "OUT OF STOCK"}`);
          return { ...item, isAvailable: nextVal };
        }
        return item;
      }),
    );
  }, []);

  const updateMenuItem = useCallback((item: MenuItem) => {
    setMenuItems((prev) => prev.map((m) => (m.id === item.id ? item : m)));
    toast.success(`Updated ${item.name}`);
  }, []);

  const addMenuItem = useCallback((item: MenuItem) => {
    setMenuItems((prev) => [item, ...prev]);
    toast.success(`Added ${item.name} to menu!`);
  }, []);

  const deleteMenuItem = useCallback((itemId: string) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== itemId));
    toast.info("Item removed from menu");
  }, []);

  const createCoupon = useCallback((coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    toast.success(`Coupon code ${coupon.code} created!`);
  }, []);

  // Subscriptions
  const addSubscription = useCallback((planId: string, mealSlot: "lunch" | "dinner" | "both", address: DeliveryAddress) => {
    const plan = INITIAL_TIFFIN_PLANS.find((p) => p.id === planId) || INITIAL_TIFFIN_PLANS[0];
    const totalDays = plan.planType === "daily" ? 1 : plan.planType === "weekly" ? 5 : 30;

    const newSub: ActiveSubscription = {
      id: `sub-${Date.now()}`,
      planId,
      planName: plan.name,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + totalDays * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "active",
      mealSlot,
      deliveryAddress: address,
      pausedDates: [],
      totalDays,
      daysRemaining: totalDays,
    };

    setSubscriptions((prev) => [newSub, ...prev]);
    toast.success(`Subscribed to ${plan.name}!`, {
      description: `Daily ${mealSlot} tiffin will be delivered to ${address.label}.`,
    });
  }, []);

  const togglePauseSubscriptionDate = useCallback((subId: string, dateStr: string) => {
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id !== subId) return sub;
        const exists = sub.pausedDates.includes(dateStr);
        const updated = exists ? sub.pausedDates.filter((d) => d !== dateStr) : [...sub.pausedDates, dateStr];
        toast.info(exists ? `Resumed meal for ${dateStr}` : `Skipped meal on ${dateStr}`);
        return { ...sub, pausedDates: updated };
      }),
    );
  }, []);

  const submitOrderReview = useCallback((orderId: string, rating: number, feedback: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return { ...ord, customerRating: rating, customerFeedback: feedback };
      }),
    );
    toast.success("Thank you for your rating & feedback!", {
      description: "It helps Anima's Kitchen maintain high homemade standards.",
    });
  }, []);

  const addDeliveryAddress = useCallback((address: DeliveryAddress) => {
    setCustomerProfile((prev) => ({
      ...prev,
      savedAddresses: [...prev.savedAddresses, address],
    }));
    toast.success(`Saved new address: ${address.label}`);
  }, []);

  // Enterprise Operational Handlers
  const updateInventoryStock = useCallback((itemId: string, delta: number) => {
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const newStock = Math.max(0, Number((item.currentStock + delta).toFixed(2)));
        return {
          ...item,
          currentStock: newStock,
          lastRestocked: delta > 0 ? "Just now" : item.lastRestocked,
        };
      }),
    );
    toast.success(`Inventory Stock Updated`);
  }, []);

  const recordWastage = useCallback((itemId: string, amount: number, reason: string) => {
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const newStock = Math.max(0, Number((item.currentStock - amount).toFixed(2)));
        return { ...item, currentStock: newStock };
      }),
    );
    toast.warning(`Logged wastage: ${amount} ${reason}`);
  }, []);

  const toggleStaffDuty = useCallback((staffId: string) => {
    setStaffList((prev) =>
      prev.map((s) => {
        if (s.id !== staffId) return s;
        const nextState = !s.onDuty;
        toast.info(`${s.name} is now ${nextState ? "ON DUTY" : "OFF DUTY"}`);
        return { ...s, onDuty: nextState };
      }),
    );
  }, []);

  const createSupportTicket = useCallback((data: Omit<SupportTicket, "id" | "ticketNumber" | "createdAt">) => {
    const newTicket: SupportTicket = {
      ...data,
      id: `tkt-${Date.now()}`,
      ticketNumber: `SUP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: "Just now",
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    toast.success(`Support Ticket #${newTicket.ticketNumber} registered!`, {
      description: "Our kitchen manager has been alerted.",
    });
  }, []);

  const updateSupportTicketStatus = useCallback((ticketId: string, status: "open" | "in_progress" | "resolved") => {
    setSupportTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status } : t)),
    );
    toast.success(`Ticket status updated to ${status.replace("_", " ").toUpperCase()}`);
  }, []);

  const updateKotTicketStatus = useCallback((kotId: string, status: "new" | "preparing" | "ready") => {
    setKotTickets((prev) =>
      prev.map((k) => (k.id === kotId ? { ...k, status } : k)),
    );
    toast.info(`KOT ticket marked as ${status.toUpperCase()}`);
  }, []);

  const redeemLoyaltyPoints = useCallback((points: number, rewardLabel: string): boolean => {
    if (loyaltyProfile.points < points) {
      toast.error(`Insufficient points! You have ${loyaltyProfile.points} points.`);
      return false;
    }
    setLoyaltyProfile((prev) => ({
      ...prev,
      points: prev.points - points,
    }));
    toast.success(`Redeemed ${points} points for ${rewardLabel}!`);
    return true;
  }, [loyaltyProfile.points]);

  const addWalletMoney = useCallback((amount: number) => {
    setCustomerWallet((prev) => ({
      balance: prev.balance + amount,
      transactions: [
        {
          id: `tx-${Date.now()}`,
          type: "credit",
          amount,
          description: `Wallet recharge via UPI`,
          date: "Today",
        },
        ...prev.transactions,
      ],
    }));
    toast.success(`₹${amount} added to your Anima's Wallet!`);
  }, []);

  const triggerWhatsAppSimulatedMessage = useCallback((event: WhatsAppLog["event"], details: string) => {
    const newLog: WhatsAppLog = {
      id: `wa-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      recipientPhone: customerProfile.phone,
      recipientName: customerProfile.name,
      event,
      message: details,
    };
    setWhatsappLogs((prev) => [newLog, ...prev]);
  }, [customerProfile]);

  const loginAsRole = useCallback(
    (role: RoleType, credentials?: { identifier?: string; password?: string }) => {
      setActiveRole(role);
      setIsAuthenticated(true);
      let userObj = {
        name: "Rahul Sharma",
        role,
        phone: "+91 98765 43210",
        email: "rahul@animaskitchen.com",
      };
      if (role === "rider") {
        userObj = {
          name: "Rajesh Kumar",
          role: "rider",
          phone: "+91 98450 12345",
          email: "rajesh.rider@animas.com",
        };
      } else if (role === "admin" || role === "kds") {
        userObj = {
          name: "Anima Chef & Admin",
          role,
          phone: "+91 98111 22334",
          email: "admin@animaskitchen.com",
        };
      }
      if (credentials?.identifier) {
        userObj.email = credentials.identifier;
      }
      setCurrentUser(userObj);
      try {
        safeSetItem(`${STORAGE_KEY}_auth`, "true");
        safeSetItem(`${STORAGE_KEY}_user`, JSON.stringify(userObj));
      } catch (e) {
        console.warn(e);
      }
      toast.success(`Welcome back, ${userObj.name}!`, {
        description: `Logged in to ${role.toUpperCase()} portal.`,
      });
      logActivity("system", "User Login", `Logged in as ${role.toUpperCase()} (${userObj.name})`);
    },
    [setActiveRole, logActivity],
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    try {
      safeRemoveItem(`${STORAGE_KEY}_auth`);
      safeRemoveItem(`${STORAGE_KEY}_user`);
    } catch (e) {
      console.warn(e);
    }
    toast.info("Logged out", { description: "Returned to Customer website" });
    logActivity("system", "User Logout", "Logged out to guest customer mode");
  }, [logActivity]);

  // Auto Simulation Player
  const autoPlayOrderSimulation = useCallback(
    (orderId: string) => {
      setIsSimulationPlaying(true);
      toast.info("Starting Live Flow Simulation...", {
        description: "Watch the lifecycle unfold automatically!",
      });

      const steps: Array<{ action: () => void; delay: number }> = [
        { action: () => updateOrderStatus(orderId, "confirmed", "Chef confirmed order"), delay: 1500 },
        { action: () => updateOrderStatus(orderId, "preparing", "Cooking on stove with pure ghee"), delay: 3500 },
        { action: () => assignDeliveryPartner(orderId, "partner-rajesh"), delay: 5500 },
        { action: () => updateOrderStatus(orderId, "ready", "Packed hot in insulated box"), delay: 7500 },
        { action: () => advanceDeliveryStep(orderId), delay: 9500 }, // accept
        { action: () => advanceDeliveryStep(orderId), delay: 11500 }, // arrived at kitchen
        { action: () => advanceDeliveryStep(orderId), delay: 13500 }, // picked up
        { action: () => advanceDeliveryStep(orderId), delay: 15500 }, // start delivery
        { action: () => advanceDeliveryStep(orderId), delay: 18500 }, // reached customer
        {
          action: () => {
            const ord = orders.find((o) => o.id === orderId);
            if (ord) verifyDeliveryOtp(orderId, ord.deliveryOtp);
            setIsSimulationPlaying(false);
          },
          delay: 21500,
        },
      ];

      steps.forEach((step) => {
        setTimeout(step.action, step.delay);
      });
    },
    [updateOrderStatus, assignDeliveryPartner, advanceDeliveryStep, verifyDeliveryOtp, orders],
  );

  const resetDemoData = useCallback(() => {
    safeRemoveItem(`${STORAGE_KEY}_menu`);
    safeRemoveItem(`${STORAGE_KEY}_cart`);
    safeRemoveItem(`${STORAGE_KEY}_orders`);
    safeRemoveItem(`${STORAGE_KEY}_partners`);
    safeRemoveItem(`${STORAGE_KEY}_coupons`);
    safeRemoveItem(`${STORAGE_KEY}_subs`);
    safeRemoveItem(`${STORAGE_KEY}_profile`);
    safeRemoveItem(`${STORAGE_KEY}_auth`);
    safeRemoveItem(`${STORAGE_KEY}_user`);
    safeRemoveItem(`${STORAGE_KEY}_inventory`);
    safeRemoveItem(`${STORAGE_KEY}_staff`);
    safeRemoveItem(`${STORAGE_KEY}_tickets`);
    safeRemoveItem(`${STORAGE_KEY}_kot`);
    safeRemoveItem(`${STORAGE_KEY}_loyalty`);
    safeRemoveItem(`${STORAGE_KEY}_wallet`);
    safeRemoveItem(`${STORAGE_KEY}_whatsapp`);

    setMenuItems(INITIAL_MENU_ITEMS);
    setCart([]);
    setOrders([INITIAL_DEMO_ORDER]);
    setActiveOrderId(INITIAL_DEMO_ORDER.id);
    setDeliveryPartners(INITIAL_DELIVERY_PARTNERS);
    setCoupons(INITIAL_COUPONS);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    setCustomerProfile(INITIAL_CUSTOMER_PROFILE);
    setInventoryItems(INITIAL_INVENTORY_ITEMS);
    setStaffList(INITIAL_STAFF_MEMBERS);
    setSupportTickets(INITIAL_SUPPORT_TICKETS);
    setKotTickets(INITIAL_KOT_TICKETS);
    setRushHourMode(false);
    setLoyaltyProfile(INITIAL_LOYALTY_PROFILE);
    setCustomerWallet(INITIAL_CUSTOMER_WALLET);
    setUseWalletDiscount(false);
    setHasKitchenPass(false);
    setOrderType("delivery");
    setScheduledTime(null);
    setWhatsappLogs(INITIAL_WHATSAPP_LOGS);
    setActivityLogs([
      {
        id: `log-${Date.now()}`,
        timestamp: "Just now",
        role: "system",
        action: "Demo Reset",
        details: "Restored fresh initial demo environment.",
      },
    ]);
    toast.success("Demo State Reset to Default!");
  }, []);

  const loadScenario = useCallback(
    (scenarioKey: "thali_order" | "rider_assign" | "out_for_delivery" | "delivered") => {
      switch (scenarioKey) {
        case "thali_order": {
          // Preload cart with Dal Tadka Thali + 2 Parathas + 1 Paneer
          const thaliItem = menuItems[0];
          addToCart(
            thaliItem,
            [
              { addon: REQUIRED_THALI_ADDONS[0], quantity: 2 }, // LA
              { addon: REQUIRED_THALI_ADDONS[6], quantity: 1 }, // PA
            ],
            "Extra tadka in dal please!",
          );
          setCartDrawerOpen(true);
          toast.success("Scenario Loaded: Dal Tadka Thali + Add-ons added to Cart!");
          break;
        }
        case "rider_assign": {
          if (activeOrder) {
            assignDeliveryPartner(activeOrder.id, "partner-rajesh");
            setActiveRole("rider");
            toast.success("Scenario: Rider Assigned! Switched to Delivery Partner view.");
          }
          break;
        }
        case "out_for_delivery": {
          if (activeOrder) {
            updateOrderStatus(activeOrder.id, "out_for_delivery");
            setActiveRole("customer");
            setTrackingViewOpen(true);
            toast.success("Scenario: Order is Out for Delivery with Live Map!");
          }
          break;
        }
        case "delivered": {
          if (activeOrder) {
            verifyDeliveryOtp(activeOrder.id, activeOrder.deliveryOtp);
            setActiveRole("customer");
            setTrackingViewOpen(true);
            toast.success("Scenario: Order Delivered & OTP verified!");
          }
          break;
        }
      }
    },
    [menuItems, addToCart, activeOrder, assignDeliveryPartner, updateOrderStatus, verifyDeliveryOtp],
  );

  return (
    <DemoStoreContext.Provider
      value={{
        activeRole,
        setActiveRole,
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        loginAsRole,
        logout,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        isPhoneFrame,
        setIsPhoneFrame,
        cartDrawerOpen,
        setCartDrawerOpen,
        checkoutModalOpen,
        setCheckoutModalOpen,
        profileDrawerOpen,
        setProfileDrawerOpen,
        trackingViewOpen,
        setTrackingViewOpen,
        thaliModalItem,
        setThaliModalItem,
        demoModalOpen,
        setDemoModalOpen,
        riderAlertOpen,
        setRiderAlertOpen,
        menuItems,
        thaliAddons,
        cart,
        orders,
        activeOrder,
        setActiveOrderId,
        deliveryPartners,
        activeRider,
        coupons,
        subscriptions,
        customerProfile,
        activityLogs,
        isSimulationPlaying,
        addToCart,
        updateCartItemQty,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        placeOrder,
        updateOrderStatus,
        assignDeliveryPartner,
        advanceDeliveryStep,
        verifyDeliveryOtp,
        cancelOrder,
        toggleMenuItemStock,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        createCoupon,
        addSubscription,
        togglePauseSubscriptionDate,
        submitOrderReview,
        addDeliveryAddress,
        autoPlayOrderSimulation,
        resetDemoData,
        loadScenario,
        // Enterprise Cloud Kitchen Values
        inventoryItems,
        updateInventoryStock,
        recordWastage,
        recipeCostings,
        staffList,
        toggleStaffDuty,
        branches,
        activeBranchId,
        setActiveBranchId,
        deliveryZones,
        supportTickets,
        createSupportTicket,
        updateSupportTicketStatus,
        kotTickets,
        updateKotTicketStatus,
        rushHourMode,
        setRushHourMode,
        loyaltyProfile,
        redeemLoyaltyPoints,
        customerWallet,
        addWalletMoney,
        useWalletDiscount,
        setUseWalletDiscount,
        hasKitchenPass,
        setHasKitchenPass,
        orderType,
        setOrderType,
        scheduledTime,
        setScheduledTime,
        whatsappLogs,
        triggerWhatsAppSimulatedMessage,
      }}
    >
      {children}
    </DemoStoreContext.Provider>
  );
};

export const useDemoStore = () => {
  const context = useContext(DemoStoreContext);
  if (!context) {
    throw new Error("useDemoStore must be used within a DemoStoreProvider");
  }
  return context;
};

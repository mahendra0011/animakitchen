import React, { useState } from "react";
import { useDemoStore } from "@/context/DemoStoreContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Plus,
  CreditCard,
  QrCode,
  Banknote,
  Building,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Bike,
  Clock,
  Wallet,
  Check,
} from "lucide-react";
import type { DeliveryAddress } from "@/types/kitchen";

export const CheckoutModal: React.FC = () => {
  const {
    checkoutModalOpen,
    setCheckoutModalOpen,
    customerProfile,
    cart,
    cartTotal,
    placeOrder,
    addDeliveryAddress,
    orderType,
    setOrderType,
    scheduledTime,
    setScheduledTime,
    customerWallet,
    useWalletDiscount,
    setUseWalletDiscount,
    hasKitchenPass,
  } = useDemoStore();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    customerProfile.savedAddresses[0]?.id || "addr-home"
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newStreet, setNewStreet] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newPincode, setNewPincode] = useState("560038");
  const [newLabel, setNewLabel] = useState<"Home" | "Office" | "Other">("Home");

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "cod">("upi");
  const [upiId, setUpiId] = useState("rahul@okhdfcbank");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedAddress =
    customerProfile.savedAddresses.find((a) => a.id === selectedAddressId) ||
    customerProfile.savedAddresses[0];

  // GST 5% breakdown: 2.5% CGST + 2.5% SGST
  const cgst = Math.round(cartTotal * 0.025);
  const sgst = Math.round(cartTotal * 0.025);
  const tax = cgst + sgst;

  // Delivery fee logic
  const rawDeliveryFee = orderType === "pickup" || hasKitchenPass ? 0 : cartTotal > 299 ? 0 : 35;
  const deliveryFee = rawDeliveryFee;

  // Wallet deduction logic
  const preWalletTotal = cartTotal + tax + deliveryFee;
  const walletDeductAmount = useWalletDiscount
    ? Math.min(customerWallet.balance, preWalletTotal)
    : 0;
  const grandTotal = Math.max(0, preWalletTotal - walletDeductAmount);

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newArea) return;
    const newAddr: DeliveryAddress = {
      id: `addr-${Date.now()}`,
      label: newLabel,
      street: newStreet,
      area: newArea,
      city: "Bengaluru",
      pincode: newPincode,
      coordinates: { lat: 12.975, lng: 77.643 },
      contactPhone: customerProfile.phone,
      contactName: customerProfile.name,
    };
    addDeliveryAddress(newAddr);
    setSelectedAddressId(newAddr.id);
    setShowNewAddressForm(false);
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      placeOrder(
        selectedAddress,
        paymentMethod,
        "ANIMA120",
        scheduledTime ? `Scheduled for: ${scheduledTime}` : "Fast delivery please"
      );
    }, 1200);
  };

  return (
    <Dialog open={checkoutModalOpen} onOpenChange={setCheckoutModalOpen}>
      <DialogContent className="max-w-3xl overflow-hidden rounded-3xl border border-ink/10 bg-frost p-0 shadow-2xl text-ink">
        {/* Header */}
        <div className="border-b border-ink/10 bg-cream p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-xl bg-ink text-cream">
                <ShieldCheck className="size-4" />
              </span>
              <div>
                <DialogTitle className="font-display text-2xl text-ink">
                  Secure Checkout
                </DialogTitle>
                <DialogDescription className="text-xs text-ink/60">
                  Direct Kitchen Dispatch · 5% GST Compliant · Live GPS Tracked
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasKitchenPass && (
                <Badge className="bg-purple-700 text-white font-mono text-[10px]">
                  KITCHEN PASS ACTIVE
                </Badge>
              )}
              <Badge variant="outline" className="font-mono text-xs border-leaf/40 text-leaf">
                SSL Encrypted
              </Badge>
            </div>
          </div>
        </div>

        {/* 2-Column Body */}
        <div className="grid md:grid-cols-5 gap-6 p-6 max-h-[75vh] overflow-y-auto">
          {/* Left 3 cols: Delivery Mode, Address & Payment */}
          <div className="md:col-span-3 space-y-5">
            {/* Step 0: Delivery Mode Toggle & Scheduling */}
            <div className="space-y-3">
              <label className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/70 flex items-center justify-between">
                <span>1. Fulfillment Mode</span>
                <span className="font-mono text-[10px] text-spice font-bold">
                  {orderType === "delivery" ? "DOORSTEP RIDER" : "SELF PICKUP"}
                </span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                    orderType === "delivery"
                      ? "border-spice bg-spice/5 ring-2 ring-spice/20"
                      : "border-ink/10 bg-white hover:border-ink/20"
                  }`}
                >
                  <Bike className="size-4 text-spice shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-ink block">Doorstep Delivery</span>
                    <span className="text-[10px] text-ink/50 block">Rider to your address</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType("pickup")}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                    orderType === "pickup"
                      ? "border-spice bg-spice/5 ring-2 ring-spice/20"
                      : "border-ink/10 bg-white hover:border-ink/20"
                  }`}
                >
                  <ShoppingBag className="size-4 text-spice shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-ink block">Self Takeaway</span>
                    <span className="text-[10px] text-emerald-700 font-bold block">Free · 0 Delivery Fee</span>
                  </div>
                </button>
              </div>

              {/* Scheduled Order Slot */}
              <div className="p-3 rounded-2xl bg-white border border-ink/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-ink/50" />
                  <div>
                    <span className="font-semibold text-ink block">Delivery Timing</span>
                    <span className="text-[10px] text-ink/50 font-mono">
                      {scheduledTime ? `Scheduled: ${scheduledTime}` : "Immediate (20-30 mins)"}
                    </span>
                  </div>
                </div>
                <select
                  value={scheduledTime || "now"}
                  onChange={(e) => setScheduledTime(e.target.value === "now" ? null : e.target.value)}
                  className="rounded-xl border border-ink/20 bg-frost text-xs p-1.5 focus:outline-none"
                >
                  <option value="now">⚡ Deliver Now (20-30m)</option>
                  <option value="Today Lunch (1:00 PM - 1:30 PM)">Today Lunch (1:00 PM)</option>
                  <option value="Today Dinner (8:00 PM - 8:30 PM)">Today Dinner (8:00 PM)</option>
                  <option value="Tomorrow Lunch (1:00 PM - 1:30 PM)">Tomorrow Lunch (1:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Step 1: Delivery Address (or Pickup Location) */}
            <div>
              {orderType === "delivery" ? (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/70 flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-spice" />
                      2. Delivery Address
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm((prev) => !prev)}
                      className="text-xs text-spice font-semibold hover:underline flex items-center gap-1"
                    >
                      <Plus className="size-3" />
                      {showNewAddressForm ? "Cancel" : "Add New"}
                    </button>
                  </div>

                  {showNewAddressForm ? (
                    <form
                      onSubmit={handleSaveNewAddress}
                      className="rounded-2xl border border-ink/10 bg-cream/50 p-4 space-y-3"
                    >
                      <p className="font-display text-sm text-ink">Add New Address</p>
                      <div className="flex gap-2">
                        {(["Home", "Office", "Other"] as const).map((lbl) => (
                          <button
                            key={lbl}
                            type="button"
                            onClick={() => setNewLabel(lbl)}
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              newLabel === lbl
                                ? "bg-ink text-cream"
                                : "border border-ink/15 text-ink/70"
                            }`}
                          >
                            {lbl}
                          </button>
                        ))}
                      </div>
                      <Input
                        placeholder="Flat / House No / Building name"
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        required
                        className="rounded-xl border-ink/15 text-xs bg-frost"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Area / Locality"
                          value={newArea}
                          onChange={(e) => setNewArea(e.target.value)}
                          required
                          className="rounded-xl border-ink/15 text-xs bg-frost"
                        />
                        <Input
                          placeholder="Pincode"
                          value={newPincode}
                          onChange={(e) => setNewPincode(e.target.value)}
                          required
                          className="rounded-xl border-ink/15 text-xs bg-frost"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="sm"
                        className="w-full rounded-full bg-ink text-xs text-cream hover:bg-spice"
                      >
                        Save Address
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-2">
                      {customerProfile.savedAddresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                          <div
                            key={addr.id}
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`cursor-pointer rounded-2xl border p-3.5 transition-all ${
                              isSelected
                                ? "border-spice bg-spice/5 shadow-sm"
                                : "border-ink/10 bg-white hover:border-ink/20"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold uppercase rounded-md bg-frost px-2 py-0.5 border border-ink/10">
                                  {addr.label}
                                </span>
                                <span className="text-xs text-ink/70">{addr.contactName}</span>
                              </div>
                              {isSelected && <CheckCircle2 className="size-4 text-spice" />}
                            </div>
                            <p className="mt-1 text-xs text-ink/80">{addr.street}</p>
                            <p className="text-[11px] text-ink/50">
                              {addr.area}, {addr.city} - {addr.pincode}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 rounded-2xl bg-white border border-ink/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase font-bold text-spice">
                      Self Pickup Hub Counter
                    </span>
                    <Badge className="bg-emerald-600 text-white font-mono text-[9px]">
                      READY IN 15 MINS
                    </Badge>
                  </div>
                  <h4 className="font-display text-sm font-bold text-ink">
                    Anima's Kitchen Indiranagar Hub #01
                  </h4>
                  <p className="text-xs text-ink/70">
                    Plot #42, 100 Feet Road, Indiranagar, Bengaluru - 560038
                  </p>
                  <p className="text-[11px] text-ink/50 font-mono">
                    Counter Incharge: Chef Ramesh · Call: +91 98765 43210
                  </p>
                </div>
              )}
            </div>

            {/* Wallet Payment Credit Checkbox */}
            <div className="p-3.5 rounded-2xl bg-white border border-spice/20 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-xl bg-spice/10 grid place-items-center text-spice">
                  <Wallet className="size-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-ink block">
                    Anima's Customer Wallet
                  </span>
                  <span className="text-[10px] text-ink/60 font-mono">
                    Available Balance: ₹{customerWallet.balance}
                  </span>
                </div>
              </div>

              <Button
                size="sm"
                type="button"
                variant={useWalletDiscount ? "default" : "outline"}
                onClick={() => setUseWalletDiscount(!useWalletDiscount)}
                className={`h-8 rounded-xl text-xs font-medium gap-1.5 ${
                  useWalletDiscount
                    ? "bg-spice text-white hover:bg-spice/90"
                    : "border-ink/20 text-ink"
                }`}
              >
                {useWalletDiscount && <Check className="size-3.5" />}
                <span>{useWalletDiscount ? "Using Wallet" : "Apply Wallet"}</span>
              </Button>
            </div>

            {/* Step 3: Payment Method */}
            <div>
              <label className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/70 block mb-3">
                3. Payment Method
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {/* UPI */}
                <div
                  onClick={() => setPaymentMethod("upi")}
                  className={`cursor-pointer rounded-2xl border p-3 transition-all ${
                    paymentMethod === "upi"
                      ? "border-spice bg-spice/5 shadow-sm"
                      : "border-ink/10 bg-white hover:border-ink/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <QrCode className="size-4 text-spice" />
                    <span className="font-display text-sm text-ink">UPI / QR Code</span>
                  </div>
                  <p className="text-[10px] text-ink/60 mt-1">GPay, PhonePe, Paytm</p>
                </div>

                {/* Card */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`cursor-pointer rounded-2xl border p-3 transition-all ${
                    paymentMethod === "card"
                      ? "border-spice bg-spice/5 shadow-sm"
                      : "border-ink/10 bg-white hover:border-ink/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-4 text-indigo-600" />
                    <span className="font-display text-sm text-ink">Debit / Credit Card</span>
                  </div>
                  <p className="text-[10px] text-ink/60 mt-1">Visa, Mastercard, RuPay</p>
                </div>

                {/* Netbanking */}
                <div
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`cursor-pointer rounded-2xl border p-3 transition-all ${
                    paymentMethod === "netbanking"
                      ? "border-spice bg-spice/5 shadow-sm"
                      : "border-ink/10 bg-white hover:border-ink/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building className="size-4 text-amber-600" />
                    <span className="font-display text-sm text-ink">Net Banking</span>
                  </div>
                  <p className="text-[10px] text-ink/60 mt-1">HDFC, ICICI, SBI, Axis</p>
                </div>

                {/* COD */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`cursor-pointer rounded-2xl border p-3 transition-all ${
                    paymentMethod === "cod"
                      ? "border-spice bg-spice/5 shadow-sm"
                      : "border-ink/10 bg-white hover:border-ink/20"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Banknote className="size-4 text-leaf" />
                    <span className="font-display text-sm text-ink">Cash on Delivery</span>
                  </div>
                  <p className="text-[10px] text-ink/60 mt-1">Pay at delivery</p>
                </div>
              </div>

              {/* UPI detail preview */}
              {paymentMethod === "upi" && (
                <div className="mt-3 rounded-2xl border border-ink/10 bg-white p-3.5">
                  <span className="font-mono text-[10px] uppercase font-semibold text-ink/60 block mb-1">
                    Virtual Payment Address (VPA)
                  </span>
                  <Input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@upi"
                    className="h-8 rounded-xl border-ink/15 bg-frost text-xs font-mono"
                  />
                  <p className="text-[10px] text-ink/50 mt-1">
                    Simulated one-touch UPI payment for instant order dispatch.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right 2 cols: Order Summary & Place Order CTA */}
          <div className="md:col-span-2 flex flex-col justify-between rounded-3xl border border-ink/10 bg-white p-5 shadow-sm">
            <div>
              <h4 className="font-display text-lg text-ink border-b border-ink/10 pb-2">
                Order Review
              </h4>

              <div className="mt-3 max-h-40 overflow-y-auto space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start justify-between text-xs">
                    <div>
                      <span className="font-semibold text-ink">
                        {item.quantity}x {item.menuItem.name}
                      </span>
                      {item.selectedAddons.length > 0 && (
                        <p className="text-[10px] text-ink/60">
                          +{item.selectedAddons.length} extra sides
                        </p>
                      )}
                    </div>
                    <span className="font-mono font-medium text-ink">
                      ₹{item.itemTotal * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Itemized Taxes & Discounts */}
              <div className="mt-4 border-t border-ink/10 pt-3 space-y-1.5 text-xs text-ink/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-ink">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>CGST (2.5%)</span>
                  <span className="font-mono">₹{cgst}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>SGST (2.5%)</span>
                  <span className="font-mono">₹{sgst}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-mono font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                {walletDeductAmount > 0 && (
                  <div className="flex justify-between text-spice font-semibold">
                    <span>Wallet Paid</span>
                    <span className="font-mono">-₹{walletDeductAmount}</span>
                  </div>
                )}

                <div className="border-t-2 border-ink pt-2 flex justify-between items-center text-sm font-bold text-ink">
                  <span>Total Payable</span>
                  <span className="font-display text-2xl text-spice font-bold">₹{grandTotal}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                disabled={isProcessing || (!selectedAddress && orderType === "delivery")}
                onClick={handleConfirmOrder}
                className="w-full gap-2 rounded-2xl bg-spice py-3 font-semibold text-cream shadow-xl hover:bg-ink transition-all h-11"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Pay ₹{grandTotal}</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
              <p className="text-[10px] text-center text-ink/50 mt-2">
                Auto-generates KOT for kitchen + live GPS tracking
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

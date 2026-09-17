import React, { useState } from "react";
import { useDemoStore } from "@/context/DemoStoreContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LiveMapCanvas } from "../customer/LiveMapCanvas";
import {
  Bike,
  Navigation,
  MapPin,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Key,
  ShieldCheck,
  PackageCheck,
  AlertTriangle,
  DollarSign,
  ArrowRight,
  ExternalLink,
  Camera,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import type { DeliveryStep, Order } from "@/types/kitchen";

interface DeliveryActiveTaskTabProps {
  onBackToDashboard: () => void;
}

export const DeliveryActiveTaskTab: React.FC<DeliveryActiveTaskTabProps> = ({
  onBackToDashboard,
}) => {
  const {
    activeOrder,
    advanceDeliveryStep,
    verifyDeliveryOtp,
    orders,
  } = useDemoStore();

  const currentOrder = activeOrder || orders[0];

  const [enteredOtp, setEnteredOtp] = useState("");
  const [itemsChecked, setItemsChecked] = useState({
    thali: true,
    lassi: true,
    cutlery: true,
  });
  const [codCollected, setCodCollected] = useState(false);
  const [proofPhotoTaken, setProofPhotoTaken] = useState(false);

  if (!currentOrder) {
    return (
      <div className="bg-frost/90 border border-ink/10 rounded-3xl p-8 text-center space-y-3">
        <CheckCircle2 className="size-12 text-emerald-600 mx-auto" />
        <h3 className="font-display text-xl font-bold text-ink">No Active Delivery Task</h3>
        <p className="text-xs text-ink/60 max-w-sm mx-auto">
          You are currently available for new orders. When an order is assigned, it will automatically appear here.
        </p>
        <Button onClick={onBackToDashboard} className="bg-ink hover:bg-spice text-cream rounded-xl text-xs">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const step = currentOrder.currentDeliveryStep || "assigned";

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredOtp.trim()) return;
    const ok = verifyDeliveryOtp(currentOrder.id, enteredOtp);
    if (ok) {
      toast.success("Delivery OTP Verified! Customer successfully received the food.");
    } else {
      toast.error(`Invalid OTP! Please ask customer for correct 4-digit code (Demo: ${currentOrder.deliveryOtp})`);
    }
  };

  const handleConfirmPickup = () => {
    advanceDeliveryStep(currentOrder.id);
    toast.success("Pickup Confirmed! Customer notified: 'Your order is picked up & on the way'.");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Order Header & Step Progress Bar */}
      <div className="bg-gradient-to-r from-ink to-zinc-900 text-cream p-5 rounded-3xl shadow-sm border border-cream/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream/10 pb-3">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-spice text-cream font-bold">
              <Bike className="size-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-cream">
                  ORDER #{currentOrder.id.replace("ord-", "AK")}
                </h2>
                <Badge className="bg-emerald-500 text-ink font-mono text-[10px] font-bold">
                  Earning: ₹65
                </Badge>
              </div>
              <p className="text-xs text-cream/70 font-mono">
                Customer: {currentOrder.customerName} · 2 × Dal Tadka Thali, 1 × Lassi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.info(`Calling Customer (${currentOrder.customerName}): +91 98765 11223`)}
              className="border-cream/20 bg-cream/10 text-cream hover:bg-cream/20 text-xs rounded-xl h-8 gap-1.5"
            >
              <Phone className="size-3.5 text-emerald-400" />
              <span>Call Customer</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toast.info("Opening Live Navigation")}
              className="border-cream/20 bg-cream/10 text-cream hover:bg-cream/20 text-xs rounded-xl h-8 gap-1.5"
            >
              <Navigation className="size-3.5 text-saffron" />
              <span>Map Route</span>
            </Button>
          </div>
        </div>

        {/* Visual Route Flow Stepper */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
          <div className={`p-2.5 rounded-2xl border ${
            step === "assigned" || step === "accepted" || step === "arrived_at_kitchen"
              ? "bg-spice text-cream border-spice shadow-sm"
              : "bg-cream/10 text-cream/80 border-cream/10"
          }`}>
            <span className="text-[10px] uppercase block font-bold">1. Kitchen Pickup</span>
            <span className="text-xs font-semibold">Anima's Kitchen</span>
          </div>

          <div className={`p-2.5 rounded-2xl border ${
            step === "picked_up" || step === "out_for_delivery"
              ? "bg-spice text-cream border-spice shadow-sm"
              : "bg-cream/10 text-cream/80 border-cream/10"
          }`}>
            <span className="text-[10px] uppercase block font-bold">2. Transit Route</span>
            <span className="text-xs font-semibold">3.4 km (14 min)</span>
          </div>

          <div className={`p-2.5 rounded-2xl border ${
            step === "reached_customer" || step === "otp_verified" || step === "delivered"
              ? "bg-emerald-600 text-cream border-emerald-500 shadow-sm"
              : "bg-cream/10 text-cream/80 border-cream/10"
          }`}>
            <span className="text-[10px] uppercase block font-bold">3. Drop & Verify</span>
            <span className="text-xs font-semibold">Customer Doorstep</span>
          </div>
        </div>
      </div>

      {/* Dynamic Workflow View Based on Current Step */}

      {/* STEP 1: Kitchen Arrival & Pickup Verification Checklist */}
      {(step === "assigned" || step === "accepted" || step === "arrived_at_kitchen") && (
        <div className="bg-frost/90 border border-ink/10 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-ink/10 pb-4">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-spice">
                STORE PICKUP CHECKLIST
              </span>
              <h3 className="font-display text-xl font-bold text-ink">
                Anima's Kitchen Central Hub
              </h3>
              <p className="text-xs text-ink/60">
                #428, 100ft Road, Indiranagar · Counter #02 Dispatch
              </p>
            </div>
            <Badge className="bg-amber-500/15 text-amber-800 font-mono text-xs px-2.5 py-1 border-none">
              3 Items in Order
            </Badge>
          </div>

          {/* Checklist of Items */}
          <div className="space-y-2.5 bg-cream/70 p-4 rounded-2xl border border-ink/10">
            <span className="font-mono text-[10px] uppercase font-bold text-ink/60 block">
              Verify Before Bagging:
            </span>
            <label className="flex items-center gap-2.5 text-xs text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={itemsChecked.thali}
                onChange={(e) => setItemsChecked({ ...itemsChecked, thali: e.target.checked })}
                className="size-4 rounded border-ink/20 accent-spice"
              />
              <span className="font-semibold">2 × Dal Tadka Veg Thali (Hot Box Sealed)</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={itemsChecked.lassi}
                onChange={(e) => setItemsChecked({ ...itemsChecked, lassi: e.target.checked })}
                className="size-4 rounded border-ink/20 accent-spice"
              />
              <span className="font-semibold">1 × Punjabi Sweet Lassi (Chilled Bottle)</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={itemsChecked.cutlery}
                onChange={(e) => setItemsChecked({ ...itemsChecked, cutlery: e.target.checked })}
                className="size-4 rounded border-ink/20 accent-spice"
              />
              <span className="font-semibold">Cutlery, Paper Napkins & Mango Pickle sachet</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {step === "accepted" && (
              <Button
                onClick={() => advanceDeliveryStep(currentOrder.id)}
                className="flex-1 bg-ink hover:bg-spice text-cream font-bold text-xs rounded-xl h-11 shadow-sm"
              >
                I Have Arrived at Kitchen Counter
              </Button>
            )}

            {(step === "assigned" || step === "arrived_at_kitchen") && (
              <Button
                onClick={handleConfirmPickup}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-cream font-bold text-xs rounded-xl h-11 shadow-sm gap-2"
              >
                <PackageCheck className="size-4" />
                <span>[CONFIRM PICKUP & START DELIVERY]</span>
              </Button>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: On Route Navigation & Live GPS */}
      {(step === "picked_up" || step === "out_for_delivery") && (
        <div className="bg-frost/90 border border-ink/10 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-ink/10 pb-3">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-teal-700">
                EN ROUTE TO CUSTOMER
              </span>
              <h3 className="font-display text-lg font-bold text-ink">
                Destination: Indiranagar 12th Main
              </h3>
            </div>
            <div className="text-right">
              <span className="font-display text-base font-bold text-spice">ETA 14 min</span>
              <span className="font-mono text-[10px] text-ink/50 block">3.4 km away</span>
            </div>
          </div>

          {/* Embedded Interactive GPS Map */}
          <div className="h-64 rounded-2xl overflow-hidden border border-ink/10 relative">
            <LiveMapCanvas orderStatus="out_for_delivery" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={() => {
                window.open("https://maps.google.com/?q=Indiranagar+Bangalore", "_blank");
              }}
              variant="outline"
              className="flex-1 border-ink/20 text-ink hover:bg-cream font-bold text-xs rounded-xl h-11 gap-1.5"
            >
              <ExternalLink className="size-4 text-spice" />
              <span>Open in Google Maps App</span>
            </Button>
            <Button
              onClick={() => advanceDeliveryStep(currentOrder.id)}
              className="flex-1 bg-ink hover:bg-spice text-cream font-bold text-xs rounded-xl h-11 shadow-sm"
            >
              I Have Reached Customer Location →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Customer Delivery Screen (OTP, COD, Photo proof) */}
      {(step === "reached_customer" || step === "otp_verified") && (
        <div className="bg-frost/90 border border-ink/10 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-ink/10 pb-4">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-emerald-700">
                DOORSTEP DELIVERY & VERIFICATION
              </span>
              <h3 className="font-display text-xl font-bold text-ink">
                Customer: {currentOrder.customerName}
              </h3>
              <p className="text-xs text-ink/70">
                {currentOrder.deliveryAddress.street}, {currentOrder.deliveryAddress.area}, {currentOrder.deliveryAddress.city}
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-emerald-500/15 text-emerald-700 font-mono text-xs border-none font-bold">
                Amount: ₹{currentOrder.finalTotal}
              </Badge>
              <span className="font-mono text-[10px] text-ink/50 block mt-1">
                {currentOrder.paymentMethod.toUpperCase()} Paid
              </span>
            </div>
          </div>

          {/* Customer Specific Instructions */}
          <div className="bg-cream/80 p-3.5 rounded-2xl border border-ink/10 text-xs space-y-1">
            <span className="font-mono text-[10px] uppercase font-bold text-ink/50 block">
              Customer Note:
            </span>
            <p className="text-ink font-semibold italic">
              "{currentOrder.specialInstructions || "Please call when outside gate, bell is not working."}"
            </p>
          </div>

          {/* COD Collection box if COD */}
          {currentOrder.paymentMethod === "cod" && (
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-900">💵 Cash to Collect:</span>
                <span className="font-display text-base font-bold text-amber-900">
                  ₹{currentOrder.finalTotal}
                </span>
              </div>
              <Button
                onClick={() => {
                  setCodCollected(true);
                  toast.success(`₹${currentOrder.finalTotal} cash marked as collected!`);
                }}
                disabled={codCollected}
                className={`w-full text-xs font-bold rounded-xl h-9 ${
                  codCollected ? "bg-emerald-600 text-cream" : "bg-amber-600 hover:bg-amber-700 text-cream"
                }`}
              >
                {codCollected ? "✓ Cash Received & Verified" : "[CONFIRM CASH RECEIVED]"}
              </Button>
            </div>
          )}

          {/* 4-Digit OTP Verification Form */}
          <form onSubmit={handleVerifyOtp} className="space-y-3 bg-cream/60 p-4 rounded-2xl border border-ink/10">
            <div className="flex items-center justify-between">
              <label className="font-display text-xs font-bold text-ink flex items-center gap-1.5">
                <Key className="size-4 text-spice" />
                Ask Customer for 4-Digit Delivery OTP
              </label>
              <span className="font-mono text-[11px] text-spice font-bold">
                (Demo OTP: {currentOrder.deliveryOtp})
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="Enter 4-digit OTP"
                className="flex-1 rounded-xl border border-ink/20 bg-white px-4 py-2.5 font-mono text-base font-bold tracking-widest text-ink focus:border-spice focus:outline-none"
              />
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-cream font-bold px-5 rounded-xl text-xs"
              >
                Verify OTP
              </Button>
            </div>
          </form>

          {/* Proof of Delivery / Camera simulation */}
          <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-cream/40 border border-ink/5">
            <span className="text-ink/70">Photo Proof (Optional):</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setProofPhotoTaken(true);
                toast.success("Doorstep photo proof captured!");
              }}
              className="text-xs rounded-lg h-7 gap-1"
            >
              <Camera className="size-3 text-spice" />
              <span>{proofPhotoTaken ? "Photo Captured ✓" : "Snap Proof"}</span>
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: Delivery Completed Screen */}
      {step === "delivered" && (
        <div className="bg-gradient-to-b from-emerald-500/10 via-cream to-frost border-2 border-emerald-500/40 rounded-3xl p-8 text-center space-y-4 shadow-sm">
          <span className="grid size-16 place-items-center rounded-3xl bg-emerald-600 text-cream mx-auto shadow-md">
            <CheckCircle2 className="size-8" />
          </span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-emerald-700 tracking-wider">
              ✓ ORDER DELIVERED SUCCESSFULLY
            </span>
            <h3 className="font-display text-2xl font-bold text-ink mt-1">
              Order #{currentOrder.id.replace("ord-", "AK")}
            </h3>
            <p className="text-xs text-ink/60">
              Delivered to {currentOrder.customerName} in 16 min.
            </p>
          </div>

          <div className="max-w-xs mx-auto p-4 rounded-2xl bg-white/80 border border-emerald-500/20 grid grid-cols-2 gap-2 text-center">
            <div>
              <span className="font-mono text-[10px] uppercase text-ink/50 block">Earned</span>
              <span className="font-display text-xl font-bold text-emerald-700">+₹65</span>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-ink/50 block">Trip Time</span>
              <span className="font-display text-xl font-bold text-ink">16 min</span>
            </div>
          </div>

          <Button
            onClick={onBackToDashboard}
            className="bg-ink hover:bg-spice text-cream font-bold text-xs rounded-xl h-11 px-8 shadow-sm"
          >
            [BACK TO DASHBOARD]
          </Button>
        </div>
      )}
    </div>
  );
};

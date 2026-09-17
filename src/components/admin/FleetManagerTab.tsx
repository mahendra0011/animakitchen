import React from "react";
import { useDemoStore } from "@/context/DemoStoreContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bike,
  Star,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Sparkles,
} from "lucide-react";

export const FleetManagerTab: React.FC = () => {
  const { deliveryPartners, orders } = useDemoStore();

  return (
    <div className="space-y-6 text-ink">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl text-ink">Active Delivery Fleet</h3>
          <p className="text-xs text-ink/60">
            Real-time monitoring of riders, vehicle assignments, and daily trips.
          </p>
        </div>
        <Badge className="bg-emerald-600 text-cream font-mono text-xs">
          {deliveryPartners.filter((p) => p.status !== "offline").length} Riders Active
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deliveryPartners.map((partner) => {
          const activeOrderForPartner = orders.find(
            (o) => o.deliveryPartnerId === partner.id && o.status !== "delivered",
          );

          return (
            <div
              key={partner.id}
              className="rounded-3xl border border-ink/10 bg-frost p-5 shadow-sm space-y-4 hover:border-ink/20 transition-all"
            >
              {/* Profile Card */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={partner.avatar}
                    alt={partner.name}
                    className="size-12 rounded-2xl object-cover border border-ink/10"
                  />
                  <div>
                    <h4 className="font-display text-base text-ink">{partner.name}</h4>
                    <p className="font-mono text-xs text-ink/60">{partner.phone}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="size-3 fill-amber-500 text-amber-500" />
                      <span className="font-mono text-xs font-bold text-ink">
                        {partner.rating}
                      </span>
                      <span className="text-[10px] text-ink/40">
                        ({partner.totalDeliveries} trips)
                      </span>
                    </div>
                  </div>
                </div>

                <Badge
                  className={`text-[10px] font-mono uppercase ${
                    partner.status === "available"
                      ? "bg-emerald-600/10 text-emerald-800 border-emerald-600/30"
                      : "bg-amber-500/10 text-amber-800 border-amber-500/30"
                  }`}
                >
                  {partner.status}
                </Badge>
              </div>

              {/* Vehicle info */}
              <div className="rounded-2xl border border-ink/5 bg-cream/50 p-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-ink/60">Vehicle</span>
                  <strong className="text-ink">{partner.vehicle.model}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink/60">Plate Number</span>
                  <span className="font-mono font-bold text-ink">
                    {partner.vehicle.plateNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink/60">Today's Payout</span>
                  <span className="font-mono font-bold text-emerald-700">
                    ₹{partner.todayEarnings}
                  </span>
                </div>
              </div>

              {/* Assigned order tag if any */}
              {activeOrderForPartner ? (
                <div className="rounded-xl bg-amber-500/15 border border-amber-500/30 p-2.5 text-xs text-amber-900 flex items-center justify-between">
                  <div>
                    <span className="font-bold">Carrying #{activeOrderForPartner.orderNumber}</span>
                    <p className="text-[10px] text-amber-800/80 uppercase">
                      {activeOrderForPartner.status.replace(/_/g, " ")}
                    </p>
                  </div>
                  <Navigation className="size-3.5 animate-bounce" />
                </div>
              ) : (
                <p className="text-[11px] text-ink/50 text-center py-1">
                  Ready for next dispatch assignment
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

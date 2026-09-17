import React, { useState, useEffect } from "react";
import { useDemoStore } from "@/context/DemoStoreContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bike,
  MapPin,
  Utensils,
  Compass,
  Navigation,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Phone,
  ShieldCheck,
  Star,
  Sparkles,
} from "lucide-react";
import type { Order } from "@/types/kitchen";

interface LiveMapCanvasProps {
  order: Order;
}

export const LiveMapCanvas: React.FC<LiveMapCanvasProps> = ({ order }) => {
  const { advanceDeliveryStep, verifyDeliveryOtp } = useDemoStore();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [riderAnimatedRatio, setRiderAnimatedRatio] = useState(
    order.coordinates.progressRatio || 0.6,
  );

  // Smooth progress animation when out_for_delivery
  useEffect(() => {
    if (order.status === "out_for_delivery" || order.currentDeliveryStep === "out_for_delivery") {
      const interval = setInterval(() => {
        setRiderAnimatedRatio((prev) => {
          if (prev >= 0.95) return 0.95;
          return prev + 0.006;
        });
      }, 500);
      return () => clearInterval(interval);
    } else if (order.status === "delivered") {
      setRiderAnimatedRatio(1.0);
    } else if (order.status === "preparing" || order.status === "confirmed") {
      setRiderAnimatedRatio(0.05);
    }
  }, [order.status, order.currentDeliveryStep]);

  // Route path waypoints (normalized 0 to 100 on SVG coordinate plane)
  // Kitchen at (20, 80), Customer at (85, 25)
  // Path points: (20, 80) -> (35, 75) -> (45, 50) -> (65, 45) -> (75, 30) -> (85, 25)
  const waypoints = [
    { x: 20, y: 80 },
    { x: 35, y: 75 },
    { x: 45, y: 52 },
    { x: 62, y: 46 },
    { x: 74, y: 32 },
    { x: 85, y: 25 },
  ];

  // Interpolate rider coordinates based on riderAnimatedRatio
  const totalSegments = waypoints.length - 1;
  const scaledProgress = riderAnimatedRatio * totalSegments;
  const currentSegmentIndex = Math.min(Math.floor(scaledProgress), totalSegments - 1);
  const segmentRatio = scaledProgress - currentSegmentIndex;

  const p1 = waypoints[currentSegmentIndex];
  const p2 = waypoints[currentSegmentIndex + 1];

  const riderX = p1.x + (p2.x - p1.x) * segmentRatio;
  const riderY = p1.y + (p2.y - p1.y) * segmentRatio;

  // Calculate distance remaining in km
  const totalDistanceKm = 2.4;
  const distanceRemainingKm = Math.max(0, (totalDistanceKm * (1 - riderAnimatedRatio)).toFixed(1));
  const etaMinutes = Math.max(1, Math.round(Number(distanceRemainingKm) * 5 + 2));

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/15 bg-[#f5f2eb] shadow-xl">
      {/* SVG Map Background with stylized road grid */}
      <div
        className="relative aspect-[16/10] sm:aspect-[16/9] w-full transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg
          viewBox="0 0 100 100"
          className="size-full select-none"
          preserveAspectRatio="none"
        >
          {/* Subtle City Blocks & Terrain */}
          <rect x="5" y="10" width="22" height="30" rx="3" fill="#e8e2d5" opacity="0.6" />
          <rect x="32" y="15" width="25" height="25" rx="3" fill="#e8e2d5" opacity="0.6" />
          <rect x="62" y="10" width="30" height="22" rx="3" fill="#e8e2d5" opacity="0.6" />
          <rect x="10" y="50" width="28" height="35" rx="3" fill="#e8e2d5" opacity="0.6" />
          <rect x="44" y="55" width="24" height="30" rx="3" fill="#e8e2d5" opacity="0.6" />
          <rect x="72" y="45" width="22" height="40" rx="3" fill="#e8e2d5" opacity="0.6" />

          {/* Defense Colony Park Greenery */}
          <rect x="68" y="12" width="14" height="10" rx="2" fill="#d2e3c8" opacity="0.8" />
          <text x="75" y="18" fill="#587d4d" fontSize="2" textAnchor="middle" fontFamily="sans-serif">
            Defense Colony Park
          </text>

          {/* Secondary road network */}
          <path
            d="M 0,35 Q 50,30 100,35 M 0,65 Q 50,70 100,65 M 35,0 Q 30,50 35,100 M 65,0 Q 70,50 65,100"
            stroke="#ffffff"
            strokeWidth="2"
            fill="none"
          />

          {/* Primary Route Outline (Gray backing) */}
          <polyline
            points={waypoints.map((w) => `${w.x},${w.y}`).join(" ")}
            fill="none"
            stroke="#e0d7c7"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active Navigation Route (Spice Orange with Dash animation) */}
          <polyline
            points={waypoints.map((w) => `${w.x},${w.y}`).join(" ")}
            fill="none"
            stroke="#ea580c"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="3 2"
            className="animate-pulse"
          />

          {/* Completed portion of route */}
          <line
            x1="20"
            y1="80"
            x2={riderX}
            y2={riderY}
            stroke="#ea580c"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Kitchen Marker at (20, 80) */}
          <g transform="translate(20, 80)">
            <circle r="4.5" fill="#1c1917" />
            <circle r="2.5" fill="#facc15" />
            {/* Steam animation above kitchen */}
            <circle r="0.8" cx="-0.5" cy="-6" fill="#facc15" opacity="0.7">
              <animate attributeName="cy" values="-6;-9" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle r="0.8" cx="0.8" cy="-6.5" fill="#facc15" opacity="0.7">
              <animate attributeName="cy" values="-6.5;-9.5" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Customer Destination Marker at (85, 25) */}
          <g transform="translate(85, 25)">
            <circle r="5" fill="#16a34a" opacity="0.25">
              <animate attributeName="r" values="5;7.5;5" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="4" fill="#16a34a" />
            <circle r="2" fill="#ffffff" />
          </g>

          {/* Animated Rider Scooter Marker */}
          <g transform={`translate(${riderX}, ${riderY})`}>
            {/* Pulsing Radar Ring */}
            <circle r="6" fill="#ea580c" opacity="0.25">
              <animate attributeName="r" values="4;7;4" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.05;0.4" dur="1.4s" repeatCount="indefinite" />
            </circle>
            {/* Base Circle */}
            <circle r="4" fill="#ea580c" stroke="#ffffff" strokeWidth="1" />
          </g>
        </svg>

        {/* Overlay HTML Pins for crisp readable text */}
        {/* Kitchen Label */}
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full"
          style={{ left: "20%", top: "78%" }}
        >
          <div className="flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 text-[9px] font-semibold text-cream shadow-md">
            <Utensils className="size-2.5 text-saffron" />
            <span>Anima's Kitchen Hub</span>
          </div>
        </div>

        {/* Customer Home Label */}
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full"
          style={{ left: "85%", top: "23%" }}
        >
          <div className="flex items-center gap-1 rounded-full bg-emerald-700 px-2.5 py-0.5 text-[9px] font-semibold text-cream shadow-md">
            <MapPin className="size-2.5 text-cream" />
            <span>Your Delivery Address</span>
          </div>
        </div>

        {/* Floating Rider Avatar / Icon pinned to coordinates */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
          style={{ left: `${riderX}%`, top: `${riderY}%` }}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 rounded-full bg-spice px-2 py-0.5 text-[9px] font-bold text-cream shadow-lg border border-white">
              <Bike className="size-3 text-cream animate-bounce" />
              <span>Rajesh (Rider)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Header Floating Overlay */}
      <div className="absolute left-4 top-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-frost/95 p-2 px-3 shadow-lg border border-ink/10 backdrop-blur-md">
          <div className="grid size-7 place-items-center rounded-xl bg-spice text-cream">
            <Navigation className="size-3.5" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase font-bold text-spice">
              {order.status === "delivered" ? "Delivered" : "Live GPS Tracking"}
            </p>
            <p className="font-display text-sm text-ink">
              {order.status === "delivered"
                ? "Order Completed"
                : `${distanceRemainingKm} km away · ~${etaMinutes} mins`}
            </p>
          </div>
        </div>

        {/* Zoom & Fast Action buttons */}
        <div className="pointer-events-auto flex items-center gap-1 rounded-2xl bg-frost/95 p-1 shadow-lg border border-ink/10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.15))}
            className="size-7 rounded-xl text-ink"
            title="Zoom In"
          >
            <ZoomIn className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoomLevel((z) => Math.max(0.9, z - 0.15))}
            className="size-7 rounded-xl text-ink"
            title="Zoom Out"
          >
            <ZoomOut className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Map Footer Bar: Rider Profile Card & Customer OTP */}
      <div className="border-t border-ink/10 bg-frost/95 p-4 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Rider Info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Delivery Partner"
                className="size-11 rounded-2xl object-cover border border-ink/15 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full bg-emerald-600 text-cream">
                <ShieldCheck className="size-2.5" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-display text-base text-ink">Rajesh Kumar</h4>
                <Badge variant="outline" className="text-[10px] gap-0.5 border-amber-500/40 text-amber-700">
                  <Star className="size-2.5 fill-amber-500 text-amber-500" />
                  4.92
                </Badge>
              </div>
              <p className="text-xs text-ink/60">
                Honda Activa 6G · <strong className="font-mono text-ink/80">KA 04 EL 9842</strong>
              </p>
            </div>
          </div>

          {/* Delivery OTP Box & Quick Call */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            <div className="rounded-2xl border border-spice/30 bg-spice/10 px-3.5 py-1.5 text-center">
              <span className="font-mono text-[9px] uppercase font-bold text-spice block">
                Share OTP at Doorstep
              </span>
              <span className="font-mono text-lg font-bold tracking-widest text-ink">
                {order.deliveryOtp}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`tel:${order.customerPhone}`)}
              className="gap-1.5 rounded-full border-ink/15 text-xs text-ink hover:border-spice hover:text-spice"
            >
              <Phone className="size-3.5" />
              <span>Call Rider</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

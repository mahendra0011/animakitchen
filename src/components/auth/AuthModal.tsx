import React, { useState } from "react";
import { useDemoStore, type RoleType } from "@/context/DemoStoreContext";
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
  Utensils,
  Bike,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  User,
  Lock,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    loginAsRole,
  } = useDemoStore();

  const [identifier, setIdentifier] = useState("rahul@animaskitchen.com");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleQuickRoleLogin = (role: RoleType) => {
    let email = "rahul@animaskitchen.com";
    let pass = "customer123";
    if (role === "rider") {
      email = "rajesh.rider@animas.com";
      pass = "rider123";
    } else if (role === "admin" || role === "kds") {
      email = "admin@animaskitchen.com";
      pass = "admin123";
    }

    setIdentifier(email);
    setPassword(pass);

    // Auto log in immediately as requested!
    loginAsRole(role, { identifier: email, password: pass });
    setAuthModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    let detectedRole: RoleType = "customer";
    if (identifier.toLowerCase().includes("rider") || identifier.toLowerCase().includes("rajesh")) {
      detectedRole = "rider";
    } else if (identifier.toLowerCase().includes("admin") || identifier.toLowerCase().includes("chef")) {
      detectedRole = "admin";
    }

    loginAsRole(detectedRole, { identifier, password });
    setAuthModalOpen(false);
  };

  return (
    <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
      <DialogContent className="max-w-md overflow-hidden rounded-3xl border border-ink/15 bg-frost p-0 shadow-2xl text-ink">
        {/* Header */}
        <div className="border-b border-ink/10 bg-cream/90 p-5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-2xl bg-ink font-display text-lg text-cream shadow-sm">
              A
            </span>
            <div>
              <DialogTitle className="font-display text-xl text-ink">
                {authModalTab === "login" ? "Sign In to Anima’s Kitchen" : "Create New Account"}
              </DialogTitle>
              <DialogDescription className="text-xs text-ink/60">
                Fresh home food, thalis, and daily tiffin delivery
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* 3 Quick 1-Click Demo Buttons with auto-fill & instant login */}
          <div className="rounded-2xl border border-spice/25 bg-spice/5 p-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase font-bold text-spice flex items-center gap-1">
                <Sparkles className="size-3 text-spice" />
                1-Click Demo Auto-Login:
              </span>
              <span className="text-[10px] text-ink/50">Auto-fills & enters</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Button 1: Customer */}
              <button
                type="button"
                onClick={() => handleQuickRoleLogin("customer")}
                className="flex flex-col items-center justify-center rounded-xl border border-ink/10 bg-frost p-2.5 transition-all hover:border-spice hover:bg-spice/10 hover:scale-102 shadow-sm text-center"
              >
                <Utensils className="size-4 text-spice mb-1" />
                <span className="font-display text-xs text-ink">Customer</span>
                <span className="font-mono text-[9px] text-ink/50">Rahul S.</span>
              </button>

              {/* Button 2: Rider */}
              <button
                type="button"
                onClick={() => handleQuickRoleLogin("rider")}
                className="flex flex-col items-center justify-center rounded-xl border border-ink/10 bg-frost p-2.5 transition-all hover:border-emerald-600 hover:bg-emerald-500/10 hover:scale-102 shadow-sm text-center"
              >
                <Bike className="size-4 text-emerald-700 mb-1" />
                <span className="font-display text-xs text-ink">Rider</span>
                <span className="font-mono text-[9px] text-ink/50">Rajesh K.</span>
              </button>

              {/* Button 3: Admin */}
              <button
                type="button"
                onClick={() => handleQuickRoleLogin("admin")}
                className="flex flex-col items-center justify-center rounded-xl border border-ink/10 bg-frost p-2.5 transition-all hover:border-indigo-600 hover:bg-indigo-500/10 hover:scale-102 shadow-sm text-center"
              >
                <ShieldCheck className="size-4 text-indigo-700 mb-1" />
                <span className="font-display text-xs text-ink">Admin</span>
                <span className="font-mono text-[9px] text-ink/50">Kitchen Hub</span>
              </button>
            </div>
          </div>

          {/* Form Tabs: Login vs Create Account */}
          <div className="flex rounded-full border border-ink/10 bg-cream p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthModalTab("login")}
              className={`flex-1 rounded-full py-1.5 transition-all ${
                authModalTab === "login"
                  ? "bg-ink text-cream shadow-sm"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthModalTab("signup")}
              className={`flex-1 rounded-full py-1.5 transition-all ${
                authModalTab === "signup"
                  ? "bg-ink text-cream shadow-sm"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {authModalTab === "signup" && (
              <>
                <div>
                  <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                    Full Name
                  </label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="rounded-xl border-ink/15 text-xs bg-cream/40"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                    Phone Number
                  </label>
                  <Input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="rounded-xl border-ink/15 text-xs bg-cream/40 font-mono"
                  />
                </div>
              </>
            )}

            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                Email or Mobile Number
              </label>
              <Input
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@email.com or +91..."
                className="rounded-xl border-ink/15 text-xs bg-cream/40 font-mono"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                Password / OTP
              </label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-xl border-ink/15 text-xs bg-cream/40 font-mono"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-spice py-2.5 font-semibold text-cream shadow-md hover:bg-ink transition-all mt-2"
            >
              {authModalTab === "login" ? "Sign In & Continue" : "Create Account & Enter"}
              <ArrowRight className="size-3.5 ml-1" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

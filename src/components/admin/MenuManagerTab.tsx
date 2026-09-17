import React, { useState } from "react";
import { useDemoStore } from "@/context/DemoStoreContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Utensils,
  Flame,
  Star,
  Clock,
  Trash2,
  Sparkles,
  Check,
} from "lucide-react";
import type { MenuItem } from "@/types/kitchen";

export const MenuManagerTab: React.FC = () => {
  const { menuItems, toggleMenuItemStock, addMenuItem, deleteMenuItem } = useDemoStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New item form state
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("199");
  const [category, setCategory] = useState<MenuItem["category"]>("Thali");
  const [prepTime, setPrepTime] = useState("20");

  const filtered = menuItems.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newDish: MenuItem = {
      id: `dish-${Date.now()}`,
      name,
      description: desc || "Homestyle fresh preparation",
      price: Number(price) || 199,
      category,
      image:
        category === "Biryani"
          ? "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
      isVeg: true,
      isAvailable: true,
      preparationTimeMinutes: Number(prepTime) || 15,
      rating: 4.9,
      reviewCount: 1,
      isThali: category === "Thali",
      allowedAddons: ["addon-la", "addon-je", "addon-da", "addon-ch", "addon-ra", "addon-mi", "addon-pa"],
    };

    addMenuItem(newDish);
    setAddModalOpen(false);
    setName("");
    setDesc("");
  };

  return (
    <div className="space-y-6 text-ink">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-ink/40" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dish or category..."
            className="h-9 rounded-full border-ink/15 bg-frost pl-9 text-xs"
          />
        </div>

        <Button
          onClick={() => setAddModalOpen(true)}
          className="rounded-full bg-spice text-xs font-semibold text-cream hover:bg-ink gap-1.5 shadow-sm"
        >
          <Plus className="size-3.5" />
          <span>Add New Food Item</span>
        </Button>
      </div>

      {/* Menu Management Table */}
      <div className="overflow-hidden rounded-3xl border border-ink/10 bg-frost shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-ink/10 bg-cream/70 font-mono uppercase text-ink/60">
              <tr>
                <th className="p-4">Dish</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Prep Time</th>
                <th className="p-4">Live Availability</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-cream/40 transition-colors">
                  {/* Dish name & image */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-12 rounded-xl object-cover border border-ink/10 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm text-ink">{item.name}</strong>
                          {item.isTodaySpecial && (
                            <Badge className="bg-saffron text-ink text-[9px] font-mono">
                              SPECIAL
                            </Badge>
                          )}
                          {item.isThali && (
                            <Badge className="bg-spice text-cream text-[9px] font-mono">
                              THALI
                            </Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-ink/60 max-w-xs truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4 font-mono font-medium text-ink">{item.category}</td>

                  {/* Price */}
                  <td className="p-4 font-display text-base text-ink">₹{item.price}</td>

                  {/* Prep Time */}
                  <td className="p-4 font-mono text-ink/70">{item.preparationTimeMinutes} mins</td>

                  {/* Live In Stock / Sold Out toggle */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={item.isAvailable}
                        onCheckedChange={() => toggleMenuItemStock(item.id)}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                      <span
                        className={`font-mono text-[10px] font-bold uppercase ${
                          item.isAvailable ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {item.isAvailable ? "IN STOCK" : "SOLD OUT"}
                      </span>
                    </div>
                  </td>

                  {/* Delete */}
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMenuItem(item.id)}
                      className="size-8 rounded-full text-ink/40 hover:text-red-600"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Dish Dialog */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="max-w-md rounded-3xl border border-ink/10 bg-frost p-6 text-ink shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-ink">
              Add New Dish to Kitchen
            </DialogTitle>
            <DialogDescription className="text-xs text-ink/60">
              New item will be instantly available on the customer website.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateDish} className="mt-4 space-y-3 text-xs">
            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                Dish Name
              </label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kashmiri Dum Aloo"
                className="rounded-xl border-ink/15 text-xs bg-cream"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                Description
              </label>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Baby potatoes cooked in fennel & dry ginger gravy..."
                className="rounded-xl border-ink/15 text-xs bg-cream"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                  Price (₹)
                </label>
                <Input
                  required
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="rounded-xl border-ink/15 text-xs bg-cream font-mono"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full rounded-xl border border-ink/15 bg-cream p-2 text-xs"
                >
                  <option value="Thali">Thali</option>
                  <option value="Paneer & Tandoor">Paneer & Tandoor</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Roti & Rice">Roti & Rice</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Chai & More">Chai & More</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-2 w-full rounded-full bg-spice py-2.5 font-semibold text-cream hover:bg-ink"
            >
              Add Item to Live Menu
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

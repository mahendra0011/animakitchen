import React, { useState, useRef } from "react";
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
  Trash2,
  Upload,
  Link as LinkIcon,
  Sparkles,
  Flame,
  Leaf,
  Clock,
  X,
} from "lucide-react";
import type { MenuItem } from "@/types/kitchen";

const PRESET_IMAGES = [
  {
    label: "Dal Tadka Thali",
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
  },
  {
    label: "Paneer Tikka",
    url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80",
  },
  {
    label: "Dum Biryani",
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
  },
  {
    label: "Tawa Rotis",
    url: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=80",
  },
  {
    label: "Gulab Jamun",
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",
  },
  {
    label: "Masala Chai",
    url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
  },
];

export const MenuManagerTab: React.FC = () => {
  const { menuItems, toggleMenuItemStock, addMenuItem, deleteMenuItem } = useDemoStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New item form state
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("199");
  const [category, setCategory] = useState<MenuItem["category"]>("Thali");
  const [prepTime, setPrepTime] = useState("20");
  const [image, setImage] = useState(PRESET_IMAGES[0]?.url || "");
  const [badge, setBadge] = useState("BESTSELLER");
  const [isVeg, setIsVeg] = useState(true);
  const [isTodaySpecial, setIsTodaySpecial] = useState(false);
  const [includedItems, setIncludedItems] = useState("");
  const [calories, setCalories] = useState("450 kcal");
  const [protein, setProtein] = useState("14g");
  const [carbs, setCarbs] = useState("55g");
  const [fat, setFat] = useState("12g");

  const filtered = menuItems.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalImage =
      image.trim() ||
      PRESET_IMAGES[0]?.url ||
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80";

    const newDish: MenuItem = {
      id: `dish-${Date.now()}`,
      name: name.trim(),
      description: desc.trim() || "Homestyle fresh preparation with 100% pure desi ghee",
      price: Number(price) || 199,
      category,
      image: finalImage,
      isVeg,
      badge: badge.trim() || undefined,
      isTodaySpecial,
      isAvailable: true,
      preparationTimeMinutes: Number(prepTime) || 20,
      rating: 4.9,
      reviewCount: 1,
      isThali: category === "Thali",
      includedItems: includedItems.trim()
        ? includedItems
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : category === "Thali"
          ? ["2 Ghee Phulkas", "Dal Tadka", "Jeera Rice", "Mint Chutney", "Salad"]
          : undefined,
      allowedAddons: ["addon-la", "addon-je", "addon-da", "addon-ch", "addon-ra", "addon-mi", "addon-pa"],
      nutrition: {
        calories: calories.trim() || "450 kcal",
        protein: protein.trim() || "14g",
        carbs: carbs.trim() || "55g",
        fat: fat.trim() || "12g",
      },
    };

    addMenuItem(newDish);
    setAddModalOpen(false);

    // Reset fields
    setName("");
    setDesc("");
    setPrice("199");
    setPrepTime("20");
    setImage(PRESET_IMAGES[0]?.url || "");
    setBadge("BESTSELLER");
    setIsVeg(true);
    setIsTodaySpecial(false);
    setIncludedItems("");
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
          <table className="w-full text-left text-xs text-ink">
            <thead className="border-b border-ink/10 bg-cream/60 font-mono text-[10px] uppercase text-ink/60">
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
                        <div className="flex items-center gap-2 flex-wrap">
                          <strong className="text-sm text-ink">{item.name}</strong>
                          {item.badge && (
                            <Badge className="bg-spice/15 text-spice border-spice/20 text-[9px] font-mono font-bold">
                              {item.badge}
                            </Badge>
                          )}
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
                  <td className="p-4 font-display text-base text-ink font-bold">₹{item.price}</td>

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
                      title="Delete dish"
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

      {/* Enhanced Add New Dish Dialog */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-ink/10 bg-frost p-6 text-ink shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl sm:text-2xl text-ink flex items-center gap-2">
              <Sparkles className="size-5 text-spice" />
              <span>Add New Dish to Kitchen</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-ink/60">
              Add dish image, pricing, preparation time, and nutritional details. Instantly live on the customer app.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateDish} className="mt-4 space-y-4 text-xs">
            {/* 1. Image Upload & Selection Section */}
            <div className="rounded-2xl border border-ink/15 bg-cream/70 p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10px] uppercase font-bold text-ink/70 flex items-center gap-1.5">
                  <Upload className="size-3.5 text-spice" />
                  <span>Dish Photo (Upload or Choose Preset)</span>
                </label>
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="text-[10px] text-red-600 hover:underline flex items-center gap-1"
                  >
                    <X className="size-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Live Preview Box & Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden border-2 border-spice/30 bg-white shrink-0 shadow-inner flex items-center justify-center">
                  {image ? (
                    <img src={image} alt="Dish preview" className="size-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-ink/40 text-center px-1 font-mono">No Image</span>
                  )}
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-xl border-ink/20 bg-white text-xs font-semibold text-ink hover:bg-cream hover:border-spice flex items-center gap-1.5 h-8"
                    >
                      <Upload className="size-3.5 text-spice" />
                      <span>Upload from Device</span>
                    </Button>
                    <span className="text-[11px] text-ink/40 font-mono">or paste URL below</span>
                  </div>

                  <div className="relative">
                    <LinkIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-ink/40" />
                    <Input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="rounded-xl border-ink/15 text-[11px] bg-white pl-8 h-8 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Image Presets */}
              <div>
                <span className="text-[10px] font-mono text-ink/50 uppercase block mb-1.5">
                  Quick Food Presets:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setImage(preset.url)}
                      className={`group relative rounded-xl overflow-hidden border p-1 text-center transition-all ${
                        image === preset.url
                          ? "border-spice bg-spice/10 ring-1 ring-spice"
                          : "border-ink/10 bg-white hover:border-spice/50"
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="size-8 rounded-lg object-cover mx-auto mb-1"
                      />
                      <span className="text-[9px] font-semibold text-ink block truncate leading-none">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Basic Dish Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                  Dish Name *
                </label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kashmiri Dum Aloo"
                  className="rounded-xl border-ink/15 text-xs bg-cream"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                  Description
                </label>
                <Input
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Baby potatoes cooked in fennel & dry ginger gravy, topped with pure cow ghee..."
                  className="rounded-xl border-ink/15 text-xs bg-cream"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                  Price (₹) *
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
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full rounded-xl border border-ink/15 bg-cream p-2 text-xs font-medium text-ink"
                >
                  <option value="Thali">Thali</option>
                  <option value="Paneer & Tandoor">Paneer & Tandoor</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Roti & Rice">Roti & Rice</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Chai & More">Chai & More</option>
                  <option value="Combos">Combos</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1 flex items-center gap-1">
                  <Clock className="size-3 text-spice" />
                  <span>Prep Time (Minutes)</span>
                </label>
                <Input
                  type="number"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="20"
                  className="rounded-xl border-ink/15 text-xs bg-cream font-mono"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                  Dish Badge / Tag
                </label>
                <Input
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. BESTSELLER, CHEF SPECIAL"
                  className="rounded-xl border-ink/15 text-xs bg-cream font-mono uppercase"
                />
              </div>
            </div>

            {/* 3. Included Items (for Thalis / Combos) */}
            <div>
              <label className="font-mono text-[10px] uppercase font-bold text-ink/60 block mb-1">
                Included Items (Comma separated)
              </label>
              <Input
                value={includedItems}
                onChange={(e) => setIncludedItems(e.target.value)}
                placeholder="e.g. 2 Desi Ghee Rotis, Dal Tadka, Jeera Rice, Gulab Jamun, Green Chutney"
                className="rounded-xl border-ink/15 text-xs bg-cream"
              />
            </div>

            {/* 4. Dietary & Special Flags */}
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-ink/10 bg-cream/40 p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-ink flex items-center gap-1.5">
                  <Leaf className="size-3.5 text-emerald-600" />
                  <span>Pure Vegetarian</span>
                </span>
                <Switch
                  checked={isVeg}
                  onCheckedChange={setIsVeg}
                  className="data-[state=checked]:bg-emerald-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-ink flex items-center gap-1.5">
                  <Flame className="size-3.5 text-saffron" />
                  <span>Today's Special</span>
                </span>
                <Switch
                  checked={isTodaySpecial}
                  onCheckedChange={setIsTodaySpecial}
                  className="data-[state=checked]:bg-saffron"
                />
              </div>
            </div>

            {/* 5. Nutritional Information */}
            <div className="rounded-2xl border border-ink/10 bg-white p-3 space-y-2">
              <span className="font-mono text-[10px] font-bold uppercase text-ink/60 block">
                Nutrition Facts (Per Serving)
              </span>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <span className="text-[9px] font-mono text-ink/50 uppercase block">Calories</span>
                  <Input
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="450 kcal"
                    className="h-7 text-[11px] rounded-lg bg-cream font-mono"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-ink/50 uppercase block">Protein</span>
                  <Input
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    placeholder="14g"
                    className="h-7 text-[11px] rounded-lg bg-cream font-mono"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-ink/50 uppercase block">Carbs</span>
                  <Input
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    placeholder="55g"
                    className="h-7 text-[11px] rounded-lg bg-cream font-mono"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-ink/50 uppercase block">Fat</span>
                  <Input
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                    placeholder="12g"
                    className="h-7 text-[11px] rounded-lg bg-cream font-mono"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-2 w-full rounded-full bg-spice py-3 font-semibold text-cream hover:bg-ink shadow-md text-xs sm:text-sm"
            >
              Add Item to Live Menu
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

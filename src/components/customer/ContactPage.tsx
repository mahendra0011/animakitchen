import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface ContactPageProps {
  onBack: () => void;
  onExploreMenu: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack, onExploreMenu }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please provide your name and phone number.");
      return;
    }

    setSubmitted(true);
    toast.success("Message sent to Anima's Kitchen!", {
      description: "Our kitchen manager will call/WhatsApp you within 15 minutes.",
    });
  };

  return (
    <div className="min-h-screen bg-cream text-ink pb-24 sm:pb-12">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-frost/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="grid size-9 place-items-center rounded-full border border-ink/15 bg-frost text-ink hover:bg-ink hover:text-cream transition-all"
            >
              <ArrowLeft className="size-4" />
            </button>
            <div>
              <h1 className="font-display text-xl font-black text-ink leading-tight">
                Contact Anima’s Kitchen
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                Indiranagar Hub #01 · WhatsApp Helpline · Bulk Orders
              </p>
            </div>
          </div>

          <Button
            onClick={onExploreMenu}
            size="sm"
            className="rounded-full bg-spice text-cream hover:bg-ink text-xs font-semibold px-4 gap-1.5"
          >
            <span>Order Thali</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="border-b border-ink/10 bg-gradient-to-r from-saffron/20 via-frost to-cream py-12">
        <div className="mx-auto max-w-5xl px-5">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-spice">
            GET IN TOUCH WITH OUR CHEFS
          </span>
          <h2 className="mt-1 font-display text-4xl sm:text-5xl font-black text-ink">
            We’d Love to Hear From You.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-ink/75 max-w-xl">
            Whether you need custom thalis for a corporate event, wish to inquire about weekly subscriptions, or simply want to share your feedback.
          </p>
        </div>
      </div>

      {/* Main Grid: Contact Details & Form */}
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Left Column: Direct Contact Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="rounded-3xl border border-ink/10 bg-frost/90 p-6 shadow-sm backdrop-blur-md">
              <h3 className="font-display text-xl font-bold text-ink mb-4">
                Kitchen Headquarters
              </h3>

              <div className="space-y-4 text-xs leading-relaxed text-ink/80">
                <div className="flex items-start gap-3">
                  <div className="grid size-8 place-items-center rounded-xl bg-spice/10 text-spice shrink-0 mt-0.5">
                    <MapPin className="size-4" />
                  </div>
                  <div>
                    <span className="font-bold text-ink block">Indiranagar Central Hub</span>
                    <span>#428, 100ft Road, Defence Colony, Indiranagar, Bengaluru, Karnataka 560038</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid size-8 place-items-center rounded-xl bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
                    <Phone className="size-4" />
                  </div>
                  <div>
                    <span className="font-bold text-ink block">Hotline & Orders</span>
                    <span>+91 98765 43210 / +91 80 4123 9876</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid size-8 place-items-center rounded-xl bg-green-50 text-green-700 shrink-0 mt-0.5">
                    <MessageCircle className="size-4" />
                  </div>
                  <div>
                    <span className="font-bold text-ink block">WhatsApp Direct Helpline</span>
                    <a
                      href="https://wa.me/919876543210?text=Hello%20Anima's%20Kitchen,%20I%20have%20an%20order%20inquiry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-spice hover:underline font-semibold"
                    >
                      Chat on WhatsApp (+91 98765 43210)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid size-8 place-items-center rounded-xl bg-blue-50 text-blue-700 shrink-0 mt-0.5">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <span className="font-bold text-ink block">Cooking & Service Hours</span>
                    <span>Lunch: 11:30 AM – 3:30 PM</span>
                    <span className="block">Dinner: 7:00 PM – 10:30 PM</span>
                    <span className="text-[10px] text-ink/50 block mt-0.5">Open all 7 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Delivery Radius Box */}
            <div className="rounded-3xl border border-spice/20 bg-gradient-to-br from-white to-spice/5 p-6 shadow-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-spice/10 px-3 py-1 font-mono text-[10px] font-bold text-spice">
                <Sparkles className="size-3" />
                EXPRESS DELIVERY RADIUS
              </span>
              <h4 className="mt-2 font-display text-base font-bold text-ink">
                6.0 KM Free Delivery Zone
              </h4>
              <p className="mt-1 text-xs text-ink/70">
                Indiranagar, Domlur, Ulsoor, Koramangala, HAL, CV Raman Nagar, Kodihalli, and Old Airport Road.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-ink/10 bg-frost/95 p-6 sm:p-8 shadow-sm backdrop-blur-md">
              <h3 className="font-display text-2xl font-bold text-ink">
                Send Us a Note
              </h3>
              <p className="mt-1 text-xs text-ink/60">
                Have a question about allergens, catering, or subscription passes? We'll get back to you promptly.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                  <CheckCircle2 className="size-12 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-display text-lg font-bold text-emerald-900">
                    Thank You, {formData.name}!
                  </h4>
                  <p className="mt-1 text-xs text-emerald-700">
                    Your inquiry has been received. Our kitchen team will contact you shortly on {formData.phone}.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", email: "", topic: "General Inquiry", message: "" });
                    }}
                    variant="outline"
                    size="sm"
                    className="mt-4 rounded-xl text-xs font-bold"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full rounded-xl border border-ink/15 bg-white p-3 text-xs font-medium focus:border-spice focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-ink/15 bg-white p-3 text-xs font-medium focus:border-spice focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full rounded-xl border border-ink/15 bg-white p-3 text-xs font-medium focus:border-spice focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink mb-1.5">
                        Topic of Inquiry
                      </label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full rounded-xl border border-ink/15 bg-white p-3 text-xs font-medium focus:border-spice focus:outline-none"
                      >
                        <option>General Inquiry</option>
                        <option>Weekday Tiffin Pass</option>
                        <option>Bulk Office / Event Catering</option>
                        <option>Custom Diet / Jain Food</option>
                        <option>Feedback for Chef</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you need or how we can assist you..."
                      className="w-full rounded-xl border border-ink/15 bg-white p-3 text-xs font-medium focus:border-spice focus:outline-none resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-spice text-cream hover:bg-ink font-bold h-11 text-xs shadow-md transition-all gap-2"
                  >
                    <Send className="size-3.5" />
                    <span>Send Message to Kitchen</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

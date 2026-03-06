import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import {
  Activity,
  BarChart2,
  Bell,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  GraduationCap,
  Hourglass,
  IndianRupee,
  LayoutGrid,
  LineChart,
  Loader2,
  Menu,
  MessageCircle,
  Newspaper,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AdminDashboard from "./components/AdminDashboard";
import { FinzyLogo } from "./components/FinzyLogo";
import { useAddSignup, useGetSignupCount } from "./hooks/useQueries";

// ── Scroll reveal hook ────────────────────────────────────
function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );

    const refresh = () => {
      const items = document.querySelectorAll(".reveal:not(.visible)");
      for (const item of items) {
        observer.observe(item);
      }
    };

    refresh();
    const timer = setInterval(refresh, 300);
    setTimeout(() => clearInterval(timer), 5000);

    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);
}

// ── Signup Modal ──────────────────────────────────────────
interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", label: "India (+91)" },
  { code: "+1", flag: "🇺🇸", label: "USA (+1)" },
  { code: "+44", flag: "🇬🇧", label: "UK (+44)" },
  { code: "+971", flag: "🇦🇪", label: "UAE (+971)" },
  { code: "+61", flag: "🇦🇺", label: "Australia (+61)" },
  { code: "+65", flag: "🇸🇬", label: "Singapore (+65)" },
  { code: "+60", flag: "🇲🇾", label: "Malaysia (+60)" },
  { code: "+880", flag: "🇧🇩", label: "Bangladesh (+880)" },
];

function SignupModal({ open, onOpenChange }: SignupModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [success, setSuccess] = useState(false);
  const { mutate, isPending } = useAddSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    const fullPhone = `${countryCode}${phone.trim()}`;
    mutate(
      { name: name.trim(), email: email.trim(), phone: fullPhone },
      {
        onSuccess: () => {
          setSuccess(true);
          toast.success("Welcome to Finzy! We'll connect with you soon.");
        },
        onError: (err: unknown) => {
          const msg =
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.";
          toast.error(msg);
        },
      },
    );
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setSuccess(false);
      setName("");
      setEmail("");
      setPhone("");
      setCountryCode("+91");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-md border-0 shadow-2xl p-0 overflow-hidden"
        data-ocid="hero.dialog"
      >
        {/* Gradient header strip */}
        <div
          className="px-8 pt-8 pb-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.16 0.07 255) 0%, oklch(0.22 0.10 245) 60%, oklch(0.30 0.13 200) 100%)",
          }}
        >
          {/* Decorative orbs */}
          <div
            className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
            style={{ background: "oklch(0.67 0.18 160)" }}
          />
          <div
            className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-15 blur-2xl pointer-events-none"
            style={{ background: "oklch(0.45 0.12 255)" }}
          />

          <div className="relative flex items-center gap-3 mb-1">
            {/* Logo mark */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "oklch(0.67 0.18 160 / 0.2)",
                border: "1px solid oklch(0.67 0.18 160 / 0.35)",
              }}
            >
              <TrendingUp
                className="w-5 h-5"
                style={{ color: "oklch(0.80 0.18 155)" }}
              />
            </div>
            <div>
              <DialogTitle className="text-xl font-display font-bold text-white leading-tight">
                Start Your Free Trial
              </DialogTitle>
              <DialogDescription className="text-white/60 text-xs mt-0.5">
                Join students learning to invest smart
              </DialogDescription>
            </div>
          </div>

          {/* Trust badges */}
          <div className="relative flex flex-wrap gap-2 mt-4">
            {["Free first month", "No card needed", "Cancel anytime"].map(
              (badge) => (
                <span
                  key={badge}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: "oklch(0.67 0.18 160 / 0.15)",
                    color: "oklch(0.85 0.18 155)",
                    border: "1px solid oklch(0.67 0.18 160 / 0.25)",
                  }}
                >
                  ✓ {badge}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Form body */}
        <div className="px-8 py-6 bg-white">
          {success ? (
            <div className="py-4 text-center" data-ocid="hero.success_state">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                style={{
                  background: "oklch(0.67 0.18 160 / 0.1)",
                  border: "2px solid oklch(0.67 0.18 160 / 0.35)",
                }}
              >
                <CheckCircle2
                  className="w-10 h-10"
                  style={{ color: "oklch(0.50 0.16 160)" }}
                />
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    background: "oklch(0.67 0.18 160 / 0.06)",
                    animationDuration: "2s",
                  }}
                />
              </div>

              <h3
                className="text-2xl font-display font-bold mb-2"
                style={{ color: "oklch(0.16 0.07 255)" }}
              >
                Registration done! 🎉
              </h3>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "oklch(0.50 0.04 255)" }}
              >
                Your Finzy Free Trial has started.
                <br />
                We'll reach out to you soon.
              </p>

              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-left"
                style={{
                  background: "oklch(0.67 0.18 160 / 0.07)",
                  border: "1px solid oklch(0.67 0.18 160 / 0.2)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.67 0.18 160 / 0.15)" }}
                >
                  <MessageCircle
                    className="w-5 h-5"
                    style={{ color: "oklch(0.50 0.16 160)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs mb-0.5"
                    style={{ color: "oklch(0.50 0.04 255)" }}
                  >
                    Questions? WhatsApp us:
                  </p>
                  <a
                    href="https://wa.me/917587170451"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm"
                    style={{ color: "oklch(0.50 0.16 160)" }}
                  >
                    +91 75871 70451
                  </a>
                </div>
              </div>

              <Button
                className="w-full btn-finzy-green py-3 text-base font-semibold"
                onClick={() => handleClose(false)}
                data-ocid="hero.close_button"
              >
                Let's Start Learning! 🚀
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="signup-name"
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.25 0.07 255)" }}
                >
                  Full Name
                </Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  data-ocid="hero.input"
                  className="h-11 rounded-xl text-sm"
                  style={{
                    border: "1.5px solid oklch(0.88 0.015 240)",
                    background: "oklch(0.98 0.004 240)",
                    color: "oklch(0.16 0.07 255)",
                  }}
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="signup-email"
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.25 0.07 255)" }}
                >
                  Email Address
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-ocid="hero.input"
                  className="h-11 rounded-xl text-sm"
                  style={{
                    border: "1.5px solid oklch(0.88 0.015 240)",
                    background: "oklch(0.98 0.004 240)",
                    color: "oklch(0.16 0.07 255)",
                  }}
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="signup-phone"
                    className="text-sm font-semibold"
                    style={{ color: "oklch(0.25 0.07 255)" }}
                  >
                    Mobile Number
                  </Label>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: "oklch(0.67 0.18 160 / 0.1)",
                      color: "oklch(0.45 0.16 160)",
                      border: "1px solid oklch(0.67 0.18 160 / 0.2)",
                    }}
                  >
                    Auto-selected: India (+91)
                  </span>
                </div>
                <div className="flex gap-2">
                  {/* Country code selector */}
                  <div className="relative shrink-0">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      data-ocid="hero.select"
                      className="h-11 pl-3 pr-7 rounded-xl text-sm font-semibold appearance-none cursor-pointer outline-none"
                      style={{
                        border: "1.5px solid oklch(0.88 0.015 240)",
                        background: "oklch(0.98 0.004 240)",
                        color: "oklch(0.16 0.07 255)",
                        minWidth: "90px",
                      }}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    {/* Dropdown chevron */}
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: "oklch(0.55 0.04 255)" }}
                    >
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
                      >
                        <title>Dropdown arrow</title>
                        <path
                          d="M1 1l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Phone number input */}
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    required
                    data-ocid="hero.input"
                    className="h-11 rounded-xl text-sm flex-1"
                    style={{
                      border: "1.5px solid oklch(0.88 0.015 240)",
                      background: "oklch(0.98 0.004 240)",
                      color: "oklch(0.16 0.07 255)",
                    }}
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full btn-finzy-green py-3 text-base font-bold rounded-xl mt-2"
                disabled={
                  isPending ||
                  !name.trim() ||
                  !email.trim() ||
                  phone.length < 10
                }
                data-ocid="hero.submit_button"
                style={{ height: "48px" }}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Start Free Trial →"
                )}
              </Button>

              <p
                className="text-center text-xs pt-1"
                style={{ color: "oklch(0.65 0.04 255)" }}
              >
                No spam. Cancel anytime. First month is free.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Animated Hero SVG Chart ───────────────────────────────
// Accurate 18% p.a. growth on ₹25,000 over 3 years:
// Start: ₹25,000  (y=170)
// Year 1: ₹29,500  (y=130)
// Year 2: ₹34,810  (y=85)
// Year 3: ₹41,076  (y=30)
// SVG viewBox 0-200 height, top=low value, bottom=high value (inverted y)
// Map: ₹25,000→170, ₹41,076→30 (range 140px for ₹16,076)
// Scale: (value - 25000) / 16076 * 140, then 170 - scaled
function HeroChart() {
  // X positions: start=60, yr1=220, yr2=380, yr3=540
  // Y positions (accurate):
  const pts = [
    { x: 60, y: 170, label: "Start", val: "₹25,000" },
    { x: 220, y: 109, label: "Yr 1", val: "₹29,500" },
    { x: 380, y: 61, label: "Yr 2", val: "₹34,810" },
    { x: 540, y: 28, label: "Yr 3", val: "₹41,076" },
  ];
  const linePath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
    .join(" ");
  const areaPath = `${linePath} L540 200 L60 200 Z`;

  return (
    <svg
      viewBox="0 0 600 210"
      className="w-full opacity-45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Grid lines */}
      {[40, 80, 120, 160].map((y) => (
        <line
          key={y}
          x1="40"
          y1={y}
          x2="580"
          y2={y}
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.25"
        />
      ))}
      {[60, 220, 380, 540].map((x) => (
        <line
          key={x}
          x1={x}
          y1="20"
          x2={x}
          y2="185"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.18"
        />
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#heroGradientFill)" opacity="0.22" />

      {/* Main trend line */}
      <path
        d={linePath}
        stroke="url(#heroGradientLine)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-draw-line"
      />

      {/* Data points + labels */}
      {pts.map((p, i) => (
        <g key={p.label}>
          <circle
            cx={p.x}
            cy={p.y}
            r={i === pts.length - 1 ? 6 : 4}
            fill={i === pts.length - 1 ? "oklch(0.67 0.18 160)" : "white"}
            opacity={i === pts.length - 1 ? 1 : 0.75}
          />
          {/* Year label below x-axis */}
          <text
            x={p.x}
            y={200}
            textAnchor="middle"
            fill="white"
            fillOpacity="0.55"
            fontSize="9"
          >
            {p.label}
          </text>
          {/* Value label above point */}
          <text
            x={p.x}
            y={p.y - 9}
            textAnchor="middle"
            fill={i === pts.length - 1 ? "oklch(0.80 0.18 155)" : "white"}
            fillOpacity={i === pts.length - 1 ? 1 : 0.75}
            fontSize="9"
            fontWeight={i === pts.length - 1 ? "bold" : "normal"}
          >
            {p.val}
          </text>
        </g>
      ))}

      <defs>
        <linearGradient
          id="heroGradientLine"
          x1="60"
          y1="0"
          x2="540"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.6" />
          <stop offset="1" stopColor="oklch(0.67 0.18 160)" />
        </linearGradient>
        <linearGradient
          id="heroGradientFill"
          x1="0"
          y1="0"
          x2="0"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="oklch(0.67 0.18 160)" stopOpacity="0.6" />
          <stop offset="1" stopColor="oklch(0.67 0.18 160)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Navbar ────────────────────────────────────────────────
function Navbar({ onTrialClick }: { onTrialClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Learn", href: "#learn" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "oklch(0.18 0.08 255 / 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(1 0 0 / 0.08)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.link"
        >
          <FinzyLogo size="md" />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-white/75 hover:text-white transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            type="button"
            onClick={onTrialClick}
            className="btn-finzy-green px-5 py-2 rounded-lg text-sm"
            data-ocid="nav.primary_button"
          >
            Start Free Trial
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: "oklch(0.18 0.08 255 / 0.98)",
            borderTop: "1px solid oklch(1 0 0 / 0.08)",
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-white font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onTrialClick();
              }}
              className="btn-finzy-green px-5 py-3 rounded-lg text-sm text-left"
              data-ocid="nav.primary_button"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ── Hero Section ──────────────────────────────────────────
function HeroSection({ onTrialClick }: { onTrialClick: () => void }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center hero-gradient grid-bg overflow-hidden pt-16"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.08 255) 0%, oklch(0.22 0.10 245) 40%, oklch(0.30 0.12 200) 70%, oklch(0.38 0.14 165) 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating icons */}
        <div
          className="absolute top-24 right-12 text-4xl animate-float opacity-30 hidden lg:block"
          aria-hidden="true"
        >
          ₹
        </div>
        <div
          className="absolute top-40 right-32 text-2xl animate-float-delay-1 opacity-20 hidden lg:block"
          aria-hidden="true"
        >
          📈
        </div>
        <div
          className="absolute bottom-40 left-16 text-3xl animate-float-delay-2 opacity-25 hidden lg:block"
          aria-hidden="true"
        >
          💰
        </div>
        <div
          className="absolute top-1/2 left-8 text-xl animate-float opacity-15 hidden lg:block"
          aria-hidden="true"
        >
          📊
        </div>

        {/* Glow orbs */}
        <div
          className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.67 0.18 160)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.45 0.12 255)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "oklch(0.67 0.18 160 / 0.15)",
                color: "oklch(0.80 0.18 155)",
                border: "1px solid oklch(0.67 0.18 160 / 0.3)",
              }}
            >
              <Sparkles className="w-3 h-3" />
              Financial Education for Students
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-display leading-tight animate-fade-in-up"
              style={{ color: "white" }}
            >
              Learn Money.
              <br />
              <span style={{ color: "oklch(0.80 0.18 155)" }}>
                Start Investing.
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl leading-relaxed max-w-xl animate-fade-in-up"
              style={{ color: "oklch(1 0 0 / 0.7)", animationDelay: "0.15s" }}
            >
              A simple financial education platform designed for students who
              want to understand saving, ETFs and long-term investing.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <button
                type="button"
                onClick={onTrialClick}
                className="btn-finzy-green px-8 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2"
                data-ocid="hero.primary_button"
              >
                <Zap className="w-4 h-4" />
                Start Free Trial
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href="#about"
                className="btn-finzy-navy px-8 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2"
                data-ocid="hero.secondary_button"
              >
                Learn More
              </a>
            </div>

            <div
              className="flex items-center gap-6 animate-fade-in-up text-sm"
              style={{ color: "oklch(1 0 0 / 0.55)", animationDelay: "0.45s" }}
            >
              <span className="flex items-center gap-1.5">
                <Check
                  className="w-4 h-4"
                  style={{ color: "oklch(0.80 0.18 155)" }}
                />
                First month Free
              </span>
              <span className="flex items-center gap-1.5">
                <Check
                  className="w-4 h-4"
                  style={{ color: "oklch(0.80 0.18 155)" }}
                />
                No investment advice
              </span>
            </div>
          </div>

          {/* Right — chart */}
          <div
            className="relative hidden lg:block animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(1 0 0 / 0.05)",
                border: "1px solid oklch(1 0 0 / 0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider">
                    Portfolio Growth (18% p.a.)
                  </p>
                  <p className="text-white text-2xl font-display font-bold mt-0.5">
                    ₹41,076
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: "oklch(0.67 0.18 160 / 0.2)",
                    color: "oklch(0.80 0.18 155)",
                  }}
                >
                  +64.3%
                </div>
              </div>
              <HeroChart />
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-white/50 text-xs">Invested</p>
                  <p className="text-white font-semibold text-sm">₹25,000</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs">Returns</p>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "oklch(0.80 0.18 155)" }}
                  >
                    +₹16,076
                  </p>
                </div>
                <div>
                  <p className="text-white/50 text-xs">Duration</p>
                  <p className="text-white font-semibold text-sm">3 Years</p>
                </div>
              </div>

              {/* Strategies strip */}
              <div
                className="mt-4 pt-4 flex flex-wrap gap-2"
                style={{ borderTop: "1px solid oklch(1 0 0 / 0.1)" }}
              >
                <p className="text-white/50 text-xs w-full mb-1">
                  Strategies Used:
                </p>
                {[
                  "ETF Index Fund",
                  "SIP Investing",
                  "Buy & Hold",
                  "Diversification",
                ].map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.67 0.18 160 / 0.15)",
                      color: "oklch(0.80 0.18 155)",
                      border: "1px solid oklch(0.67 0.18 160 / 0.25)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Mini cards */}
            <div
              className="absolute -bottom-6 -left-6 rounded-xl p-3 flex items-center gap-3"
              style={{
                background: "oklch(0.22 0.10 248 / 0.9)",
                border: "1px solid oklch(1 0 0 / 0.1)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "oklch(0.67 0.18 160 / 0.2)" }}
              >
                <TrendingUp
                  className="w-4 h-4"
                  style={{ color: "oklch(0.80 0.18 155)" }}
                />
              </div>
              <div>
                <p className="text-white text-xs font-semibold">
                  ETF + SIP Strategy
                </p>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.80 0.18 155)" }}
                >
                  18% p.a. growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0 60 L1440 60 L1440 30 Q720 0 0 30 Z"
            fill="oklch(0.98 0.004 240)"
          />
        </svg>
      </div>
    </section>
  );
}

// ── What is Finzy ─────────────────────────────────────────
function AboutSection() {
  const { data: signupCount } = useGetSignupCount();
  const count = signupCount ? Number(signupCount) : 0;

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                background: "oklch(0.27 0.09 255 / 0.08)",
                color: "oklch(0.27 0.09 255)",
                border: "1px solid oklch(0.27 0.09 255 / 0.15)",
              }}
            >
              <GraduationCap className="w-3 h-3" />
              What is Finzy?
            </div>

            <h2
              className="text-4xl sm:text-5xl font-display mb-8 leading-tight"
              style={{ color: "oklch(0.16 0.07 255)" }}
            >
              Finance education that actually{" "}
              <span style={{ color: "oklch(0.50 0.16 160)" }}>makes sense</span>
            </h2>

            <p
              className="text-lg sm:text-xl leading-relaxed mb-10"
              style={{ color: "oklch(0.45 0.04 255)" }}
            >
              Finzy is a student-focused financial education platform where
              college students learn how money works, how to save money and how
              to understand investing basics in a simple way.
            </p>
          </div>

          {/* Social proof counter */}
          <div className="reveal reveal-delay-2">
            <div
              className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.22 0.085 255 / 0.06) 0%, oklch(0.67 0.18 160 / 0.06) 100%)",
                border: "1px solid oklch(0.22 0.085 255 / 0.12)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(0.67 0.18 160 / 0.12)" }}
              >
                <Users
                  className="w-6 h-6"
                  style={{ color: "oklch(0.50 0.16 160)" }}
                />
              </div>
              <div className="text-left">
                <p
                  className="text-3xl font-display font-bold"
                  style={{ color: "oklch(0.22 0.085 255)" }}
                >
                  {count > 150 ? `${count.toLocaleString("en-IN")}+` : "150+"}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.50 0.04 255)" }}
                >
                  students already joined
                </p>
              </div>
            </div>
          </div>

          {/* 3 pillars */}
          <div className="grid sm:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: BookOpen,
                title: "Learn at your pace",
                description:
                  "Structured modules that fit your college schedule, no finance background needed.",
                delay: "reveal-delay-1",
              },
              {
                icon: Target,
                title: "Built for students",
                description:
                  "Content designed specifically for 18–25 year olds with small savings.",
                delay: "reveal-delay-2",
              },
              {
                icon: Zap,
                title: "Start Free",
                description:
                  "Zero barrier to entry. Free trial for your first month, then just ₹99/month after.",
                delay: "reveal-delay-3",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`reveal ${item.delay} p-6 rounded-2xl text-left feature-card`}
                style={{
                  background: "oklch(0.98 0.004 240)",
                  border: "1px solid oklch(0.88 0.015 240)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.27 0.09 255 / 0.1)" }}
                >
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: "oklch(0.27 0.09 255)" }}
                  />
                </div>
                <h3
                  className="font-display font-bold text-lg mb-2"
                  style={{ color: "oklch(0.16 0.07 255)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.50 0.04 255)" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── What You Will Learn ───────────────────────────────────
const learnCards = [
  {
    icon: LineChart,
    title: "ETF Investing Basics",
    description:
      "Learn what ETFs are and why they are beginner-friendly. Understand index funds, expense ratios, and why ETFs outperform most active funds.",
    tag: "Most Popular",
    tagColor: "oklch(0.67 0.18 160 / 0.12)",
    tagText: "oklch(0.50 0.16 160)",
  },
  {
    icon: PiggyBank,
    title: "Saving Strategies for Students",
    description:
      "Understand how students can save money from small income. From the 50/30/20 rule to student-specific saving hacks.",
    tag: "Beginner Friendly",
    tagColor: "oklch(0.27 0.09 255 / 0.08)",
    tagText: "oklch(0.27 0.09 255)",
  },
  {
    icon: Hourglass,
    title: "Long-Term Investing Mindset",
    description:
      "Learn the power of patience and compounding. See how ₹500/month invested at 20 years old becomes ₹1 crore+ by retirement.",
    tag: "Must Know",
    tagColor: "oklch(0.646 0.222 41.116 / 0.1)",
    tagText: "oklch(0.50 0.17 41)",
  },
  {
    icon: LayoutGrid,
    title: "Simple Portfolio Concepts",
    description:
      "Understand diversification and basic portfolio thinking. Learn why not putting all your eggs in one basket actually matters.",
    tag: "Practical",
    tagColor: "oklch(0.67 0.18 160 / 0.12)",
    tagText: "oklch(0.50 0.16 160)",
  },
];

function LearnSection() {
  return (
    <section
      id="learn"
      className="py-24"
      style={{ background: "oklch(0.97 0.006 240)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "oklch(0.67 0.18 160 / 0.1)",
              color: "oklch(0.50 0.16 160)",
              border: "1px solid oklch(0.67 0.18 160 / 0.2)",
            }}
          >
            <BookOpen className="w-3 h-3" />
            What You Will Learn
          </div>
          <h2
            className="text-4xl sm:text-5xl font-display mb-4"
            style={{ color: "oklch(0.16 0.07 255)" }}
          >
            Everything a student investor{" "}
            <span style={{ color: "oklch(0.50 0.16 160)" }}>needs</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.50 0.04 255)" }}
          >
            Curated modules built specifically for students with limited capital
            and time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {learnCards.map((card, i) => (
            <div
              key={card.title}
              className={`reveal reveal-delay-${i + 1} feature-card bg-card rounded-2xl p-6 flex flex-col gap-4`}
              style={{ border: "1px solid oklch(0.88 0.015 240)" }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.27 0.09 255 / 0.08)" }}
                >
                  <card.icon
                    className="w-6 h-6"
                    style={{ color: "oklch(0.27 0.09 255)" }}
                  />
                </div>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: card.tagColor, color: card.tagText }}
                >
                  {card.tag}
                </span>
              </div>

              <div>
                <h3
                  className="font-display font-bold text-lg mb-2 leading-tight"
                  style={{ color: "oklch(0.16 0.07 255)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.50 0.04 255)" }}
                >
                  {card.description}
                </p>
              </div>

              {/* Mini sparkline */}
              <div
                className="mt-auto pt-4"
                style={{ borderTop: "1px solid oklch(0.88 0.015 240)" }}
              >
                <svg
                  viewBox="0 0 80 30"
                  fill="none"
                  className="w-full h-8 opacity-60"
                  aria-hidden="true"
                >
                  <path
                    d="M0 25 L15 20 L30 18 L45 12 L60 7 L75 3"
                    stroke="oklch(0.50 0.16 160)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="75" cy="3" r="3" fill="oklch(0.67 0.18 160)" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How Finzy Works ───────────────────────────────────────
const steps = [
  {
    number: "01",
    label: "Learn",
    icon: BookOpen,
    description:
      "Access beginner-friendly modules on saving, ETFs, and investing fundamentals.",
  },
  {
    number: "02",
    label: "Understand",
    icon: GraduationCap,
    description:
      "Grasp core concepts with visual charts, plain language explanations, and examples.",
  },
  {
    number: "03",
    label: "Start Small",
    icon: IndianRupee,
    description:
      "Apply your knowledge with real-world scenarios using amounts as small as ₹500.",
  },
  {
    number: "04",
    label: "Grow",
    icon: TrendingUp,
    description:
      "Build long-term wealth through consistent, disciplined investing over time.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "oklch(0.27 0.09 255 / 0.08)",
              color: "oklch(0.27 0.09 255)",
              border: "1px solid oklch(0.27 0.09 255 / 0.15)",
            }}
          >
            How It Works
          </div>
          <h2
            className="text-4xl sm:text-5xl font-display mb-4"
            style={{ color: "oklch(0.16 0.07 255)" }}
          >
            Your journey to financial{" "}
            <span style={{ color: "oklch(0.27 0.09 255)" }}>clarity</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="absolute top-8 left-0 right-0 h-0.5 hidden lg:block mx-24"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.27 0.09 255) 0%, oklch(0.67 0.18 160) 100%)",
              opacity: 0.3,
            }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.label}
                className={`reveal reveal-delay-${i + 1} relative flex flex-col items-center text-center`}
              >
                {/* Step circle */}
                <div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center mb-6 z-10"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.22 0.085 255) 0%, oklch(${0.3 + i * 0.08} 0.13 ${255 - i * 20}) 100%)`,
                    boxShadow: "0 8px 24px -4px oklch(0.27 0.09 255 / 0.3)",
                  }}
                >
                  <step.icon className="w-7 h-7 text-white" />
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{
                      background: "oklch(0.67 0.18 160)",
                      color: "white",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>

                <h3
                  className="text-xl font-display font-bold mb-2"
                  style={{ color: "oklch(0.16 0.07 255)" }}
                >
                  {step.label}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.50 0.04 255)" }}
                >
                  {step.description}
                </p>

                {/* Arrow for desktop */}
                {i < steps.length - 1 && (
                  <ChevronRight
                    className="absolute top-8 -right-4 hidden lg:block w-5 h-5 -translate-y-1/2"
                    style={{ color: "oklch(0.67 0.18 160)", opacity: 0.5 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Why Start Early ───────────────────────────────────────
function WhyEarlySection() {
  const compoundRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && compoundRef.current) {
            compoundRef.current.classList.add("animate-draw-line");
          }
        }
      },
      { threshold: 0.3 },
    );
    const el = compoundRef.current;
    if (el) observer.observe(el.closest("section") || el);
    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: Clock,
      title: "Time is your biggest asset",
      description:
        "Time helps investments grow through compounding. Starting at 20 vs 30 can double your final corpus.",
      stat: "2×",
      statLabel: "more wealth at 30 yrs",
    },
    {
      icon: TrendingUp,
      title: "Small amounts, big results",
      description:
        "Small amounts invested early can grow over time. ₹500/month for 20 years at 18% (ETF averaging) = ₹13.27 Lakh.",
      stat: "₹1.33 Cr",
      statLabel: "from ₹500/mo (18% p.a.)",
    },
    {
      icon: IndianRupee,
      title: "Build financial discipline",
      description:
        "Financial knowledge builds discipline. Understanding money transforms how you earn, save and spend.",
      stat: "3×",
      statLabel: "saving improvement",
    },
  ];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.16 0.07 255) 0%, oklch(0.22 0.10 245) 60%, oklch(0.28 0.12 210) 100%)",
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "oklch(0.67 0.18 160 / 0.15)",
              color: "oklch(0.80 0.18 155)",
              border: "1px solid oklch(0.67 0.18 160 / 0.3)",
            }}
          >
            <Sparkles className="w-3 h-3" />
            Why Start Early
          </div>
          <h2 className="text-4xl sm:text-5xl font-display text-white mb-4">
            The earlier you start,
            <br />
            <span style={{ color: "oklch(0.80 0.18 155)" }}>
              the richer you grow
            </span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(1 0 0 / 0.65)" }}
          >
            Compounding is the eighth wonder of the world. Start at 20 and let
            time do the heavy lifting.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`reveal reveal-delay-${i + 1} rounded-2xl p-8`}
              style={{
                background: "oklch(1 0 0 / 0.06)",
                border: "1px solid oklch(1 0 0 / 0.1)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "oklch(0.67 0.18 160 / 0.2)" }}
              >
                <b.icon
                  className="w-6 h-6"
                  style={{ color: "oklch(0.80 0.18 155)" }}
                />
              </div>

              <div
                className="text-4xl font-display font-black mb-1"
                style={{ color: "oklch(0.80 0.18 155)" }}
              >
                {b.stat}
              </div>
              <div className="text-white/60 text-xs mb-4">{b.statLabel}</div>

              <h3 className="text-xl font-display font-bold text-white mb-3">
                {b.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(1 0 0 / 0.65)" }}
              >
                {b.description}
              </p>
            </div>
          ))}
        </div>

        {/* Compound chart — SIP ₹500 vs ₹1000 @ 18% p.a. for 20 years */}
        {/*
          SIP Formula: M × ((1+r)^n - 1) / r  where r = 0.18/12 = 0.015, n = months
          Year 0: 0
          Year 5 (n=60):  ₹500 → ₹52,343  | ₹1000 → ₹1,04,686
          Year 10 (n=120): ₹500 → ₹1,82,947 | ₹1000 → ₹3,65,894
          Year 15 (n=180): ₹500 → ₹5,09,775 | ₹1000 → ₹10,19,550
          Year 20 (n=240): ₹500 → ₹13,27,491 | ₹1000 → ₹26,54,982
          SVG viewBox: 0 0 700 200
          Y-axis: max = ₹27,00,000 → y=10; min = 0 → y=170
          Scale: y = 170 - (value × 160 / 2700000)
          ₹500: 170, 166.9, 159.2, 139.8, 91.3
          ₹1000: 170, 163.8, 148.3, 109.6, 12.7
        */}
        <div
          className="reveal rounded-2xl p-6 sm:p-8"
          style={{
            background: "oklch(1 0 0 / 0.05)",
            border: "1px solid oklch(1 0 0 / 0.1)",
          }}
          data-ocid="compounding.chart_point"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-display font-bold text-white">
                Compounding in Action
              </h3>
              <p className="text-white/60 text-sm mt-1">
                SIP @ 18% p.a. for 20 years — ETF averaging ka power dekho
              </p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "oklch(0.80 0.18 155)" }}
                />
                <span className="text-white/70 text-sm">₹1,000/month</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "oklch(0.70 0.12 220)" }}
                />
                <span className="text-white/70 text-sm">₹500/month</span>
              </div>
            </div>
          </div>

          <svg
            viewBox="0 0 700 200"
            fill="none"
            className="w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="sipGrad1000"
                x1="50"
                y1="0"
                x2="590"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="oklch(0.67 0.18 160)" stopOpacity="0.3" />
                <stop
                  offset="1"
                  stopColor="oklch(0.80 0.18 155)"
                  stopOpacity="0.6"
                />
              </linearGradient>
              <linearGradient
                id="sipGrad500"
                x1="50"
                y1="0"
                x2="590"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="oklch(0.60 0.12 220)" stopOpacity="0.2" />
                <stop
                  offset="1"
                  stopColor="oklch(0.70 0.12 220)"
                  stopOpacity="0.4"
                />
              </linearGradient>
              <linearGradient
                id="sipAreaFill1000"
                x1="0"
                y1="0"
                x2="0"
                y2="200"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="oklch(0.80 0.18 155)" stopOpacity="0.18" />
                <stop
                  offset="1"
                  stopColor="oklch(0.80 0.18 155)"
                  stopOpacity="0"
                />
              </linearGradient>
              <linearGradient
                id="sipAreaFill500"
                x1="0"
                y1="0"
                x2="0"
                y2="200"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="oklch(0.70 0.12 220)" stopOpacity="0.12" />
                <stop
                  offset="1"
                  stopColor="oklch(0.70 0.12 220)"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[50, 90, 130, 170].map((y) => (
              <line
                key={y}
                x1="40"
                y1={y}
                x2="660"
                y2={y}
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity="0.12"
              />
            ))}
            {[50, 185, 320, 455, 590].map((x) => (
              <line
                key={x}
                x1={x}
                y1="10"
                x2={x}
                y2="175"
                stroke="white"
                strokeWidth="0.5"
                strokeOpacity="0.1"
              />
            ))}

            {/* Y-axis value labels */}
            <text
              x="36"
              y="14"
              textAnchor="end"
              fill="white"
              fillOpacity="0.4"
              fontSize="9"
            >
              ₹27L
            </text>
            <text
              x="36"
              y="54"
              textAnchor="end"
              fill="white"
              fillOpacity="0.4"
              fontSize="9"
            >
              ₹20L
            </text>
            <text
              x="36"
              y="94"
              textAnchor="end"
              fill="white"
              fillOpacity="0.4"
              fontSize="9"
            >
              ₹13L
            </text>
            <text
              x="36"
              y="134"
              textAnchor="end"
              fill="white"
              fillOpacity="0.4"
              fontSize="9"
            >
              ₹7L
            </text>
            <text
              x="36"
              y="174"
              textAnchor="end"
              fill="white"
              fillOpacity="0.4"
              fontSize="9"
            >
              ₹0
            </text>

            {/* Area fills */}
            <path
              d="M50 170 L185 163.8 L320 148.3 L455 109.6 L590 12.7 L590 170 Z"
              fill="url(#sipAreaFill1000)"
            />
            <path
              d="M50 170 L185 166.9 L320 159.2 L455 139.8 L590 91.3 L590 170 Z"
              fill="url(#sipAreaFill500)"
            />

            {/* ₹500/month line */}
            <path
              d="M50 170 L185 166.9 L320 159.2 L455 139.8 L590 91.3"
              stroke="url(#sipGrad500)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* ₹1000/month line */}
            <path
              d="M50 170 L185 163.8 L320 148.3 L455 109.6 L590 12.7"
              stroke="url(#sipGrad1000)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              ref={compoundRef}
              style={{ strokeDasharray: 1200, strokeDashoffset: 1200 }}
              fill="none"
            />

            {/* Data points — ₹500 line */}
            {[
              { x: 50, y: 170, end: false },
              { x: 185, y: 166.9, end: false },
              { x: 320, y: 159.2, end: false },
              { x: 455, y: 139.8, end: false },
              { x: 590, y: 91.3, end: true },
            ].map((p) => (
              <circle
                key={`p500-x${p.x}`}
                cx={p.x}
                cy={p.y}
                r={p.end ? 5 : 3}
                fill="oklch(0.70 0.12 220)"
                opacity={p.end ? 1 : 0.7}
              />
            ))}

            {/* Data points — ₹1000 line */}
            {[
              { x: 50, y: 170, end: false },
              { x: 185, y: 163.8, end: false },
              { x: 320, y: 148.3, end: false },
              { x: 455, y: 109.6, end: false },
              { x: 590, y: 12.7, end: true },
            ].map((p) => (
              <circle
                key={`p1000-x${p.x}`}
                cx={p.x}
                cy={p.y}
                r={p.end ? 6 : 3}
                fill="oklch(0.80 0.18 155)"
                opacity={p.end ? 1 : 0.8}
              />
            ))}

            {/* End value labels */}
            <text
              x="596"
              y="10"
              fill="oklch(0.80 0.18 155)"
              fontSize="10"
              fontWeight="bold"
            >
              ₹26.55L
            </text>
            <text
              x="596"
              y="88"
              fill="oklch(0.70 0.12 220)"
              fontSize="10"
              fontWeight="bold"
            >
              ₹13.27L
            </text>

            {/* X-axis year labels */}
            {["Yr 0", "Yr 5", "Yr 10", "Yr 15", "Yr 20"].map((label, i) => (
              <text
                key={label}
                x={[50, 185, 320, 455, 590][i]}
                y="188"
                textAnchor="middle"
                fill="white"
                fillOpacity="0.5"
                fontSize="9.5"
              >
                {label}
              </text>
            ))}
          </svg>

          {/* End amount summary cards */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-xl px-5 py-4 flex items-center gap-4"
              style={{
                background: "oklch(0.80 0.18 155 / 0.1)",
                border: "1px solid oklch(0.80 0.18 155 / 0.25)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "oklch(0.80 0.18 155 / 0.15)" }}
              >
                <TrendingUp
                  className="w-5 h-5"
                  style={{ color: "oklch(0.80 0.18 155)" }}
                />
              </div>
              <div>
                <p className="text-white/60 text-xs">₹1,000/month × 20 yrs</p>
                <p className="text-white font-display font-bold text-xl">
                  ₹26,54,982
                </p>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.80 0.18 155)" }}
                >
                  Invested: ₹2,40,000 • Profit: ₹24,14,982
                </p>
              </div>
            </div>
            <div
              className="rounded-xl px-5 py-4 flex items-center gap-4"
              style={{
                background: "oklch(0.70 0.12 220 / 0.1)",
                border: "1px solid oklch(0.70 0.12 220 / 0.25)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "oklch(0.70 0.12 220 / 0.15)" }}
              >
                <IndianRupee
                  className="w-5 h-5"
                  style={{ color: "oklch(0.70 0.12 220)" }}
                />
              </div>
              <div>
                <p className="text-white/60 text-xs">₹500/month × 20 yrs</p>
                <p className="text-white font-display font-bold text-xl">
                  ₹13,27,491
                </p>
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.70 0.12 220)" }}
                >
                  Invested: ₹1,20,000 • Profit: ₹12,07,491
                </p>
              </div>
            </div>
          </div>

          {/* Rate badge */}
          <div className="mt-4 flex items-center gap-2">
            <div
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
              style={{
                background: "oklch(0.67 0.18 160 / 0.15)",
                color: "oklch(0.80 0.18 155)",
                border: "1px solid oklch(0.67 0.18 160 / 0.3)",
              }}
            >
              <Sparkles className="w-3 h-3" />
              18% p.a. return (ETF averaging — SIP compounding)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Pricing Section ───────────────────────────────────────
function PricingSection({ onTrialClick }: { onTrialClick: () => void }) {
  const plans = [
    {
      name: "Starter",
      badge: "🎓 Free First Month",
      price: "99",
      subtitle: "after your free trial month",
      highlight: false,
      popular: false,
      description:
        "Perfect for students just starting their financial journey.",
      features: [
        { icon: BookOpen, text: "ETF investing education (basics)" },
        { icon: Wallet, text: "Student saving strategies" },
        { icon: GraduationCap, text: "Beginner-friendly financial education" },
        { icon: BarChart2, text: "Simple market understanding" },
        { icon: Users, text: "Community learning environment" },
        { icon: TrendingUp, text: "Simple investing knowledge" },
        { icon: IndianRupee, text: "SIP & compounding calculators" },
      ],
      cta: "Start Free Trial →",
      ocid: "pricing.starter_button",
      accentColor: "oklch(0.50 0.16 160)",
      accentBg: "oklch(0.67 0.18 160 / 0.12)",
    },
    {
      name: "Advanced",
      badge: "🔥 Most Popular",
      price: "399",
      subtitle: "per month",
      highlight: true,
      popular: true,
      description:
        "For serious students who want deeper market insights & tools.",
      features: [
        { icon: BookOpen, text: "Everything in Starter" },
        { icon: Activity, text: "Live market monitoring dashboard" },
        { icon: BarChart2, text: "Daily data insights & analytics" },
        { icon: Newspaper, text: "Real-time financial news feed" },
        { icon: TrendingUp, text: "ETF & index fund deep-dives" },
        { icon: Globe, text: "Global market information" },
        { icon: Target, text: "Advanced portfolio strategies" },
        { icon: Bell, text: "Market alerts & notifications" },
        { icon: Zap, text: "Weekly live Q&A sessions" },
      ],
      cta: "Get Advanced →",
      ocid: "pricing.advanced_button",
      accentColor: "oklch(0.80 0.18 155)",
      accentBg: "oklch(0.67 0.18 160 / 0.2)",
    },
    {
      name: "Premium",
      badge: "⭐ All Access",
      price: "999",
      subtitle: "per month",
      highlight: false,
      popular: false,
      description:
        "Complete financial education suite — everything Finzy has to offer.",
      features: [
        { icon: Star, text: "Everything in Advanced" },
        { icon: Activity, text: "Real-time live stock screener" },
        { icon: BarChart2, text: "Advanced technical analysis basics" },
        { icon: Newspaper, text: "Curated daily market briefings" },
        { icon: Globe, text: "International market coverage (US, EU, Asia)" },
        { icon: TrendingUp, text: "Sector & thematic investing guides" },
        { icon: Bell, text: "Custom portfolio alerts & tracking" },
        { icon: Zap, text: "1-on-1 monthly mentorship session" },
        { icon: ShieldCheck, text: "Options & derivatives education (basics)" },
        { icon: GraduationCap, text: "Certification of financial literacy" },
        { icon: Users, text: "Exclusive premium Discord community" },
      ],
      cta: "Go Premium →",
      ocid: "pricing.premium_button",
      accentColor: "oklch(0.75 0.15 41)",
      accentBg: "oklch(0.75 0.15 41 / 0.12)",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "oklch(0.67 0.18 160 / 0.1)",
              color: "oklch(0.50 0.16 160)",
              border: "1px solid oklch(0.67 0.18 160 / 0.2)",
            }}
          >
            <IndianRupee className="w-3 h-3" />
            Start Learning with Finzy
          </div>
          <h2
            className="text-4xl sm:text-5xl font-display mb-4"
            style={{ color: "oklch(0.16 0.07 255)" }}
          >
            Student-priced,{" "}
            <span style={{ color: "oklch(0.50 0.16 160)" }}>world-class</span>{" "}
            learning
          </h2>
          <p className="text-lg" style={{ color: "oklch(0.50 0.04 255)" }}>
            No expensive courses. No hidden fees. Just honest pricing for
            students.
          </p>
        </div>

        <div
          className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start"
          data-ocid="pricing.card"
        >
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`reveal reveal-delay-${idx + 1} rounded-3xl overflow-hidden flex flex-col relative ${plan.popular ? "pricing-glow lg:-mt-4 lg:mb-4" : ""}`}
              style={{
                background: plan.highlight
                  ? "linear-gradient(160deg, oklch(0.22 0.085 255) 0%, oklch(0.18 0.08 255) 100%)"
                  : "oklch(0.98 0.004 240)",
                border: plan.highlight
                  ? "none"
                  : `1.5px solid ${idx === 2 ? "oklch(0.75 0.15 41 / 0.25)" : "oklch(0.88 0.015 240)"}`,
                boxShadow: plan.highlight
                  ? "0 24px 60px oklch(0.22 0.085 255 / 0.25)"
                  : undefined,
              }}
            >
              {/* Badge strip */}
              <div
                className="text-center py-2.5 text-xs font-bold tracking-wide"
                style={{
                  background: plan.highlight
                    ? "oklch(0.67 0.18 160)"
                    : idx === 2
                      ? "oklch(0.75 0.15 41 / 0.15)"
                      : "oklch(0.27 0.09 255 / 0.07)",
                  color: plan.highlight
                    ? "white"
                    : idx === 2
                      ? "oklch(0.55 0.14 41)"
                      : "oklch(0.35 0.07 255)",
                }}
              >
                {plan.badge}
              </div>

              <div className="p-7 flex flex-col flex-1">
                {/* Plan name */}
                <h3
                  className="text-xl font-display font-bold mb-1"
                  style={{
                    color: plan.highlight ? "white" : "oklch(0.16 0.07 255)",
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-xs mb-6 leading-relaxed"
                  style={{
                    color: plan.highlight
                      ? "oklch(1 0 0 / 0.55)"
                      : "oklch(0.55 0.04 255)",
                  }}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  {plan.name === "Starter" && (
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                      style={{
                        background: "oklch(0.67 0.18 160 / 0.15)",
                        color: "oklch(0.50 0.16 160)",
                      }}
                    >
                      Free for first month
                    </div>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-xl font-display"
                      style={{
                        color: plan.highlight
                          ? "oklch(1 0 0 / 0.5)"
                          : "oklch(0.55 0.04 255)",
                      }}
                    >
                      ₹
                    </span>
                    <span
                      className="text-5xl font-display font-black"
                      style={{
                        color: plan.highlight
                          ? "white"
                          : "oklch(0.16 0.07 255)",
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: plan.highlight
                          ? "oklch(1 0 0 / 0.5)"
                          : "oklch(0.55 0.04 255)",
                      }}
                    >
                      /mo
                    </span>
                  </div>
                  <p
                    className="text-xs mt-1"
                    style={{
                      color: plan.highlight
                        ? "oklch(1 0 0 / 0.4)"
                        : "oklch(0.65 0.04 255)",
                    }}
                  >
                    {plan.subtitle}
                  </p>
                </div>

                {/* Features list */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: plan.accentBg }}
                      >
                        <Check
                          className="w-3 h-3"
                          style={{ color: plan.accentColor }}
                        />
                      </div>
                      <span
                        className="text-sm leading-snug"
                        style={{
                          color: plan.highlight
                            ? "oklch(1 0 0 / 0.78)"
                            : "oklch(0.35 0.04 255)",
                        }}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  onClick={onTrialClick}
                  className={`w-full py-3.5 rounded-xl text-base font-bold transition-all ${plan.highlight ? "btn-finzy-green" : ""}`}
                  data-ocid={plan.ocid}
                  style={
                    !plan.highlight
                      ? {
                          background: plan.accentBg,
                          color: plan.accentColor,
                          border: `1.5px solid ${plan.accentColor}`,
                        }
                      : undefined
                  }
                >
                  {plan.cta}
                </button>

                {plan.name === "Starter" && (
                  <p
                    className="text-center text-xs mt-3"
                    style={{
                      color: "oklch(0.65 0.04 255)",
                    }}
                  >
                    No credit card required. Cancel anytime.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <p
          className="text-center mt-10 text-sm reveal"
          style={{ color: "oklch(0.50 0.04 255)" }}
        >
          ✨ Built for students who want to learn investing early. All plans
          include education only — not financial advice.
        </p>
      </div>
    </section>
  );
}

// ── Benefits Section ──────────────────────────────────────
const benefitItems = [
  {
    icon: GraduationCap,
    title: "Beginner-friendly education",
    description:
      "No jargon. No assumptions. Everything explained from first principles so anyone can understand.",
  },
  {
    icon: TrendingUp,
    title: "ETF learning resources",
    description:
      "Dedicated content on index funds, ETFs, and passive investing — the proven path for most investors.",
  },
  {
    icon: BarChart2,
    title: "Simple market understanding",
    description:
      "Learn how markets work, why they go up and down, and how to stay calm during volatility.",
  },
  {
    icon: Users,
    title: "Student learning community",
    description:
      "Join a community of students learning together. Share experiences, ask questions, grow together.",
  },
];

function BenefitsSection() {
  return (
    <section className="py-24" style={{ background: "oklch(0.97 0.006 240)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "oklch(0.27 0.09 255 / 0.08)",
              color: "oklch(0.27 0.09 255)",
              border: "1px solid oklch(0.27 0.09 255 / 0.15)",
            }}
          >
            What Students Get
          </div>
          <h2
            className="text-4xl sm:text-5xl font-display mb-4"
            style={{ color: "oklch(0.16 0.07 255)" }}
          >
            Everything you need to{" "}
            <span style={{ color: "oklch(0.27 0.09 255)" }}>start smart</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitItems.map((item, i) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${i + 1} feature-card bg-card rounded-2xl p-6`}
              style={{ border: "1px solid oklch(0.88 0.015 240)" }}
              data-ocid={`benefits.item.${i + 1}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.22 0.085 255 / 0.1) 0%, oklch(0.67 0.18 160 / 0.1) 100%)",
                }}
              >
                <item.icon
                  className="w-6 h-6"
                  style={{ color: "oklch(0.27 0.09 255)" }}
                />
              </div>
              <h3
                className="font-display font-bold text-lg mb-3"
                style={{ color: "oklch(0.16 0.07 255)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.50 0.04 255)" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Trust Section ─────────────────────────────────────────
function TrustSection() {
  const pillars = [
    {
      icon: GraduationCap,
      title: "Student-focused financial learning",
      description:
        "Every piece of content is crafted with a college student in mind — limited income, limited time, big dreams.",
    },
    {
      icon: ShieldCheck,
      title: "Simple and transparent education",
      description:
        "We teach, we don't sell. No hidden agenda. No affiliate products pushed on you. Pure education.",
    },
    {
      icon: Clock,
      title: "Long-term investing mindset",
      description:
        "We teach patience, not speculation. Building wealth the slow-and-steady way that actually works.",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 400"
          fill="none"
          className="absolute bottom-0 left-0 right-0 w-full opacity-[0.03]"
          aria-hidden="true"
        >
          <path
            d="M0 300 L240 250 L480 200 L720 150 L960 100 L1200 60 L1440 30"
            stroke="oklch(0.22 0.085 255)"
            strokeWidth="3"
          />
          <path
            d="M0 350 L240 310 L480 270 L720 220 L960 170 L1200 120 L1440 80"
            stroke="oklch(0.67 0.18 160)"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "oklch(0.27 0.09 255 / 0.08)",
              color: "oklch(0.27 0.09 255)",
              border: "1px solid oklch(0.27 0.09 255 / 0.15)",
            }}
          >
            <ShieldCheck className="w-3 h-3" />
            Why Trust Finzy
          </div>
          <h2
            className="text-4xl sm:text-5xl font-display mb-4"
            style={{ color: "oklch(0.16 0.07 255)" }}
          >
            Built on{" "}
            <span style={{ color: "oklch(0.27 0.09 255)" }}>transparency</span>{" "}
            and trust
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.50 0.04 255)" }}
          >
            We are educators, not brokers. Our goal is your financial literacy,
            not commission.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`reveal reveal-delay-${i + 1} text-center`}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.22 0.085 255 / 0.08) 0%, oklch(0.67 0.18 160 / 0.08) 100%)",
                  border: "1px solid oklch(0.27 0.09 255 / 0.1)",
                }}
              >
                <p.icon
                  className="w-8 h-8"
                  style={{ color: "oklch(0.27 0.09 255)" }}
                />
              </div>
              <h3
                className="text-xl font-display font-bold mb-3"
                style={{ color: "oklch(0.16 0.07 255)" }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm leading-relaxed max-w-xs mx-auto"
                style={{ color: "oklch(0.50 0.04 255)" }}
              >
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div
          className="reveal mt-16 rounded-2xl p-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.085 255 / 0.04) 0%, oklch(0.67 0.18 160 / 0.04) 100%)",
            border: "1px solid oklch(0.27 0.09 255 / 0.08)",
          }}
        >
          {[
            { value: "500+", label: "Students Learning" },
            { value: "4", label: "Core Modules" },
            { value: "Free", label: "Trial Price" },
            { value: "100%", label: "Education Only" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="text-4xl font-display font-black mb-1"
                style={{ color: "oklch(0.27 0.09 255)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-sm"
                style={{ color: "oklch(0.50 0.04 255)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      style={{
        background:
          "linear-gradient(160deg, oklch(0.13 0.06 255) 0%, oklch(0.18 0.08 255) 100%)",
        borderTop: "1px solid oklch(1 0 0 / 0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <FinzyLogo size="md" />
            </div>
            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: "oklch(1 0 0 / 0.55)" }}
            >
              A financial education platform for Indian college students. Learn
              saving, ETFs, and long-term investing in a simple, structured way.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-3">
              {["Home", "About", "Learn", "Pricing"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm transition-colors"
                    style={{ color: "oklch(1 0 0 / 0.55)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "oklch(1 0 0 / 0.55)";
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-2">
              <a
                href="mailto:info.lovekushh@gmail.com"
                className="text-sm flex items-center gap-1.5 transition-colors"
                style={{ color: "oklch(0.80 0.18 155)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "oklch(0.80 0.18 155)";
                }}
                data-ocid="footer.link"
              >
                ✉ info.lovekushh@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{
            background: "oklch(1 0 0 / 0.04)",
            border: "1px solid oklch(1 0 0 / 0.08)",
          }}
        >
          <p
            className="text-xs leading-relaxed"
            style={{ color: "oklch(1 0 0 / 0.45)" }}
          >
            <strong className="text-white/70">Disclaimer:</strong> Finzy
            provides financial education only and does not provide investment
            advice. The content on this platform is for educational purposes
            only and should not be considered as financial, investment, legal or
            tax advice. Please consult a certified financial advisor before
            making any investment decisions.
          </p>
        </div>

        {/* Copyright */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)" }}
        >
          <p className="text-xs" style={{ color: "oklch(1 0 0 / 0.35)" }}>
            © {year} Finzy by Love & Kush. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "oklch(1 0 0 / 0.35)" }}>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── WhatsApp Floating Button ──────────────────────────────
function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/917587170451"
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#25D366",
        boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
        transition: "transform 0.2s, box-shadow 0.2s",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.12)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 6px 28px rgba(37,211,102,0.6)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 4px 20px rgba(37,211,102,0.45)";
      }}
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="white"
        role="img"
        aria-label="WhatsApp"
      >
        <title>WhatsApp</title>
        <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.664 4.802 1.822 6.808L2 30l7.378-1.797A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.471a11.43 11.43 0 0 1-5.832-1.594l-.418-.248-4.378 1.065 1.094-4.254-.273-.436A11.432 11.432 0 0 1 4.57 16.003c0-6.308 5.127-11.433 11.433-11.433 6.308 0 11.433 5.125 11.433 11.433 0 6.308-5.125 11.468-11.433 11.468zm6.274-8.567c-.344-.172-2.036-1.004-2.351-1.118-.316-.115-.546-.172-.776.172-.229.344-.889 1.118-1.09 1.348-.2.229-.4.258-.744.086-.344-.172-1.453-.536-2.767-1.707-1.022-.912-1.712-2.038-1.913-2.382-.2-.344-.021-.53.15-.701.155-.154.344-.4.516-.6.172-.2.229-.344.344-.572.115-.229.057-.43-.029-.601-.086-.172-.776-1.869-1.063-2.559-.28-.672-.563-.58-.776-.59l-.659-.011c-.229 0-.601.086-.916.43-.315.344-1.204 1.176-1.204 2.867 0 1.692 1.233 3.327 1.405 3.556.172.229 2.427 3.707 5.879 5.197.822.354 1.463.566 1.963.724.824.262 1.574.225 2.167.137.661-.099 2.036-.832 2.322-1.636.287-.804.287-1.493.2-1.637-.086-.143-.315-.229-.659-.401z" />
      </svg>
    </a>
  );
}

// ── Homepage ──────────────────────────────────────────────
function Homepage() {
  const [signupOpen, setSignupOpen] = useState(false);

  useRevealOnScroll();

  return (
    <>
      <Toaster richColors />
      <Navbar onTrialClick={() => setSignupOpen(true)} />
      <main>
        <HeroSection onTrialClick={() => setSignupOpen(true)} />
        <AboutSection />
        <LearnSection />
        <HowItWorksSection />
        <WhyEarlySection />
        <PricingSection onTrialClick={() => setSignupOpen(true)} />
        <BenefitsSection />
        <TrustSection />
      </main>
      <Footer />
      <SignupModal open={signupOpen} onOpenChange={setSignupOpen} />
      <WhatsAppFloatingButton />
    </>
  );
}

// ── App Root ──────────────────────────────────────────────
export default function App() {
  const [route, setRoute] = useState(() => window.location.hash);

  useEffect(() => {
    // Sync on mount in case hash was set before React loaded
    setRoute(window.location.hash);

    const handler = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  if (route === "#/admin") {
    return <AdminDashboard />;
  }

  return <Homepage />;
}

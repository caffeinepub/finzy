import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  BarChart2,
  Bell,
  CheckCheck,
  Database,
  GraduationCap,
  Loader2,
  Lock,
  LogOut,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetSignupCount } from "../hooks/useQueries";

const LS_KEY = "finzy_last_seen_count";

const ADMIN_PASSWORD = "finzy2024";

// ── Password Gate ─────────────────────────────────────────
function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    // Slight delay for UX feedback
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onSuccess();
      } else {
        setError(true);
        setIsChecking(false);
        setPassword("");
      }
    }, 400);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.14 0.07 255) 0%, oklch(0.18 0.09 248) 50%, oklch(0.22 0.11 240) 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 40px,
            oklch(1 0 0 / 0.04) 40px,
            oklch(1 0 0 / 0.04) 41px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 40px,
            oklch(1 0 0 / 0.04) 40px,
            oklch(1 0 0 / 0.04) 41px
          )`,
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.67 0.18 160 / 0.08)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.45 0.12 255 / 0.10)" }}
      />

      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "oklch(1 0 0 / 0.04)",
          border: "1px solid oklch(1 0 0 / 0.10)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Top accent */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.27 0.09 255) 0%, oklch(0.67 0.18 160) 100%)",
          }}
        />

        <div className="p-8 sm:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.22 0.085 255) 0%, oklch(0.30 0.12 220) 100%)",
                boxShadow: "0 8px 24px -4px oklch(0.27 0.09 255 / 0.4)",
              }}
            >
              <Lock className="w-7 h-7 text-white" />
            </div>
            <div className="mb-1">
              <span
                className="text-2xl font-display font-black tracking-tight"
                style={{ color: "oklch(0.80 0.18 155)" }}
              >
                FINZY
              </span>
              <span
                className="text-xs font-medium ml-2 px-2 py-0.5 rounded-full"
                style={{
                  background: "oklch(0.67 0.18 160 / 0.15)",
                  color: "oklch(0.80 0.18 155)",
                  border: "1px solid oklch(0.67 0.18 160 / 0.25)",
                }}
              >
                ADMIN
              </span>
            </div>
            <p className="text-sm" style={{ color: "oklch(1 0 0 / 0.45)" }}>
              Restricted access — Admin only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="admin-password"
                className="text-sm font-medium"
                style={{ color: "oklch(1 0 0 / 0.70)" }}
              >
                Admin Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                required
                autoFocus
                data-ocid="admin.input"
                className="h-12 text-base"
                style={{
                  background: "oklch(1 0 0 / 0.06)",
                  border: error
                    ? "1px solid oklch(0.60 0.20 25)"
                    : "1px solid oklch(1 0 0 / 0.15)",
                  color: "white",
                  caretColor: "oklch(0.80 0.18 155)",
                }}
              />
              {error && (
                <p
                  className="text-xs flex items-center gap-1"
                  style={{ color: "oklch(0.70 0.18 25)" }}
                  data-ocid="admin.error_state"
                >
                  <span>✕</span> Incorrect password. Please try again.
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isChecking || !password}
              data-ocid="admin.submit_button"
              className="w-full h-12 text-base font-semibold rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.27 0.09 255) 0%, oklch(0.35 0.13 235) 100%)",
                color: "white",
                border: "none",
              }}
            >
              {isChecking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Access Dashboard
                </>
              )}
            </Button>
          </form>

          <div
            className="mt-6 pt-6"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)" }}
          >
            <button
              type="button"
              onClick={() => {
                window.location.hash = "";
              }}
              className="flex items-center justify-center gap-2 text-sm transition-colors w-full"
              style={{
                color: "oklch(1 0 0 / 0.40)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(1 0 0 / 0.70)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(1 0 0 / 0.40)";
              }}
              data-ocid="admin.link"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  isLoading,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
  isLoading?: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "oklch(1 0 0 / 0.05)",
        border: "1px solid oklch(1 0 0 / 0.09)",
      }}
      data-ocid="admin.card"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: accent
              ? `${accent} / 0.15`
              : "oklch(0.67 0.18 160 / 0.15)",
          }}
        >
          <Icon
            className="w-6 h-6"
            style={{ color: accent ?? "oklch(0.80 0.18 155)" }}
          />
        </div>
        <div
          className="px-2 py-1 rounded-full text-xs font-semibold"
          style={{
            background: "oklch(0.67 0.18 160 / 0.12)",
            color: "oklch(0.80 0.18 155)",
          }}
        >
          Live
        </div>
      </div>

      {isLoading ? (
        <div
          className="h-10 w-24 rounded-lg animate-pulse"
          style={{ background: "oklch(1 0 0 / 0.08)" }}
          data-ocid="admin.loading_state"
        />
      ) : (
        <div
          className="text-4xl font-display font-black mb-1"
          style={{ color: "white" }}
        >
          {value}
        </div>
      )}

      <p
        className="text-sm font-medium"
        style={{ color: "oklch(1 0 0 / 0.60)" }}
      >
        {label}
      </p>
      {sub && (
        <p className="text-xs mt-1" style={{ color: "oklch(1 0 0 / 0.35)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// ── New Signups Banner ────────────────────────────────────
function NewSignupsBanner({
  newCount,
  onMarkSeen,
}: {
  newCount: number;
  onMarkSeen: () => void;
}) {
  if (newCount <= 0) return null;

  return (
    <div
      className="rounded-2xl p-5 mb-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.14 160 / 0.35) 0%, oklch(0.20 0.12 150 / 0.25) 100%)",
        border: "1px solid oklch(0.67 0.18 160 / 0.45)",
      }}
      data-ocid="admin.panel"
    >
      {/* Subtle animated glow */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl pointer-events-none"
        style={{ background: "oklch(0.67 0.18 160 / 0.20)" }}
      />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Pulsing bell */}
          <div
            className="relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "oklch(0.67 0.18 160 / 0.25)" }}
          >
            <Bell
              className="w-6 h-6"
              style={{ color: "oklch(0.85 0.18 155)" }}
            />
            {/* Pulse dot */}
            <span
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold animate-bounce"
              style={{
                background: "oklch(0.67 0.18 160)",
                color: "white",
              }}
            >
              {newCount > 9 ? "9+" : newCount}
            </span>
          </div>

          <div>
            <p
              className="font-display font-bold text-base mb-0.5"
              style={{ color: "oklch(0.90 0.15 155)" }}
            >
              🔔 New Signups!
            </p>
            <p className="text-sm" style={{ color: "oklch(1 0 0 / 0.72)" }}>
              <span
                className="font-bold"
                style={{ color: "oklch(0.85 0.18 155)" }}
              >
                {newCount} new student{newCount !== 1 ? "s" : ""}
              </span>{" "}
              joined since your last visit.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onMarkSeen}
          data-ocid="admin.confirm_button"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shrink-0 transition-all"
          style={{
            background: "oklch(0.67 0.18 160 / 0.30)",
            border: "1px solid oklch(0.67 0.18 160 / 0.50)",
            color: "oklch(0.90 0.15 155)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "oklch(0.67 0.18 160 / 0.50)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "oklch(0.67 0.18 160 / 0.30)";
          }}
        >
          <CheckCheck className="w-4 h-4" />
          Mark as Seen
        </button>
      </div>
    </div>
  );
}

// ── Recent Activity Section ────────────────────────────────
function RecentActivitySection({
  totalCount,
  newCount,
  isLoading,
}: {
  totalCount: number | null;
  newCount: number;
  isLoading: boolean;
}) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="rounded-2xl overflow-hidden mb-6"
      style={{
        background: "oklch(1 0 0 / 0.03)",
        border: "1px solid oklch(1 0 0 / 0.08)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid oklch(1 0 0 / 0.08)" }}
      >
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5" style={{ color: "oklch(0.80 0.18 155)" }} />
          <h2
            className="font-display font-bold text-base"
            style={{ color: "white" }}
          >
            Recent Activity
          </h2>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: "oklch(0.27 0.09 255 / 0.15)",
            color: "oklch(0.70 0.12 255)",
            border: "1px solid oklch(0.27 0.09 255 / 0.25)",
          }}
        >
          {dateStr} · {timeStr}
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* New badge row — shown when new signups detected */}
        {newCount > 0 && (
          <div
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{
              background: "oklch(0.22 0.12 160 / 0.20)",
              border: "1px solid oklch(0.67 0.18 160 / 0.30)",
            }}
            data-ocid="admin.row"
          >
            <div className="relative shrink-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "oklch(0.67 0.18 160 / 0.20)" }}
              >
                <Users
                  className="w-5 h-5"
                  style={{ color: "oklch(0.80 0.18 155)" }}
                />
              </div>
              {/* Pulsing NEW badge */}
              <span
                className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold animate-pulse"
                style={{
                  background: "oklch(0.67 0.18 160)",
                  color: "white",
                }}
              >
                NEW
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.90 0.15 155)" }}
              >
                {newCount} new registration{newCount !== 1 ? "s" : ""}
              </p>
              <p className="text-xs" style={{ color: "oklch(1 0 0 / 0.50)" }}>
                Just now · since last visit
              </p>
            </div>
            <div
              className="px-2 py-1 rounded-full text-xs font-semibold shrink-0"
              style={{
                background: "oklch(0.67 0.18 160 / 0.20)",
                color: "oklch(0.80 0.18 155)",
              }}
            >
              +{newCount}
            </div>
          </div>
        )}

        {/* Total count row */}
        <div
          className="flex items-center gap-4 p-4 rounded-xl"
          style={{
            background: "oklch(1 0 0 / 0.04)",
            border: "1px solid oklch(1 0 0 / 0.07)",
          }}
          data-ocid="admin.row"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "oklch(0.27 0.09 255 / 0.15)" }}
          >
            <Database
              className="w-5 h-5"
              style={{ color: "oklch(0.70 0.12 255)" }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-white">
              Total registrations on-chain
            </p>
            <p className="text-xs" style={{ color: "oklch(1 0 0 / 0.45)" }}>
              Stored securely on Internet Computer
            </p>
          </div>
          <div
            className="text-xl font-display font-black shrink-0"
            style={{ color: "white" }}
          >
            {isLoading ? (
              <div
                className="h-6 w-10 rounded animate-pulse"
                style={{ background: "oklch(1 0 0 / 0.12)" }}
                data-ocid="admin.loading_state"
              />
            ) : (
              (totalCount ?? 0).toLocaleString("en-IN")
            )}
          </div>
        </div>

        {/* Admin note */}
        <div
          className="rounded-xl px-4 py-3"
          style={{
            background: "oklch(0.27 0.09 255 / 0.08)",
            border: "1px solid oklch(0.27 0.09 255 / 0.15)",
          }}
        >
          <p className="text-xs" style={{ color: "oklch(1 0 0 / 0.55)" }}>
            📋 Admin notification system — check regularly for new
            registrations. Student name &amp; email are stored on-chain.
          </p>
        </div>

        {/* WhatsApp quick contact */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: "oklch(0.40 0.18 150 / 0.12)",
            border: "1px solid oklch(0.67 0.18 160 / 0.25)",
          }}
        >
          <MessageCircle
            className="w-4 h-4 shrink-0"
            style={{ color: "oklch(0.80 0.18 155)" }}
          />
          <p className="text-xs" style={{ color: "oklch(1 0 0 / 0.65)" }}>
            Share community link on WhatsApp:{" "}
            <a
              href="https://wa.me/917587170451"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
              style={{ color: "oklch(0.80 0.18 155)" }}
            >
              +91 75871 70451
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { data: signupCount, isLoading } = useGetSignupCount();
  const count = signupCount !== undefined ? Number(signupCount) : null;

  // ── New signup detection via localStorage ──
  const [lastSeenCount, setLastSeenCount] = useState<number>(() => {
    const stored = localStorage.getItem(LS_KEY);
    return stored ? Number.parseInt(stored, 10) : 0;
  });

  const newCount =
    count !== null && count > lastSeenCount ? count - lastSeenCount : 0;

  // Persist lastSeenCount on unmount/cleanup only when count loads
  useEffect(() => {
    if (count !== null && count > 0 && lastSeenCount === 0) {
      // First visit ever — seed last seen to current (no false positives)
      // Only auto-seed if there's no stored value at all
      if (!localStorage.getItem(LS_KEY)) {
        localStorage.setItem(LS_KEY, String(count));
        setLastSeenCount(count);
      }
    }
  }, [count, lastSeenCount]);

  const handleMarkSeen = () => {
    if (count !== null) {
      localStorage.setItem(LS_KEY, String(count));
      setLastSeenCount(count);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.14 0.07 255) 0%, oklch(0.17 0.08 250) 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 48px,
            oklch(1 0 0 / 0.04) 48px,
            oklch(1 0 0 / 0.04) 49px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 48px,
            oklch(1 0 0 / 0.04) 48px,
            oklch(1 0 0 / 0.04) 49px
          )`,
        }}
      />

      {/* Header */}
      <header
        className="relative sticky top-0 z-40"
        style={{
          background: "oklch(0.14 0.07 255 / 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid oklch(1 0 0 / 0.08)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.67 0.18 160 / 0.20)" }}
            >
              <BarChart2
                className="w-4 h-4"
                style={{ color: "oklch(0.80 0.18 155)" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span
                className="font-display font-black text-lg tracking-tight"
                style={{ color: "oklch(0.80 0.18 155)" }}
              >
                FINZY
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{
                  background: "oklch(0.67 0.18 160 / 0.15)",
                  color: "oklch(0.80 0.18 155)",
                  border: "1px solid oklch(0.67 0.18 160 / 0.25)",
                }}
              >
                Admin Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                window.location.hash = "";
              }}
              className="hidden sm:flex items-center gap-1.5 text-sm transition-colors"
              style={{
                color: "oklch(1 0 0 / 0.45)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(1 0 0 / 0.80)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(1 0 0 / 0.45)";
              }}
              data-ocid="admin.link"
            >
              <ArrowLeft className="w-4 h-4" />
              Homepage
            </button>
            <button
              type="button"
              onClick={onLogout}
              data-ocid="admin.secondary_button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: "oklch(1 0 0 / 0.06)",
                border: "1px solid oklch(1 0 0 / 0.10)",
                color: "oklch(1 0 0 / 0.65)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "oklch(1 0 0 / 0.10)";
                (e.currentTarget as HTMLButtonElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "oklch(1 0 0 / 0.06)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(1 0 0 / 0.65)";
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page heading */}
        <div className="mb-8">
          <h1
            className="text-3xl sm:text-4xl font-display font-black mb-2"
            style={{ color: "white" }}
          >
            Signup Overview
          </h1>
          <p className="text-sm" style={{ color: "oklch(1 0 0 / 0.50)" }}>
            Real-time data from the Internet Computer blockchain
          </p>
        </div>

        {/* New signups notification banner */}
        <NewSignupsBanner newCount={newCount} onMarkSeen={handleMarkSeen} />

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <StatCard
            icon={Users}
            label="Total Signups"
            value={count !== null ? count.toLocaleString("en-IN") : "—"}
            sub="All time registrations"
            isLoading={isLoading}
          />
          <StatCard
            icon={TrendingUp}
            label="Growth Trend"
            value="Active"
            sub="Signups increasing"
            accent="oklch(0.80 0.18 155)"
          />
          <StatCard
            icon={GraduationCap}
            label="Platform Status"
            value="Live"
            sub="All systems operational"
            accent="oklch(0.80 0.18 155)"
          />
        </div>

        {/* Data info card */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            background: "oklch(0.67 0.18 160 / 0.06)",
            border: "1px solid oklch(0.67 0.18 160 / 0.15)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "oklch(0.67 0.18 160 / 0.20)" }}
            >
              <Database
                className="w-5 h-5"
                style={{ color: "oklch(0.80 0.18 155)" }}
              />
            </div>
            <div>
              <h3
                className="font-display font-bold text-base mb-1"
                style={{ color: "oklch(0.85 0.12 160)" }}
              >
                Decentralized Data Storage
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(1 0 0 / 0.60)" }}
              >
                All signup data is securely stored on the{" "}
                <span style={{ color: "oklch(0.80 0.18 155)" }}>
                  Internet Computer blockchain
                </span>
                . Each signup record includes the student's{" "}
                <strong className="text-white/80">Name</strong>,{" "}
                <strong className="text-white/80">Email</strong>, and{" "}
                <strong className="text-white/80">Timestamp</strong>. Data is
                tamper-proof and decentralized — no central server required.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivitySection
          totalCount={count}
          newCount={newCount}
          isLoading={isLoading}
        />

        {/* Signup list section */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "oklch(1 0 0 / 0.03)",
            border: "1px solid oklch(1 0 0 / 0.08)",
          }}
        >
          {/* Table header */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid oklch(1 0 0 / 0.08)" }}
          >
            <div className="flex items-center gap-3">
              <Users
                className="w-5 h-5"
                style={{ color: "oklch(0.80 0.18 155)" }}
              />
              <h2
                className="font-display font-bold text-base"
                style={{ color: "white" }}
              >
                Student Signups
              </h2>
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "oklch(0.27 0.09 255 / 0.15)",
                color: "oklch(0.70 0.12 255)",
                border: "1px solid oklch(0.27 0.09 255 / 0.25)",
              }}
            >
              {isLoading
                ? "Loading..."
                : `${count !== null ? count : 0} registered`}
            </div>
          </div>

          {/* Coming soon body */}
          <div className="px-6 py-12 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "oklch(0.27 0.09 255 / 0.10)" }}
            >
              <ShieldCheck
                className="w-8 h-8"
                style={{ color: "oklch(0.55 0.10 255)" }}
              />
            </div>
            <h3
              className="font-display font-bold text-xl mb-3"
              style={{ color: "white" }}
            >
              Full Export Coming Soon
            </h3>
            <p
              className="text-sm leading-relaxed max-w-md mx-auto mb-4"
              style={{ color: "oklch(1 0 0 / 0.50)" }}
            >
              Detailed signup list with name and email export will be available
              in the next update. All data is safely stored on-chain.
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: "oklch(0.67 0.18 160 / 0.12)",
                color: "oklch(0.80 0.18 155)",
                border: "1px solid oklch(0.67 0.18 160 / 0.20)",
              }}
            >
              <Users className="w-4 h-4" />
              Current total:{" "}
              {isLoading
                ? "..."
                : `${count !== null ? count : 0} students registered`}
            </div>
          </div>

          {/* Column headers (preview) */}
          <div
            className="px-6 pb-4"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.05)" }}
          >
            <div
              className="grid grid-cols-3 gap-4 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider"
              style={{
                background: "oklch(1 0 0 / 0.03)",
                color: "oklch(1 0 0 / 0.30)",
              }}
            >
              <span>#</span>
              <span>Name / Email</span>
              <span>Timestamp</span>
            </div>
            {/* Skeleton rows */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="grid grid-cols-3 gap-4 px-4 py-3 mt-1"
                style={{ opacity: 0.15 - i * 0.04 }}
                data-ocid={`admin.item.${i}`}
              >
                <div
                  className="h-4 rounded"
                  style={{ background: "oklch(1 0 0 / 0.12)", width: "24px" }}
                />
                <div
                  className="h-4 rounded"
                  style={{ background: "oklch(1 0 0 / 0.12)" }}
                />
                <div
                  className="h-4 rounded"
                  style={{ background: "oklch(1 0 0 / 0.12)" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p
          className="text-center text-xs mt-8"
          style={{ color: "oklch(1 0 0 / 0.25)" }}
        >
          Finzy Admin · Secured · Data stored on Internet Computer
        </p>
      </main>
    </div>
  );
}

// ── AdminDashboard (root) ─────────────────────────────────
export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
}

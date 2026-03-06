import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  BarChart2,
  Bell,
  CheckCheck,
  Database,
  Download,
  GraduationCap,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetSignupCount, useGetSignups } from "../hooks/useQueries";

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
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 40px,oklch(1 0 0 / 0.04) 40px,oklch(1 0 0 / 0.04) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,oklch(1 0 0 / 0.04) 40px,oklch(1 0 0 / 0.04) 41px)",
        }}
      />
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
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.27 0.09 255) 0%, oklch(0.67 0.18 160) 100%)",
          }}
        />

        <div className="p-8 sm:p-10">
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
            background: "oklch(0.67 0.18 160 / 0.15)",
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
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl pointer-events-none"
        style={{ background: "oklch(0.67 0.18 160 / 0.20)" }}
      />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className="relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "oklch(0.67 0.18 160 / 0.25)" }}
          >
            <Bell
              className="w-6 h-6"
              style={{ color: "oklch(0.85 0.18 155)" }}
            />
            <span
              className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold animate-bounce"
              style={{ background: "oklch(0.67 0.18 160)", color: "white" }}
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
            cursor: "pointer",
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

// ── Signup List Table ─────────────────────────────────────
type SignupRecord = {
  name: string;
  email: string;
  phone?: string;
  timestamp: bigint;
};

function formatTimestamp(ts: bigint): string {
  // ICP timestamps are in nanoseconds
  const ms = Number(ts) / 1_000_000;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime()) || date.getFullYear() < 2020) {
    return "—";
  }
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function exportToCSV(signups: SignupRecord[]) {
  const header = ["#", "Name", "Phone", "Email", "Timestamp"];
  const rows = signups.map((s, i) => [
    String(i + 1),
    `"${s.name.replace(/"/g, '""')}"`,
    `"${(s.phone ?? "").replace(/"/g, '""')}"`,
    `"${s.email.replace(/"/g, '""')}"`,
    `"${formatTimestamp(s.timestamp)}"`,
  ]);
  const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `finzy-signups-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function SignupListSection({
  signups,
  isLoading,
  onRefresh,
}: {
  signups: SignupRecord[];
  isLoading: boolean;
  onRefresh: () => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = signups.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.phone ?? "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(1 0 0 / 0.03)",
        border: "1px solid oklch(1 0 0 / 0.08)",
      }}
      data-ocid="admin.table"
    >
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4"
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
          <div
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              background: "oklch(0.27 0.09 255 / 0.15)",
              color: "oklch(0.70 0.12 255)",
              border: "1px solid oklch(0.27 0.09 255 / 0.25)",
            }}
          >
            {isLoading ? "Loading..." : `${signups.length} registered`}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="admin.search_input"
              className="h-9 text-sm pr-3 pl-3 sm:w-52"
              style={{
                background: "oklch(1 0 0 / 0.06)",
                border: "1px solid oklch(1 0 0 / 0.12)",
                color: "white",
              }}
            />
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={onRefresh}
            title="Refresh"
            data-ocid="admin.secondary_button"
            className="h-9 w-9 rounded-lg flex items-center justify-center transition-all"
            style={{
              background: "oklch(1 0 0 / 0.06)",
              border: "1px solid oklch(1 0 0 / 0.12)",
              color: "oklch(1 0 0 / 0.55)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "oklch(1 0 0 / 0.12)";
              (e.currentTarget as HTMLButtonElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "oklch(1 0 0 / 0.06)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "oklch(1 0 0 / 0.55)";
            }}
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* CSV Export */}
          <button
            type="button"
            onClick={() => exportToCSV(signups)}
            disabled={signups.length === 0}
            data-ocid="admin.primary_button"
            className="h-9 flex items-center gap-2 px-3 rounded-lg text-sm font-semibold transition-all"
            style={{
              background:
                signups.length === 0
                  ? "oklch(0.67 0.18 160 / 0.10)"
                  : "oklch(0.67 0.18 160 / 0.25)",
              border: "1px solid oklch(0.67 0.18 160 / 0.35)",
              color:
                signups.length === 0
                  ? "oklch(0.80 0.18 155 / 0.40)"
                  : "oklch(0.85 0.18 155)",
              cursor: signups.length === 0 ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (signups.length > 0) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "oklch(0.67 0.18 160 / 0.45)";
              }
            }}
            onMouseLeave={(e) => {
              if (signups.length > 0) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "oklch(0.67 0.18 160 / 0.25)";
              }
            }}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table body */}
      {isLoading ? (
        <div className="px-6 py-12 text-center" data-ocid="admin.loading_state">
          <Loader2
            className="w-8 h-8 animate-spin mx-auto mb-3"
            style={{ color: "oklch(0.80 0.18 155)" }}
          />
          <p className="text-sm" style={{ color: "oklch(1 0 0 / 0.45)" }}>
            Loading signup data from blockchain...
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="px-6 py-14 text-center" data-ocid="admin.empty_state">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "oklch(0.27 0.09 255 / 0.10)" }}
          >
            <Users
              className="w-7 h-7"
              style={{ color: "oklch(0.55 0.10 255)" }}
            />
          </div>
          <h3
            className="font-display font-bold text-lg mb-2"
            style={{ color: "white" }}
          >
            {search ? "No results found" : "No signups yet"}
          </h3>
          <p className="text-sm" style={{ color: "oklch(1 0 0 / 0.45)" }}>
            {search
              ? `No student found matching "${search}"`
              : "When students register, their details will appear here."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {/* Column headers */}
          <div
            className="grid gap-3 px-6 py-3 text-xs font-semibold uppercase tracking-wider"
            style={{
              gridTemplateColumns: "36px 1fr 140px 1fr 150px",
              background: "oklch(1 0 0 / 0.03)",
              color: "oklch(1 0 0 / 0.35)",
              borderBottom: "1px solid oklch(1 0 0 / 0.06)",
            }}
          >
            <span>#</span>
            <span>
              <User className="w-3 h-3 inline mr-1" />
              Name
            </span>
            <span>
              <Phone className="w-3 h-3 inline mr-1" />
              Phone
            </span>
            <span>
              <Mail className="w-3 h-3 inline mr-1" />
              Email
            </span>
            <span>Registered</span>
          </div>

          {/* Rows */}
          {filtered.map((signup, idx) => (
            <div
              key={`${signup.email}-${idx}`}
              className="grid gap-3 px-6 py-4 transition-colors"
              style={{
                gridTemplateColumns: "36px 1fr 140px 1fr 150px",
                borderBottom: "1px solid oklch(1 0 0 / 0.04)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "oklch(1 0 0 / 0.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "transparent";
              }}
              data-ocid={`admin.item.${idx + 1}`}
            >
              {/* Index */}
              <span
                className="text-sm font-mono font-bold"
                style={{ color: "oklch(1 0 0 / 0.30)" }}
              >
                {idx + 1}
              </span>

              {/* Name */}
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                  style={{
                    background: "oklch(0.67 0.18 160 / 0.18)",
                    color: "oklch(0.80 0.18 155)",
                  }}
                >
                  {signup.name.trim().charAt(0).toUpperCase()}
                </div>
                <span
                  className="text-sm font-medium truncate"
                  style={{ color: "white" }}
                >
                  {signup.name}
                </span>
              </div>

              {/* Phone */}
              <span
                className="text-sm font-mono"
                style={{ color: "oklch(0.85 0.14 155)" }}
              >
                {signup.phone && signup.phone.trim() !== ""
                  ? signup.phone
                  : "—"}
              </span>

              {/* Email */}
              <a
                href={`mailto:${signup.email}`}
                className="text-sm truncate transition-colors"
                style={{ color: "oklch(0.70 0.12 255)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "oklch(0.80 0.14 255)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "oklch(0.70 0.12 255)";
                }}
              >
                {signup.email}
              </a>

              {/* Timestamp */}
              <span
                className="text-xs"
                style={{ color: "oklch(1 0 0 / 0.40)" }}
              >
                {formatTimestamp(signup.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer summary */}
      {!isLoading && filtered.length > 0 && (
        <div
          className="px-6 py-3 text-xs"
          style={{
            borderTop: "1px solid oklch(1 0 0 / 0.06)",
            color: "oklch(1 0 0 / 0.35)",
          }}
        >
          Showing {filtered.length} of {signups.length} student
          {signups.length !== 1 ? "s" : ""} · Data stored on Internet Computer
          blockchain
        </div>
      )}
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { data: signupCount, isLoading: countLoading } = useGetSignupCount();
  const {
    data: signupsRaw,
    isLoading: signupsLoading,
    refetch: refetchSignups,
  } = useGetSignups();

  const count = signupCount !== undefined ? Number(signupCount) : null;

  // Normalize signup records
  const signups: SignupRecord[] = (signupsRaw ?? []).map((s: any) => ({
    name: String(s.name ?? ""),
    email: String(s.email ?? ""),
    phone: String(s.phone ?? ""),
    timestamp: BigInt(s.timestamp ?? 0),
  }));

  // ── New signup detection via localStorage ──
  const [lastSeenCount, setLastSeenCount] = useState<number>(() => {
    const stored = localStorage.getItem(LS_KEY);
    return stored ? Number.parseInt(stored, 10) : 0;
  });

  const newCount =
    count !== null && count > lastSeenCount ? count - lastSeenCount : 0;

  useEffect(() => {
    if (count !== null && count > 0 && lastSeenCount === 0) {
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
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 48px,oklch(1 0 0 / 0.04) 48px,oklch(1 0 0 / 0.04) 49px),repeating-linear-gradient(90deg,transparent,transparent 48px,oklch(1 0 0 / 0.04) 48px,oklch(1 0 0 / 0.04) 49px)",
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
                cursor: "pointer",
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
            Real-time student registrations from the Internet Computer
            blockchain
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
            isLoading={countLoading}
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
                . Each record includes the student's{" "}
                <strong className="text-white/80">Name</strong>,{" "}
                <strong className="text-white/80">Email</strong>, and{" "}
                <strong className="text-white/80">Timestamp</strong>. Use the
                Export CSV button to download all data.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp contact */}
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-6"
          style={{
            background: "oklch(0.40 0.18 150 / 0.12)",
            border: "1px solid oklch(0.67 0.18 160 / 0.25)",
          }}
        >
          <MessageCircle
            className="w-4 h-4 shrink-0"
            style={{ color: "oklch(0.80 0.18 155)" }}
          />
          <p className="text-sm" style={{ color: "oklch(1 0 0 / 0.65)" }}>
            WhatsApp community:{" "}
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

        {/* Signup List Table */}
        <SignupListSection
          signups={signups}
          isLoading={signupsLoading}
          onRefresh={() => refetchSignups()}
        />

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

import React, { useState, useEffect } from "react";
import { TrendingUp, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const FONT_LINK_ID = "resuscore-fonts";
// for using fonts
function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

const TOKENS = {
  bg: "#14171D",
  surface: "#1B1F27",
  surface2: "#20252F",
  border: "#2A3038",
  borderLight: "#343B45",
  text: "#EDEFF3",
  textMuted: "#8B93A5",
  textFaint: "#565E6B",
  amber: "#3974e0",
  violet: "#7C86FF",
  red: "#F87171",
};

// Basic email shape check — real validation happens server-side later.
function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
//for signing this
export default function SignIn({ onSignIn }) {
  useFonts();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter both email and password.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    // TODO: replace with real API call once the FastAPI auth endpoint exists,
    // e.g. POST /auth/login { email, password } -> { token, recruiter }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignIn({ email });
    }, 600);
  };
// TODO: replace with real API call once the FastAPI auth endpoint exists,
    // e.g. POST /auth/login { email, password } -> { token, recruiter }
  return (
    <div
      style={{
        minHeight: "100vh",
        background: TOKENS.bg,
        color: TOKENS.text,
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        {/* Logo here */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${TOKENS.amber}, ${TOKENS.violet})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingUp size={17} color="#14171D" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 19, letterSpacing: -0.3 }}>
              ResuScore
            </div>
            <div style={{ fontSize: 11, color: TOKENS.textFaint, fontFamily: "'JetBrains Mono', monospace", marginTop: -2 }}>
              AI resume screening
            </div>
          </div>
        </div>

        <div
          style={{
            background: TOKENS.surface,
            border: `1px solid ${TOKENS.border}`,
            borderRadius: 16,
            padding: 28,
          }}
        >
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 19,
              fontWeight: 600,
              margin: "0 0 4px",
            }}
          >
            Recruiter sign in
          </h1>
          <p style={{ fontSize: 13, color: TOKENS.textMuted, margin: "0 0 22px" }}>
            Sign in to screen and rank candidates.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <label
              style={{
                display: "block",
                fontSize: 11.5,
                fontFamily: "'JetBrains Mono', monospace",
                color: TOKENS.textFaint,
                letterSpacing: 0.5,
                marginBottom: 6,
              }}
            >
              EMAIL
            </label>
            <div style={{ position: "relative", marginBottom: 16 }}>
              <Mail
                size={15}
                color={TOKENS.textFaint}
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: TOKENS.surface2,
                  border: `1px solid ${TOKENS.border}`,
                  borderRadius: 10,
                  padding: "11px 12px 11px 36px",
                  color: TOKENS.text,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = TOKENS.violet)}
                onBlur={(e) => (e.target.style.borderColor = TOKENS.border)}
              />
            </div>

            {/* Password */}
            <label
              style={{
                display: "block",
                fontSize: 11.5,
                fontFamily: "'JetBrains Mono', monospace",
                color: TOKENS.textFaint,
                letterSpacing: 0.5,
                marginBottom: 6,
              }}
            >
              PASSWORD
            </label>
            <div style={{ position: "relative", marginBottom: error ? 10 : 22 }}>
              <Lock
                size={15}
                color={TOKENS.textFaint}
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  background: TOKENS.surface2,
                  border: `1px solid ${TOKENS.border}`,
                  borderRadius: 10,
                  padding: "11px 36px 11px 36px",
                  color: TOKENS.text,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = TOKENS.violet)}
                onBlur={(e) => (e.target.style.borderColor = TOKENS.border)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: TOKENS.textFaint,
                  display: "flex",
                  padding: 4,
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {error && (
              <div
                style={{
                  fontSize: 12.5,
                  color: TOKENS.red,
                  marginBottom: 14,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: loading ? TOKENS.surface2 : TOKENS.amber,
                color: loading ? TOKENS.textMuted : "#14171D",
                border: "none",
                borderRadius: 10,
                padding: "12px 0",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 14.5,
                cursor: loading ? "default" : "pointer",
                transition: "opacity 0.15s",
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 12,
            color: TOKENS.textFaint,
            marginTop: 16,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Demo mode — any valid-looking email/password signs in.
        </div>
      </div>
    </div>
  );
}

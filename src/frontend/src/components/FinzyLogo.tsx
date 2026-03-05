import React from "react";

interface FinzyLogoProps {
  size?: "sm" | "md" | "lg";
}

export function FinzyLogo({ size = "md" }: FinzyLogoProps) {
  const fontSize =
    size === "lg" ? "1.75rem" : size === "sm" ? "1.05rem" : "1.35rem";
  const iconSize = size === "lg" ? 22 : size === "sm" ? 14 : 18;
  const subtitleFontSize =
    size === "lg" ? "0.62rem" : size === "sm" ? "0.52rem" : "0.57rem";
  const iconLeftPad = size === "lg" ? "2px" : "1px";

  return (
    <div
      className="flex flex-col leading-none select-none"
      style={{ gap: "2px" }}
    >
      {/* Main row: icon + FINZY */}
      <div className="flex items-center" style={{ gap: "6px" }}>
        {/* Emerald green upward-right trending arrow */}
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
          role="img"
          aria-label="Finzy growth trend icon"
        >
          {/* Upward trending line with arrow */}
          <polyline
            points="3,18 9,10 14,14 21,5"
            stroke="oklch(0.75 0.22 155)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Arrow head at top right */}
          <polyline
            points="15,5 21,5 21,11"
            stroke="oklch(0.75 0.22 155)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* FINZY text */}
        <span
          style={{
            color: "#FFFFFF",
            fontWeight: 900,
            fontSize: fontSize,
            letterSpacing: "0.06em",
            fontFamily: "inherit",
            lineHeight: 1,
          }}
        >
          FINZY
        </span>
      </div>

      {/* Subtitle: by Love & Kush */}
      <span
        style={{
          color: "oklch(0.85 0.14 155)",
          fontSize: subtitleFontSize,
          fontWeight: 500,
          letterSpacing: "0.10em",
          paddingLeft: iconLeftPad,
          lineHeight: 1,
          opacity: 0.92,
          textTransform: "uppercase",
        }}
      >
        by Love &amp; Kush
      </span>
    </div>
  );
}

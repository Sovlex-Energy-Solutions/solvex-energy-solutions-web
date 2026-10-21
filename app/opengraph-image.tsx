import { ImageResponse } from "next/og";

export const alt = "Solvex Energy Solutions - Tier-1 Solar Inverters, PCU & Franchise Ecosystem";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#0B0F17",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(5, 150, 105, 0.35) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Border Frame */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "24px",
            pointerEvents: "none",
          }}
        />

        {/* Top Header: Brand Name + Status Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.5)",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" fill="#FFFFFF" />
                <path
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }}>
                SOLVEX
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "3px",
                  color: "#34D399",
                }}
              >
                ENERGY SOLUTIONS
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(5, 150, 105, 0.2)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                backgroundColor: "#10B981",
              }}
            />
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#6EE7B7" }}>
              PM Surya Ghar Approved
            </span>
          </div>
        </div>

        {/* Center Content: Main Headline & Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "800",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Tier-1 B2B Solar Inverters, Industrial PCU &amp; Franchise Ecosystem
          </h1>
          <p
            style={{
              fontSize: "22px",
              fontWeight: "400",
              lineHeight: 1.45,
              color: "#94A3B8",
              margin: 0,
            }}
          >
            Direct manufacturing allocations, smart rMPPT hybrid units, and high-margin dealership territories across India.
          </p>
        </div>

        {/* Bottom Footer: Hardware Highlights & Official Contacts */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <span style={{ fontSize: "15px", color: "#E2E8F0", fontWeight: "500" }}>
              ⚡ 3kVA – 15kVA PCUs
            </span>
            <span style={{ fontSize: "15px", color: "#E2E8F0", fontWeight: "500" }}>
              ☀️ MNRE ALMM Certified
            </span>
            <span style={{ fontSize: "15px", color: "#E2E8F0", fontWeight: "500" }}>
              📍 Jaipur, Rajasthan
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              color: "#34D399",
              fontWeight: "600",
            }}
          >
            <span>solvexenergy.com</span>
            <span>•</span>
            <span>+91 91251 27755</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

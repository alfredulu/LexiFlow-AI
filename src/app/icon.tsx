import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderRadius: 128,

          // premium indigo gradient + subtle vignette
          background:
            "radial-gradient(120% 120% at 30% 20%, #6366F1 0%, #4F46E5 38%, #312E81 100%)",

          // soft outer shadow
          boxShadow:
            "0 20px 60px rgba(49, 46, 129, 0.50), 0 8px 24px rgba(15, 23, 42, 0.25)",
        }}
      >
        {/* highlight sheen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 128,
            background:
              "radial-gradient(80% 60% at 25% 20%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* glow behind bolt */}
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.20) 32%, rgba(255,255,255,0) 70%)",
            filter: "blur(14px)",
            opacity: 0.9,
          }}
        />

        {/* bolt */}
        <svg
          width="300"
          height="300"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "relative",
            // crisp bolt + subtle shadow
            filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.28))",
          }}
        >
          <path d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

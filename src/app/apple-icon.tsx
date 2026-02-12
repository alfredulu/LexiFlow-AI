import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 44,
          background:
            "radial-gradient(120% 120% at 30% 20%, #6366F1 0%, #4F46E5 40%, #312E81 100%)",
          boxShadow:
            "0 10px 30px rgba(49, 46, 129, 0.45), 0 6px 14px rgba(15, 23, 42, 0.22)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 44,
            background:
              "radial-gradient(80% 60% at 25% 20%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 70%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 110,
            height: 110,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 34%, rgba(255,255,255,0) 70%)",
            filter: "blur(8px)",
            opacity: 0.9,
          }}
        />

        <svg
          width="104"
          height="104"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "relative",
            filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.28))",
          }}
        >
          <path d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

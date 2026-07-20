import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 32,
          background: "#0c0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontWeight: 700,
          fontSize: 120,
          color: "#d4af37",
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}

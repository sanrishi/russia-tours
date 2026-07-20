import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "#0c0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontWeight: 700,
          fontSize: 22,
          color: "#d4af37",
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}

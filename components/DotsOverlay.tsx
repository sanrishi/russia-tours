export default function DotsOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, #d4af37 1.5px, transparent 1.5px)",
        backgroundSize: "20px 20px",
        opacity: 0.2,
      }}
    />
  )
}

// src/components/Navbar.jsx
function Navbar({ title, onlineCount = 0, total = 4 }) {
  const isOnline = onlineCount > 0;
  return (
    <div className="topbar">
      <span className="topbar-title">{title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: "0.75rem", color: "#475569" }}>
          {onlineCount}/{total} devices online
        </span>
        <span className={`status-dot ${isOnline ? "online" : "offline"}`}></span>
        <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
          {isOnline ? "Partially Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

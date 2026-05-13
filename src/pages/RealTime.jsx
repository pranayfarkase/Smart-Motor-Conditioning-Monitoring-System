// src/pages/RealTime.jsx
function RealTimePage() {
  const sensors = [
    { label: "Temperature", icon: "🌡️", color: "#f97316", unit: "°C"   },
    { label: "RPM Speed",   icon: "⚙️", color: "#3b82f6", unit: "rpm"  },
    { label: "Voltage",     icon: "⚡", color: "#a855f7", unit: "V"    },
    { label: "Vibration",   icon: "📳", color: "#ec4899", unit: "mm/s" },
  ];

  return (
    <section className="page-enter" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Status Banner */}
      <div className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px" }}>
        <span className="status-dot offline"></span>
        <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
          Real-time stream is <strong style={{ color: "#475569" }}>inactive</strong>. Connect your sensors to begin live monitoring.
        </span>
      </div>

      {/* Stream Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {sensors.map(s => (
          <div key={s.label} className="stream-card">

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
              <span style={{ fontWeight: 600, color: "#cbd5e1", fontSize: "0.9rem" }}>{s.label}</span>
              <span className="stream-live-badge" style={{ marginLeft: "auto", color: s.color }}>LIVE</span>
            </div>

            {/* Value */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 14 }}>
              <span style={{ fontSize: "2.4rem", fontWeight: 700, color: "#334155", lineHeight: 1 }}>--</span>
              <span style={{ fontSize: "0.85rem", color: "#475569", marginBottom: 4 }}>{s.unit} · waiting...</span>
            </div>

            {/* Empty chart area */}
            <div className="empty-chart" style={{ height: 110 }}>
              <span style={{ fontSize: "1.6rem" }}>📡</span>
              <span style={{ fontSize: "0.78rem" }}>No stream data</span>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14 }}>
              {["Min", "Max", "Avg"].map(stat => (
                <div key={stat} className="stat-mini">
                  <div className="stat-mini-label">{stat}</div>
                  <div className="stat-mini-value">--</div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

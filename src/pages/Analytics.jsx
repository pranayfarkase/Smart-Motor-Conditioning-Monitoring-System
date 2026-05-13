// src/pages/Analytics.jsx
function AnalyticsPage() {
  const [range, setRange] = React.useState("1H");
  const ranges = ["1H", "6H", "24H", "7D", "30D"];

  const stats = [
    { label: "Temperature", icon: "🌡️" },
    { label: "RPM Speed",   icon: "⚙️" },
    { label: "Voltage",     icon: "⚡" },
    { label: "Vibration",   icon: "📳" },
  ];

  return (
    <section className="page-enter" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Range Selector */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Select time range to view historical data</span>
        <div className="filter-tabs">
          {ranges.map(r => (
            <button key={r} className={`filter-tab ${range === r ? "active" : ""}`} onClick={() => setRange(r)}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {stats.map(s => (
          <div key={s.label} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span className="card-label">{s.label}</span>
              <span style={{ fontSize: "1.3rem" }}>{s.icon}</span>
            </div>
            {["Average", "Peak", "Lowest"].map(row => (
              <div key={row} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: "0.78rem", color: "#475569" }}>{row}</span>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>--</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <EmptyChart label="Sensor Overview Chart" height={220}/>

      {/* Two smaller charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <EmptyChart label="Temperature Trend" height={160}/>
        <EmptyChart label="Vibration Trend"   height={160}/>
      </div>

    </section>
  );
}

// src/pages/Alerts.jsx
function AlertsPage({ alerts, onDismiss }) {
  const [filter, setFilter] = React.useState("All");
  const filters = ["All", "Critical", "Warning", "Info"];

  const levelMap = { Critical: "critical", Warning: "warning", Info: "info" };

  const filtered = filter === "All" ? alerts : alerts.filter(a => a.level === filter);

  const counts = {
    Critical: alerts.filter(a => a.level === "Critical").length,
    Warning:  alerts.filter(a => a.level === "Warning").length,
    Info:     alerts.filter(a => a.level === "Info").length,
  };

  const summaryCards = [
    { label: "Critical Alerts", key: "Critical", color: "#f87171",  border: "rgba(239,68,68,0.25)",   icon: "🔴" },
    { label: "Warnings",        key: "Warning",  color: "#fde047",  border: "rgba(234,179,8,0.25)",   icon: "🟡" },
    { label: "Info",            key: "Info",     color: "#93c5fd",  border: "rgba(59,130,246,0.25)",  icon: "🔵" },
  ];

  return (
    <section className="page-enter" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {summaryCards.map(c => (
          <div key={c.label} className="card" style={{ borderColor: c.border }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, color: c.color, fontSize: "0.9rem" }}>{c.label}</span>
              <span style={{ fontSize: "1.2rem" }}>{c.icon}</span>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: counts[c.key] > 0 ? c.color : "#334155", marginTop: 10 }}>
              {counts[c.key]}
            </div>
          </div>
        ))}
      </div>

      {/* Alert Log */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontWeight: 600, color: "#f87171" }}>Alert Log</span>
          <div className="filter-tabs">
            {filters.map(f => (
              <button key={f} className={`filter-tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 0", gap: 10 }}>
            <span style={{ fontSize: "2.5rem" }}>✅</span>
            <span style={{ color: "#64748b", fontWeight: 500 }}>No alerts found</span>
            <span style={{ fontSize: "0.78rem", color: "#334155" }}>Alerts will appear here when sensors report issues</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map(a => (
              <div key={a.id} className={`alert-item ${levelMap[a.level]}`}>
                <div>
                  <div style={{ fontWeight: 500 }}>{a.msg}</div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: 3 }}>{a.time}</div>
                </div>
                <button className="dismiss-btn" onClick={() => onDismiss(a.id)}>Dismiss</button>
              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}

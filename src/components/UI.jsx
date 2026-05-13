// src/components/UI.jsx

function SensorCard({ label, unit, icon }) {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span className="card-label">{label}</span>
        <span style={{ fontSize: "1.4rem" }}>{icon}</span>
      </div>
      <div className="card-value no-data">
        --<span className="card-unit">{unit}</span>
      </div>
      <div className="card-sub">Awaiting data...</div>
    </div>
  );
}

function EmptyChart({ label, height = 180 }) {
  return (
    <div className="card">
      <div style={{ fontWeight: 600, color: "#cbd5e1", marginBottom: 12, fontSize: "0.9rem" }}>{label}</div>
      <div className="empty-chart" style={{ height }}>
        <span className="chart-icon">📡</span>
        <span>No data received yet</span>
        <span style={{ fontSize: "0.72rem", color: "#334155" }}>Connect your sensor to start streaming</span>
      </div>
    </div>
  );
}

function HealthGauge() {
  return (
    <div className="gauge-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="56" fill="none" stroke="#1e293b" strokeWidth="10"/>
        <text x="70" y="66" textAnchor="middle" fill="#334155" fontSize="18" fontWeight="700">--</text>
        <text x="70" y="84" textAnchor="middle" fill="#334155" fontSize="11">No Data</text>
      </svg>
      <span style={{ fontSize: "0.72rem", color: "#334155" }}>Awaiting sensor feed</span>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button className={`toggle ${value ? "on" : "off"}`} onClick={() => onChange(!value)}>
      <span className="toggle-knob"></span>
    </button>
  );
}

function DeviceList({ devices, onToggle }) {
  return (
    <div className="card" style={{ height: "100%" }}>
      <div style={{ fontWeight: 600, color: "#f1f5f9", marginBottom: 16 }}>Connected Devices</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {devices.map(d => (
          <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className={`status-dot ${d.online ? "online" : "offline"}`}></span>
              <span style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>{d.name}</span>
            </div>
            <button
              className={`btn ${d.online ? "btn-danger" : "btn-success"}`}
              style={{ padding: "4px 10px", fontSize: "0.72rem" }}
              onClick={() => onToggle(d.id)}
            >
              {d.online ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

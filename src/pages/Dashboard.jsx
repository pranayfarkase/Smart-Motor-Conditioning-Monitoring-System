// src/pages/Dashboard.jsx
function DashboardPage({ devices, onToggle }) {
  return (
    <section className="page-enter" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Sensor Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        <SensorCard label="Temperature" unit="°C"   icon="🌡️"/>
        <SensorCard label="RPM Speed"   unit="rpm"  icon="⚙️"/>
        <SensorCard label="Voltage"     unit="V"    icon="⚡"/>
        <SensorCard label="Vibration"   unit="mm/s" icon="📳"/>
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <EmptyChart label="Temperature Graph" height={180}/>
        <EmptyChart label="Vibration Graph"   height={180}/>
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

        {/* Motor Health */}
        <div className="card" style={{ minHeight: 200 }}>
          <div style={{ fontWeight: 600, color: "#f1f5f9", marginBottom: 8 }}>Motor Health</div>
          <HealthGauge/>
        </div>

        {/* Alerts Panel */}
        <div className="card" style={{ borderColor: "rgba(239,68,68,0.25)" }}>
          <div style={{ fontWeight: 600, color: "#f87171", marginBottom: 16 }}>Alerts</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 0", gap: 8 }}>
            <span style={{ fontSize: "1.8rem" }}>✅</span>
            <span style={{ fontSize: "0.82rem", color: "#475569" }}>No alerts at this time</span>
          </div>
        </div>

        {/* Devices */}
        <DeviceList devices={devices} onToggle={onToggle}/>
      </div>

    </section>
  );
}

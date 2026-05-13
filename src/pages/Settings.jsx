// src/pages/Settings.jsx
function SettingsPage() {
  const [interval,  setInterval]  = React.useState(2);
  const [notif,     setNotif]     = React.useState(true);
  const [autoRecon, setAutoRecon] = React.useState(true);
  const [endpoint,  setEndpoint]  = React.useState("");
  const [tempLimit, setTempLimit] = React.useState("");
  const [vibLimit,  setVibLimit]  = React.useState("");
  const [saved,     setSaved]     = React.useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="page-enter" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>

      {/* Connection */}
      <div className="section-card">
        <div className="section-title">🔌 Connection</div>

        <div className="settings-row" style={{ marginBottom: 16 }}>
          <div>
            <div className="settings-row-label">WebSocket Endpoint</div>
            <div className="settings-row-sub">Your IoT data source URL</div>
          </div>
          <input
            className="settings-input"
            style={{ width: 240 }}
            value={endpoint}
            onChange={e => setEndpoint(e.target.value)}
            placeholder="ws://your-iot-endpoint"
          />
        </div>

        <div className="settings-row" style={{ marginBottom: 16 }}>
          <div>
            <div className="settings-row-label">Auto Reconnect</div>
            <div className="settings-row-sub">Reconnect automatically on disconnect</div>
          </div>
          <Toggle value={autoRecon} onChange={setAutoRecon}/>
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-row-label">Update Interval</div>
            <div className="settings-row-sub">Refresh every {interval}s</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input type="range" min="1" max="10" value={interval} onChange={e => setInterval(+e.target.value)} style={{ width: 110 }}/>
            <span style={{ color: "#3b82f6", fontSize: "0.85rem", width: 24, textAlign: "center" }}>{interval}s</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="section-card">
        <div className="section-title">🔔 Notifications</div>

        <div className="settings-row" style={{ marginBottom: 16 }}>
          <div>
            <div className="settings-row-label">Alert Notifications</div>
            <div className="settings-row-sub">Show alerts when thresholds are exceeded</div>
          </div>
          <Toggle value={notif} onChange={setNotif}/>
        </div>

        <div className="settings-row" style={{ marginBottom: 16 }}>
          <div>
            <div className="settings-row-label">Temperature Threshold</div>
            <div className="settings-row-sub">Alert when temperature exceeds this value (°C)</div>
          </div>
          <input
            className="settings-input"
            style={{ width: 90 }}
            type="number"
            value={tempLimit}
            onChange={e => setTempLimit(e.target.value)}
            placeholder="e.g. 100"
          />
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-row-label">Vibration Threshold</div>
            <div className="settings-row-sub">Alert when vibration exceeds this value (mm/s)</div>
          </div>
          <input
            className="settings-input"
            style={{ width: 90 }}
            type="number"
            value={vibLimit}
            onChange={e => setVibLimit(e.target.value)}
            placeholder="e.g. 7"
          />
        </div>
      </div>

      {/* Save */}
      <button
        className={`btn ${saved ? "btn-success" : "btn-primary"}`}
        style={{ padding: "12px", fontSize: "0.9rem", borderRadius: 12, width: "100%" }}
        onClick={save}
      >
        {saved ? "✓ Settings Saved!" : "Save Settings"}
      </button>

    </section>
  );
}

// src/App.jsx
function App() {
  const [page, setPage]       = React.useState("Dashboard");
  const [alerts, setAlerts]   = React.useState([]);
  const [devices, setDevices] = React.useState([
    { id: 1, name: "Temperature Sensor", online: false },
    { id: 2, name: "Voltage Sensor",     online: false },
    { id: 3, name: "Vibration Sensor",   online: false },
    { id: 4, name: "RPM Sensor",         online: false },
  ]);

  // Global navigation hook used by Sidebar
  window.__navigate = setPage;

  const onlineCount = devices.filter(d => d.online).length;
  const dismissAlert = id => setAlerts(a => a.filter(x => x.id !== id));
  const toggleDevice = id => setDevices(d => d.map(x => x.id === id ? { ...x, online: !x.online } : x));

  const PAGE_TITLES = {
    Dashboard: "Dashboard",
    RealTime:  "Real-Time Monitor",
    Analytics: "Analytics",
    Alerts:    "Alerts",
    Settings:  "Settings",
  };

  const renderPage = () => {
    switch (page) {
      case "RealTime":  return <RealTimePage/>;
      case "Analytics": return <AnalyticsPage/>;
      case "Alerts":    return <AlertsPage alerts={alerts} onDismiss={dismissAlert}/>;
      case "Settings":  return <SettingsPage/>;
      default:          return <DashboardPage devices={devices} onToggle={toggleDevice}/>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#020617" }}>
      <Sidebar active={page}/>
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Navbar title={PAGE_TITLES[page]} onlineCount={onlineCount} total={devices.length}/>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);

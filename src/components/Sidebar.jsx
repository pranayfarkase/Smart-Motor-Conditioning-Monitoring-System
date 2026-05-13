// src/components/Sidebar.jsx
function Sidebar({ active }) {
  const pages = [
    { label: "Dashboard", icon: "🏠", page: "Dashboard" },
    { label: "Real-Time", icon: "📡", page: "RealTime"  },
    { label: "Analytics", icon: "📊", page: "Analytics" },
    { label: "Alerts",    icon: "🔔", page: "Alerts"    },
    { label: "Settings",  icon: "⚙️", page: "Settings"  },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">SMARTMOTOR</div>
      <nav style={{ flex: 1 }}>
        {pages.map(p => (
          <a
            key={p.label}
            href="#"
            className={`nav-item ${active === p.page ? "active" : ""}`}
            onClick={e => { e.preventDefault(); window.__navigate(p.page); }}
          >
            <span className="nav-icon">{p.icon}</span>
            {p.label}
          </a>
        ))}
      </nav>
      <div style={{ fontSize: "0.72rem", color: "#334155" }}>v1.0.0 · Awaiting Connection</div>
    </aside>
  );
}

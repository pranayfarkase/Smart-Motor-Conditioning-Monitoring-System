# SmartMotor IoT Dashboard

A frontend-only IoT Real-Time Dashboard built with **React** (CDN) and **Tailwind CSS** + custom **CSS**.

## Project Structure

```
Project/
├── index.html                  ← Single entry point (open this in browser)
├── src/
│   ├── App.jsx                 ← Root app, page routing, shared state
│   ├── styles/
│   │   └── styles.css          ← Custom CSS (sidebar, cards, buttons, animations)
│   ├── components/
│   │   ├── Sidebar.jsx         ← Navigation sidebar
│   │   ├── Navbar.jsx          ← Top bar with device status
│   │   └── UI.jsx              ← SensorCard, EmptyChart, HealthGauge, Toggle, DeviceList
│   └── pages/
│       ├── Dashboard.jsx       ← Overview: sensor cards, charts, motor health, devices
│       ├── RealTime.jsx        ← Live stream cards with min/max/avg slots
│       ├── Analytics.jsx       ← Time range selector, stat cards, chart placeholders
│       ├── Alerts.jsx          ← Filter tabs, summary counts, alert log
│       └── Settings.jsx        ← Connection, thresholds, notifications config
```

## Pages

| Page | Description |
|------|-------------|
| Dashboard | Sensor cards, empty charts, motor health gauge, device list |
| Real-Time | 4 stream cards (Temp, RPM, Voltage, Vibration) with Min/Max/Avg |
| Analytics | Time range buttons (1H/6H/24H/7D/30D), stat summaries, chart areas |
| Alerts | Critical/Warning/Info filter tabs, summary count cards, dismissable log |
| Settings | WebSocket endpoint, thresholds, update interval, notification toggle |

## How to Run

Just open `index.html` in any modern browser — no build step required.

## Tech Stack

- React 18 (CDN via unpkg)
- Tailwind CSS (CDN)
- Babel Standalone (JSX transpilation)
- Custom CSS (`src/styles/styles.css`)

## Notes

- No fake/simulated data — all sensor values show `--` awaiting real data
- Ready to connect to a real WebSocket or REST API data source
- PR must not be merged without explicit confirmation

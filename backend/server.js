import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATASET_PATH = path.join(__dirname, "../frontend/src/data/motor_dataset.json");

// Middleware
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Mock/Fallback Data in case Firestore/JSON is not used directly
let mockMotors = [
  {
    id: "MTR-P01",
    name: "Main Induction Motor MTR-P01",
    model: "MTR-P01",
    hp: "30 HP",
    voltageRating: "230V",
    currentRating: "26A",
    phase: "3-Phase AC",
    rpm: 1450,
    temperature: 32,
    vibration: 190,
    voltage: 228,
    current: 2.15,
    healthScore: 94,
    status: "Healthy",
    location: "Production Section - Line A",
    installDate: "2026-03-20"
  },
  {
    id: "motor_1",
    name: "Centrifugal Pump Motor",
    model: "CP-XM15",
    hp: "15 HP",
    voltageRating: "415V",
    currentRating: "21A",
    phase: "3-Phase AC",
    rpm: 1450,
    temperature: 32,
    vibration: 0.8,
    voltage: 412,
    current: 14.5,
    healthScore: 98,
    status: "Healthy",
    location: "Main Pump House - Floor 1",
    installDate: "2024-03-12"
  }
];

let mockTickets = [
  {
    id: "ticket_mtr_p01_1",
    motorId: "MTR-P01",
    motorName: "Main Induction Motor MTR-P01",
    severity: "Warning",
    issueType: "Bearing Wear",
    description: "Automatic alert: High vibration telemetry readings indicate potential bearing wear. (Vibration: 2150 mg).",
    status: "PENDING",
    reportedBy: "AI Rule Engine",
    createdAt: new Date().toISOString()
  }
];

let mockLogs = [
  {
    timestamp: new Date().toLocaleTimeString(),
    message: "Express backend successfully initialized and running.",
    type: "success"
  }
];

// --- API ENDPOINTS ---

// 1. Status Check
app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    message: "Smart Motor System API Server is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// 2. Fetch Downsampled Excel Telemetry Dataset
app.get("/api/dataset", async (req, res) => {
  try {
    const data = await fs.readFile(DATASET_PATH, "utf-8");
    const dataset = JSON.parse(data);
    res.json({
      success: true,
      count: dataset.length,
      data: dataset
    });
  } catch (error) {
    console.error("Error reading motor dataset file:", error.message);
    res.status(404).json({
      success: false,
      message: "Motor condition telemetry dataset JSON file not found. Please run the data extraction script first.",
      error: error.message
    });
  }
});

// 3. Motors API
app.get("/api/motors", (req, res) => {
  res.json(mockMotors);
});

app.get("/api/motors/:id", (req, res) => {
  const motor = mockMotors.find(m => m.id === req.params.id);
  if (!motor) return res.status(404).json({ message: "Motor not found" });
  res.json(motor);
});

app.put("/api/motors/:id", (req, res) => {
  const index = mockMotors.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Motor not found" });

  mockMotors[index] = { ...mockMotors[index], ...req.body };
  
  // Basic health recalibration logic
  const motor = mockMotors[index];
  let status = "Healthy";
  let healthScore = 100;
  
  if (motor.temperature > 85 || motor.vibration > 3.0) {
    status = "Critical";
    healthScore = 50;
  } else if (motor.temperature > 75 || motor.vibration > 2.0) {
    status = "Warning";
    healthScore = 75;
  }
  
  mockMotors[index].status = status;
  mockMotors[index].healthScore = healthScore;
  
  res.json(mockMotors[index]);
});

// 4. Tickets API
app.get("/api/tickets", (req, res) => {
  res.json(mockTickets);
});

app.post("/api/tickets", (req, res) => {
  const newTicket = {
    id: "ticket_" + Math.random().toString(36).substring(2, 9),
    status: "PENDING",
    reportedAt: new Date().toISOString(),
    imageUrl: "",
    voiceUrl: "",
    assignedEngineer: "",
    assignedAt: "",
    repairedAt: "",
    repairReport: "",
    closedBy: "",
    closedAt: "",
    ...req.body
  };
  mockTickets.push(newTicket);
  res.status(201).json(newTicket);
});

// 5. System Logs API
app.get("/api/logs", (req, res) => {
  res.json(mockLogs);
});

app.post("/api/logs", (req, res) => {
  const log = {
    timestamp: new Date().toLocaleTimeString(),
    message: req.body.message,
    type: req.body.type || "info"
  };
  mockLogs.unshift(log); // Add to beginning of logs
  res.status(201).json(log);
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`⚡ Express Server is running on port ${PORT}`);
  console.log(`📂 Serves telemetry dataset from: ${DATASET_PATH}`);
  console.log(`🟢 Status Endpoint: http://localhost:${PORT}/api/status`);
  console.log(`=================================================`);
});

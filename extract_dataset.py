import pandas as pd
import json
import os

def process_dataset():
    excel_path = 'Motor_Condition_Monitoring_Dataset.xlsx'
    if not os.path.exists(excel_path):
        print(f"Error: {excel_path} not found.")
        return

    print("Reading spreadsheet...")
    df = pd.read_excel(excel_path)

    # Downsample baseline points to keep it lightweight (every 60th point)
    df_baseline = df.iloc[::60]
    
    # Extract all rows where a fault occurred to show actual alert spikes
    df_faults = df[df['fault_detected'] == 'Yes']

    # Combine, drop duplicates, and sort chronologically
    df_combined = pd.concat([df_baseline, df_faults]).drop_duplicates().sort_values(by='timestamp')

    print(f"Downsampled dataset size: {len(df_combined)} rows (from 10,000)")

    data_list = []
    for idx, r in df_combined.iterrows():
        # Handle nan values for fault type
        fault_type = str(r['fault_type']) if pd.notna(r['fault_type']) else "None"
        alert_level = str(r['alert_level']) if pd.notna(r['alert_level']) else "Normal"
        
        data_list.append({
            "recordId": int(r['record_id']),
            "timestamp": str(r['timestamp']),
            "motorId": str(r['motor_id']),
            "operatingState": str(r['operating_state']),
            "ambientTemp": float(r['ambient_temperature_c']),
            "humidity": float(r['humidity_percent']),
            "motorTemp": float(r['motor_temperature_c']),
            "vibration": float(r['vibration_mg']),
            "vibrationStatus": str(r['vibration_status']),
            "voltage": float(r['voltage_v']),
            "current": float(r['current_a']),
            "power": float(r['power_w']),
            "powerKw": float(r['power_kw']),
            "energyKwh": float(r['energy_kwh']),
            "frequency": float(r['frequency_hz']),
            "powerFactor": float(r['power_factor']),
            "loadPercent": float(r['load_percent']),
            "healthScore": float(r['motor_health_score']),
            "faultDetected": str(r['fault_detected']),
            "faultType": fault_type,
            "alertLevel": alert_level,
            "maintenanceRequired": str(r['maintenance_required']),
            "wifiRssi": float(r['wifi_rssi_dbm']),
            "commStatus": str(r['comm_status']),
            "systemUptime": float(r['system_uptime_hr'])
        })

    # Ensure target directory exists
    os.makedirs('frontend/src/data', exist_ok=True)

    # Write as a JSON resource
    output_path = 'frontend/src/data/motor_dataset.json'
    with open(output_path, 'w') as f:
        json.dump(data_list, f, indent=2)

    print(f"JSON dataset created successfully at: {output_path}")

if __name__ == "__main__":
    process_dataset()

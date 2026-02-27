# Smartpick-ML Project

## Overview
Smartpick-ML is a multi-component project designed for intelligent item detection, tracking, and management. It integrates machine learning, image processing, and web technologies to provide a comprehensive solution for real-time monitoring and record management.

## Project Structure
- **db1, db1copy, db/**: Database-related files and folders.
- **felix.py, main.py, test1.py, test2.py**: Python scripts for data processing and ML tasks.
- **Frontend/**: React + TypeScript web application for dashboard, record management, and live status monitoring.
- **WifiCam/**: Arduino/ESP32 code for camera integration and image capture.
- **assets/data/img/**: Image assets for child and parent categories.
- **routes/**: API endpoints for backend communication.
- **my_env/**: Python virtual environment for dependency management.

## Features
- Real-time item detection and live streaming.
- Dashboard for monitoring and managing records.
- Image upload and categorization.
- RESTful APIs for data access and manipulation.
- Integration with WiFi camera hardware.

## Setup Instructions
### Python Backend
1. Activate the virtual environment:
   ```powershell
   & "my_env/Scripts/Activate.ps1"
   ```
2. Install required packages:
   ```powershell
   pip install -r requirements.txt
   ```
3. Run backend scripts as needed:
   ```powershell
   python main.py
   ```

### Frontend
1. Navigate to the Frontend directory:
   ```powershell
   cd Frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```

### WifiCam
- Upload `WifiCam.ino` to your ESP32/Arduino device using the Arduino IDE.

## Folder Details
- **Frontend/src/pages/**: Main dashboard and record management pages.
- **Frontend/src/assets/**: Image assets for child and parent categories.
- **routes/apis/**: API scripts for detected data and records.
- **WifiCam/**: Camera integration code and documentation.

## Data
- **assets/data/Detected.csv, detectedData.csv**: CSV files containing detected item data.

## License
This project is licensed under the MIT License.

## Authors
- Kashif
- NMIMS Team

## Contact
For questions or support, please contact the project maintainers.

# 🌍 Aiye - Planetary Operating Room

**Complete Frontend Integration**

## 🎯 Overview

Aiye transforms climate data into visceral empathy by representing Earth as a living organism. This integration connects the 3D anatomical visualization with real-time environmental diagnostics, verified impact tracking, and funding mechanisms.

## 🚀 Features Integrated

### ✅ Core Systems

1. **Real-time Diagnostics**
   - Fetches live environmental data via Gemini AI
   - Updates organ health scores and visual states
   - Displays inflammation for deforestation, acidification, and pollution

2. **Dynamic Visual States**
   - **INFLAMED**: Red pulsing shaders for critical damage
   - **HEALING**: Orange/yellow gradients for recovery
   - **HEALTHY**: Green/blue for stable ecosystems

3. **Vial System (Payments)**
   - Initialize donations via Flutterwave
   - Track funding progress per organ
   - Real-time funding percentage updates

4. **Proof of Impact (PoI)**
   - Upload restoration images
   - Gemini Vision AI verification
   - Automatic organ state updates on verification

5. **Quota Management**
   - Display API usage limits
   - Fallback diagnostics when quota exceeded
   - Real-time quota status monitoring

## 📁 File Structure

```
man/
├── index.html              # Main 3D visualization
├── aiye-api.js            # Backend API service layer
├── aiye-system.js         # Integration controller
├── aiye-ui.js             # UI components & modals
├── organ-visuals.js       # Dynamic shader materials
├── FRONTEND_INTEGRATION.md # API documentation
├── man.glb                # Human body model
├── lungs.glb              # Lungs organ model
└── veins.glb              # Veins/circulatory model
```

## 🔧 Setup

### 1. Prerequisites

- Modern web browser with WebGL support
- Local web server (for CORS)

### 2. Run Locally

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

### 3. Open Application

Navigate to: `http://localhost:8000`

## 🎮 Usage Guide

### Viewing Organ Status

1. **Right Panel**: Shows all organs with health scores
2. **Color Coding**:
   - 🔴 Red border = INFLAMED (critical)
   - 🟠 Orange border = HEALING (recovering)
   - 🟢 Green border = HEALTHY (stable)

### Running Diagnostics

1. Click **"🔬 Diagnose All Organs"** button
2. System fetches real-time environmental data
3. Gemini AI analyzes and updates organ states
4. Visual shaders update automatically

### Applying Vials (Donations)

1. Click on an organ card to select it
2. Click **"💰 Apply Vial (Donate)"**
3. Enter amount, email, and name
4. Click **"Process Payment"**
5. Complete payment on Flutterwave
6. Funding updates automatically

### Verifying Impact

1. Select an organ
2. Click **"📸 Verify Impact"**
3. Upload restoration image (drag & drop or click)
4. Add NGO name and description (optional)
5. Click **"Submit Verification"**
6. Gemini Vision AI analyzes the image
7. Organ state updates based on verification result

## 🎨 Visual Mapping

### Organ Types & Environmental Data

| Organ | Ecosystem | Data Source | Inflammation Trigger |
|-------|-----------|-------------|---------------------|
| **Lungs** | Amazon Rainforest | NASA EONET | Deforestation alerts |
| **Veins** | Ocean Currents | Copernicus Marine | pH drops (acidification) |
| **Skin** | Atmosphere/Soil | Air Quality APIs | Pollution levels |

### Shader Effects

#### Lungs (Deforestation)
- **Healthy**: Soft pink glow, gentle breathing animation
- **Inflamed**: Red pulsing, erratic movement, damage patterns
- **Healing**: Orange gradients, stabilizing rhythm

#### Veins (Acidification)
- **Healthy**: Blue flowing patterns, smooth circulation
- **Inflamed**: Red corrosive effects, turbulent flow
- **Healing**: Purple-blue mix, normalizing flow

#### Skin (Pollution)
- **Healthy**: Clean blue-white surface, subtle grid
- **Inflamed**: Brown pollution patches, rough texture
- **Healing**: Clearing patches, smoother surface

## 🔌 API Integration

### Backend URL
```javascript
https://aiye-backend-gemini-hackathon.onrender.com
```

### Key Endpoints Used

```javascript
// Get all organs
GET /api/organs

// Diagnose specific organ
POST /api/organs/:id/diagnose

// Diagnose all organs
POST /api/organs/diagnose-all

// Initialize payment
POST /api/vials/initialize

// Verify restoration
POST /api/verify

// Check quota
GET /api/organs/quota-status
```

## 🧠 Technical Details

### State Management

```javascript
// Organ data structure
{
  id: "65f1234...",
  name: "Amazon Lungs",
  type: "Lungs",
  healthScore: 35,           // 0-100
  symptomState: "INFLAMED",  // HEALTHY | INFLAMED | HEALING
  currentFundingUSD: 12500,
  targetFundingUSD: 500000,
  fundingPercentage: 2.5,
  diagnosis: "Critical deforestation...",
  lastMetricValue: { ... }
}
```

### Material System

Each organ type has custom shaders that respond to:
- `healthScore`: Controls color mixing and damage patterns
- `symptomState`: Triggers specific visual effects
- `time`: Animates pulsing, flowing, and breathing

### Auto-Update

System automatically refreshes every 5 minutes:
- Fetches latest organ data
- Updates visual states
- Refreshes quota status

## 🎯 User Flow

### 1. Physician Arrives
```
→ 3D body loads with current organ states
→ Diagnostic panel shows health scores
→ Visual inflammation visible on affected organs
```

### 2. Diagnosis
```
→ Click "Diagnose All Organs"
→ Backend fetches real-time environmental data
→ Gemini AI analyzes and generates medical diagnosis
→ Organs update with new health scores and states
```

### 3. Prescription (Vial)
```
→ Select inflamed organ
→ Click "Apply Vial"
→ Enter donation amount
→ Process payment via Flutterwave
→ Funding progress updates
```

### 4. Verification (Surgery)
```
→ NGO uploads restoration photo
→ Gemini Vision AI verifies impact
→ Organ state changes: INFLAMED → HEALING → HEALTHY
→ Visual shaders update to show recovery
```

## 🔐 Security Notes

- All API calls use HTTPS
- Payment processing via Flutterwave (PCI compliant)
- Image verification uses Gemini's content safety filters
- No sensitive data stored in frontend

## 🐛 Troubleshooting

### Backend Connection Failed
- Check internet connection
- Verify backend URL is accessible
- Check browser console for CORS errors

### Quota Exceeded
- System automatically uses fallback diagnostics
- Quota resets daily
- Check quota status in UI panel

### Payment Not Processing
- Verify Flutterwave integration is active
- Check email format is valid
- Ensure amount is greater than 0

### Verification Failed
- Image must be < 50MB
- Supported formats: JPEG, PNG, WebP
- Ensure image shows clear restoration evidence

## 📊 Performance

- **Initial Load**: ~2-3 seconds (3D models)
- **Diagnostic Scan**: ~5-10 seconds (Gemini AI)
- **Verification**: ~8-15 seconds (Vision AI)
- **Auto-Update**: Every 5 minutes (configurable)

## 🚀 Future Enhancements

- [ ] WebSocket for real-time updates
- [ ] Historical health score graphs
- [ ] Multi-language support
- [ ] VR/AR mode for immersive experience
- [ ] Corporate dashboard for ESG reporting
- [ ] Blockchain integration for impact certificates

## 📝 License

Proprietary - Aiye Planetary Operating Room

## 🤝 Support

For technical issues or integration questions:
- Check `FRONTEND_INTEGRATION.md` for API details
- Review browser console for error messages
- Verify backend health: `GET /health`

---

**Built with ❤️ for Planet Earth**

*"The Earth isn't a collection of data points; it's a living organism in a state of trauma."*

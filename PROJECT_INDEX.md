# 🌍 AIYE PROJECT - FILE INDEX

## 📂 Project Structure

```
man/
│
├── 🌐 MAIN APPLICATION
│   └── index.html                    # Main 3D visualization (ENTRY POINT)
│
├── 🔧 CORE SYSTEM FILES
│   ├── aiye-api.js                   # Backend API service layer
│   ├── aiye-system.js                # Integration controller
│   ├── aiye-ui.js                    # UI components & modals
│   ├── organ-visuals.js              # Dynamic shader materials
│   ├── aiye-config.js                # Configuration system
│   └── aiye-tests.js                 # Test suite
│
├── 🎨 3D MODELS
│   ├── man.glb                       # Human body model (base)
│   ├── lungs.glb                     # Lungs organ model
│   └── veins.glb                     # Veins/circulatory model
│
└── 📚 DOCUMENTATION
    ├── README.md                     # Complete integration guide
    ├── QUICKSTART.md                 # 5-minute testing guide
    ├── INTEGRATION_SUMMARY.md        # Complete feature summary
    └── FRONTEND_INTEGRATION.md       # API documentation
```

---

## 📄 FILE DESCRIPTIONS

### 🌐 Main Application

#### `index.html` (ENTRY POINT)
- **Purpose**: Main 3D visualization with Aiye integration
- **Size**: ~15KB
- **Dependencies**: Three.js (CDN), all Aiye modules
- **Features**:
  - 3D human body rendering
  - Organ model loading (lungs, veins, skin)
  - Aiye system initialization
  - Animation loop with shader updates
  - Responsive camera controls

**How to run**: Open in browser via local server

---

### 🔧 Core System Files

#### `aiye-api.js`
- **Purpose**: Backend communication layer
- **Size**: ~3KB
- **Exports**: `AiyeAPI` (default)
- **Methods**:
  - `healthCheck()` - Check backend status
  - `getAllOrgans()` - Fetch all organs
  - `getOrgan(id)` - Fetch single organ
  - `diagnoseOrgan(id)` - Run diagnostic on organ
  - `diagnoseAllOrgans()` - Run full diagnostic scan
  - `getQuotaStatus()` - Check API quota
  - `initializePayment()` - Start payment flow
  - `getVialsByOrgan(id)` - Get donation history
  - `verifyRestoration()` - Submit proof of impact
  - `fileToBase64()` - Convert image to base64

**Usage**:
```javascript
import AiyeAPI from './aiye-api.js';
await AiyeAPI.getAllOrgans();
```

---

#### `aiye-system.js`
- **Purpose**: Main integration controller
- **Size**: ~8KB
- **Exports**: `AiyeSystem` (class)
- **Features**:
  - System initialization
  - Organ data management
  - Visual state synchronization
  - Event handling
  - Payment processing
  - Image verification
  - Auto-update system (5 min)
  - Animation loop integration

**Usage**:
```javascript
import { AiyeSystem } from './aiye-system.js';
const aiyeSystem = new AiyeSystem(scene, organModels);
```

---

#### `aiye-ui.js`
- **Purpose**: User interface components
- **Size**: ~6KB
- **Exports**: `AiyeUI` (class)
- **Components**:
  - Organ status panel (right side)
  - Action panel (bottom right)
  - Payment modal
  - Verification modal
  - Notification system
  - File upload (drag & drop)

**Features**:
- Responsive design
- Animated transitions
- Color-coded status badges
- Health bars with animations
- Modal system

---

#### `organ-visuals.js`
- **Purpose**: Dynamic shader materials
- **Size**: ~7KB
- **Exports**: `OrganVisualState` (class)
- **Shaders**:
  - **Lungs Material**: Breathing, inflammation, damage patterns
  - **Veins Material**: Flow, acidification, corrosion
  - **Skin Material**: Pollution patches, grid overlay

**States**:
- `HEALTHY` - Green/blue, smooth animations
- `INFLAMED` - Red, pulsing, erratic
- `HEALING` - Orange/yellow, stabilizing

**Usage**:
```javascript
import { OrganVisualState } from './organ-visuals.js';
const material = OrganVisualState.createMaterial('Lungs', 'INFLAMED', 35);
```

---

#### `aiye-config.js`
- **Purpose**: Configuration system
- **Size**: ~4KB
- **Exports**: `AiyeConfig` (default), `AiyeHelpers`
- **Settings**:
  - API endpoints
  - Auto-update intervals
  - Visual effect parameters
  - Color schemes
  - UI positioning
  - Payment defaults
  - Verification limits
  - Health thresholds

**Usage**:
```javascript
import AiyeConfig from './aiye-config.js';
console.log(AiyeConfig.api.baseURL);
```

---

#### `aiye-tests.js`
- **Purpose**: Test suite for validation
- **Size**: ~5KB
- **Exports**: `AiyeTestSuite`, `ManualTests`, `quickValidate`
- **Tests**:
  - Backend connection
  - Organ loading
  - Quota status
  - Organ selection
  - Visual updates

**Usage** (in browser console):
```javascript
quickValidate();
new AiyeTestSuite(aiyeSystem).runAllTests();
ManualTests.testPaymentModal();
```

---

### 🎨 3D Models

#### `man.glb`
- **Purpose**: Base human body model
- **Format**: GLTF Binary
- **Size**: ~2-3MB
- **Usage**: Main body structure (represents Earth's "skin")

#### `lungs.glb`
- **Purpose**: Lungs organ model
- **Format**: GLTF Binary
- **Size**: ~500KB-1MB
- **Mapping**: Amazon Rainforest (deforestation)

#### `veins.glb`
- **Purpose**: Circulatory system model
- **Format**: GLTF Binary
- **Size**: ~500KB-1MB
- **Mapping**: Ocean currents (acidification)

---

### 📚 Documentation

#### `README.md`
- **Purpose**: Complete integration guide
- **Sections**:
  - Overview
  - Features
  - Setup instructions
  - Usage guide
  - Visual mapping
  - API integration
  - Technical details
  - Troubleshooting

#### `QUICKSTART.md`
- **Purpose**: 5-minute testing guide
- **Sections**:
  - Immediate testing steps
  - Expected results
  - Visual effects guide
  - Quick troubleshooting
  - Test data samples

#### `INTEGRATION_SUMMARY.md`
- **Purpose**: Complete feature summary
- **Sections**:
  - Delivered components
  - Feature mapping
  - Data flow diagrams
  - User interactions
  - Performance metrics
  - Deployment checklist

#### `FRONTEND_INTEGRATION.md`
- **Purpose**: API documentation
- **Sections**:
  - Base URL & environment
  - API endpoints
  - Request/response schemas
  - Error handling
  - Code examples

---

## 🚀 QUICK START

### 1. Start Server
```bash
python -m http.server 8000
```

### 2. Open Browser
```
http://localhost:8000
```

### 3. Validate System
Open browser console and run:
```javascript
quickValidate()
```

---

## 📊 FILE DEPENDENCIES

```
index.html
  ├── three.js (CDN)
  ├── aiye-system.js
  │   ├── aiye-api.js
  │   ├── aiye-ui.js
  │   └── organ-visuals.js
  └── aiye-tests.js

aiye-system.js
  ├── aiye-api.js
  ├── aiye-ui.js
  └── organ-visuals.js

All modules are ES6 modules (import/export)
```

---

## 🎯 ENTRY POINTS

### For Users
- **Start here**: `index.html`
- **Read first**: `QUICKSTART.md`

### For Developers
- **Main code**: `aiye-system.js`
- **API layer**: `aiye-api.js`
- **Visuals**: `organ-visuals.js`
- **Config**: `aiye-config.js`

### For Testing
- **Quick check**: Run `quickValidate()` in console
- **Full test**: `new AiyeTestSuite(aiyeSystem).runAllTests()`
- **Manual tests**: `ManualTests.*`

---

## 📦 TOTAL PROJECT SIZE

- **Code**: ~35KB (minified: ~15KB)
- **Models**: ~5MB
- **Documentation**: ~50KB
- **Total**: ~5.1MB

---

## 🔗 EXTERNAL DEPENDENCIES

### Runtime
- **Three.js**: v0.160.0 (CDN)
- **GLTFLoader**: Three.js addon (CDN)
- **OrbitControls**: Three.js addon (CDN)

### Backend
- **Aiye Backend**: https://aiye-backend-gemini-hackathon.onrender.com
- **Gemini AI**: Google's Gemini 3 (via backend)
- **Flutterwave**: Payment processing (via backend)

---

## ✅ INTEGRATION CHECKLIST

- [x] All core files created
- [x] All features implemented
- [x] Documentation complete
- [x] Test suite included
- [x] Configuration system
- [x] Error handling
- [x] Loading states
- [x] Responsive design
- [x] Performance optimized

---

## 🎉 STATUS: PRODUCTION READY

All files are complete and tested. The system is ready for deployment.

**Next Steps**:
1. Test locally using QUICKSTART.md
2. Customize using aiye-config.js
3. Deploy to production server
4. Monitor performance and quota usage

---

**Last Updated**: 2026-02-03
**Version**: 1.0.0
**Status**: ✅ Complete

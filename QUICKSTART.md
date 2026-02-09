# 🚀 Quick Start Guide - Aiye Integration

## Immediate Testing (5 Minutes)

### Step 1: Start Local Server
```bash
# Choose one:
python -m http.server 8000
# OR
npx http-server -p 8000
```

### Step 2: Open Browser
```
http://localhost:8000
```

### Step 3: Test Features

#### ✅ Test 1: View Organ Status (Instant)
1. Look at right panel - see all organs
2. Check health scores and funding progress
3. Observe color-coded states (red/orange/green)

#### ✅ Test 2: Run Diagnostics (~10 seconds)
1. Click **"🔬 Diagnose All Organs"** button
2. Wait for Gemini AI analysis
3. Watch organs update with new states
4. See visual shaders change in 3D view

#### ✅ Test 3: Select Organ (Instant)
1. Click any organ card in right panel
2. Organ highlights in 3D view
3. Action buttons activate in bottom panel
4. See detailed organ info

#### ✅ Test 4: Payment Flow (~30 seconds)
1. Select an organ
2. Click **"💰 Apply Vial (Donate)"**
3. Enter test data:
   - Amount: 100
   - Email: test@example.com
   - Name: Test User
4. Click **"Process Payment"**
5. Payment window opens (Flutterwave)

#### ✅ Test 5: Image Verification (~15 seconds)
1. Select an organ
2. Click **"📸 Verify Impact"**
3. Upload any nature/restoration image
4. Add optional NGO name and description
5. Click **"Submit Verification"**
6. Wait for Gemini Vision AI analysis
7. See verification result and organ state update

## 🎯 Expected Results

### Initial Load
- 3D human body appears (blue hologram)
- Lungs visible (pink/red)
- Veins visible (red/blue flow)
- Right panel shows 3 organs
- Quota status displays

### After Diagnosis
- Health scores update
- Organ states change (HEALTHY/INFLAMED/HEALING)
- Visual shaders update:
  - Inflamed organs pulse red
  - Healing organs glow orange
  - Healthy organs show green/blue
- Diagnosis text appears in organ cards

### After Payment
- Funding amount increases
- Funding percentage updates
- Payment confirmation notification

### After Verification
- Verification result shows confidence score
- Organ state may change (INFLAMED → HEALING)
- Visual shader updates to new state
- Success notification appears

## 🔍 What to Look For

### Visual Effects

#### Lungs (Deforestation)
- **INFLAMED**: Red pulsing, erratic breathing
- **HEALING**: Orange glow, stabilizing
- **HEALTHY**: Pink/green, smooth breathing

#### Veins (Ocean Acidification)
- **INFLAMED**: Red corrosive patterns, turbulent
- **HEALING**: Purple-blue mix, normalizing
- **HEALTHY**: Blue flow, smooth circulation

#### Skin (Air/Soil Quality)
- **INFLAMED**: Brown pollution patches
- **HEALING**: Clearing patches
- **HEALTHY**: Clean blue-white surface

### UI Interactions

1. **Organ Cards**: Click to select, hover for highlight
2. **Health Bars**: Animate on update
3. **Status Badges**: Color-coded (red/orange/green)
4. **Modals**: Smooth fade in/out
5. **Notifications**: Slide down from top

## 🐛 Quick Troubleshooting

### Issue: "Backend connection failed"
**Fix**: Backend may be cold-starting (Render free tier)
- Wait 30 seconds and refresh
- Check: https://aiye-backend-gemini-hackathon.onrender.com/health

### Issue: "Quota exceeded"
**Fix**: Daily Gemini API limit reached
- System uses fallback diagnostics
- Resets at midnight UTC
- Check quota status in UI

### Issue: 3D models not loading
**Fix**: CORS or file path issue
- Ensure running from local server (not file://)
- Check browser console for errors
- Verify .glb files exist in directory

### Issue: Payment window doesn't open
**Fix**: Popup blocker
- Allow popups for localhost
- Check browser console for errors

## 📊 Test Data

### Sample Organ IDs (from backend)
```javascript
// Use these if you need to test API directly
const organIds = {
  lungs: "65f1234567890abcdef12345",
  veins: "65f1234567890abcdef12346", 
  skin: "65f1234567890abcdef12347"
};
```

### Sample Payment Data
```javascript
{
  amount: 100,
  email: "test@example.com",
  name: "Test Physician",
  currency: "USD"
}
```

### Sample Verification Data
```javascript
{
  ngoName: "Green Earth Initiative",
  description: "Reforestation project in Amazon region"
}
```

## 🎮 Advanced Testing

### Test Auto-Update
1. Open browser console
2. Wait 5 minutes
3. Look for: "🔄 Auto-update complete"
4. Verify organ data refreshes

### Test Quota Management
1. Run diagnostics multiple times
2. Watch quota counter decrease
3. When quota low, see warning message
4. System switches to fallback mode

### Test Visual Animations
1. Select different organs
2. Watch 3D models scale/highlight
3. Observe shader animations (pulsing, flowing)
4. Check time-based effects

### Test Error Handling
1. Disconnect internet
2. Try running diagnostics
3. See error notification
4. Reconnect and retry

## 📝 Console Commands

Open browser console and try:

```javascript
// Check Aiye system status
console.log(aiyeSystem);

// Get current organs
console.log(aiyeSystem.organs);

// Check selected organ
console.log(aiyeSystem.selectedOrgan);

// Manual organ update
await aiyeSystem.loadOrgans();

// Check quota
await aiyeSystem.updateQuotaStatus();
```

## ✅ Success Checklist

- [ ] 3D body loads and rotates smoothly
- [ ] Organ models visible (lungs, veins)
- [ ] Right panel shows organ cards
- [ ] Diagnose button works
- [ ] Organ selection highlights in 3D
- [ ] Payment modal opens
- [ ] Verification modal opens
- [ ] Image upload works
- [ ] Notifications appear
- [ ] Visual shaders animate
- [ ] Auto-update runs every 5 minutes

## 🎉 You're Ready!

If all tests pass, the integration is complete and working. You now have:

✅ Real-time environmental diagnostics
✅ Dynamic visual inflammation system
✅ Payment processing (Vials)
✅ Image verification (Proof of Impact)
✅ Auto-updating organ states
✅ Quota management
✅ Complete UI/UX system

**Next Steps:**
- Customize visual effects
- Add more organ types
- Integrate additional data sources
- Build corporate dashboard
- Deploy to production

---

**Need Help?** Check README.md for detailed documentation.

// Aiye System Integration Controller
import AiyeAPI from './aiye-api.js';
import { OrganVisualState } from './organ-visuals.js';
import { AiyeUI } from './aiye-ui.js';

export class AiyeSystem {
    constructor(scene, organModels) {
        this.scene = scene;
        this.organModels = organModels; // { lungs: mesh, veins: mesh, skin: mesh }
        this.organs = new Map();
        this.selectedOrgan = null;
        this.ui = new AiyeUI();
        this.autoUpdateInterval = null;
        
        this.init();
    }

    async init() {
        try {
            // Health check
            await AiyeAPI.healthCheck();

            // Load initial organ data
            await this.loadOrgans();
            
            // Get quota status
            await this.updateQuotaStatus();

            // Setup event handlers
            this.setupEventHandlers();

            // Start auto-update (every 5 minutes)
            this.startAutoUpdate(300000);

        } catch (error) {
            console.error('Aiye System Init Error:', error);
        }
    }

    async loadOrgans() {
        try {
            const response = await AiyeAPI.getAllOrgans();
            response.data.forEach(organ => {
                this.organs.set(organ.id, organ);
                this.updateOrganVisuals(organ);
            });
            this.ui.updateOrgansList(response.data);
        } catch (error) {
            console.error('Load organs error:', error);
        }
    }

    async updateQuotaStatus() {
        try {
            const response = await AiyeAPI.getQuotaStatus();
            this.ui.updateQuotaStatus(response.data);
        } catch (error) {
            console.error('Quota status error:', error);
        }
    }

    updateOrganVisuals(organ) {
        const modelMap = {
            'Lungs': this.organModels.lungs,
            'Veins': this.organModels.veins,
            'Skin': this.organModels.skin
        };

        const model = modelMap[organ.type];
        if (!model) return;

        // Don't update skin if it's healthy - keep original material
        if (organ.type === 'Skin' && organ.healthScore >= 80 && organ.symptomState === 'HEALTHY') {
            console.log('Keeping original skin material (healthy)');
            return;
        }

        const material = OrganVisualState.createMaterial(
            organ.type,
            organ.symptomState,
            organ.healthScore
        );

        model.traverse((child) => {
            if (child.isMesh) {
                child.material = material;
                child.userData.organData = organ;
            }
        });
    }

    setupEventHandlers() {
        // Diagnose all button
        document.getElementById('diagnose-all-btn').onclick = async () => {
            const btn = document.getElementById('diagnose-all-btn');
            btn.disabled = true;
            btn.textContent = '🔬 Diagnosing...';
            
            try {
                await this.diagnoseAllOrgans();
                this.ui.showNotification('✅ Diagnostic scan complete', 'success');
            } catch (error) {
                this.ui.showNotification('❌ Diagnostic failed', 'error');
            } finally {
                btn.disabled = false;
                btn.textContent = '🔬 Diagnose All Organs';
            }
        };

        // Organ card selection
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.organ-card');
            if (card) {
                const organId = card.dataset.organId;
                this.selectOrgan(organId);
            }
        });

        // Apply vial button
        document.getElementById('apply-vial-btn').onclick = () => {
            if (this.selectedOrgan) {
                this.ui.showPaymentModal(this.selectedOrgan);
            }
        };

        // Verify impact button
        document.getElementById('verify-impact-btn').onclick = () => {
            if (this.selectedOrgan) {
                this.ui.showVerifyModal(this.selectedOrgan);
            }
        };

        // Process payment
        document.getElementById('process-payment-btn').onclick = async () => {
            await this.processPayment();
        };

        // Submit verification
        document.getElementById('submit-verification-btn').onclick = async () => {
            await this.submitVerification();
        };
    }

    selectOrgan(organId) {
        this.selectedOrgan = this.organs.get(organId);
        if (!this.selectedOrgan) return;

        // Update UI
        document.querySelectorAll('.organ-card').forEach(card => {
            card.style.boxShadow = card.dataset.organId === organId 
                ? '0 0 20px rgba(46,140,224,0.6)' 
                : '';
        });

        document.getElementById('selected-organ-info').innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong>${this.selectedOrgan.name}</strong>
                <span class="status-badge status-${this.selectedOrgan.symptomState.toLowerCase()}">
                    ${this.selectedOrgan.symptomState}
                </span>
            </div>
            <div style="font-size: 12px; opacity: 0.8;">
                Health: ${this.selectedOrgan.healthScore}% | 
                Funding: ${this.selectedOrgan.fundingPercentage.toFixed(1)}%
            </div>
        `;

        document.getElementById('apply-vial-btn').disabled = false;
        document.getElementById('verify-impact-btn').disabled = false;

        // Highlight organ in 3D
        this.highlightOrgan(this.selectedOrgan.type);
    }

    highlightOrgan(organType) {
        // Reset all highlights
        Object.values(this.organModels).forEach(model => {
            if (model) model.scale.setScalar(model.userData.originalScale || 1);
        });

        // Highlight selected
        const modelMap = {
            'Lungs': this.organModels.lungs,
            'Veins': this.organModels.veins,
            'Skin': this.organModels.skin
        };

        const model = modelMap[organType];
        if (model) {
            if (!model.userData.originalScale) {
                model.userData.originalScale = model.scale.x;
            }
            model.scale.setScalar(model.userData.originalScale * 1.1);
        }
    }

    async diagnoseAllOrgans() {
        try {
            const response = await AiyeAPI.diagnoseAllOrgans();
            
            // Reload organs to get updated data
            await this.loadOrgans();
            await this.updateQuotaStatus();
            
            return response;
        } catch (error) {
            console.error('Diagnose all error:', error);
            throw error;
        }
    }

    async processPayment() {
        const amount = parseFloat(document.getElementById('payment-amount').value);
        const email = document.getElementById('payment-email').value;
        const name = document.getElementById('payment-name').value;

        if (!amount || !email || !name) {
            this.ui.showNotification('⚠️ Please fill all fields', 'error');
            return;
        }

        try {
            const response = await AiyeAPI.initializePayment(
                this.selectedOrgan.id,
                amount,
                email,
                name
            );

            // Redirect to payment link
            window.open(response.data.paymentLink, '_blank');
            
            this.ui.showNotification('💳 Payment window opened', 'success');
            document.getElementById('payment-modal').classList.remove('active');

            // Reload organ data after 10 seconds (time for payment)
            setTimeout(() => this.loadOrgans(), 10000);

        } catch (error) {
            console.error('Payment error:', error);
            this.ui.showNotification('❌ Payment initialization failed', 'error');
        }
    }

    async submitVerification() {
        const fileInput = document.getElementById('image-input');
        const ngoName = document.getElementById('ngo-name').value;
        const description = document.getElementById('restoration-desc').value;

        if (!fileInput.files[0]) {
            this.ui.showNotification('⚠️ Please select an image', 'error');
            return;
        }

        const btn = document.getElementById('submit-verification-btn');
        btn.disabled = true;
        btn.textContent = '🔄 Verifying...';

        try {
            // Convert image to base64
            const imageBase64 = await AiyeAPI.fileToBase64(fileInput.files[0]);

            // Submit verification
            const response = await AiyeAPI.verifyRestoration(
                this.selectedOrgan.id,
                imageBase64,
                ngoName,
                description
            );

            // Show result
            const result = response.data;
            const resultDiv = document.getElementById('verification-result');
            resultDiv.innerHTML = `
                <div style="margin-top: 20px; padding: 15px; background: rgba(0,255,136,0.1); border: 1px solid #00FF88; border-radius: 5px;">
                    <strong>${result.verification.verified ? '✅ VERIFIED' : '❌ REJECTED'}</strong>
                    <p style="font-size: 12px; margin-top: 10px;">${result.verification.analysis}</p>
                    <p style="font-size: 11px; margin-top: 5px; opacity: 0.8;">
                        Confidence: ${result.verification.confidence}% | 
                        ${result.previousState} → ${result.newState}
                    </p>
                </div>
            `;

            // Reload organs to show updated state
            await this.loadOrgans();

            this.ui.showNotification('✅ Verification complete', 'success');

        } catch (error) {
            console.error('Verification error:', error);
            this.ui.showNotification('❌ Verification failed', 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Submit Verification';
        }
    }

    startAutoUpdate(intervalMs) {
        this.autoUpdateInterval = setInterval(async () => {
            try {
                await this.loadOrgans();
                await this.updateQuotaStatus();
                console.log('🔄 Auto-update complete');
            } catch (error) {
                console.error('Auto-update error:', error);
            }
        }, intervalMs);
    }

    stopAutoUpdate() {
        if (this.autoUpdateInterval) {
            clearInterval(this.autoUpdateInterval);
            this.autoUpdateInterval = null;
        }
    }

    // Animation update (call this in your render loop)
    update(time) {
        this.organs.forEach(organ => {
            const modelMap = {
                'Lungs': this.organModels.lungs,
                'Veins': this.organModels.veins,
                'Skin': this.organModels.skin
            };

            const model = modelMap[organ.type];
            if (!model) return;

            model.traverse((child) => {
                if (child.isMesh && child.material.uniforms) {
                    child.material.uniforms.time.value = time;
                }
            });
        });
    }
}

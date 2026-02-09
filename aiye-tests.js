// Aiye System Test Suite
// Run in browser console to validate all features

export class AiyeTestSuite {
    constructor(aiyeSystem) {
        this.system = aiyeSystem;
        this.results = [];
    }

    async runAllTests() {
        console.log('🧪 Starting Aiye Test Suite...\n');
        
        await this.testBackendConnection();
        await this.testOrganLoading();
        await this.testQuotaStatus();
        await this.testOrganSelection();
        await this.testDiagnostics();
        await this.testVisualUpdates();
        
        this.printResults();
    }

    async testBackendConnection() {
        console.log('📡 Test 1: Backend Connection');
        try {
            const response = await fetch('https://aiye-backend-gemini-hackathon.onrender.com/health');
            const data = await response.json();
            
            if (data.success && data.status === 'healthy') {
                this.pass('Backend connection successful');
            } else {
                this.fail('Backend returned unhealthy status');
            }
        } catch (error) {
            this.fail(`Backend connection failed: ${error.message}`);
        }
    }

    async testOrganLoading() {
        console.log('\n🫀 Test 2: Organ Loading');
        try {
            if (this.system.organs.size === 0) {
                await this.system.loadOrgans();
            }
            
            if (this.system.organs.size > 0) {
                this.pass(`Loaded ${this.system.organs.size} organs`);
                
                // Validate organ structure
                const firstOrgan = Array.from(this.system.organs.values())[0];
                const requiredFields = ['id', 'name', 'type', 'healthScore', 'symptomState'];
                const hasAllFields = requiredFields.every(field => field in firstOrgan);
                
                if (hasAllFields) {
                    this.pass('Organ data structure valid');
                } else {
                    this.fail('Organ data missing required fields');
                }
            } else {
                this.fail('No organs loaded');
            }
        } catch (error) {
            this.fail(`Organ loading failed: ${error.message}`);
        }
    }

    async testQuotaStatus() {
        console.log('\n📊 Test 3: Quota Status');
        try {
            await this.system.updateQuotaStatus();
            
            if (this.system.ui) {
                const quotaDiv = document.getElementById('quota-status');
                if (quotaDiv && quotaDiv.innerHTML.includes('calls remaining')) {
                    this.pass('Quota status displayed');
                } else {
                    this.fail('Quota status not displayed');
                }
            }
        } catch (error) {
            this.fail(`Quota status failed: ${error.message}`);
        }
    }

    async testOrganSelection() {
        console.log('\n🎯 Test 4: Organ Selection');
        try {
            const firstOrganId = Array.from(this.system.organs.keys())[0];
            this.system.selectOrgan(firstOrganId);
            
            if (this.system.selectedOrgan && this.system.selectedOrgan.id === firstOrganId) {
                this.pass('Organ selection working');
                
                // Check if action buttons are enabled
                const vialBtn = document.getElementById('apply-vial-btn');
                const verifyBtn = document.getElementById('verify-impact-btn');
                
                if (!vialBtn.disabled && !verifyBtn.disabled) {
                    this.pass('Action buttons enabled on selection');
                } else {
                    this.fail('Action buttons not enabled');
                }
            } else {
                this.fail('Organ selection failed');
            }
        } catch (error) {
            this.fail(`Organ selection failed: ${error.message}`);
        }
    }

    async testDiagnostics() {
        console.log('\n🔬 Test 5: Diagnostics (WARNING: Uses API quota)');
        console.log('⏭️  Skipping to preserve quota. To test manually, click "Diagnose All Organs" button.');
        this.skip('Diagnostics test skipped to preserve quota');
    }

    async testVisualUpdates() {
        console.log('\n🎨 Test 6: Visual Updates');
        try {
            let visualsValid = true;
            
            // Check if organ models exist
            if (!this.system.organModels.lungs) {
                this.fail('Lungs model not found');
                visualsValid = false;
            }
            if (!this.system.organModels.veins) {
                this.fail('Veins model not found');
                visualsValid = false;
            }
            if (!this.system.organModels.skin) {
                this.fail('Skin model not found');
                visualsValid = false;
            }
            
            if (visualsValid) {
                this.pass('All organ models loaded');
                
                // Check if materials have uniforms
                let materialsValid = true;
                Object.values(this.system.organModels).forEach(model => {
                    if (model) {
                        model.traverse(child => {
                            if (child.isMesh && child.material.uniforms) {
                                if (!('time' in child.material.uniforms)) {
                                    materialsValid = false;
                                }
                            }
                        });
                    }
                });
                
                if (materialsValid) {
                    this.pass('Shader materials configured correctly');
                } else {
                    this.fail('Shader materials missing uniforms');
                }
            }
        } catch (error) {
            this.fail(`Visual updates test failed: ${error.message}`);
        }
    }

    pass(message) {
        this.results.push({ status: '✅', message });
        console.log(`  ✅ ${message}`);
    }

    fail(message) {
        this.results.push({ status: '❌', message });
        console.log(`  ❌ ${message}`);
    }

    skip(message) {
        this.results.push({ status: '⏭️', message });
        console.log(`  ⏭️ ${message}`);
    }

    printResults() {
        console.log('\n' + '='.repeat(50));
        console.log('📋 TEST RESULTS SUMMARY');
        console.log('='.repeat(50));
        
        const passed = this.results.filter(r => r.status === '✅').length;
        const failed = this.results.filter(r => r.status === '❌').length;
        const skipped = this.results.filter(r => r.status === '⏭️').length;
        
        console.log(`\nTotal Tests: ${this.results.length}`);
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`⏭️ Skipped: ${skipped}`);
        
        if (failed === 0) {
            console.log('\n🎉 ALL TESTS PASSED! System is ready.');
        } else {
            console.log('\n⚠️ Some tests failed. Check errors above.');
        }
        
        console.log('\n' + '='.repeat(50));
    }
}

// Manual test functions (run in console)
export const ManualTests = {
    // Test payment modal
    testPaymentModal() {
        console.log('💰 Testing Payment Modal...');
        const modal = document.getElementById('payment-modal');
        if (modal) {
            modal.classList.add('active');
            console.log('✅ Payment modal opened. Close it and check functionality.');
        } else {
            console.log('❌ Payment modal not found');
        }
    },

    // Test verification modal
    testVerificationModal() {
        console.log('📸 Testing Verification Modal...');
        const modal = document.getElementById('verify-modal');
        if (modal) {
            modal.classList.add('active');
            console.log('✅ Verification modal opened. Try uploading an image.');
        } else {
            console.log('❌ Verification modal not found');
        }
    },

    // Test notification
    testNotification() {
        console.log('🔔 Testing Notification System...');
        if (window.aiyeSystem && window.aiyeSystem.ui) {
            window.aiyeSystem.ui.showNotification('Test notification', 'success');
            setTimeout(() => {
                window.aiyeSystem.ui.showNotification('Error test', 'error');
            }, 1000);
            setTimeout(() => {
                window.aiyeSystem.ui.showNotification('Info test', 'info');
            }, 2000);
            console.log('✅ Notifications triggered. Check top of screen.');
        } else {
            console.log('❌ Aiye system not initialized');
        }
    },

    // Test organ highlighting
    testHighlighting() {
        console.log('✨ Testing Organ Highlighting...');
        if (window.aiyeSystem) {
            const organs = Array.from(window.aiyeSystem.organs.keys());
            let index = 0;
            
            const interval = setInterval(() => {
                if (index < organs.length) {
                    window.aiyeSystem.selectOrgan(organs[index]);
                    console.log(`Highlighting: ${window.aiyeSystem.selectedOrgan.name}`);
                    index++;
                } else {
                    clearInterval(interval);
                    console.log('✅ Highlighting test complete');
                }
            }, 2000);
        } else {
            console.log('❌ Aiye system not initialized');
        }
    },

    // Test auto-update
    testAutoUpdate() {
        console.log('🔄 Testing Auto-Update...');
        if (window.aiyeSystem) {
            console.log('Current update interval:', window.aiyeSystem.autoUpdateInterval);
            console.log('Triggering manual update...');
            window.aiyeSystem.loadOrgans().then(() => {
                console.log('✅ Manual update complete');
            });
        } else {
            console.log('❌ Aiye system not initialized');
        }
    },

    // Stress test (multiple rapid calls)
    async stressTest() {
        console.log('⚡ Running Stress Test...');
        console.log('WARNING: This will make multiple API calls');
        
        if (!confirm('This will use API quota. Continue?')) {
            console.log('Stress test cancelled');
            return;
        }

        const startTime = Date.now();
        const promises = [];
        
        for (let i = 0; i < 5; i++) {
            promises.push(window.aiyeSystem.loadOrgans());
        }
        
        try {
            await Promise.all(promises);
            const duration = Date.now() - startTime;
            console.log(`✅ Stress test complete in ${duration}ms`);
        } catch (error) {
            console.log(`❌ Stress test failed: ${error.message}`);
        }
    }
};

// Quick validation function
export function quickValidate() {
    console.log('🔍 Quick Validation Check\n');
    
    const checks = [
        { name: 'Aiye System', check: () => window.aiyeSystem !== undefined },
        { name: 'Organs Loaded', check: () => window.aiyeSystem?.organs.size > 0 },
        { name: 'UI Initialized', check: () => window.aiyeSystem?.ui !== undefined },
        { name: 'Organ Models', check: () => window.aiyeSystem?.organModels.lungs !== null },
        { name: 'Status Panel', check: () => document.getElementById('organs-list') !== null },
        { name: 'Action Panel', check: () => document.getElementById('apply-vial-btn') !== null },
        { name: 'Payment Modal', check: () => document.getElementById('payment-modal') !== null },
        { name: 'Verify Modal', check: () => document.getElementById('verify-modal') !== null }
    ];
    
    let passed = 0;
    checks.forEach(({ name, check }) => {
        const result = check();
        console.log(`${result ? '✅' : '❌'} ${name}`);
        if (result) passed++;
    });
    
    console.log(`\n${passed}/${checks.length} checks passed`);
    
    if (passed === checks.length) {
        console.log('🎉 System fully operational!');
    } else {
        console.log('⚠️ Some components not initialized');
    }
}

// Export for console use
if (typeof window !== 'undefined') {
    window.AiyeTestSuite = AiyeTestSuite;
    window.ManualTests = ManualTests;
    window.quickValidate = quickValidate;
    
    console.log('🧪 Aiye Test Suite loaded!');
    console.log('Run: quickValidate() for quick check');
    console.log('Run: new AiyeTestSuite(aiyeSystem).runAllTests() for full test');
    console.log('Run: ManualTests.testPaymentModal() for manual tests');
}

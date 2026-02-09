// Aiye System Configuration
export const AiyeConfig = {
    // Backend API
    api: {
        baseURL: 'https://aiye-backend-gemini-hackathon.onrender.com',
        timeout: 30000, // 30 seconds
        retryAttempts: 3
    },

    // Auto-update settings
    autoUpdate: {
        enabled: true,
        intervalMs: 300000, // 5 minutes
        onStartup: true
    },

    // Visual settings
    visuals: {
        // Inflammation effects
        inflammation: {
            pulseSpeed: 5.0,
            pulseIntensity: 0.05,
            flickerSpeed: 10.0
        },
        
        // Healing effects
        healing: {
            glowIntensity: 0.3,
            transitionSpeed: 2.0
        },
        
        // Healthy effects
        healthy: {
            breathingSpeed: 2.0,
            breathingIntensity: 0.02,
            flowSpeed: 3.0
        },

        // Highlight on selection
        selectionScale: 1.1,
        selectionDuration: 300 // ms
    },

    // Color schemes
    colors: {
        lungs: {
            healthy: 0x00FF88,
            inflamed: 0xFF3300,
            healing: 0xFFAA00
        },
        veins: {
            healthy: 0x0066FF,
            acidic: 0xFF3300,
            healing: 0x9933FF
        },
        skin: {
            healthy: 0x88CCFF,
            polluted: 0x996633,
            healing: 0xFFCC88
        }
    },

    // UI settings
    ui: {
        panels: {
            statusPanel: {
                position: 'top-right',
                width: 320,
                maxHeight: '80vh'
            },
            actionPanel: {
                position: 'bottom-right',
                width: 320
            }
        },
        
        notifications: {
            duration: 3000, // ms
            position: 'top-center'
        },

        animations: {
            modalFadeIn: 300,
            cardHover: 300,
            healthBarTransition: 500
        }
    },

    // Payment settings
    payment: {
        defaultCurrency: 'USD',
        minAmount: 1,
        maxAmount: 1000000,
        defaultAmount: 100
    },

    // Verification settings
    verification: {
        maxImageSize: 50 * 1024 * 1024, // 50MB
        acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
        compressionQuality: 0.8
    },

    // Diagnostic settings
    diagnostics: {
        showDetailedErrors: true,
        logToConsole: true,
        fallbackOnQuotaExceeded: true
    },

    // Organ mapping
    organMapping: {
        'Lungs': {
            ecosystem: 'Amazon Rainforest',
            dataSource: 'NASA EONET',
            triggerEvent: 'Deforestation',
            model: 'lungs'
        },
        'Veins': {
            ecosystem: 'Ocean Currents',
            dataSource: 'Copernicus Marine',
            triggerEvent: 'Acidification',
            model: 'veins'
        },
        'Skin': {
            ecosystem: 'Atmosphere/Soil',
            dataSource: 'Air Quality APIs',
            triggerEvent: 'Pollution',
            model: 'skin'
        }
    },

    // Health score thresholds
    healthThresholds: {
        critical: 30,    // Below this = INFLAMED
        moderate: 70,    // Below this = HEALING
        healthy: 70      // Above this = HEALTHY
    },

    // Funding thresholds
    fundingThresholds: {
        low: 25,         // Below 25% = needs urgent funding
        moderate: 50,    // 25-50% = moderate funding
        good: 75,        // 50-75% = good progress
        excellent: 75    // Above 75% = excellent
    },

    // Debug mode
    debug: {
        enabled: false,
        logAPIRequests: false,
        logStateChanges: false,
        showPerformanceMetrics: false
    }
};

// Helper functions
export const AiyeHelpers = {
    // Get organ state based on health score
    getOrganState(healthScore) {
        const { critical, moderate } = AiyeConfig.healthThresholds;
        if (healthScore < critical) return 'INFLAMED';
        if (healthScore < moderate) return 'HEALING';
        return 'HEALTHY';
    },

    // Get funding status
    getFundingStatus(percentage) {
        const { low, moderate, good } = AiyeConfig.fundingThresholds;
        if (percentage < low) return 'urgent';
        if (percentage < moderate) return 'moderate';
        if (percentage < good) return 'good';
        return 'excellent';
    },

    // Format currency
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    // Format percentage
    formatPercentage(value, decimals = 1) {
        return `${value.toFixed(decimals)}%`;
    },

    // Validate image file
    validateImage(file) {
        const { maxImageSize, acceptedFormats } = AiyeConfig.verification;
        
        if (!acceptedFormats.includes(file.type)) {
            return { valid: false, error: 'Invalid file format' };
        }
        
        if (file.size > maxImageSize) {
            return { valid: false, error: 'File too large' };
        }
        
        return { valid: true };
    },

    // Get color for health score
    getHealthColor(healthScore) {
        const { critical, moderate } = AiyeConfig.healthThresholds;
        if (healthScore < critical) return '#FF3300';
        if (healthScore < moderate) return '#FFAA00';
        return '#00FF88';
    },

    // Calculate time until next update
    getNextUpdateTime(lastUpdate, intervalMs) {
        const elapsed = Date.now() - lastUpdate;
        const remaining = intervalMs - elapsed;
        return Math.max(0, remaining);
    }
};

export default AiyeConfig;

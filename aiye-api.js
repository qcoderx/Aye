// Aiye Backend API Service
const API_BASE_URL = 'https://aiye-backend-gemini-hackathon.onrender.com';

class AiyeAPI {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.organs = new Map();
        this.quotaStatus = null;
    }

    async request(endpoint, options = {}) {
        try {
            console.log(`🌍 API Request: ${endpoint}`, options.body ? JSON.parse(options.body) : '');
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });
            const data = await response.json();
            console.log(`✅ API Response [${endpoint}]:`, data);
            if (!data.success) throw new Error(data.message || 'API request failed');
            return data;
        } catch (error) {
            console.error(`❌ API Error [${endpoint}]:`, error);
            throw error;
        }
    }

    // Health Check
    async healthCheck() {
        return this.request('/health');
    }

    // Organs
    async getAllOrgans() {
        const result = await this.request('/api/organs');
        result.data.forEach(organ => this.organs.set(organ.id, organ));
        return result;
    }

    async getOrgan(organId) {
        const result = await this.request(`/api/organs/${organId}`);
        this.organs.set(result.data.id, result.data);
        return result;
    }

    async diagnoseOrgan(organId) {
        return this.request(`/api/organs/${organId}/diagnose`, { method: 'POST' });
    }

    async diagnoseAllOrgans() {
        return this.request('/api/organs/diagnose-all', { method: 'POST' });
    }

    async getQuotaStatus() {
        const result = await this.request('/api/organs/quota-status');
        this.quotaStatus = result.data;
        return result;
    }

    // Vials (Payments)
    async initializePayment(organId, amount, email, name, currency = 'USD') {
        return this.request('/api/vials/initialize', {
            method: 'POST',
            body: JSON.stringify({ organId, amount, currency, email, name })
        });
    }

    async getVialsByOrgan(organId) {
        return this.request(`/api/vials/${organId}`);
    }

    // Verification
    async verifyRestoration(organId, imageBase64, ngoName = '', description = '') {
        return this.request('/api/verify', {
            method: 'POST',
            body: JSON.stringify({ organId, imageBase64, ngoName, description })
        });
    }

    // Helper: Convert file to base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}

export default new AiyeAPI();

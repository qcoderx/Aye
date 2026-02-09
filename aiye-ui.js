// UI Components for Aiye System
export class AiyeUI {
    constructor() {
        this.createStyles();
        this.createMainUI();
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* --- ANIMATED BACKGROUND START --- */
            @keyframes deepBreath {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            body {
                background: linear-gradient(-45deg, #1e3a5f, #2a4a7c, #1e3a5f, #2a5a8f);
                background-size: 400% 400%;
                animation: deepBreath 15s ease infinite;
                height: 100vh;
                margin: 0;
                overflow: hidden;
                color: #fff;
                font-family: 'Courier New', monospace;
            }
            /* --- ANIMATED BACKGROUND END --- */

            .aiye-panel { position: fixed; background: rgba(5,5,5,0.85); border: 1px solid #2E8CE0; padding: 20px; border-radius: 10px; color: #fff; font-family: 'Courier New', monospace; backdrop-filter: blur(5px); display: none; }
            .aiye-panel h3 { margin: 0 0 15px 0; color: #2E8CE0; font-size: 16px; border-bottom: 1px solid #2E8CE0; padding-bottom: 10px; }
            .organ-card { background: rgba(46,140,224,0.1); padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 3px solid #2E8CE0; cursor: pointer; transition: all 0.3s; }
            .organ-card:hover { background: rgba(46,140,224,0.2); transform: translateX(5px); }
            .organ-card.inflamed { border-left-color: #FF3300; }
            .organ-card.healing { border-left-color: #FFAA00; }
            .organ-card.healthy { border-left-color: #00FF88; }
            .health-bar { width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; margin: 8px 0; }
            .health-fill { height: 100%; background: linear-gradient(90deg, #FF3300, #FFAA00, #00FF88); transition: width 0.5s; }
            .btn { background: #2E8CE0; border: none; padding: 10px 20px; color: #fff; border-radius: 5px; cursor: pointer; font-family: inherit; margin: 5px; transition: all 0.3s; }
            .btn:hover { background: #4A9EE8; transform: scale(1.05); }
            .btn:disabled { background: #555; cursor: not-allowed; }
            .input { background: rgba(255,255,255,0.1); border: 1px solid #2E8CE0; padding: 10px; color: #fff; border-radius: 5px; width: 100%; margin: 5px 0; font-family: inherit; }
            .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: none; align-items: center; justify-content: center; z-index: 1000; }
            .modal.active { display: flex; }
            .modal-content { background: #0a0a0a; border: 2px solid #2E8CE0; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; }
            .close-btn { float: right; font-size: 24px; cursor: pointer; color: #2E8CE0; }
            .status-badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: bold; margin-left: 10px; }
            .status-inflamed { background: #FF3300; }
            .status-healing { background: #FFAA00; }
            .status-healthy { background: #00FF88; color: #000; }
            .file-upload { border: 2px dashed #2E8CE0; padding: 30px; text-align: center; border-radius: 10px; cursor: pointer; transition: all 0.3s; }
            .file-upload:hover { background: rgba(46,140,224,0.1); }
            .quota-warning { background: rgba(255,165,0,0.2); border: 1px solid #FFA500; padding: 10px; border-radius: 5px; margin: 10px 0; }
            
            /* Medical Vials Bar */
            #vials-bar { position: fixed; right: 20px; top: 50%; transform: translateY(-50%); background: rgba(5,5,5,0.9); border: 2px solid #2E8CE0; border-radius: 15px; padding: 20px 10px; backdrop-filter: blur(10px); }
            .vial-item { font-size: 40px; margin: 15px 0; cursor: grab; transition: all 0.3s; position: relative; }
            .vial-item:hover { transform: scale(1.2); filter: drop-shadow(0 0 10px #2E8CE0); }
            .vial-item:active { cursor: grabbing; }
            .vial-tooltip { position: absolute; right: 60px; top: 50%; transform: translateY(-50%); background: rgba(46,140,224,0.95); padding: 8px 12px; border-radius: 5px; white-space: nowrap; font-size: 12px; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
            .vial-item:hover .vial-tooltip { opacity: 1; }
            
            /* Organ Hover Info */
            #organ-info { position: fixed; left: 20px; top: 50%; transform: translateY(-50%); background: rgba(5,5,5,0.95); border: 2px solid #2E8CE0; border-radius: 10px; padding: 20px; max-width: 300px; backdrop-filter: blur(10px); display: none; }
            #organ-info h3 { margin: 0 0 10px 0; color: #2E8CE0; font-size: 18px; }
            #organ-info p { margin: 5px 0; font-size: 13px; line-height: 1.6; }
            @keyframes typing { from { width: 0; } to { width: 100%; } }
            .typing-text { overflow: hidden; white-space: nowrap; animation: typing 2s steps(40); }
        `;
        document.head.appendChild(style);
    }

    createMainUI() {
        // Medical Vials Bar
        const vialsBar = document.createElement('div');
        vialsBar.id = 'vials-bar';
        vialsBar.innerHTML = `
            <div class="vial-item" draggable="true" data-amount="50">💊<span class="vial-tooltip">$50</span></div>
            <div class="vial-item" draggable="true" data-amount="100">💉<span class="vial-tooltip">$100</span></div>
            <div class="vial-item" draggable="true" data-amount="250">🩹<span class="vial-tooltip">$250</span></div>
            <div class="vial-item" draggable="true" data-amount="500">🧪<span class="vial-tooltip">$500</span></div>
            <div class="vial-item" draggable="true" data-amount="1000">💰<span class="vial-tooltip">$1,000</span></div>
            <div class="vial-item" draggable="true" data-amount="5000">🏥<span class="vial-tooltip">$5,000</span></div>
        `;
        document.body.appendChild(vialsBar);

        // Organ Info Box
        const organInfo = document.createElement('div');
        organInfo.id = 'organ-info';
        document.body.appendChild(organInfo);

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Drag and drop vials
        document.querySelectorAll('.vial-item').forEach(vial => {
            vial.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('amount', vial.dataset.amount);
            });
        });
    }

    showOrganInfo(organ) {
        const info = document.getElementById('organ-info');
        const stateEmoji = { HEALTHY: '✅', INFLAMED: '🔥', HEALING: '🩹' }[organ.symptomState];
        info.innerHTML = `
            <h3>${stateEmoji} ${organ.name}</h3>
            <p class="typing-text"><strong>Ecosystem:</strong> ${organ.type === 'Lungs' ? 'Amazon Rainforest' : organ.type === 'Veins' ? 'Ocean Currents' : 'Atmosphere/Soil'}</p>
            <p><strong>Health:</strong> ${organ.healthScore}%</p>
            <p><strong>Status:</strong> ${organ.symptomState}</p>
            <p><strong>Funding:</strong> $${organ.currentFundingUSD?.toLocaleString() || 0} / $${organ.targetFundingUSD?.toLocaleString() || 0}</p>
        `;
        info.style.display = 'block';
    }

    hideOrganInfo() {
        document.getElementById('organ-info').style.display = 'none';
    }

    showNotification(message, type = 'info') {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background: ${type === 'success' ? '#00FF88' : type === 'error' ? '#FF3300' : '#2E8CE0'};
            color: ${type === 'success' ? '#000' : '#fff'};
            padding: 15px 30px; border-radius: 5px; z-index: 2000;
            font-family: 'Courier New', monospace; font-weight: bold;
        `;
        notif.textContent = message;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }
}

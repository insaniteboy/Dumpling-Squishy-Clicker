// ==========================================
// REBIRTH SYSTEM (Rebirths & Super Rebirths)
// ==========================================

// --- Inject Rebirth Styles into Document ---
const rebirthStyles = document.createElement('style');
rebirthStyles.innerHTML = `
    /* Rebirth Panel & Container Styling */
    .rebirth-panel-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: rgba(15, 5, 20, 0.3);
    }

    .rebirth-sub-tabs {
        display: flex;
        background: rgba(0,0,0,0.3);
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .rebirth-sub-tab {
        flex: 1;
        padding: 15px;
        text-align: center;
        font-weight: 800;
        font-size: 1.05rem;
        cursor: pointer;
        color: rgba(255,255,255,0.5);
        transition: all 0.2s ease;
        border-bottom: 3px solid transparent;
    }

    .rebirth-sub-tab.active {
        color: #fff;
        background: rgba(255,255,255,0.08);
        border-bottom: 3px solid #ffb3c6;
    }

    .rebirth-content-area {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        display: none;
        flex-direction: column;
        gap: 15px;
    }

    .rebirth-content-area.active {
        display: flex;
    }

    /* Big Action Hero Card */
    .rebirth-hero-card {
        background: linear-gradient(135deg, rgba(255, 179, 198, 0.2), rgba(78, 205, 196, 0.2));
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 20px;
        padding: 25px 20px;
        text-align: center;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .rebirth-hero-icon {
        font-size: 3.5rem;
        margin-bottom: 10px;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
    }

    .rebirth-hero-title {
        font-size: 1.5rem;
        font-weight: 900;
        color: #fff;
        margin-bottom: 5px;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.4);
    }

    .rebirth-hero-desc {
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 700;
        margin-bottom: 20px;
        line-height: 1.4;
    }

    /* Action Trigger Button */
    .rebirth-action-btn {
        background: linear-gradient(135deg, #ff758c, #ff7eb3);
        color: white;
        border: none;
        padding: 14px 28px;
        font-size: 1.15rem;
        font-weight: 900;
        border-radius: 14px;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(255, 117, 140, 0.4);
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        width: 100%;
        text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .rebirth-action-btn:hover:not(:disabled) {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 12px 25px rgba(255, 117, 140, 0.6);
        filter: brightness(1.1);
    }

    .rebirth-action-btn:active:not(:disabled) {
        transform: translateY(1px) scale(0.98);
    }

    .rebirth-action-btn.disabled {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.3);
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
        filter: none;
    }

    /* Info Status Cards */
    .rebirth-stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .rebirth-stat-box {
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 14px;
        padding: 15px;
        text-align: center;
    }

    .rebirth-stat-label {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
    }

    .rebirth-stat-value {
        font-size: 1.25rem;
        font-weight: 900;
        color: #fff;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
`;
document.head.appendChild(rebirthStyles);

// --- Inject Rebirth Panel into Left Side Container ---
function initRebirthUI() {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;

    // Create Left Panel Wrapper
    const leftPanel = document.createElement('div');
    leftPanel.className = 'left-panel';
    leftPanel.style.cssText = `
        width: 450px;
        background: var(--panel-bg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-right: 1px solid rgba(255,255,255,0.2);
        display: flex;
        flex-direction: column;
        box-shadow: 10px 0 30px rgba(0,0,0,0.2);
        z-index: 5;
    `;

    leftPanel.innerHTML = `
        <div class="tabs">
            <div class="tab active" onclick="switchLeftTab('rebirths')">Rebirths</div>
            <div class="tab" onclick="switchLeftTab('super')">Super Rebirth</div>
        </div>
        
        <div id="rebirth-main-panel" class="panel-content active">
            <div class="rebirth-panel-container">
                <div class="rebirth-hero-card">
                    <div class="rebirth-hero-icon">
                        <img src="https://preview.redd.it/where-can-i-get-all-these-icons-that-almost-every-roblox-v0-3xxbtl8zzxgb1.png?width=420&format=png&auto=webp&s=42a7876c1602ebfff91f17075bc66c5b87823512" alt="Rebirth" style="width: 64px; height: 64px; object-fit: contain;">
                    </div>
                    <div class="rebirth-hero-title">Ascension Rebirth</div>
                    <div class="rebirth-hero-desc">Reset your score and upgrades to gain permanent Multiplier boosts and currency!</div>
                    <button id="rebirth-btn" class="rebirth-action-btn" onclick="triggerRebirth()">Perform Rebirth</button>
                </div>

                <div class="rebirth-stats-grid">
                    <div class="rebirth-stat-box">
                        <div class="rebirth-stat-label">Current Multiplier</div>
                        <div class="rebirth-stat-value" id="rebirth-mult-display">+0.0x</div>
                    </div>
                    <div class="rebirth-stat-box">
                        <div class="rebirth-stat-label">Next Rebirth Cost</div>
                        <div class="rebirth-stat-value" id="rebirth-cost-display">10,000</div>
                    </div>
                    <div class="rebirth-stat-box" style="grid-column: span 2;">
                        <div class="rebirth-stat-label">Total Rebirths Owned</div>
                        <div class="rebirth-stat-value" id="rebirth-count-display">0</div>
                    </div>
                </div>
            </div>
        </div>

        <div id="super-rebirth-panel" class="panel-content">
            <div class="rebirth-panel-container">
                <div class="rebirth-hero-card" style="background: linear-gradient(135deg, rgba(142, 68, 173, 0.25), rgba(41, 128, 185, 0.25));">
                    <div class="rebirth-hero-icon">🌌</div>
                    <div class="rebirth-hero-title">Super Rebirth</div>
                    <div class="rebirth-hero-desc">Sacrifice all Rebirth progress, scores, and upgrades. Grants immense permanent power and Super Rebirth currency!</div>
                    <button id="super-rebirth-btn" class="rebirth-action-btn" style="background: linear-gradient(135deg, #8e44ad, #3498db); box-shadow: 0 8px 20px rgba(142, 68, 173, 0.4);" onclick="triggerSuperRebirth()">Perform Super Rebirth</button>
                </div>

                <div class="rebirth-stats-grid">
                    <div class="rebirth-stat-box">
                        <div class="rebirth-stat-label">Super Multiplier</div>
                        <div class="rebirth-stat-value" id="super-mult-display">+0x</div>
                    </div>
                    <div class="rebirth-stat-box">
                        <div class="rebirth-stat-label">Super Currency</div>
                        <div class="rebirth-stat-value" id="super-currency-display">0 🌀</div>
                    </div>
                    <div class="rebirth-stat-box" style="grid-column: span 2;">
                        <div class="rebirth-stat-label">Total Super Rebirths</div>
                        <div class="rebirth-stat-value" id="super-count-display">0</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insert left panel before the squishy-section container
    const squishySection = document.getElementById('click-area');
    gameContainer.insertBefore(leftPanel, squishySection);
}

// --- Left Panel Sub-Tab Switcher ---
function switchLeftTab(tabName) {
    const leftPanel = document.querySelector('.left-panel');
    if (!leftPanel) return;

    const tabs = leftPanel.querySelectorAll('.tab');
    const panels = leftPanel.querySelectorAll('.panel-content');

    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    if (tabName === 'rebirths') {
        tabs[0].classList.add('active');
        document.getElementById('rebirth-main-panel').classList.add('active');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('super-rebirth-panel').classList.add('active');
    }
}

// --- Extend State & Initialization Logic ---
document.addEventListener("DOMContentLoaded", () => {
    // Inject the panel structure first
    initRebirthUI();

    // Safely inject properties into global state if they don't exist yet
    if (typeof state !== 'undefined') {
        if (state.rebirths === undefined) state.rebirths = 0;
        if (state.rebirthCost === undefined) state.rebirthCost = 10000;
        if (state.superRebirths === undefined) state.superRebirths = 0;
        if (state.superCurrency === undefined) state.superCurrency = 0;
    }

    // Hook into main update loop elements safely
    const originalUpdateUI = window.updateUI;
    if (typeof originalUpdateUI === 'function') {
        window.updateUI = function() {
            originalUpdateUI();
            updateRebirthUIValues();
        };
    }

    // Initial render call
    updateRebirthUIValues();
});

// --- Core Rebirth Mechanics ---
function getNextRebirthCost() {
    // Fallback calculation if cost scales per rebirth dynamically
    let base = 10000;
    let cost = base * Math.pow(1.15, state.rebirths);
    return Math.floor(cost);
}

function triggerRebirth() {
    const cost = getNextRebirthCost();
    if (state.score >= cost) {
        // Reset Score and Upgrades
        state.score = 0;
        if (typeof UPGRADES_DATA !== 'undefined') {
            UPGRADES_DATA.forEach(u => state.upgrades[u.id] = 0);
        }

        // Increment Rebirth stats
        state.rebirths += 1;
        
        // Increase cost by 1.15x strictly upon re-birth event
        state.rebirthCost = getNextRebirthCost();

        // Refresh game structures
        if (typeof recalculateSPS === 'function') recalculateSPS();
        if (typeof renderUpgrades === 'function') renderUpgrades();
        updateRebirthUIValues();
        if (typeof updateUI === 'function') updateUI();
        if (typeof updateButtons === 'function') updateButtons();
    }
}

function triggerSuperRebirth() {
    // 1 Super Rebirth requires 1000 normal rebirths
    const requiredRebirths = 1000;
    if (state.rebirths >= requiredRebirths) {
        // Reset everything BESIDES super rebirths, super currency, and permanent multi data
        state.score = 0;
        state.rebirths = 0;
        state.rebirthCost = 10000;
        if (typeof UPGRADES_DATA !== 'undefined') {
            UPGRADES_DATA.forEach(u => state.upgrades[u.id] = 0);
        }

        // Grant Super Rewards
        state.superRebirths += 1;
        state.superCurrency += 1; // 1 Super Rebirth = 1 Super Currency (or used as currency resource)

        // Refresh game structures
        if (typeof recalculateSPS === 'function') recalculateSPS();
        if (typeof renderUpgrades === 'function') renderUpgrades();
        updateRebirthUIValues();
        if (typeof updateUI === 'function') updateUI();
        if (typeof updateButtons === 'function') updateButtons();
    }
}

// --- Dynamic UI Refresh for Rebirth Stats ---
function updateRebirthUIValues() {
    if (typeof state === 'undefined') return;

    // Calculations
    const currentRebirthCost = getNextRebirthCost();
    const normalMultiplierBonus = state.rebirths * 0.1; // 1 rebirth = 0.1 multiplier boost
    const superMultiplierBonus = state.superRebirths * 25; // 1 super rebirth = 25x permanent multi

    // DOM Elements updates safely
    const multDisp = document.getElementById('rebirth-mult-display');
    const costDisp = document.getElementById('rebirth-cost-display');
    const countDisp = document.getElementById('rebirth-count-display');
    const rebirthBtn = document.getElementById('rebirth-btn');

    if (multDisp) multDisp.innerText = `+${normalMultiplierBonus.toFixed(1)}x Multi`;
    if (costDisp) costDisp.innerText = currentRebirthCost.toLocaleString();
    if (countDisp) countDisp.innerText = state.rebirths.toLocaleString();

    if (rebirthBtn) {
        if (state.score >= currentRebirthCost) {
            rebirthBtn.classList.remove('disabled');
        } else {
            rebirthBtn.classList.add('disabled');
        }
    }

    // Super Rebirth Elements
    const superMultDisp = document.getElementById('super-mult-display');
    const superCurrDisp = document.getElementById('super-currency-display');
    const superCountDisp = document.getElementById('super-count-display');
    const superRebirthBtn = document.getElementById('super-rebirth-btn');

    if (superMultDisp) superMultDisp.innerText = `+${superMultiplierBonus}x Perm Multi`;
    if (superCurrDisp) superCurrDisp.innerText = `${state.superCurrency} 🌀`;
    if (superCountDisp) superCountDisp.innerText = state.superRebirths.toLocaleString();

    if (superRebirthBtn) {
        const canSuper = state.rebirths >= 1000;
        superRebirthBtn.innerText = canSuper ? "Perform Super Rebirth" : `Requires 1,000 Rebirths (${state.rebirths}/1,000)`;
        if (canSuper) {
            superRebirthBtn.classList.remove('disabled');
        } else {
            superRebirthBtn.classList.add('disabled');
        }
    }
}
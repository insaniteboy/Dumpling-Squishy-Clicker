// ==========================================
// UPGRADED REBIRTH SYSTEM (Resets Upgrades, +0.01x Multi)
// ==========================================

// --- Inject Rebirth Styles ---
const rebirthStyles = document.createElement('style');
rebirthStyles.innerHTML = `
    /* Floating Rebirth Button */
    #open-rebirth-btn {
        position: fixed;
        top: 20px;
        left: 20px;
        background: linear-gradient(135deg, rgba(255, 117, 140, 0.8), rgba(123, 31, 162, 0.8));
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: white;
        border: 2px solid rgba(255,255,255,0.4);
        padding: 15px 25px;
        font-size: 1.2rem;
        font-weight: 900;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(255, 117, 140, 0.5);
        z-index: 100;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    #open-rebirth-btn:hover {
        transform: translateY(-5px) scale(1.05);
        box-shadow: 0 12px 30px rgba(255, 117, 140, 0.8);
        border-color: #fff;
    }

    /* Modal Overlay */
    .rebirth-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s ease;
    }

    .rebirth-modal-overlay.open {
        opacity: 1;
        pointer-events: all;
    }

    /* Modal Box */
    .rebirth-modal {
        width: 500px;
        background: rgba(20, 5, 15, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 30px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: scale(0.8) translateY(50px);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .rebirth-modal-overlay.open .rebirth-modal {
        transform: scale(1) translateY(0);
    }

    /* Header & Close Button */
    .rebirth-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        background: rgba(255,255,255,0.05);
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .rebirth-modal-title {
        font-size: 1.8rem;
        font-weight: 900;
        color: #fff;
        text-shadow: 0 2px 5px rgba(0,0,0,0.5);
    }

    .close-modal-btn {
        background: rgba(255,255,255,0.1);
        border: none;
        color: white;
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.2s;
    }

    .close-modal-btn:hover {
        background: rgba(255, 50, 50, 0.6);
        transform: rotate(90deg);
    }

    /* Shared Rebirth Styles */
    .rebirth-sub-tabs { display: flex; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.1); }
    .rebirth-sub-tab { flex: 1; padding: 15px; text-align: center; font-weight: 800; font-size: 1.1rem; cursor: pointer; color: rgba(255,255,255,0.5); transition: 0.2s; border-bottom: 3px solid transparent; }
    .rebirth-sub-tab.active { color: #fff; background: rgba(255,255,255,0.08); border-bottom: 3px solid #ffb3c6; }
    
    .rebirth-content-area { padding: 30px; display: none; flex-direction: column; gap: 20px; }
    .rebirth-content-area.active { display: flex; }

    .rebirth-hero-card { background: linear-gradient(135deg, rgba(255, 179, 198, 0.2), rgba(78, 205, 196, 0.2)); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 20px; padding: 25px 20px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
    .rebirth-hero-icon { font-size: 4rem; margin-bottom: 10px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)); }
    .rebirth-hero-title { font-size: 1.8rem; font-weight: 900; color: #fff; margin-bottom: 5px; }
    .rebirth-hero-desc { font-size: 1rem; color: rgba(255, 255, 255, 0.8); font-weight: 700; margin-bottom: 20px; line-height: 1.4; }

    .rebirth-action-btn { background: linear-gradient(135deg, #ff758c, #ff7eb3); color: white; border: none; padding: 16px; font-size: 1.2rem; font-weight: 900; border-radius: 14px; cursor: pointer; box-shadow: 0 8px 20px rgba(255, 117, 140, 0.4); transition: 0.2s; width: 100%; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .rebirth-action-btn:hover:not(:disabled) { transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 25px rgba(255, 117, 140, 0.6); filter: brightness(1.1); }
    .rebirth-action-btn:active:not(:disabled) { transform: translateY(1px) scale(0.98); }
    .rebirth-action-btn.disabled { background: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.3); cursor: not-allowed; box-shadow: none; }

    .rebirth-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .rebirth-stat-box { background: rgba(255, 255, 255, 0.07); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 14px; padding: 15px; text-align: center; }
    .rebirth-stat-label { font-size: 0.85rem; color: rgba(255, 255, 255, 0.6); font-weight: 800; text-transform: uppercase; margin-bottom: 5px; }
    .rebirth-stat-value { font-size: 1.4rem; font-weight: 900; color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); }

    /* Flash Effects */
    .rebirth-flash {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: 10000; pointer-events: none; opacity: 1;
        display: flex; justify-content: center; align-items: center;
        font-size: 8rem; font-weight: 900; color: white; text-shadow: 0 0 50px rgba(255,255,255,0.8);
    }
`;
document.head.appendChild(rebirthStyles);

// --- Inject Toggle Button and Modal ---
function initRebirthUI() {
    if (document.getElementById('open-rebirth-btn')) return;

    const openBtn = document.createElement('button');
    openBtn.id = 'open-rebirth-btn';
    openBtn.innerHTML = '✨ Ascension';
    openBtn.onclick = toggleRebirthModal;
    document.body.appendChild(openBtn);

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'rebirth-modal-overlay';
    modalOverlay.className = 'rebirth-modal-overlay';
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) toggleRebirthModal();
    });

    modalOverlay.innerHTML = `
        <div class="rebirth-modal">
            <div class="rebirth-modal-header">
                <div class="rebirth-modal-title">Ascension Menu</div>
                <button class="close-modal-btn" onclick="toggleRebirthModal()">✕</button>
            </div>

            <div class="rebirth-sub-tabs">
                <div class="rebirth-sub-tab active" onclick="switchRebirthTab('normal')">Normal Rebirth</div>
                <div class="rebirth-sub-tab" onclick="switchRebirthTab('super')">Super Rebirth</div>
            </div>
            
            <div id="rebirth-normal-panel" class="rebirth-content-area active">
                <div class="rebirth-hero-card">
                    <div class="rebirth-hero-icon">👼</div>
                    <div class="rebirth-hero-title">Ascension</div>
                    <div class="rebirth-hero-desc">Gain permanent +0.025x Multipliers for each rebirth! Rebirthing resets your score and all upgrades.</div>
                    <button id="rebirth-btn" class="rebirth-action-btn" onclick="triggerRebirth()">Perform Rebirth</button>
                </div>

                <div class="rebirth-stats-grid">
                    <div class="rebirth-stat-box">
                        <div class="rebirth-stat-label">Current Multi</div>
                        <div class="rebirth-stat-value" id="rebirth-mult-display">+0.00x</div>
                    </div>
                    <div class="rebirth-stat-box">
                        <div class="rebirth-stat-label">Total Owned</div>
                        <div class="rebirth-stat-value" id="rebirth-count-display">0</div>
                    </div>
                </div>
            </div>

            <div id="rebirth-super-panel" class="rebirth-content-area">
                <div class="rebirth-hero-card" style="background: linear-gradient(135deg, rgba(142, 68, 173, 0.25), rgba(41, 128, 185, 0.25));">
                    <div class="rebirth-hero-icon">🌌</div>
                    <div class="rebirth-hero-title">Super Rebirth</div>
                    <div class="rebirth-hero-desc">Sacrifice 1,000 Rebirths at a time to grant massive permanent power and Super Currency!</div>
                    <button id="super-rebirth-btn" class="rebirth-action-btn" style="background: linear-gradient(135deg, #8e44ad, #3498db);" onclick="triggerSuperRebirth()">Perform Super Rebirth</button>
                </div>

                <div class="rebirth-stats-grid">
                    <div class="rebirth-stat-box">
                        <div class="rebirth-stat-label">Super Multi</div>
                        <div class="rebirth-stat-value" id="super-mult-display">+0x</div>
                    </div>
                    <div class="rebirth-stat-box">
                        <div class="rebirth-stat-label">Super Currency</div>
                        <div class="rebirth-stat-value" id="super-currency-display">0 🌀</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);
}

// --- Toggle & Tabs Logic ---
function toggleRebirthModal() {
    const modal = document.getElementById('rebirth-modal-overlay');
    if (modal.classList.contains('open')) {
        modal.classList.remove('open');
    } else {
        updateRebirthUIValues(); 
        modal.classList.add('open');
    }
}

function switchRebirthTab(tabName) {
    const tabs = document.querySelectorAll('.rebirth-sub-tab');
    const panels = document.querySelectorAll('.rebirth-content-area');

    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    if (tabName === 'normal') {
        tabs[0].classList.add('active');
        document.getElementById('rebirth-normal-panel').classList.add('active');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('rebirth-super-panel').classList.add('active');
    }
}

// --- Extend Global State & Patch Functions ---
document.addEventListener("DOMContentLoaded", () => {
    initRebirthUI();

    if (typeof state !== 'undefined') {
        if (state.rebirths === undefined) state.rebirths = 0;
        if (state.rebirthActions === undefined) state.rebirthActions = 0;
        if (state.superRebirths === undefined) state.superRebirths = 0;
        if (state.superCurrency === undefined) state.superCurrency = 0;
    }

    const originalLoadGame = window.loadGame;
    if (typeof originalLoadGame === 'function') {
        window.loadGame = function() {
            originalLoadGame(); 
            
            const saved = localStorage.getItem('SquishyDataV3');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.rebirths !== undefined) state.rebirths = parsed.rebirths;
                if (parsed.rebirthActions !== undefined) state.rebirthActions = parsed.rebirthActions;
                if (parsed.superRebirths !== undefined) state.superRebirths = parsed.superRebirths;
                if (parsed.superCurrency !== undefined) state.superCurrency = parsed.superCurrency;
            }
            updateRebirthUIValues();
        };
    }

    const originalCalculateMultiplier = window.calculateMultiplier;
    if (typeof originalCalculateMultiplier === 'function') {
        window.calculateMultiplier = function() {
            originalCalculateMultiplier(); 
            
            let skinCount = 0;
            for (let skin in state.unlockedSkins) {
                if (state.unlockedSkins[skin]) skinCount++;
            }
            
            // Adjusted normal multiplier bonus increment to 0.01
            const normalBonus = (state.rebirths || 0) * 0.25;
            const superBonus = (state.superRebirths || 0) * 25;
            
            currentMultiplier = 1 + (skinCount * 0.25) + normalBonus + superBonus;
            
            const multiplierDisplay = document.getElementById('multiplier-display');
            if (multiplierDisplay) {
                multiplierDisplay.innerText = `${currentMultiplier.toFixed(2)}x Total Multiplier`;
            }
        };
    }

    const originalUpdateUI = window.updateUI;
    if (typeof originalUpdateUI === 'function') {
        window.updateUI = function() {
            originalUpdateUI();
            updateRebirthUIValues(); 
        };
    }

    if (typeof calculateMultiplier === 'function') calculateMultiplier();
    if (typeof recalculateSPS === 'function') recalculateSPS();
    updateRebirthUIValues();
});

// --- Helper: Get Current Unit Cost ---
function getCurrentUnitCost() {
    const actions = state.rebirthActions || 0;
    let cost = Math.floor(10000 * Math.pow(1.15, actions));
    return Math.min(cost, 1000000000); 
}

// --- Multi-Buy Calculation ---
function calculateMaxRebirths() {
    const unitCost = getCurrentUnitCost();
    const affordableCount = Math.floor(state.score / unitCost);
    const totalCost = affordableCount * unitCost;

    return { count: affordableCount, cost: totalCost, unitCost: unitCost };
}

// --- CORE FIX: Wipe Upgrades Mechanic ---
function wipeUpgradesForRebirth() {
    // Erase all upgrade tiers[cite: 6]
    if (state.upgrades) {
        for (let upgradeId in state.upgrades) {
            state.upgrades[upgradeId] = 0;
        }
    }
    
    // Hard reset base power values
    state.clickPower = 1;
    state.sps = 0;
}

function calculateMaxSuperRebirths() {
    return Math.floor(state.rebirths / 1000);
}

// --- Actions & Effects ---
function triggerRebirth() {
    const maxData = calculateMaxRebirths();
    
    if (maxData.count > 0) {
        playFlashEffect('white', 'ASCENSION!');

        // Consume score and add rebirth stats
        state.score = 0; 
        state.rebirths += maxData.count;
        state.rebirthActions = (state.rebirthActions || 0) + 1;

        // Reset upgrades[cite: 6]
        wipeUpgradesForRebirth();

        if (typeof calculateMultiplier === 'function') calculateMultiplier();
        if (typeof recalculateSPS === 'function') recalculateSPS();
        if (typeof renderUpgrades === 'function') renderUpgrades();
        updateRebirthUIValues();
        if (typeof updateUI === 'function') updateUI();
        if (typeof updateButtons === 'function') updateButtons();
    }
}

function triggerSuperRebirth() {
    const affordable = calculateMaxSuperRebirths();

    if (affordable > 0) {
        playFlashEffect('radial-gradient(circle, #ff00ff, #00ffff, #1a237e)', 'SUPER REBIRTH!');

        state.rebirths -= (affordable * 1000); 
        state.superRebirths += affordable;
        state.superCurrency += affordable; 
        
        state.score = 0;
        wipeUpgradesForRebirth();

        if (typeof calculateMultiplier === 'function') calculateMultiplier();
        if (typeof recalculateSPS === 'function') recalculateSPS();
        if (typeof renderUpgrades === 'function') renderUpgrades();
        updateRebirthUIValues();
        if (typeof updateUI === 'function') updateUI();
        if (typeof updateButtons === 'function') updateButtons();
    }
}

// --- Visual Effects ---
function playFlashEffect(background, text) {
    const flash = document.createElement('div');
    flash.className = 'rebirth-flash';
    flash.style.background = background;
    flash.innerText = text;
    
    flash.style.transition = 'opacity 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
    document.body.appendChild(flash);

    setTimeout(() => {
        flash.style.opacity = '0';
        flash.style.transform = 'scale(1.2)';
    }, 50);

    setTimeout(() => {
        flash.remove();
    }, 1550);
}

// --- Dynamic UI Refresh ---
function updateRebirthUIValues() {
    if (typeof state === 'undefined') return;

    // --- NORMAL REBIRTH ---
    const maxNormalData = calculateMaxRebirths();
    // Adjusted display calculation to reflect 0.01x per normal rebirth
    const normalBonus = state.rebirths * 0.025;

    const multDisp = document.getElementById('rebirth-mult-display');
    const countDisp = document.getElementById('rebirth-count-display');
    if (multDisp) multDisp.innerText = `+${normalBonus.toFixed(2)}x`;
    if (countDisp) countDisp.innerText = state.rebirths.toLocaleString();

    const rebirthBtn = document.getElementById('rebirth-btn');
    if (rebirthBtn) {
        if (maxNormalData.count > 0) {
            rebirthBtn.innerText = `Buy Max (${maxNormalData.count.toLocaleString()}) for ${maxNormalData.cost.toLocaleString()} Squishes`;
            rebirthBtn.classList.remove('disabled');
        } else {
            rebirthBtn.innerText = `Need ${maxNormalData.unitCost.toLocaleString()} Squishes`;
            rebirthBtn.classList.add('disabled');
        }
    }

    // --- SUPER REBIRTH ---
    const maxSuper = calculateMaxSuperRebirths();
    const superBonus = state.superRebirths * 25;

    const sMultDisp = document.getElementById('super-mult-display');
    const sCurrDisp = document.getElementById('super-currency-display');
    if (sMultDisp) sMultDisp.innerText = `+${superBonus}x`;
    if (sCurrDisp) sCurrDisp.innerText = `${state.superCurrency} 🌀`;

    const superBtn = document.getElementById('super-rebirth-btn');
    if (superBtn) {
        if (maxSuper > 0) {
            superBtn.innerText = `Buy Max (${maxSuper.toLocaleString()}) for ${(maxSuper * 1000).toLocaleString()} Rebirths`;
            superBtn.classList.remove('disabled');
        } else {
            const needed = 1000 - (state.rebirths % 1000);
            superBtn.innerText = `Need ${needed.toLocaleString()} More Rebirths`;
            superBtn.classList.add('disabled');
        }
    }
}
// ==========================================
// UPGRADED REBIRTH SYSTEM (Geometric Scaling, 0.10x / 250x Multis, Resets)
// ==========================================

// --- Inject Rebirth Styles ---
const rebirthStyles = document.createElement('style');
rebirthStyles.innerHTML = `
    /* Floating Rebirth Button */
    #open-rebirth-btn {
        position: fixed;
        top: 20px;
        left: 20px;
        background: linear-gradient(135deg, #ff758c 0%, #ff7eb3 50%, #7b1fa2 100%);
        background-size: 200% 200%;
        animation: gradientShift 5s ease infinite;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: white;
        border: 2px solid rgba(255,255,255,0.6);
        padding: 15px 25px;
        font-size: 1.2rem;
        font-weight: 900;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(255, 117, 140, 0.6);
        z-index: 100;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        text-shadow: 0 2px 4px rgba(0,0,0,0.4);
    }

    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    #open-rebirth-btn:hover {
        transform: translateY(-5px) scale(1.08);
        box-shadow: 0 12px 35px rgba(255, 117, 140, 0.9);
        border-color: #fff;
    }

    /* Modal Overlay */
    .rebirth-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(10, 5, 15, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
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
        width: 520px;
        background: linear-gradient(180deg, rgba(30, 15, 25, 0.95), rgba(15, 5, 15, 0.95));
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 24px;
        box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 20px rgba(255, 117, 140, 0.2);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: scale(0.8) translateY(40px);
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
        padding: 22px 30px;
        background: rgba(255,255,255,0.03);
        border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    .rebirth-modal-title {
        font-size: 1.9rem;
        font-weight: 900;
        color: #fff;
        text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        letter-spacing: 0.5px;
    }

    .close-modal-btn {
        background: rgba(255,255,255,0.1);
        border: none;
        color: white;
        font-size: 1.5rem;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-modal-btn:hover {
        background: rgba(255, 60, 60, 0.8);
        transform: rotate(90deg) scale(1.1);
        box-shadow: 0 0 15px rgba(255, 60, 60, 0.6);
    }

    /* Shared Rebirth Styles */
    .rebirth-sub-tabs { display: flex; background: rgba(0,0,0,0.4); border-bottom: 1px solid rgba(255,255,255,0.05); }
    .rebirth-sub-tab { flex: 1; padding: 18px; text-align: center; font-weight: 800; font-size: 1.15rem; cursor: pointer; color: rgba(255,255,255,0.4); transition: 0.3s; border-bottom: 3px solid transparent; }
    .rebirth-sub-tab:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.03); }
    .rebirth-sub-tab.active { color: #fff; background: rgba(255,255,255,0.05); border-bottom: 3px solid #ff7eb3; text-shadow: 0 0 10px rgba(255, 126, 179, 0.5); }
    
    .rebirth-content-area { padding: 30px; display: none; flex-direction: column; gap: 20px; }
    .rebirth-content-area.active { display: flex; animation: fadeIn 0.3s ease; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    .rebirth-hero-card { border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 20px; padding: 25px; text-align: center; box-shadow: inset 0 0 20px rgba(255,255,255,0.05), 0 10px 25px rgba(0,0,0,0.3); }
    .rebirth-hero-icon { font-size: 4.5rem; margin-bottom: 15px; filter: drop-shadow(0 5px 15px rgba(0,0,0,0.4)); }
    .rebirth-hero-title { font-size: 2rem; font-weight: 900; color: #fff; margin-bottom: 10px; text-shadow: 0 2px 5px rgba(0,0,0,0.5); }
    .rebirth-hero-desc { font-size: 1.05rem; color: rgba(255, 255, 255, 0.75); font-weight: 600; margin-bottom: 25px; line-height: 1.5; }

    .rebirth-action-btn { color: white; border: none; padding: 18px; font-size: 1.2rem; font-weight: 900; border-radius: 16px; cursor: pointer; transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); width: 100%; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
    .rebirth-action-btn:hover:not(:disabled) { transform: translateY(-3px) scale(1.02); filter: brightness(1.15); }
    .rebirth-action-btn:active:not(:disabled) { transform: translateY(1px) scale(0.98); }
    .rebirth-action-btn.disabled { background: rgba(255, 255, 255, 0.05) !important; color: rgba(255, 255, 255, 0.3) !important; cursor: not-allowed; box-shadow: none !important; border: 1px solid rgba(255,255,255,0.1); }

    .btn-normal { background: linear-gradient(135deg, #ff758c, #ff7eb3); box-shadow: 0 8px 20px rgba(255, 117, 140, 0.4); border: 1px solid #ff7eb3; }
    .btn-normal:hover:not(:disabled) { box-shadow: 0 12px 30px rgba(255, 117, 140, 0.6), 0 0 15px #ff7eb3; }
    
    .btn-super { background: linear-gradient(135deg, #8e44ad, #3498db); box-shadow: 0 8px 20px rgba(142, 68, 173, 0.4); border: 1px solid #3498db; }
    .btn-super:hover:not(:disabled) { box-shadow: 0 12px 30px rgba(142, 68, 173, 0.6), 0 0 15px #3498db; }

    .rebirth-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .rebirth-stat-box { background: rgba(0, 0, 0, 0.2); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 20px 15px; text-align: center; box-shadow: inset 0 2px 10px rgba(0,0,0,0.2); transition: 0.3s; }
    .rebirth-stat-box:hover { border-color: rgba(255,255,255,0.2); background: rgba(255, 255, 255, 0.02); }
    .rebirth-stat-label { font-size: 0.85rem; color: rgba(255, 255, 255, 0.5); font-weight: 800; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px; }
    .rebirth-stat-value { font-size: 1.6rem; font-weight: 900; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }

    /* Flash Effects */
    .rebirth-flash {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: 10000; pointer-events: none; opacity: 1;
        display: flex; justify-content: center; align-items: center;
        font-size: 8rem; font-weight: 900; color: white; text-shadow: 0 0 50px rgba(255,255,255,0.8);
    }
`;
document.head.appendChild(rebirthStyles);

// --- Number Formatting Utility ---
function formatShort(num) {
    if (num < 1000) return (num % 1 !== 0) ? num.toFixed(2) : Math.floor(num).toString();
    const suffixes = ["", "k", "m", "b", "t", "qa", "qi", "sx", "sp", "oc", "no", "dc"];
    const suffixIndex = Math.floor(Math.log10(num) / 3);
    if (suffixIndex >= suffixes.length) return "Infinity"; 
    const scaledNum = num / Math.pow(10, suffixIndex * 3);
    return scaledNum.toFixed(1).replace(/\.0$/, '') + suffixes[suffixIndex]; 
}

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
                <div class="rebirth-hero-card" style="background: linear-gradient(135deg, rgba(255, 117, 140, 0.15), rgba(255, 126, 179, 0.05));">
                    <div class="rebirth-hero-icon">👼</div>
                    <div class="rebirth-hero-title">Ascension</div>
                    <div class="rebirth-hero-desc">Gain permanent +0.10x Multipliers for each rebirth! Rebirthing completely resets your score and upgrades. Cost scales by 1.02x per total rebirth.</div>
                    <button id="rebirth-btn" class="rebirth-action-btn btn-normal" onclick="triggerRebirth()">Perform Rebirth</button>
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
                <div class="rebirth-hero-card" style="background: linear-gradient(135deg, rgba(142, 68, 173, 0.15), rgba(52, 152, 219, 0.05));">
                    <div class="rebirth-hero-icon">🌌</div>
                    <div class="rebirth-hero-title">Super Rebirth</div>
                    <div class="rebirth-hero-desc">Sacrifice 10k Rebirths at a time to grant massive permanent power (+250x) and Super Currency! Resets Rebirths, Upgrades, and Skins.</div>
                    <button id="super-rebirth-btn" class="rebirth-action-btn btn-super" onclick="triggerSuperRebirth()">Perform Super Rebirth</button>
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
            if (state.unlockedSkins) {
                for (let skin in state.unlockedSkins) {
                    if (state.unlockedSkins[skin]) skinCount++;
                }
            }
            
            // Buffed multipliers: +0.10x per Normal, +250x per Super
            const normalBonus = (state.rebirths || 0) * 0.10;
            const superBonus = (state.superRebirths || 0) * 250;
            
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

// --- Geometric Multi-Buy Calculation for Normal Rebirths ---
function calculateMaxRebirths() {
    const base = 10000; // Buffed: Reduced from 15000
    const r = 1.02; // Buffed: Reduced scaling from 1.05 to 1.02
    const currentR = state.rebirths || 0;
    
    // Cost of the next single rebirth based on total existing rebirths
    const currentCost = base * Math.pow(r, currentR); 

    if (state.score < currentCost) {
        return { count: 0, cost: 0, nextCost: currentCost };
    }

    // Formula to find 'k' max affordable rebirths using Geometric Series sum
    const count = Math.floor(Math.log((state.score * (r - 1) / currentCost) + 1) / Math.log(r));
    
    // Total aggregated cost for those 'k' rebirths
    const totalCost = currentCost * (Math.pow(r, count) - 1) / (r - 1);
    
    return { count: count, cost: totalCost, nextCost: currentCost };
}

// --- CORE FIX: Wipe Upgrades Mechanic ---
function wipeUpgradesForRebirth() {
    if (state.upgrades) {
        for (let upgradeId in state.upgrades) {
            state.upgrades[upgradeId] = 0;
        }
    }
    state.clickPower = 1;
    state.sps = 0;
}

// 10k Rebirths per Super Rebirth (Buffed from 1m/100k)
function calculateMaxSuperRebirths() {
    return Math.floor(state.rebirths / 10000);
}

// --- Actions & Effects ---
function triggerRebirth() {
    const maxData = calculateMaxRebirths();
    
    if (maxData.count > 0) {
        playFlashEffect('white', 'ASCENSION!');

        state.score = 0; 
        state.rebirths += maxData.count;
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
        
        state.superRebirths += affordable;
        state.superCurrency += affordable; 
        
        // Wipe Rebirths, Score, Upgrades, and Skins
        state.rebirths = 0;
        state.score = 0;
        wipeUpgradesForRebirth();

        if (state.unlockedSkins) {
            for (let skin in state.unlockedSkins) {
                state.unlockedSkins[skin] = false;
            }
            // Ensure default skin remains unlocked and equipped
            state.unlockedSkins["default"] = true;
            state.equippedSkin = "default";
        }
        
        if (typeof renderSkins === 'function') renderSkins();

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
    const normalBonus = state.rebirths * 0.10; // Buffed to 0.10x

    const multDisp = document.getElementById('rebirth-mult-display');
    const countDisp = document.getElementById('rebirth-count-display');
    if (multDisp) multDisp.innerText = `+${formatShort(normalBonus)}x`;
    if (countDisp) countDisp.innerText = formatShort(state.rebirths);

    const rebirthBtn = document.getElementById('rebirth-btn');
    if (rebirthBtn) {
        if (maxNormalData.count > 0) {
            rebirthBtn.innerText = `Buy Max (${formatShort(maxNormalData.count)}) for ${formatShort(maxNormalData.cost)} Squishes`;
            rebirthBtn.classList.remove('disabled');
        } else {
            rebirthBtn.innerText = `Need ${formatShort(maxNormalData.nextCost)} Squishes`;
            rebirthBtn.classList.add('disabled');
        }
    }

    // --- SUPER REBIRTH ---
    const maxSuper = calculateMaxSuperRebirths();
    const superBonus = state.superRebirths * 250; // Updated to 250x

    const sMultDisp = document.getElementById('super-mult-display');
    const sCurrDisp = document.getElementById('super-currency-display');
    if (sMultDisp) sMultDisp.innerText = `+${formatShort(superBonus)}x`;
    if (sCurrDisp) sCurrDisp.innerText = `${formatShort(state.superCurrency)} 🌀`;

    const superBtn = document.getElementById('super-rebirth-btn');
    if (superBtn) {
        if (maxSuper > 0) {
            superBtn.innerText = `Buy Max (${formatShort(maxSuper)}) for ${formatShort(maxSuper * 10000)} Rebirths`;
            superBtn.classList.remove('disabled');
        } else {
            const needed = 10000 - (state.rebirths % 10000);
            superBtn.innerText = `Need ${formatShort(needed)} More Rebirths`;
            superBtn.classList.add('disabled');
        }
    }
}
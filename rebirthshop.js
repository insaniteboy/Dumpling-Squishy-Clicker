// rebirthshop.js
// ==========================================
// EXPANDED REBIRTH & SUPER REBIRTH SHOP
// Includes Perm Skins, Huge Upgrades, and Resized UI
// ==========================================

// --- Inject Shop Styles ---
const rebirthShopStyles = document.createElement('style');
rebirthShopStyles.innerHTML = `
    /* Floating Shop Button */
    #open-rebirthshop-btn {
        position: fixed;
        top: 80px; 
        left: 20px;
        background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
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
        box-shadow: 0 8px 25px rgba(253, 160, 133, 0.6);
        z-index: 99;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        text-shadow: 0 2px 4px rgba(0,0,0,0.4);
    }

    #open-rebirthshop-btn:hover {
        transform: translateY(-5px) scale(1.08);
        box-shadow: 0 12px 35px rgba(253, 160, 133, 0.9);
        border-color: #fff;
    }

    /* Resized Shop Modal */
    .rebirth-shop-modal {
        width: 750px !important; /* Increased from 520px */
        max-width: 95vw;
        height: 750px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
    }

    /* Scrollable Container Formatting */
    .shop-scroll-area {
        flex: 1;
        overflow-y: auto;
        padding-right: 10px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    /* Custom Scrollbar */
    .shop-scroll-area::-webkit-scrollbar {
        width: 8px;
    }
    .shop-scroll-area::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
    }
    .shop-scroll-area::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    }
    .shop-scroll-area::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.4);
    }

    .shop-item-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: 0.2s;
    }
    
    .shop-item-card:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.4);
        transform: scale(1.01);
    }

    .shop-item-info {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .shop-item-icon {
        font-size: 2.5rem;
        filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));
        min-width: 50px;
        text-align: center;
    }

    .shop-item-text h4 {
        margin: 0 0 6px 0;
        color: white;
        font-size: 1.25rem;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }

    .shop-item-text p {
        margin: 0;
        color: rgba(255, 255, 255, 0.75);
        font-size: 0.95rem;
    }

    .shop-buy-btn {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 900;
        font-size: 1.05rem;
        cursor: pointer;
        transition: 0.3s;
        min-width: 140px;
    }

    .shop-buy-btn:hover:not(:disabled) {
        background: #fda085;
        border-color: #fff;
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(253, 160, 133, 0.6);
    }

    .shop-buy-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .shop-buy-btn.owned {
        background: linear-gradient(135deg, #43a047, #2e7d32);
        border-color: #81c784;
        cursor: default;
        box-shadow: inset 0 2px 5px rgba(0,0,0,0.3);
    }
    .shop-buy-btn.owned:hover { transform: none; box-shadow: none; }
    
    .skin-tag {
        display: inline-block;
        background: linear-gradient(135deg, #f093fb, #f5576c);
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: bold;
        margin-left: 10px;
        vertical-align: middle;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
`;
document.head.appendChild(rebirthShopStyles);

// --- Massive Shop Item Database ---
const REBIRTH_SHOP_ITEMS = [
    // Early Game
    { id: 'rs_click_1', name: 'Golden Fingertips', desc: '+10 Base Click Power', cost: 25, type: 'click', val: 10, icon: '👆' },
    { id: 'rs_sps_1',   name: 'Permanent Bakery',  desc: '+50 Base SPS', cost: 50, type: 'sps', val: 50, icon: '🏭' },
    { id: 'rs_mult_1',  name: 'Ascended Dough',    desc: '+0.5x Base Multiplier', cost: 200, type: 'mult', val: 0.5, icon: '✨' },
    
    // Mid Game
    { id: 'rs_click_2', name: 'Divine Clicker',    desc: '+250 Base Click Power', cost: 500, type: 'click', val: 250, icon: '🖱️' },
    { id: 'rs_sps_2',   name: 'Heavenly Factory',  desc: '+1,500 Base SPS', cost: 1500, type: 'sps', val: 1500, icon: '☁️' },
    { id: 'rs_mult_2',  name: 'Golden Ratio',      desc: '+2.0x Base Multiplier', cost: 3500, type: 'mult', val: 2.0, icon: '📐' },
    
    // Late Game
    { id: 'rs_skin_1',  name: 'Ascendant Aura',    desc: 'Unlocks the permanent Golden Ascendant Skin', cost: 10000, type: 'skin', skinId: 'ascendant', icon: '👑', isSkin: true },
    { id: 'rs_click_3', name: 'Godly Clicks',      desc: '+5,000 Base Click Power', cost: 15000, type: 'click', val: 5000, icon: '⚡' },
    { id: 'rs_sps_3',   name: 'Reality Baker',     desc: '+50,000 Base SPS', cost: 45000, type: 'sps', val: 50000, icon: '🌌' },
    
    // End Game
    { id: 'rs_mult_3',  name: 'Infinity Multiplier', desc: '+15.0x Base Multiplier', cost: 125000, type: 'mult', val: 15.0, icon: '♾️' },
    { id: 'rs_click_4', name: 'The Final Finger',  desc: '+250,000 Base Click Power', cost: 500000, type: 'click', val: 250000, icon: '🔥' }
];

const SUPER_SHOP_ITEMS = [
    // Phase 1
    { id: 'ss_click_1', name: 'Cosmic Start',      desc: '+10,000 Base Click', cost: 1, type: 'click', val: 10000, icon: '☄️' },
    { id: 'ss_sps_1',   name: 'Nebula Engine',     desc: '+50,000 Base SPS', cost: 3, type: 'sps', val: 50000, icon: '🌠' },
    { id: 'ss_mult_1',  name: 'Supernova Mult',    desc: '+5.0x Base Multiplier', cost: 5, type: 'mult', val: 5.0, icon: '💥' },
    
    // Phase 2
    { id: 'ss_sps_2',   name: 'Galactic Dominance',desc: '+250,000 Base SPS', cost: 15, type: 'sps', val: 250000, icon: '🪐' },
    { id: 'ss_click_2', name: 'Big Bang Clicks',   desc: '+1,000,000 Base Click', cost: 35, type: 'click', val: 1000000, icon: '🎆' },
    { id: 'ss_mult_2',  name: 'Developer Soul',    desc: '+50.0x Base Multiplier', cost: 75, type: 'mult', val: 50.0, icon: '💻' },
    
    // Phase 3 (Perm Skins & Mega Stats)
    { id: 'ss_skin_1',  name: 'Galactic Overlord', desc: 'Unlocks the permanent Galactic Overlord Skin', cost: 150, type: 'skin', skinId: 'galactic', icon: '👽', isSkin: true },
    { id: 'ss_sps_3',   name: 'Black Hole Generator', desc: '+15,000,000 Base SPS', cost: 350, type: 'sps', val: 15000000, icon: '🕳️' },
    { id: 'ss_click_3', name: 'Multiversal Power', desc: '+50,000,000 Base Click', cost: 1000, type: 'click', val: 50000000, icon: '🌌' },
    
    // Phase 4
    { id: 'ss_mult_3',  name: 'Universal Multiplier', desc: '+250.0x Base Multiplier', cost: 2500, type: 'mult', val: 250.0, icon: '⚛️' },
    { id: 'ss_skin_2',  name: 'The Source Code',   desc: 'Unlocks the true Developer Skin (Perm)', cost: 5000, type: 'skin', skinId: 'sourcecode', icon: '⌨️', isSkin: true },
    { id: 'ss_sps_4',   name: 'Omni-Baker',        desc: '+1,000,000,000 Base SPS', cost: 15000, type: 'sps', val: 1000000000, icon: '👑' }
];

// --- Formatter Fallback ---
function safeFormatShort(num) {
    if (typeof formatShort === 'function') return formatShort(num);
    if (num < 1000) return num.toString();
    const suffixes = ["", "k", "m", "b", "t", "qa", "qi", "sx", "sp", "oc", "no", "dc"];
    const suffixIndex = Math.floor(Math.log10(num) / 3);
    const scaled = num / Math.pow(10, suffixIndex * 3);
    return scaled.toFixed(1).replace(/\.0$/, '') + suffixes[suffixIndex];
}

// --- Initialize UI ---
function initRebirthShopUI() {
    if (document.getElementById('open-rebirthshop-btn')) return;

    // Create Opening Button
    const openBtn = document.createElement('button');
    openBtn.id = 'open-rebirthshop-btn';
    openBtn.innerHTML = '🛍️ Rebirth Shop';
    openBtn.onclick = (e) => {
        e.stopPropagation(); // Stops dumpling click
        toggleRebirthShopModal();
    };
    document.body.appendChild(openBtn);

    // Create Modal Overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'rebirth-shop-overlay';
    modalOverlay.className = 'rebirth-modal-overlay';
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            toggleRebirthShopModal();
        } else {
            e.stopPropagation(); // Stops dumpling clicks inside the modal
        }
    });

    // Notice the addition of the "rebirth-shop-modal" class for the larger size
    modalOverlay.innerHTML = `
        <div class="rebirth-modal rebirth-shop-modal">
            <div class="rebirth-modal-header">
                <div class="rebirth-modal-title">Exclusive Shop</div>
                <button class="close-modal-btn" onclick="toggleRebirthShopModal()">✕</button>
            </div>

            <div class="rebirth-sub-tabs" style="flex-shrink: 0;">
                <div class="rebirth-sub-tab active" id="tab-rs-normal" onclick="switchRebirthShopTab('normal')">Rebirth Items</div>
                <div class="rebirth-sub-tab" id="tab-rs-super" onclick="switchRebirthShopTab('super')">Super Items</div>
            </div>
            
            <div id="shop-normal-panel" class="rebirth-content-area active" style="flex: 1; display: flex; flex-direction: column; overflow: hidden;">
                <div style="text-align: center; margin-bottom: 15px; font-size: 1.2rem; font-weight: 900; color: #ff7eb3; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                    Your Rebirths: <span id="shop-rebirth-count">0</span>
                </div>
                <div id="rs-items-container" class="shop-scroll-area"></div>
            </div>

            <div id="shop-super-panel" class="rebirth-content-area" style="flex: 1; display: none; flex-direction: column; overflow: hidden;">
                <div style="text-align: center; margin-bottom: 15px; font-size: 1.2rem; font-weight: 900; color: #3498db; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                    Your Super Currency: <span id="shop-super-currency">0</span> 🌀
                </div>
                <div id="ss-items-container" class="shop-scroll-area"></div>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);
    renderShopItems();
}

function toggleRebirthShopModal() {
    const modal = document.getElementById('rebirth-shop-overlay');
    if (modal.classList.contains('open')) {
        modal.classList.remove('open');
    } else {
        updateShopCurrencyDisplays();
        renderShopItems();
        modal.classList.add('open');
    }
}

function switchRebirthShopTab(tabName) {
    document.getElementById('tab-rs-normal').classList.remove('active');
    document.getElementById('tab-rs-super').classList.remove('active');
    
    // Explicitly toggle flex display for the shop panels
    document.getElementById('shop-normal-panel').style.display = 'none';
    document.getElementById('shop-super-panel').style.display = 'none';
    document.getElementById('shop-normal-panel').classList.remove('active');
    document.getElementById('shop-super-panel').classList.remove('active');

    if (tabName === 'normal') {
        document.getElementById('tab-rs-normal').classList.add('active');
        document.getElementById('shop-normal-panel').classList.add('active');
        document.getElementById('shop-normal-panel').style.display = 'flex';
    } else {
        document.getElementById('tab-rs-super').classList.add('active');
        document.getElementById('shop-super-panel').classList.add('active');
        document.getElementById('shop-super-panel').style.display = 'flex';
    }
}

function updateShopCurrencyDisplays() {
    const rCount = document.getElementById('shop-rebirth-count');
    const sCount = document.getElementById('shop-super-currency');
    if (rCount && state) rCount.innerText = safeFormatShort(state.rebirths || 0);
    if (sCount && state) sCount.innerText = safeFormatShort(state.superCurrency || 0);
}

// --- Core Shop Logic ---
function renderShopItems() {
    if (!state.rShopOwned) state.rShopOwned = {};
    if (!state.sShopOwned) state.sShopOwned = {};

    const rsContainer = document.getElementById('rs-items-container');
    const ssContainer = document.getElementById('ss-items-container');
    if (!rsContainer || !ssContainer) return;

    rsContainer.innerHTML = '';
    ssContainer.innerHTML = '';

    // Render Normal Rebirth Items
    REBIRTH_SHOP_ITEMS.forEach(item => {
        const isOwned = state.rShopOwned[item.id];
        const canAfford = (state.rebirths || 0) >= item.cost;
        const skinTag = item.isSkin ? `<span class="skin-tag">PERM SKIN</span>` : '';
        
        let btnHtml = `<button class="shop-buy-btn ${isOwned ? 'owned' : ''}" 
                        ${isOwned || !canAfford ? 'disabled' : ''} 
                        onclick="buyShopItem('normal', '${item.id}')">
                        ${isOwned ? 'Owned' : `Cost: ${safeFormatShort(item.cost)}`}
                       </button>`;

        rsContainer.innerHTML += `
            <div class="shop-item-card">
                <div class="shop-item-info">
                    <div class="shop-item-icon">${item.icon}</div>
                    <div class="shop-item-text">
                        <h4>${item.name} ${skinTag}</h4>
                        <p>${item.desc}</p>
                    </div>
                </div>
                ${btnHtml}
            </div>
        `;
    });

    // Render Super Items
    SUPER_SHOP_ITEMS.forEach(item => {
        const isOwned = state.sShopOwned[item.id];
        const canAfford = (state.superCurrency || 0) >= item.cost;
        const skinTag = item.isSkin ? `<span class="skin-tag" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">PERM SKIN</span>` : '';
        
        let btnHtml = `<button class="shop-buy-btn ${isOwned ? 'owned' : ''}" 
                        ${isOwned || !canAfford ? 'disabled' : ''} 
                        onclick="buyShopItem('super', '${item.id}')">
                        ${isOwned ? 'Owned' : `Cost: ${safeFormatShort(item.cost)} 🌀`}
                       </button>`;

        ssContainer.innerHTML += `
            <div class="shop-item-card" style="border-color: rgba(52, 152, 219, 0.3);">
                <div class="shop-item-info">
                    <div class="shop-item-icon">${item.icon}</div>
                    <div class="shop-item-text">
                        <h4>${item.name} ${skinTag}</h4>
                        <p>${item.desc}</p>
                    </div>
                </div>
                ${btnHtml}
            </div>
        `;
    });
}

window.buyShopItem = function(tier, id) {
    if (tier === 'normal') {
        const item = REBIRTH_SHOP_ITEMS.find(i => i.id === id);
        if (item && !state.rShopOwned[id] && state.rebirths >= item.cost) {
            state.rebirths -= item.cost;
            state.rShopOwned[id] = true;
            applyShopBonuses();
        }
    } else if (tier === 'super') {
        const item = SUPER_SHOP_ITEMS.find(i => i.id === id);
        if (item && !state.sShopOwned[id] && state.superCurrency >= item.cost) {
            state.superCurrency -= item.cost;
            state.sShopOwned[id] = true;
            applyShopBonuses();
        }
    }
    updateShopCurrencyDisplays();
    renderShopItems();
    if (typeof updateRebirthUIValues === 'function') updateRebirthUIValues();
    if (typeof updateUI === 'function') updateUI();
    if (typeof renderSkins === 'function') renderSkins(); // Refresh skin menu if open
};

// --- Integration & Patches ---
function applyShopBonuses() {
    let bonusClick = 0;
    let bonusSPS = 0;

    if (!state.unlockedSkins) state.unlockedSkins = {};

    // Accumulate all owned base additions and re-verify perm skins
    const allItems = [...REBIRTH_SHOP_ITEMS, ...SUPER_SHOP_ITEMS];
    allItems.forEach(item => {
        const isNormalOwned = state.rShopOwned && state.rShopOwned[item.id];
        const isSuperOwned = state.sShopOwned && state.sShopOwned[item.id];
        
        if (isNormalOwned || isSuperOwned) {
            if (item.type === 'click') bonusClick += item.val;
            if (item.type === 'sps') bonusSPS += item.val;
            
            // PERM SKIN LOGIC: Force unlock the skin if owned
            if (item.type === 'skin') {
                state.unlockedSkins[item.skinId] = true;
            }
        }
    });

    // Inject base stats natively
    state.clickPower += bonusClick;
    state.sps += bonusSPS;
    
    if (typeof calculateMultiplier === 'function') calculateMultiplier();
    if (typeof recalculateSPS === 'function') recalculateSPS();
}

document.addEventListener("DOMContentLoaded", () => {
    initRebirthShopUI();

    // Data init safeguards
    if (typeof state !== 'undefined') {
        if (!state.rShopOwned) state.rShopOwned = {};
        if (!state.sShopOwned) state.sShopOwned = {};
    }

    // 1. Monkey-Patch to prevent upgrades wiping from stripping permanent Shop Upgrades
    const originalWipeUpgrades = window.wipeUpgradesForRebirth;
    if (typeof originalWipeUpgrades === 'function') {
        window.wipeUpgradesForRebirth = function() {
            originalWipeUpgrades(); 
            applyShopBonuses();     // Instantly refund the permanent stats and perm skins.
        };
    }

    // 2. Monkey-Patch to ensure Super Rebirth wiping skins doesn't kill Perm Skins
    const originalTriggerSuperRebirth = window.triggerSuperRebirth;
    if (typeof originalTriggerSuperRebirth === 'function') {
        window.triggerSuperRebirth = function() {
            originalTriggerSuperRebirth();
            // Super Rebirth loops through and sets all skins to false. 
            // We run applyShopBonuses() right after to force the Perm Skins back to true.
            applyShopBonuses();
            if (typeof renderSkins === 'function') renderSkins();
        };
    }

// 3. Monkey-Patch Multiplier Math to insert Shop Multipliers & Skin Perks
    const originalCalcMulti = window.calculateMultiplier;
    if (typeof originalCalcMulti === 'function') {
        window.calculateMultiplier = function() {
            // Run the base game's multiplier math first
            originalCalcMulti(); 

            let extraBonus = 0;
            
            // A. Apply Standard Rebirth Shop Multipliers
            const allItems = [...REBIRTH_SHOP_ITEMS, ...SUPER_SHOP_ITEMS];
            allItems.forEach(item => {
                const isNormalOwned = state.rShopOwned && state.rShopOwned[item.id];
                const isSuperOwned = state.sShopOwned && state.sShopOwned[item.id];
                if ((isNormalOwned || isSuperOwned) && item.type === 'mult') {
                    extraBonus += item.val;
                }
            });

            // B. Apply Exclusive Equipped Skin Perks
            let activeSkinPerkText = "";
            if (state.currentSkin && typeof SKINS_DATA !== 'undefined') {
                const activeSkin = SKINS_DATA.find(s => s.id === state.currentSkin);
                if (activeSkin && activeSkin.isExclusive && activeSkin.perkMult) {
                    extraBonus += activeSkin.perkMult;
                    activeSkinPerkText = ` | 👑 ${activeSkin.name} Perk: +${activeSkin.perkMult}x`;
                }
            }

            // C. Append extra multiplier on top of existing base and skin multipliers
            if (typeof currentMultiplier !== 'undefined') {
                currentMultiplier += extraBonus;
                
                // Update the UI to show the player their skin is buffing them
                const multiplierDisplay = document.getElementById('multiplier-display');
                if (multiplierDisplay) {
                    multiplierDisplay.innerText = `${currentMultiplier.toFixed(2)}x Total Multiplier${activeSkinPerkText}`;
                    
                    // Optional: Make the text glow if an exclusive skin is equipped
                    if (activeSkinPerkText !== "") {
                        multiplierDisplay.style.color = "#f6d365";
                        multiplierDisplay.style.textShadow = "0 0 10px rgba(246, 211, 101, 0.8)";
                    } else {
                        multiplierDisplay.style.color = ""; // Reset to default
                        multiplierDisplay.style.textShadow = "";
                    }
                }
            }
        };
    }

    // Run first time to apply existing data
    applyShopBonuses();
});
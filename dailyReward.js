// dailyRewards.js
// ==========================================
// DAILY REWARDS SYSTEM (SKINS & DYNAMIC UI)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const dailyRewards = [
        // Buffed early game
        { day: 1, type: 'currency', amount: 25000, label: "25K", iconCount: 1, img: "assets/standard_dumpling.png" },
        { day: 2, type: 'currency', amount: 150000, label: "150K", iconCount: 2, img: "assets/standard_dumpling.png" },
        
        // Day 3 Skin
        { day: 3, type: 'skin', skinId: 'rainbow', fallbackAmount: 500000, label: "Rainbow Skin", img: "assets/ninja_dumpling.png" },
        
        // Buffed mid game
        { day: 4, type: 'currency', amount: 2500000, label: "2.5M", iconCount: 3, img: "assets/standard_dumpling.png" },
        
        // Extra skin unlock on Day 5
        { day: 5, type: 'skin', skinId: 'diamond', fallbackAmount: 10000000, label: "Diamond Skin", img: "image_664828.png" },
        
        // Golden currency day using a golden icon
        { day: 6, type: 'currency', amount: 50000000, label: "50M", iconCount: 3, img: "assets/golden_dumpling.png" },
        
        // Massive Day 7 bonus
        { day: 7, type: 'skin', skinId: 'gold', fallbackAmount: 750000000, label: "Gold Skin", img: "assets/golden_dumpling.png" }
    ];

    // Generates the HTML for the dumpling emojis (prevents broken assets)
    function getRewardGraphics(reward) {
        let html = '<div class="reward-graphics" style="display: flex; justify-content: center; gap: 5px; font-size: 2rem;">';
        if (reward.type === 'currency') {
            for (let i = 0; i < reward.iconCount; i++) {
                html += `<span>🥟</span>`;
            }
        } else if (reward.type === 'skin') {
            html += `<span>✨</span>`;
        }
        html += '</div>';
        return html;
    }

    const modal = document.getElementById('daily-reward-modal');
    const claimBtn = document.getElementById('claim-reward-btn');
    const gridLeft = document.getElementById('days-grid-left');
    const gridRight = document.getElementById('day-big-right');

    let lastClaimDate = localStorage.getItem('lastClaimDate') || "";
    let currentDayIndex = parseInt(localStorage.getItem('currentRewardDay')) || 0;
    const today = new Date().toDateString();

    function checkDailyReward() {
        if (lastClaimDate !== today) {
            buildUI();
            if (modal) modal.classList.remove('hidden');
        }
    }

    function buildUI() {
        if (!gridLeft || !gridRight) return;
        gridLeft.innerHTML = '';
        gridRight.innerHTML = '';

        dailyRewards.forEach((reward, index) => {
            let statusClass = "";
            if (index < currentDayIndex) statusClass = "claimed";
            else if (index === currentDayIndex) statusClass = "current";

            let displayLabel = reward.label;
            if (reward.type === 'skin' && typeof state !== 'undefined' && state.unlockedSkins[reward.skinId]) {
                displayLabel = `Owned (+${formatNumber(reward.fallbackAmount)})`;
            }

            const graphicsHTML = getRewardGraphics(reward);

            if (reward.day < 7) {
                gridLeft.innerHTML += `
                    <div class="day-card ${statusClass}">
                        <div class="day-label">Day ${reward.day}</div>
                        ${graphicsHTML}
                        <div class="reward-amount">${displayLabel}</div>
                    </div>
                `;
            } else {
                gridRight.innerHTML = `
                    <div class="day-card-big ${statusClass}">
                        <div class="day-label">Day 7 Bonus</div>
                        ${graphicsHTML}
                        <div class="reward-amount">${displayLabel}</div>
                    </div>
                `;
            }
        });
    }

    if (claimBtn) {
        claimBtn.addEventListener('click', () => {
            const reward = dailyRewards[currentDayIndex];
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            if (typeof state !== 'undefined') {
                if (reward.type === 'currency') {
                    state.score += reward.amount;
                    if (typeof createFloatingText === 'function') {
                        createFloatingText(centerX, centerY, `Daily +${formatNumber(reward.amount)}!`);
                    }
                } else if (reward.type === 'skin') {
                    if (state.unlockedSkins[reward.skinId]) {
                        state.score += reward.fallbackAmount;
                        if (typeof createFloatingText === 'function') {
                            createFloatingText(centerX, centerY, `Skin Owned: +${formatNumber(reward.fallbackAmount)}!`);
                        }
                    } else {
                        state.unlockedSkins[reward.skinId] = true;
                        
                        if (typeof calculateMultiplier === 'function') calculateMultiplier();
                        if (typeof recalculateSPS === 'function') recalculateSPS();
                        if (typeof renderSkins === 'function') renderSkins();
                        
                        if (typeof createFloatingText === 'function') {
                            createFloatingText(centerX, centerY, `Unlocked: ${reward.label}!`);
                        }
                    }
                }
            }

            // Advance the day tracker
            lastClaimDate = today;
            currentDayIndex++;
            if (currentDayIndex >= dailyRewards.length) {
                currentDayIndex = 0; 
            }

            localStorage.setItem('lastClaimDate', lastClaimDate);
            localStorage.setItem('currentRewardDay', currentDayIndex.toString());

            if (typeof updateUI === 'function') updateUI();
            if (modal) modal.classList.add('hidden');
        });
    }

    checkDailyReward();
});
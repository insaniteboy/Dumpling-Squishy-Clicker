// achievements.js
// ==========================================
// DUMPLING SQUISHY CLICKER - ACHIEVEMENT SYSTEM
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. INJECT STYLES ---
    const achStyles = document.createElement('style');
    achStyles.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');

        :root {
            --ach-bg-dark: rgba(15, 15, 20, 0.85);
            --ach-border: rgba(255, 255, 255, 0.1);
            --ach-accent: #6c5ce7;
            --ach-accent-glow: rgba(108, 92, 231, 0.5);
            --ach-success: #00b894;
            --ach-text-main: #f5f6fa;
            --ach-text-muted: #a4b0be;
        }

        /* Floating Achievement Button */
        #open-achievements-btn {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: linear-gradient(135deg, rgba(108, 92, 231, 0.85) 0%, rgba(162, 155, 254, 0.85) 100%);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            color: #ffffff;
            border: 2px solid rgba(255, 255, 255, 0.6);
            padding: 12px 24px;
            font-size: 1.1rem;
            font-weight: 900;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(108, 92, 231, 0.4);
            z-index: 98;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-family: 'Nunito', sans-serif;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        #open-achievements-btn:hover {
            transform: scale(1.05) translateY(-3px);
            box-shadow: 0 12px 30px rgba(108, 92, 231, 0.7);
            background: linear-gradient(135deg, rgba(108, 92, 231, 1) 0%, rgba(162, 155, 254, 1) 100%);
        }

        /* Notification Badge */
        .ach-badge {
            background: #ff4757;
            color: white;
            font-size: 0.8rem;
            padding: 2px 8px;
            border-radius: 12px;
            display: none;
            animation: pulseBadge 1.5s infinite;
        }
        .ach-badge.visible { display: inline-block; }

        @keyframes pulseBadge {
            0% { transform: scale(1); }
            50% { transform: scale(1.25); }
            100% { transform: scale(1); }
        }

        /* Achievement Modal Overlay */
        .ach-modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
        }

        .ach-modal-overlay.open {
            opacity: 1;
            pointer-events: auto;
        }

        /* Premium Modal Content */
        .ach-modal-content {
            background: var(--ach-bg-dark);
            width: 600px;
            max-width: 90vw;
            height: 75vh;
            border-radius: 20px;
            padding: 30px 40px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1);
            border: 1px solid var(--ach-border);
            display: flex;
            flex-direction: column;
            transform: translateY(20px) scale(0.95);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: 'Inter', sans-serif;
            position: relative;
        }

        .ach-modal-overlay.open .ach-modal-content { transform: translateY(0) scale(1); }

        .ach-header {
            text-align: left;
            font-size: 1.8rem;
            font-weight: 900;
            color: var(--ach-text-main);
            margin-bottom: 25px;
            letter-spacing: -0.5px;
            display: flex;
            align-items: center;
            gap: 10px;
            border-bottom: 1px solid var(--ach-border);
            padding-bottom: 15px;
        }

        .ach-close-btn {
            position: absolute;
            top: 30px;
            right: 40px;
            background: transparent;
            color: var(--ach-text-muted);
            border: none;
            width: 32px;
            height: 32px;
            font-size: 1.2rem;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .ach-close-btn:hover { 
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
        }

        .ach-list {
            flex-grow: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding-right: 15px;
        }
        
        .ach-list::-webkit-scrollbar { width: 6px; }
        .ach-list::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); border-radius: 10px; }
        .ach-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }

        /* Sleek Cards */
        .ach-item {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 16px;
            padding: 16px 20px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
            position: relative;
        }

        .ach-item.locked { opacity: 0.6; }

        .ach-item.ready {
            background: rgba(108, 92, 231, 0.1);
            border-color: rgba(108, 92, 231, 0.3);
            box-shadow: inset 0 0 20px rgba(108, 92, 231, 0.05);
        }

        .ach-item.claimed {
            background: rgba(0, 184, 148, 0.05);
            border-color: rgba(0, 184, 148, 0.2);
        }

        .ach-icon { 
            font-size: 2.2rem; 
            margin-right: 20px;
            background: rgba(255, 255, 255, 0.05);
            padding: 12px;
            border-radius: 12px;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .ach-info { flex-grow: 1; width: 50%; }
        .ach-title { font-weight: 800; font-size: 1.1rem; color: var(--ach-text-main); margin: 0 0 4px 0; }
        .ach-desc { font-size: 0.9rem; color: var(--ach-text-muted); margin: 0; line-height: 1.4; }
        .ach-reward { 
            font-size: 0.8rem; 
            font-weight: 800; 
            color: #ffeaa7; 
            margin-top: 8px; 
            display: inline-block;
            background: rgba(255, 234, 167, 0.1);
            padding: 4px 10px;
            border-radius: 6px;
        }

        /* Progress Bar Styles */
        .ach-progress-container {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            height: 6px;
            margin-top: 10px;
            overflow: hidden;
            width: 100%;
        }
        .ach-progress-bar {
            background: linear-gradient(90deg, var(--ach-accent), #a29bfe);
            height: 100%;
            transition: width 0.3s ease;
            border-radius: 10px;
        }
        .ach-progress-text {
            font-size: 0.75rem;
            color: var(--ach-text-muted);
            margin-top: 4px;
            text-align: right;
            font-weight: 600;
        }

        /* Modernized Claim Button */
        .ach-claim-btn {
            background: linear-gradient(135deg, var(--ach-accent) 0%, #a29bfe 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 4px 15px var(--ach-accent-glow);
            transition: all 0.2s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            animation: pulseBadge 2s infinite;
        }
        .ach-claim-btn:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 6px 20px rgba(108, 92, 231, 0.6); 
        }

        .ach-status-text {
            font-weight: 800;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            min-width: 80px;
            text-align: center;
        }
        .ach-status-text.locked { color: rgba(255, 255, 255, 0.3); }
        .ach-status-text.claimed { color: var(--ach-success); }

        /* Toast Popup Overhaul */
        #ach-toast-container {
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            z-index: 9999;
            pointer-events: none;
        }

        .ach-toast {
            background: var(--ach-bg-dark);
            backdrop-filter: blur(12px);
            color: var(--ach-text-main);
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            gap: 16px;
            animation: toastSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            border: 1px solid var(--ach-border);
            border-left: 4px solid var(--ach-accent);
        }

        @keyframes toastSlide {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(achStyles);

    // --- 2. DATA & STATE MANAGEMENT ---
    let claimedAchievements = JSON.parse(localStorage.getItem('squishy_claimed_ach')) || [];
    let notifiedAchievements = JSON.parse(localStorage.getItem('squishy_notified_ach')) || [];
    let localStats = JSON.parse(localStorage.getItem('squishy_local_stats')) || { totalClicks: 0 };

    document.addEventListener('mousedown', (e) => {
        if (e.target.closest('#click-area') || e.target.closest('#main-dumpling')) {
            localStats.totalClicks++;
            localStorage.setItem('squishy_local_stats', JSON.stringify(localStats));
        }
    });

    function getCurrentScore() {
        if (typeof state !== 'undefined' && state.score !== undefined) return state.score;
        if (typeof score !== 'undefined') return score;
        return 0;
    }

    function getCurrentRebirths() {
        if (typeof state !== 'undefined' && state.rebirths !== undefined) return state.rebirths;
        if (typeof rebirths !== 'undefined') return rebirths;
        return 0;
    }

    function getCurrentSPS() {
        if (typeof totalSPS !== 'undefined') return totalSPS;
        return 0;
    }

    // --- REWARD GRANTING HELPERS ---
    function addDumplings(amount) {
        if (typeof state !== 'undefined' && state.score !== undefined) state.score += amount;
        if (typeof score !== 'undefined') score += amount;
    }
    function addRebirths(amount) {
        if (typeof state !== 'undefined' && state.rebirths !== undefined) state.rebirths += amount;
        if (typeof rebirths !== 'undefined') rebirths += amount;
    }
    function addSuperRebirths(amount) {
        if (typeof state !== 'undefined' && state.superRebirths !== undefined) state.superRebirths += amount;
        if (typeof superRebirths !== 'undefined') superRebirths += amount;
    }
    function unlockSkin(skinId) {
        if (typeof state !== 'undefined' && state.unlockedSkins !== undefined) {
            state.unlockedSkins[skinId] = true;
            if (typeof saveGame === 'function') saveGame();
            if (typeof renderSkins === 'function') renderSkins();
        }
    }

    // Expanded & Re-balanced Achievement List
    const ACHIEVEMENTS = [
        // --- CLICK ACHIEVEMENTS ---
        { 
            id: 'click_100', name: "Apprentice Squisher", icon: "👆", desc: "Squish the dumpling 100 times.", 
            current: () => localStats.totalClicks, max: 100, 
            req: function() { return this.current() >= this.max; }, rewardText: "+10,000 Dumplings", grantReward: () => addDumplings(10000) 
        },
        { 
            id: 'click_1k', name: "Dough Maniac", icon: "🔥", desc: "Squish the dumpling 1,000 times.", 
            current: () => localStats.totalClicks, max: 1000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+250,000 Dumplings", grantReward: () => addDumplings(250000) 
        },
        { 
            id: 'click_10k', name: "Riding the Wave", icon: "🌊", desc: "Accumulate 10,000 total squishes.", 
            current: () => localStats.totalClicks, max: 10000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+1,000,000 Dumplings", grantReward: () => addDumplings(1000000) 
        },
        { 
            id: 'click_50k', name: "JavaScript Injector", icon: "💻", desc: "Modify the dough by clicking 50,000 times.", 
            current: () => localStats.totalClicks, max: 50000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+5 Rebirths", grantReward: () => addRebirths(5) 
        },
        { 
            id: 'click_100k', name: "Carpal Tunnel", icon: "🏥", desc: "Squish the dumpling 100,000 times.", 
            current: () => localStats.totalClicks, max: 100000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+15 Rebirths", grantReward: () => addRebirths(15) 
        },
        { 
            id: 'click_500k', name: "Finger of Steel", icon: "🦾", desc: "Squish the dumpling 500,000 times.", 
            current: () => localStats.totalClicks, max: 500000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+50 Rebirths", grantReward: () => addRebirths(50) 
        },
        { 
            id: 'click_1m', name: "The Auto-Clicker", icon: "🤖", desc: "Squish the dumpling 1,000,000 times.", 
            current: () => localStats.totalClicks, max: 1000000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+100 Rebirths & Cyborg Skin", grantReward: () => { addRebirths(100); unlockSkin('ach_cyborg'); } 
        },
        { 
            id: 'click_5m', name: "Mouse Destroyer", icon: "🖱️", desc: "An unbelievable 5,000,000 manual clicks.", 
            current: () => localStats.totalClicks, max: 5000000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+5 Super Rebirths & Golden Mouse Skin", grantReward: () => { addSuperRebirths(5); unlockSkin('ach_golden_mouse'); } 
        },

        // --- SCORE ACHIEVEMENTS ---
        { 
            id: 'score_1m', name: "First Million!", icon: "💰", desc: "Reach 1,000,000 Dumplings.", 
            current: () => getCurrentScore(), max: 1000000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+500,000 Dumplings", grantReward: () => addDumplings(500000) 
        },
        { 
            id: 'score_50m', name: "Sheriff's Bounty", icon: "🤠", desc: "Reach a bounty of 50,000,000 Dumplings.", 
            current: () => getCurrentScore(), max: 50000000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+5,000,000 Dumplings", grantReward: () => addDumplings(5000000) 
        },
        { 
            id: 'score_1b', name: "Granny's Legacy Recipe", icon: "👵", desc: "Reach 1,000,000,000 Dumplings.", 
            current: () => getCurrentScore(), max: 1000000000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+10 Rebirths", grantReward: () => addRebirths(10) 
        },
        { 
            id: 'score_100b', name: "Dumpling Monopoly", icon: "🎩", desc: "Reach 100 Billion Dumplings.", 
            current: () => getCurrentScore(), max: 100000000000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+50 Rebirths", grantReward: () => addRebirths(50) 
        },
        { 
            id: 'score_1t', name: "Trillionaire Baker", icon: "🚀", desc: "Reach 1 Trillion Dumplings.", 
            current: () => getCurrentScore(), max: 1000000000000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+250 Rebirths", grantReward: () => addRebirths(250) 
        },
        { 
            id: 'score_1qd', name: "Quadrillionaire", icon: "🌌", desc: "Reach 1 Quadrillion Dumplings.", 
            current: () => getCurrentScore(), max: 1000000000000000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+5 Super Rebirths", grantReward: () => addSuperRebirths(5) 
        },
        { 
            id: 'score_1qi', name: "Quintillionaire Dough", icon: "💎", desc: "Reach 1 Quintillion Dumplings. Literally insane.", 
            current: () => getCurrentScore(), max: 1000000000000000000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+15 Super Rebirths & Diamond Crust Skin", grantReward: () => { addSuperRebirths(15); unlockSkin('ach_diamond'); } 
        },

        // --- REBIRTH ACHIEVEMENTS ---
        { 
            id: 'rebirth_1', name: "A New Life", icon: "✨", desc: "Rebirth for the first time.", 
            current: () => getCurrentRebirths(), max: 1, 
            req: function() { return this.current() >= this.max; }, rewardText: "+10 Rebirths", grantReward: () => addRebirths(10) 
        },
        { 
            id: 'rebirth_10', name: "The Insane Elevator", icon: "🛗", desc: "Ascend quickly to 10 Rebirths.", 
            current: () => getCurrentRebirths(), max: 10, 
            req: function() { return this.current() >= this.max; }, rewardText: "+25 Rebirths", grantReward: () => addRebirths(25) 
        },
        { 
            id: 'rebirth_50', name: "Reincarnation Expert", icon: "🧬", desc: "Accumulate 50 Rebirths.", 
            current: () => getCurrentRebirths(), max: 50, 
            req: function() { return this.current() >= this.max; }, rewardText: "+100 Rebirths", grantReward: () => addRebirths(100) 
        },
        { 
            id: 'rebirth_100', name: "Infinite Lua Loop", icon: "🌀", desc: "Automate your existence to 100 Rebirths.", 
            current: () => getCurrentRebirths(), max: 100, 
            req: function() { return this.current() >= this.max; }, rewardText: "+250 Rebirths", grantReward: () => addRebirths(250) 
        },
        { 
            id: 'rebirth_500', name: "Demi-God of Dough", icon: "👑", desc: "Accumulate 500 Rebirths.", 
            current: () => getCurrentRebirths(), max: 500, 
            req: function() { return this.current() >= this.max; }, rewardText: "+1,000 Rebirths", grantReward: () => addRebirths(1000) 
        },
        { 
            id: 'rebirth_1000', name: "Ascended Master", icon: "👁️", desc: "Achieve 1,000 Rebirths.", 
            current: () => getCurrentRebirths(), max: 1000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+10 Super Rebirths", grantReward: () => addSuperRebirths(10) 
        },
        { 
            id: 'rebirth_5000', name: "God of Reincarnation", icon: "🌌", desc: "A grinding legend. 5,000 Rebirths.", 
            current: () => getCurrentRebirths(), max: 5000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+50 Super Rebirths & Cosmic Skin", grantReward: () => { addSuperRebirths(50); unlockSkin('ach_cosmic'); } 
        },

        // --- SPS (SQUISHES PER SECOND) ACHIEVEMENTS ---
        { 
            id: 'sps_1m', name: "Automation Station", icon: "⚙️", desc: "Reach 1,000,000 SPS.", 
            current: () => getCurrentSPS(), max: 1000000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+1,000 Rebirths", grantReward: () => addRebirths(1000) 
        },
        { 
            id: 'sps_1b', name: "Industrial Bakery", icon: "🏭", desc: "Reach 1,000,000,000 SPS.", 
            current: () => getCurrentSPS(), max: 1000000000, 
            req: function() { return this.current() >= this.max; }, rewardText: "+5 Super Rebirths & Mecha Skin", grantReward: () => { addSuperRebirths(5); unlockSkin('ach_mecha'); } 
        }
    ];

    // --- 3. UI INJECTION ---
    const btn = document.createElement('button');
    btn.id = 'open-achievements-btn';
    btn.innerHTML = '🏆 Achievements <span class="ach-badge" id="ach-badge-count">0</span>';
    document.body.appendChild(btn);

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'ach-modal-overlay';
    const modalContent = document.createElement('div');
    modalContent.className = 'ach-modal-content';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'ach-close-btn';
    closeBtn.innerHTML = '✕';
    const header = document.createElement('div');
    header.className = 'ach-header';
    header.innerHTML = '🏆 Achievements';
    const listContainer = document.createElement('div');
    listContainer.className = 'ach-list';

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(header);
    modalContent.appendChild(listContainer);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    const toastContainer = document.createElement('div');
    toastContainer.id = 'ach-toast-container';
    document.body.appendChild(toastContainer);

    // --- 4. RENDER & CLAIM LOGIC ---
    function renderAchievements() {
        listContainer.innerHTML = '';
        let unclaimedCount = 0;

        ACHIEVEMENTS.forEach(ach => {
            const isClaimed = claimedAchievements.includes(ach.id);
            const isUnlocked = ach.req();
            
            if (isUnlocked && !isClaimed) unclaimedCount++;

            // Calculate Progress
            let currentVal = Math.min(ach.current(), ach.max);
            if (isNaN(currentVal)) currentVal = 0;
            const progressPercent = Math.floor((currentVal / ach.max) * 100);

            const item = document.createElement('div');
            let statusHtml = '';
            let progressHtml = '';

            if (isClaimed) {
                item.className = 'ach-item claimed';
                statusHtml = '<div class="ach-status-text claimed">✅ Claimed</div>';
            } else if (isUnlocked) {
                item.className = 'ach-item ready';
                statusHtml = `<button class="ach-claim-btn" data-id="${ach.id}">🎁 Claim!</button>`;
            } else {
                item.className = 'ach-item locked';
                statusHtml = '<div class="ach-status-text locked">🔒 Locked</div>';
                progressHtml = `
                    <div class="ach-progress-container">
                        <div class="ach-progress-bar" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="ach-progress-text">${currentVal.toLocaleString()} / ${ach.max.toLocaleString()}</div>
                `;
            }
            
            item.innerHTML = `
                <div class="ach-icon">${ach.icon}</div>
                <div class="ach-info">
                    <h3 class="ach-title">${ach.name}</h3>
                    <p class="ach-desc">${ach.desc}</p>
                    <p class="ach-reward">Reward: ${ach.rewardText}</p>
                    ${progressHtml}
                </div>
                <div class="ach-status">
                    ${statusHtml}
                </div>
            `;
            listContainer.appendChild(item);
        });

        // Update Notification Badge
        const badge = document.getElementById('ach-badge-count');
        if (unclaimedCount > 0) {
            badge.innerText = unclaimedCount;
            badge.classList.add('visible');
        } else {
            badge.classList.remove('visible');
        }

        // Attach Click Listeners
        document.querySelectorAll('.ach-claim-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const achId = e.target.getAttribute('data-id');
                claimAchievement(achId);
            });
        });
    }

    function claimAchievement(id) {
        if (claimedAchievements.includes(id)) return;
        const ach = ACHIEVEMENTS.find(a => a.id === id);
        
        if (ach && ach.req()) {
            claimedAchievements.push(id);
            localStorage.setItem('squishy_claimed_ach', JSON.stringify(claimedAchievements));
            ach.grantReward();
            if (typeof playSound === 'function') playSound('buy');
            if (typeof updateUI === 'function') updateUI();
            if (typeof renderShop === 'function') renderShop();
            renderAchievements();
        }
    }

    function showToast(ach) {
        if (typeof playSound === 'function') playSound('buy');
        const toast = document.createElement('div');
        toast.className = 'ach-toast';
        toast.innerHTML = `
            <div style="font-size: 1.8rem;">${ach.icon}</div>
            <div>
                <div style="font-weight: 900; font-size: 0.95rem;">Achievement Unlocked!</div>
                <div style="font-size: 0.85rem; opacity: 0.9;">${ach.name}</div>
            </div>
        `;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(50px)';
            toast.style.transition = 'all 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    function checkAchievements() {
        let needsRender = false;
        ACHIEVEMENTS.forEach(ach => {
            if (ach.req() && !notifiedAchievements.includes(ach.id)) {
                notifiedAchievements.push(ach.id);
                localStorage.setItem('squishy_notified_ach', JSON.stringify(notifiedAchievements));
                showToast(ach);
                needsRender = true;
            }
        });

        let unclaimedCount = ACHIEVEMENTS.filter(a => a.req() && !claimedAchievements.includes(a.id)).length;
        const badge = document.getElementById('ach-badge-count');
        if (unclaimedCount > 0) {
            badge.innerText = unclaimedCount;
            badge.classList.add('visible');
        } else {
            badge.classList.remove('visible');
        }
        if (needsRender && modalOverlay.classList.contains('open')) {
            renderAchievements();
        }
    }

    // --- 5. EVENT LISTENERS ---
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        renderAchievements();
        modalOverlay.classList.add('open');
    });

    closeBtn.addEventListener('click', () => modalOverlay.classList.remove('open'));
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });

    setInterval(checkAchievements, 1000);
    setTimeout(checkAchievements, 500);
}); 
// globalClick.js
// ==========================================
// GLOBAL CLICK MANAGER
// ==========================================

// Disable the right-click context menu globally across the entire webpage
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', () => {
    const clickArea = document.getElementById('click-area');
    const mainDumpling = document.getElementById('main-dumpling');

    clickArea.addEventListener('mousedown', (e) => {
        // Start BGM on the first click anywhere in the click area
        if (typeof startBGM === 'function') startBGM();

        // Ignore clicks if they hit the Stats Header, the Shop Panel, or ANY floating buttons/menus
        if (
            e.target.closest('.stats-header') || 
            e.target.closest('.right-panel') || 
            e.target.closest('#open-rebirth-btn') ||
            e.target.closest('#open-rebirthshop-btn') ||
            e.target.closest('#settings-toggle-btn') ||
            e.target.closest('.settings-panel') ||
            e.target.closest('.rebirth-modal-overlay')
        ) {
            return;
        }

        // --- NEW: Play Squish Sound ---
        if (typeof playSound === 'function') playSound('squish');

        // Apply Squish Animation CSS to the Dumpling
        mainDumpling.classList.remove('squishing');
        void mainDumpling.offsetWidth; // Trigger reflow to restart animation seamlessly
        mainDumpling.classList.add('squishing');

        // Calculate score addition
        const finalClickPower = state.clickPower * currentMultiplier;
        state.score += finalClickPower;
        
        // --- FLOATING TEXT POSITION LOGIC ---
        let textX = e.clientX;
        let textY = e.clientY;

        // If the player clicked the background (NOT the dumpling), pick a random spot ON the dumpling
        if (!e.target.closest('#main-dumpling')) {
            const rect = mainDumpling.getBoundingClientRect();
            const padding = 20; 
            textX = rect.left + padding + Math.random() * (rect.width - padding * 2);
            textY = rect.top + padding + Math.random() * (rect.height - padding * 2);
        }
        
        // Spawn floating text at the determined coordinates
        createFloatingText(textX, textY, `+${formatNumber(finalClickPower)}`);
        
        // Update the UI
        updateUI();
        updateButtons();
    });
});
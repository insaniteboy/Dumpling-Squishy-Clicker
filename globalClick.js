// globalClick.js
// ==========================================
// GLOBAL CLICK MANAGER
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const clickArea = document.getElementById('click-area');
    const mainDumpling = document.getElementById('main-dumpling');

    clickArea.addEventListener('mousedown', (e) => {
        // Ignore clicks if they hit the Stats Header, the Shop Panel, or the Rebirth Button
        if (
            e.target.closest('.stats-header') || 
            e.target.closest('.right-panel') || 
            e.target.closest('#open-rebirth-btn')
        ) {
            return;
        }

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
            // Get the dumpling's current size and position on the screen
            const rect = mainDumpling.getBoundingClientRect();
            
            // Add a 20px padding so the text doesn't spawn exactly on the invisible edges
            const padding = 20; 
            
            // Calculate random X and Y coordinates within the dumpling's bounding box
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
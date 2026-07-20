// ==========================================
// ANTI-AUTOCLICKER SYSTEM (Centered & Themed UI)
// ==========================================

(function() {
    // --- Configuration ---
    const MAX_CPS = 18; // Maximum allowed clicks within the time window
    const TIME_WINDOW = 1000; // Time window in milliseconds (1 second)

    let clickTimestamps = [];
    let offenses = 0;
    let punishmentEndTime = 0;
    let timerInterval = null;

    // --- Data Management (Saves through refresh) ---
    function loadAntiCheatData() {
        const data = localStorage.getItem('SquishyAntiCheatData');
        if (data) {
            const parsed = JSON.parse(data);
            offenses = parsed.offenses || 0;
            punishmentEndTime = parsed.punishmentEndTime || 0;
        }
    }

    function saveAntiCheatData() {
        localStorage.setItem('SquishyAntiCheatData', JSON.stringify({
            offenses: offenses,
            punishmentEndTime: punishmentEndTime
        }));
    }

    // --- UI Injection ---
    const style = document.createElement('style');
    style.innerHTML = `
        /* Invisible full-screen container to hold the modal */
        #anticheat-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.15); /* Very faint dim so the game is still highly visible */
            z-index: 999999; 
            display: flex;
            justify-content: center;
            align-items: center; /* Perfectly centers the modal vertically and horizontally */
            opacity: 0;
            pointer-events: none; /* Lets clicks pass through when hidden */
            transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: scale(0.95);
        }
        
        #anticheat-overlay.active {
            opacity: 1;
            transform: scale(1);
            pointer-events: all; /* Blocks clicks to elements underneath */
        }

        /* The themed floating warning box */
        #anticheat-modal {
            background: #1a1111; /* Deep warm dark background matching image_656ea9.png */
            border: 2px solid #ff5768; /* Pinkish-red border */
            border-radius: 18px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.6), 0 0 20px rgba(255, 87, 104, 0.2);
            padding: 35px 45px;
            text-align: center;
            font-family: 'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Soft rounded font */
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            width: 420px;
            max-width: 90vw;
        }

        #anticheat-modal h1 {
            font-size: 1.7rem;
            color: #ff5768;
            margin: 0;
            text-transform: uppercase;
            font-weight: 900;
            letter-spacing: 1.5px;
            display: flex;
            align-items: center;
            gap: 12px;
            text-shadow: 0 0 12px rgba(255, 87, 104, 0.6); /* Glowing text effect */
        }

        #anticheat-modal p {
            font-size: 1.05rem;
            color: #e5e5e5;
            margin: 0;
            line-height: 1.5;
            font-weight: 500;
        }

        /* The inner box for the timer */
        #anticheat-timer-box {
            background: #261617; /* Slightly lighter inner box */
            border: 1px solid rgba(255, 87, 104, 0.15);
            border-radius: 16px;
            padding: 15px 60px;
            margin-top: 5px;
            box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);
        }

        #anticheat-timer {
            font-size: 3.5rem;
            font-weight: 900;
            color: #ff758c;
            text-shadow: 0 0 15px rgba(255, 117, 140, 0.7);
            line-height: 1;
            margin: 0;
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'anticheat-overlay';
    overlay.innerHTML = `
        <div id="anticheat-modal">
            <h1><span style="font-size: 2rem; filter: drop-shadow(0 0 5px rgba(255,255,255,0.3));">🚨</span> AUTOCLICKER DETECTED</h1>
            <p>Your click rate is unnaturally high. Please disable any macros or autoclickers to continue.</p>
            <div id="anticheat-timer-box">
                <div id="anticheat-timer">0</div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // --- Core Logic ---
    function checkExistingPunishment() {
        const now = Date.now();
        if (punishmentEndTime > now) {
            enforcePunishment();
        }
    }

    function triggerDetection() {
        offenses++;
        
        // Calculate penalty: 10s per offense, capped at 60s
        let penaltySeconds = Math.min(offenses * 10, 10);

        // Set the timestamp for when the punishment ends
        punishmentEndTime = Date.now() + (penaltySeconds * 1000);
        saveAntiCheatData();
        
        clickTimestamps = []; 
        enforcePunishment();
    }

    function enforcePunishment() {
        const overlayElement = document.getElementById('anticheat-overlay');
        const timerElement = document.getElementById('anticheat-timer');
        
        overlayElement.classList.add('active');

        if (timerInterval) clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            const now = Date.now();
            const remainingMs = punishmentEndTime - now;

            if (remainingMs <= 0) {
                // Punishment is over
                clearInterval(timerInterval);
                overlayElement.classList.remove('active');
                clickTimestamps = []; // Clear backlog so they don't instantly re-trigger
            } else {
                // Update timer UI (Math.ceil makes it count down clean seconds)
                timerElement.innerText = Math.ceil(remainingMs / 1000);
            }
        }, 100);
    }

    // --- Click Listener ---
    // Using "true" for the capture phase intercepts the click BEFORE the game registers it
    document.addEventListener('mousedown', function(e) {
        const now = Date.now();
        
        // If currently punished, consume the click so the game doesn't get it
        if (now < punishmentEndTime) {
            e.stopPropagation();
            e.preventDefault();
            return;
        }

        // Record the click
        clickTimestamps.push(now);

        // Filter out clicks older than 1 second (1000ms)
        clickTimestamps = clickTimestamps.filter(timestamp => now - timestamp <= TIME_WINDOW);

        // If they exceed the max allowed clicks in that 1-second window, catch them
        if (clickTimestamps.length > MAX_CPS) {
            e.stopPropagation();
            e.preventDefault();
            triggerDetection();
        }
    }, true);

    // Boot up
    loadAntiCheatData();
    checkExistingPunishment();
})();
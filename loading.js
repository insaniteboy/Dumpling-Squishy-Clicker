// ==========================================
// SQUISHY CLICKER - DYNAMIC SKIN LOADER
// ==========================================

(function() {
    // --- 1. DYNAMIC SKIN DETECTION SYSTEM ---
    // This auto-checks local storage for your game's equipped skin.
    // Tweak the strings below if your save variables use different names!
    function getEquippedSkin() {
        try {
            // Check for a direct save key first
            let directSkin = localStorage.getItem('equippedSkin');
            if (directSkin) return directSkin.toLowerCase();

            // Check if it's nested inside a main game save object
            let mainSave = localStorage.getItem('squishyClickerSave') || localStorage.getItem('saveData');
            if (mainSave) {
                let parsed = JSON.parse(mainSave);
                if (parsed && parsed.equippedSkin) return parsed.equippedSkin.toLowerCase();
                if (parsed && parsed.skin) return parsed.skin.toLowerCase();
            }
        } catch (e) {
            console.warn("Could not read equipped skin from localStorage, using default.", e);
        }
        return 'classic dough'; // Fallback default
    }

    const currentSkin = getEquippedSkin();

    // --- 2. Import Bubbly Game Font ---
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // --- 3. Inject Loading Screen Styles & Skin Profiles ---
    const loadingStyles = document.createElement('style');
    loadingStyles.innerHTML = `
        #squishy-loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle at 50% 30%, #ff9bc7 0%, #ff72ad 60%, #e64a8a 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 999999;
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
            transition: opacity 0.5s ease, transform 0.5s ease;
            pointer-events: all;
        }

        #squishy-loading-screen.fade-out {
            opacity: 0;
            transform: scale(1.1);
            pointer-events: none;
        }

        /* --- Cascade Drop-Down Animation --- */
        .drop-in {
            opacity: 0;
            animation: dropDownBounce 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.15s; }
        .delay-3 { animation-delay: 0.25s; }
        .delay-4 { animation-delay: 0.35s; }

        @keyframes dropDownBounce {
            0% { transform: translateY(-120px) scale(0.9); opacity: 0; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* --- Base Dumpling Geometry --- */
        .css-squishy-wrapper {
            margin-bottom: 20px;
        }

        .css-squishy-icon {
            width: 150px;
            height: 105px;
            border-radius: 50% 50% 45% 45% / 60% 60% 40% 40%;
            position: relative;
            animation: squishyIdleBounce 1s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 15px 25px rgba(230, 74, 138, 0.4);
            transform-origin: bottom center;
        }

        /* ==========================================
           DYNAMIC SKIN PALETTES (CSS MAPS)
        ========================================== */
        
        /* 1. Tri-Color Striped / Ascension Skin */
        .skin-striped {
            background: linear-gradient(150deg, #ff4b4b 32%, #ffd166 32% 52%, #06d6a0 52%) !important;
        }

        /* 2. Classic Dough */
        .skin-classic-dough {
            background: radial-gradient(circle at 40% 20%, #ffffff 0%, #fdf0d5 50%, #e6cd98 100%);
            box-shadow: 0 15px 25px rgba(230, 74, 138, 0.4), inset -5px -10px 15px rgba(200, 160, 110, 0.15);
        }

        /* 3. Lemon Zest */
        .skin-lemon-zest {
            background: radial-gradient(circle at 40% 20%, #ffffff 0%, #fff176 50%, #f5b000 100%);
        }

        /* 4. Matcha Green */
        .skin-matcha-green {
            background: radial-gradient(circle at 40% 20%, #ffffff 0%, #a3f7bf 50%, #2bb673 100%);
        }

        /* 5. Blueberry Burst */
        .skin-blueberry-burst {
            background: radial-gradient(circle at 40% 20%, #ffffff 0%, #90caf9 50%, #1e88e5 100%);
        }

        /* 6. Strawberry Pink */
        .skin-strawberry-pink {
            background: radial-gradient(circle at 40% 20%, #ffffff 0%, #ffb3c6 50%, #fb6f92 100%);
        }

        /* 7. Grape Jelly */
        .skin-grape-jelly {
            background: radial-gradient(circle at 40% 20%, #ffffff 0%, #e1bee7 50%, #8e24aa 100%);
        }

        /* --- Face Features --- */
        .css-squishy-face {
            position: absolute;
            top: 55px;
            left: 45px;
            width: 12px; height: 12px;
            background: #2d3436;
            border-radius: 50%;
            box-shadow: 50px 0 0 #2d3436;
        }

        .css-squishy-smile {
            position: absolute;
            top: 60px;
            left: 64px;
            width: 12px; height: 8px;
            border-bottom: 4px solid #2d3436;
            border-radius: 50%;
        }

        .css-squishy-blush {
            position: absolute;
            top: 60px;
            left: 28px;
            width: 18px; height: 10px;
            background: rgba(255, 120, 120, 0.6);
            border-radius: 50%;
            box-shadow: 78px 0 0 rgba(255, 120, 120, 0.6);
        }

        @keyframes squishyIdleBounce {
            0% { transform: scaleY(0.94) scaleX(1.06); }
            100% { transform: scaleY(1.04) scaleX(0.96) translateY(-15px); }
        }

        /* --- Layout Framework --- */
        .loading-title {
            font-size: 3.5rem;
            font-weight: 900;
            color: #ffffff;
            margin-bottom: 10px;
            text-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            letter-spacing: 2px;
        }

        .loading-author {
            font-size: 1rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 2px;
            background: rgba(255, 255, 255, 0.25);
            padding: 8px 25px;
            border-radius: 30px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .loading-status-box {
            background: #a36682;
            padding: 30px 45px;
            border-radius: 25px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 90%;
            max-width: 450px;
            box-shadow: 0 15px 35px rgba(163, 102, 130, 0.4);
        }

        .status-text {
            font-size: 1.3rem;
            font-weight: 900;
            color: #ffffff;
            margin-bottom: 20px;
            height: 25px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            letter-spacing: 0.5px;
        }

        .progress-track {
            width: 100%;
            height: 22px;
            background: #7a465d;
            border-radius: 20px;
            padding: 4px;
            box-shadow: inset 0 3px 8px rgba(0,0,0,0.4);
            margin-bottom: 15px;
            position: relative;
            overflow: hidden;
        }

        .progress-fill {
            width: 0%;
            height: 100%;
            background: #4cc7b2; 
            border-radius: 15px;
            box-shadow: 0 0 15px rgba(76, 199, 178, 0.5);
            transition: width 0.1s linear;
        }

        .loading-percentage {
            font-size: 2rem;
            font-weight: 900;
            color: #ffffff;
            text-shadow: 0 3px 6px rgba(0,0,0,0.3);
            margin-top: 5px;
        }
    `;
    document.head.appendChild(loadingStyles);

    // --- 4. Render Layout & Assign Skin Class ---
    function createLoadingScreen() {
        const screen = document.createElement('div');
        screen.id = 'squishy-loading-screen';
        
        // Match string identifier map to targeted CSS classes
        let skinClassName = 'skin-classic-dough'; // Safe configuration fallback
        if (currentSkin.includes('striped') || currentSkin.includes('ascension') || currentSkin.includes('classic dough') === false) {
            // Check specific known types, if it's the tri-color one, add that explicit style
            if (currentSkin.includes('lemon')) skinClassName = 'skin-lemon-zest';
            else if (currentSkin.includes('matcha')) skinClassName = 'skin-matcha-green';
            else if (currentSkin.includes('blue')) skinClassName = 'skin-blueberry-burst';
            else if (currentSkin.includes('straw')) skinClassName = 'skin-strawberry-pink';
            else if (currentSkin.includes('grape')) skinClassName = 'skin-grape-jelly';
            else skinClassName = 'skin-striped'; // Defaults custom configurations to the tri-color skin
        }

        screen.innerHTML = `
            <div class="css-squishy-wrapper drop-in delay-1">
                <div class="css-squishy-icon ${skinClassName}">
                    <div class="css-squishy-face"></div>
                    <div class="css-squishy-smile"></div>
                    <div class="css-squishy-blush"></div>
                </div>
            </div>

            <div class="loading-title drop-in delay-2">Squishy Clicker</div>
            <div class="loading-author drop-in delay-3">Made by Insaniteboy</div>
            
            <div class="loading-status-box drop-in delay-4">
                <div class="status-text" id="sq-status-text">Waking up the Squishies...</div>
                
                <div class="progress-track">
                    <div class="progress-fill" id="sq-progress-fill"></div>
                </div>
                
                <div class="loading-percentage" id="sq-percentage">0%</div>
            </div>
        `;
        
        document.body.appendChild(screen);
        startCustomPacedLoading();
    }

    // --- 5. High-Performance Curve Engine (Zoom to 60% -> Sluggish Slowdown -> Snap to 100%) ---
    function startCustomPacedLoading() {
        const fillBar = document.getElementById('sq-progress-fill');
        const percentText = document.getElementById('sq-percentage');
        const statusText = document.getElementById('sq-status-text');
        
        const duration = 3000; 
        let startTime = null;

        function animationTick(timestamp) {
            if (!startTime) startTime = timestamp;
            
            let elapsed = timestamp - startTime;
            let timeRatio = Math.min(elapsed / duration, 1.0); 
            let progress = 0;

            if (timeRatio < 0.35) {
                // Phase 1: Rapid linear zoom up to 60% within 1.05s
                progress = (timeRatio / 0.35) * 0.60;
            } 
            else if (timeRatio < 0.85) {
                // Phase 2: High friction crawl. Moves from 60% to 85% across 1.5s
                let slowRatio = (timeRatio - 0.35) / 0.50; 
                progress = 0.60 + (slowRatio * 0.25);
            } 
            else {
                // Phase 3: Sudden final surge catching up to 100% in the last 0.45s
                let fastRatio = (timeRatio - 0.85) / 0.15;
                progress = 0.85 + (fastRatio * 0.15);
            }

            progress = Math.min(progress, 1.0);
            
            let currentPercentage = Math.floor(progress * 100);
            fillBar.style.width = `${progress * 100}%`;
            percentText.innerText = `${currentPercentage}%`;

            if (progress < 0.30) {
                statusText.innerText = "Waking up the Squishies...";
            } else if (progress < 0.65) {
                statusText.innerText = "Baking fresh dough...";
            } else if (progress < 0.90) {
                statusText.innerText = "Calculating multipliers...";
            } else {
                statusText.innerText = "Ready to squish!";
            }

            if (elapsed < duration) {
                requestAnimationFrame(animationTick);
            } else {
                setTimeout(() => {
                    const screen = document.getElementById('squishy-loading-screen');
                    if (screen) {
                        screen.classList.add('fade-out');
                        setTimeout(() => { screen.remove(); }, 500);
                    }
                }, 250);
            }
        }

        requestAnimationFrame(animationTick);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createLoadingScreen);
    } else {
        createLoadingScreen();
    }
})();
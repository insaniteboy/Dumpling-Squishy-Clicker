// audioManager.js
// ==========================================
// AUDIO SYSTEM (BGM & SFX)
// ==========================================

const audioAssets = {
    bgm: new Audio('assets/bgm.mp3'),
    squish: new Audio('assets/squish.mp3'),
    buy: new Audio('assets/buy.mp3'),
    rebirth: new Audio('assets/rebirth.mp3'),
    error: new Audio('assets/error.mp3')
};

// Default Volume Levels
let bgmVolume = 0.3;
let squishVolume = 0.6;
let sfxVolume = 0.6;

// Configure Background Music
audioAssets.bgm.loop = true;
audioAssets.bgm.volume = bgmVolume; 

let bgmStarted = false;

// Function to start music
function startBGM() {
    if (!bgmStarted) {
        audioAssets.bgm.play().catch(err => console.log("BGM autoplay prevented:", err));
        bgmStarted = true;
    }
}

// Function to play sound effects
function playSound(type) {
    if (audioAssets[type]) {
        const soundClone = audioAssets[type].cloneNode();
        
        // Apply the correct volume based on the type of sound
        if (type === 'squish') {
            soundClone.volume = squishVolume;
        } else {
            soundClone.volume = sfxVolume;
        }
        
        soundClone.play().catch(err => console.log("SFX play prevented:", err));
    }
}

// ==========================================
// VOLUME SLIDER LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const bgmSlider = document.getElementById('bgm-volume');
    const squishSlider = document.getElementById('squish-volume');
    const sfxSlider = document.getElementById('sfx-volume');

    // Update Music Volume
    if (bgmSlider) {
        bgmSlider.addEventListener('input', (e) => {
            bgmVolume = e.target.value / 100;
            audioAssets.bgm.volume = bgmVolume; // Updates live music immediately
            document.getElementById('bgm-vol-label').innerText = `${e.target.value}%`;
        });
    }

    // Update Squish Volume
    if (squishSlider) {
        squishSlider.addEventListener('input', (e) => {
            squishVolume = e.target.value / 100;
            document.getElementById('squish-vol-label').innerText = `${e.target.value}%`;
        });
    }

    // Update Other Sound Effects (Buy, Error, Rebirth)
    if (sfxSlider) {
        sfxSlider.addEventListener('input', (e) => {
            sfxVolume = e.target.value / 100;
            document.getElementById('sfx-vol-label').innerText = `${e.target.value}%`;
        });
    }
});
// ==========================================
    // SETTINGS PANEL ANIMATION TOGGLE
    // ==========================================
    const settingsBtn = document.getElementById('settings-toggle-btn');
    const settingsPanel = document.getElementById('audio-settings-panel');

    if (settingsBtn && settingsPanel) {
        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // <-- PREVENTS DUMPLING CLICK[cite: 12]
            settingsBtn.classList.toggle('open');
            settingsPanel.classList.toggle('open');
        });
        
        // Also stop clicks inside the panel from hitting the dumpling
        settingsPanel.addEventListener('click', (e) => {
            e.stopPropagation(); 
        });
    }
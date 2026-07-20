// ==========================================
// UPGRADES DATA (Sorted by Price!)
// ==========================================
const UPGRADES_DATA = [
    // --- Early Game ---
    { id: 'finger',       name: 'Auto-Squish',         icon: '👆', baseCost: 15,            sps: 0.5, click: 0, desc: '+0.5 SPS' },
    { id: 'click_1',      name: 'Heavy Finger',        icon: '🖐️', baseCost: 50,            sps: 0, click: 1, desc: '+1 Click Power' },
    { id: 'roller',       name: 'Dough Roller',        icon: '🥖', baseCost: 100,           sps: 3, click: 0, desc: '+3 SPS' },
    { id: 'grandma',      name: 'Dumpling Grandma',    icon: '👵', baseCost: 450,           sps: 12, click: 0, desc: '+12 SPS' },
    { id: 'click_2',      name: 'Rolling Pin',         icon: '🦯', baseCost: 500,           sps: 0, click: 5, desc: '+5 Click Power' },
    { id: 'machine',      name: 'Squish Machine',      icon: '⚙️', baseCost: 1200,          sps: 35, click: 0, desc: '+35 SPS' },
    { id: 'click_3',      name: 'Boxing Glove',        icon: '🥊', baseCost: 2500,          sps: 0, click: 25, desc: '+25 Click Power' },
    { id: 'steamer',      name: 'Bamboo Steamer',      icon: '♨️', baseCost: 4000,          sps: 100, click: 0, desc: '+100 SPS' },
    
    // --- Mid Game ---
    { id: 'stand',        name: 'Dumpling Stand',      icon: '⛺', baseCost: 12000,         sps: 280, click: 0, desc: '+280 SPS' },
    { id: 'click_4',      name: 'Hydraulic Press',     icon: '🗜️', baseCost: 15000,         sps: 0, click: 100, desc: '+100 Click Power' },
    { id: 'truck',        name: 'Food Truck Fleet',    icon: '🚚', baseCost: 35000,         sps: 750, click: 0, desc: '+750 SPS' },
    { id: 'click_5',      name: 'Asteroid Smash',      icon: '☄️', baseCost: 100000,        sps: 0, click: 500, desc: '+500 Click Power' },
    { id: 'restaurant',   name: '5-Star Restaurant',   icon: '🍽️', baseCost: 120000,        sps: 2200, click: 0, desc: '+2,200 SPS' },
    { id: 'factory',      name: 'Industrial Factory',  icon: '🏭', baseCost: 450000,        sps: 7500, click: 0, desc: '+7,500 SPS' },
    { id: 'click_6',      name: 'Godly Smite',         icon: '⚡', baseCost: 1000000,       sps: 0, click: 5000, desc: '+5,000 Click Power' },
    { id: 'corporation',  name: 'Squish Mega Corp',    icon: '🏢', baseCost: 1500000,       sps: 22000, click: 0, desc: '+22,000 SPS' },
    { id: 'click_7',      name: 'Golden Mallet',       icon: '🔨', baseCost: 2500000,       sps: 0, click: 12000, desc: '+12,000 Click Power' },
    { id: 'farm',         name: 'Infinite Flour Farm', icon: '🌾', baseCost: 5000000,       sps: 65000, click: 0, desc: '+65,000 SPS' },
    { id: 'click_8',      name: 'Sonic Boom',          icon: '🔊', baseCost: 8000000,       sps: 0, click: 35000, desc: '+35,000 Click Power' },
    { id: 'cloner',       name: 'Dough Cloner 3000',   icon: '🧬', baseCost: 15000000,      sps: 180000, click: 0, desc: '+180,000 SPS' },
    { id: 'click_9',      name: 'Meteor Shower',       icon: '🌠', baseCost: 30000000,      sps: 0, click: 150000, desc: '+150,000 Click Power' },
    { id: 'alchemy',      name: 'Dumpling Alchemy',    icon: '🧪', baseCost: 50000000,      sps: 550000, click: 0, desc: '+550,000 SPS' },
    { id: 'click_10',     name: 'Quantum Tap',         icon: '⚛️', baseCost: 100000000,     sps: 0, click: 500000, desc: '+500,000 Click Power' },
    { id: 'wizard',       name: 'Dough Wizard',        icon: '🧙', baseCost: 150000000,     sps: 1500000, click: 0, desc: '+1.5M SPS' },
    { id: 'click_11',     name: 'Telekinetic Crush',   icon: '🧠', baseCost: 350000000,     sps: 0, click: 1800000, desc: '+1.8M Click Power' },
    { id: 'portal',       name: 'Squishy Portal',      icon: '🌀', baseCost: 500000000,     sps: 4500000, click: 0, desc: '+4.5M SPS' },
    
    // --- Late Game ---
    { id: 'click_12',     name: 'Titan Stomp',         icon: '🦶', baseCost: 1000000000,    sps: 0, click: 5000000, desc: '+5M Click Power' },
    { id: 'time_machine', name: 'Time Machine',        icon: '⏳', baseCost: 1800000000,    sps: 15000000, click: 0, desc: '+15M SPS' },
    { id: 'click_13',     name: 'Orbital Strike',      icon: '🛰️', baseCost: 3500000000,    sps: 0, click: 18000000, desc: '+18M Click Power' },
    { id: 'dimension',    name: 'Squishy Dimension',   icon: '🌌', baseCost: 6000000000,    sps: 45000000, click: 0, desc: '+45M SPS' },
    { id: 'click_14',     name: 'Solar Flare',         icon: '🌞', baseCost: 10000000000,   sps: 0, click: 55000000, desc: '+55M Click Power' },
    { id: 'spaceship',    name: 'Dumpling Cruiser',    icon: '🚀', baseCost: 20000000000,   sps: 130000000, click: 0, desc: '+130M SPS' },
    { id: 'click_15',     name: 'Supernova Squeeze',   icon: '💥', baseCost: 40000000000,   sps: 0, click: 220000000, desc: '+220M Click Power' },
    { id: 'alien',        name: 'Alien Squishers',     icon: '👽', baseCost: 75000000000,   sps: 450000000, click: 0, desc: '+450M SPS' },
    { id: 'click_16',     name: 'Galactic Pinch',      icon: '🌌', baseCost: 150000000000,  sps: 0, click: 800000000, desc: '+800M Click Power' },
    { id: 'planet',       name: 'Dumpling Planet',     icon: '🌍', baseCost: 250000000000,  sps: 1400000000, click: 0, desc: '+1.4B SPS' },
    { id: 'click_17',     name: 'Black Hole Pull',     icon: '⚫', baseCost: 500000000000,  sps: 0, click: 2500000000, desc: '+2.5B Click Power' },
    { id: 'sun',          name: 'Dough Sun',           icon: '☀️', baseCost: 800000000000,  sps: 4500000000, click: 0, desc: '+4.5B SPS' },
    { id: 'click_18',     name: 'Cosmic Collision',    icon: '☄️', baseCost: 1800000000000, sps: 0, click: 9000000000, desc: '+9B Click Power' },
    { id: 'galaxy',       name: 'Squishy Galaxy',      icon: '💫', baseCost: 3000000000000, sps: 15000000000, click: 0, desc: '+15B SPS' },
    { id: 'click_19',     name: 'Dimensional Tear',    icon: '✂️', baseCost: 8000000000000, sps: 0, click: 40000000000, desc: '+40B Click Power' },
    { id: 'blackhole',    name: 'Dough Black Hole',    icon: '🕳️', baseCost: 12000000000000,sps: 55000000000, click: 0, desc: '+55B SPS' },
    
    // --- God Tier ---
    { id: 'click_20',     name: 'Reality Snap',        icon: '🤌', baseCost: 25000000000000,sps: 0, click: 125000000000, desc: '+125B Click Power' },
    { id: 'multiverse',   name: 'Squish Multiverse',   icon: '🪐', baseCost: 50000000000000,sps: 200000000000, click: 0, desc: '+200B SPS' },
    { id: 'click_21',     name: 'Timeline Erase',      icon: '⏳', baseCost: 100000000000000,sps: 0, click: 500000000000, desc: '+500B Click Power' },
    { id: 'timeline',     name: 'Timeline Collapse',   icon: '💠', baseCost: 250000000000000,sps: 800000000000, click: 0, desc: '+800B SPS' },
    { id: 'click_22',     name: 'Omniversal Clap',     icon: '👏', baseCost: 600000000000000,sps: 0, click: 3000000000000, desc: '+3T Click Power' },
    { id: 'sentience',    name: 'Dumpling Sentience',  icon: '🧠', baseCost: 1000000000000000, sps: 3000000000000, click: 0, desc: '+3T SPS' },
    { id: 'click_23',     name: 'Godly Puncture',      icon: '🗡️', baseCost: 2500000000000000, sps: 0, click: 12000000000000, desc: '+12T Click Power' },
    { id: 'matrix',       name: 'The Squish Matrix',   icon: '💻', baseCost: 5000000000000000, sps: 15000000000000, click: 0, desc: '+15T SPS' },
    { id: 'click_24',     name: 'Big Bang Poke',       icon: '🌌', baseCost: 10000000000000000, sps: 0, click: 55000000000000, desc: '+55T Click Power' },
    { id: 'god',          name: 'Dumpling Deity',      icon: '👑', baseCost: 25000000000000000, sps: 80000000000000, click: 0, desc: '+80T SPS' },
    { id: 'click_25',     name: 'Developer Override',  icon: '⌨️', baseCost: 50000000000000000, sps: 0, click: 250000000000000, desc: '+250T Click Power' },
    { id: 'creator',      name: 'The Developer',       icon: '💻', baseCost: 99999999999999999, sps: 999999999999999, click: 0, desc: '+999T SPS' }
];

// ==========================================
// SKINS DATA (40 Unlockable Skins!)
// ==========================================
const SKINS_DATA = [
    // --- Common Flavors ---
    { id: 'classic',    name: 'Classic Dough',      cost: 0,        css: 'radial-gradient(circle at 30% 30%, #fff3e0, #ffcc80)' },
    { id: 'lemon',      name: 'Lemon Zest',         cost: 150,      css: 'radial-gradient(circle at 30% 30%, #fff9c4, #fbc02d)' },
    { id: 'matcha',     name: 'Matcha Green',       cost: 500,      css: 'radial-gradient(circle at 30% 30%, #e8f5e9, #81c784)' },
    { id: 'blueberry',  name: 'Blueberry Burst',    cost: 1200,     css: 'radial-gradient(circle at 30% 30%, #e3f2fd, #42a5f5)' },
    { id: 'strawberry', name: 'Strawberry Pink',    cost: 2500,     css: 'radial-gradient(circle at 30% 30%, #fce4ec, #f06292)' },
    { id: 'grape',      name: 'Grape Jelly',        cost: 5000,     css: 'radial-gradient(circle at 30% 30%, #f3e5f5, #ab47bc)' },
    { id: 'chocolate',  name: 'Dark Chocolate',     cost: 8500,     css: 'radial-gradient(circle at 30% 30%, #795548, #3e2723)' },
    
    // --- Foods & Snacks ---
    { id: 'pizza',      name: 'Pepperoni Pizza',    cost: 12000,    css: 'radial-gradient(circle at 30% 30%, #ffcc80 40%, #e53935 60%, #fbc02d 100%)' },
    { id: 'burger',     name: 'Cheeseburger',       cost: 20000,    css: 'linear-gradient(to bottom, #d7ccc8 25%, #4caf50 35%, #795548 50%, #ffeb3b 65%, #d7ccc8 75%)' },
    { id: 'sushi',      name: 'Salmon Nigiri',      cost: 35000,    css: 'linear-gradient(to right, #ff8a65 40%, #ffffff 45%, #ff8a65 55%, #ffffff 60%, #ff8a65 100%)' },
    { id: 'taco',       name: 'Spicy Taco',         cost: 50000,    css: 'radial-gradient(circle at 50% 50%, #ffeb3b 30%, #4caf50 50%, #e53935 70%, #ffb300 100%)' },

    // --- Special Patterns ---
    { id: 'rainbow',    name: 'Rainbow Squish',     cost: 85000,    css: 'linear-gradient(45deg, #ff9a9e, #fecfef, #a1c4fd, #c2e9fb)' },
    { id: 'watermelon', name: 'Watermelon',         cost: 150000,   css: 'linear-gradient(135deg, #ff4e50 45%, #f9d423 45%, #f9d423 55%, #4caf50 55%)' },
    { id: 'neapolitan', name: 'Neapolitan Ice Cream', cost: 250000, css: 'linear-gradient(to right, #6d4c41 33%, #fff3e0 33%, #fff3e0 66%, #f8bbd0 66%)' },
    { id: 'camo',       name: 'Tactical Camo',      cost: 400000,   css: 'radial-gradient(circle, #33691e 20%, #558b2f 40%, #1b5e20 60%, #827717 80%)' },
    { id: 'zebra',      name: 'Zebra Stripes',      cost: 750000,   css: 'repeating-linear-gradient(90deg, #fff, #fff 20px, #000 20px, #000 40px)' },
    
    // --- Elements & Textures ---
    { id: 'earth',      name: 'Mossy Earth',        cost: 1500000,  css: 'radial-gradient(circle at 30% 30%, #8bc34a, #33691e)' },
    { id: 'water',      name: 'Ocean Ripple',       cost: 3000000,  css: 'radial-gradient(circle at 30% 30%, #b2ebf2, #00838f)' },
    { id: 'fire',       name: 'Blazing Fire',       cost: 6000000,  css: 'radial-gradient(circle at 30% 30%, #ffff00, #ff5722, #b71c1c)' },
    { id: 'ice',        name: 'Frostbite',          cost: 12000000, css: 'linear-gradient(to bottom right, #e0ffff, #87ceeb, #00bfff, #fff)' },
    { id: 'lightning',  name: 'Thunderstorm',       cost: 25000000, css: 'radial-gradient(circle at 50% 50%, #ffffff 10%, #ffeb3b 20%, #311b92 80%)' },
    { id: 'lava',       name: 'Magma Core',         cost: 50000000, css: 'radial-gradient(circle at 50% 50%, #ffeb3b 5%, #ff5722 30%, #212121 90%)' },
    { id: 'slime',      name: 'Toxic Slime',        cost: 85000000, css: 'radial-gradient(circle at 30% 30%, #ccff90, #76ff03, #33691e)' },

    // --- Precious Materials ---
    { id: 'bronze',     name: 'Aged Bronze',        cost: 150000000,css: 'linear-gradient(135deg, #a1887f, #5d4037, #3e2723)' },
    { id: 'silver',     name: 'Polished Silver',    cost: 300000000,css: 'linear-gradient(135deg, #f5f5f5, #9e9e9e, #e0e0e0, #616161)' },
    { id: 'gold',       name: 'Solid Gold',         cost: 750000000,css: 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)' },
    { id: 'platinum',   name: 'Pure Platinum',      cost: 1500000000,css:'radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0, #9e9e9e)' },
    { id: 'obsidian',   name: 'Obsidian Glass',     cost: 3000000000,css:'radial-gradient(circle at 30% 30%, #424242, #212121, #000000)' },
    { id: 'ruby',       name: 'Blood Ruby',         cost: 7500000000,css:'radial-gradient(circle at 30% 30%, #ff8a80, #d50000, #b71c1c)' },
    { id: 'diamond',    name: 'Flawless Diamond',   cost: 15000000000,css:'radial-gradient(circle at 30% 30%, #ffffff, #e0f7fa, #b2ebf2, #4dd0e1)' },
    
    // --- Cosmic & Impossible ---
    { id: 'holo',       name: 'Holographic',        cost: 50000000000, css: 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3)' },
    { id: 'nebula',     name: 'Cosmic Nebula',      cost: 150000000000, css: 'radial-gradient(circle at 30% 30%, #ff8a65, #ba68c8, #3f51b5, #1a237e)' },
    { id: 'supernova',  name: 'Supernova Burst',    cost: 400000000000, css: 'radial-gradient(circle, #ffffff, #ffff00, #ff0000, #800080, #000000)' },
    { id: 'darkmatter', name: 'Dark Matter',        cost: 1000000000000, css: 'radial-gradient(circle at 50% 50%, #311b92, #1a237e, #000000)' },
    { id: 'glitch',     name: 'Corrupted Data',     cost: 3500000000000, css: 'repeating-linear-gradient(45deg, #000, #000 10px, #0f0 10px, #0f0 20px, #f0f 20px, #f0f 30px)' },
    { id: 'matrix',     name: 'The Code',           cost: 10000000000000, css: 'repeating-linear-gradient(0deg, #000, #000 5px, #0f0 6px, #000 10px)' },
    { id: 'void',       name: 'The Void',           cost: 50000000000000, css: 'radial-gradient(circle at 50% 50%, #212121 0%, #000000 100%)' },
    { id: 'invisible',  name: 'Invisibility Cloak', cost: 250000000000000, css: 'rgba(255, 255, 255, 0.05)' },
    { id: 'infinite',   name: 'Infinite Squish',    cost: 999999999999999, css: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }
];
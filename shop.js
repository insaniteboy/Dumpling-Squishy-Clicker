// ==========================================
// UPGRADES DATA (Expanded & Balanced)
// ==========================================
const UPGRADES_DATA = [
    // --- Early Game ---
    { id: 'finger',       name: 'Auto-Squish',         icon: '👆', baseCost: 15,            sps: 0.5, click: 0, desc: '+0.5 SPS' },
    { id: 'click_1',      name: 'Heavy Finger',        icon: '🖐️', baseCost: 50,            sps: 0, click: 1, desc: '+1 Click Power' },
    { id: 'roller',       name: 'Dough Roller',        icon: '🥖', baseCost: 100,           sps: 3, click: 0, desc: '+3 SPS' },
    { id: 'mat',          name: 'Rolling Mat',         icon: '🍱', baseCost: 250,           sps: 6, click: 0, desc: '+6 SPS' },
    { id: 'grandma',      name: 'Dumpling Grandma',    icon: '👵', baseCost: 450,           sps: 12, click: 0, desc: '+12 SPS' },
    { id: 'click_2',      name: 'Rolling Pin',         icon: '🦯', baseCost: 500,           sps: 0, click: 5, desc: '+5 Click Power' },
    { id: 'sauce',        name: 'Soy Sauce Stream',    icon: '🍶', baseCost: 800,           sps: 22, click: 0, desc: '+22 SPS' },
    { id: 'machine',      name: 'Squish Machine',      icon: '⚙️', baseCost: 1200,          sps: 35, click: 0, desc: '+35 SPS' },
    { id: 'click_karate', name: 'Karate Chop',         icon: '🥋', baseCost: 1500,          sps: 0, click: 15, desc: '+15 Click Power' },
    { id: 'click_3',      name: 'Boxing Glove',        icon: '🥊', baseCost: 2500,          sps: 0, click: 25, desc: '+25 Click Power' },
    { id: 'steamer',      name: 'Bamboo Steamer',      icon: '♨️', baseCost: 4000,          sps: 100, click: 0, desc: '+100 SPS' },
    { id: 'bento',        name: 'Bento Box Assortment',icon: '🍱', baseCost: 7500,          sps: 160, click: 0, desc: '+160 SPS' },
    
    // --- Mid Game ---
    { id: 'stand',        name: 'Dumpling Stand',      icon: '⛺', baseCost: 12000,         sps: 280, click: 0, desc: '+280 SPS' },
    { id: 'click_4',      name: 'Hydraulic Press',     icon: '🗜️', baseCost: 15000,         sps: 0, click: 100, desc: '+100 Click Power' },
    { id: 'click_iron',   name: 'Iron Fist',           icon: '🦾', baseCost: 25000,         sps: 0, click: 180, desc: '+180 Click Power' },
    { id: 'truck',        name: 'Food Truck Fleet',    icon: '🚚', baseCost: 35000,         sps: 750, click: 0, desc: '+750 SPS' },
    { id: 'drone',        name: 'Dumpling Delivery Drone',icon:'🚁', baseCost: 65000,       sps: 1200, click: 0, desc: '+1,200 SPS' },
    { id: 'click_5',      name: 'Asteroid Smash',      icon: '☄️', baseCost: 100000,        sps: 0, click: 500, desc: '+500 Click Power' },
    { id: 'restaurant',   name: '5-Star Restaurant',   icon: '🍽️', baseCost: 120000,        sps: 2200, click: 0, desc: '+2,200 SPS' },
    { id: 'click_jack',   name: 'Jackhammer',          icon: '🪨', baseCost: 250000,        sps: 0, click: 1200, desc: '+1,200 Click Power' },
    { id: 'factory',      name: 'Industrial Factory',  icon: '🏭', baseCost: 450000,        sps: 7500, click: 0, desc: '+7,500 SPS' },
    { id: 'syndicate',    name: 'Underground Syndicate',icon:'🕴️', baseCost: 800000,        sps: 12000, click: 0, desc: '+12,000 SPS' },
    { id: 'click_6',      name: 'Godly Smite',         icon: '⚡', baseCost: 1000000,       sps: 0, click: 5000, desc: '+5,000 Click Power' },
    { id: 'corporation',  name: 'Squish Mega Corp',    icon: '🏢', baseCost: 1500000,       sps: 22000, click: 0, desc: '+22,000 SPS' },
    { id: 'click_7',      name: 'Golden Mallet',       icon: '🔨', baseCost: 2500000,       sps: 0, click: 12000, desc: '+12,000 Click Power' },
    { id: 'farm',         name: 'Infinite Flour Farm', icon: '🌾', baseCost: 5000000,       sps: 65000, click: 0, desc: '+65,000 SPS' },
    { id: 'click_8',      name: 'Sonic Boom',          icon: '🔊', baseCost: 8000000,       sps: 0, click: 35000, desc: '+35,000 Click Power' },
    { id: 'volcano',      name: 'Volcanic Roaster',    icon: '🌋', baseCost: 12000000,      sps: 120000, click: 0, desc: '+120,000 SPS' },
    { id: 'cloner',       name: 'Dough Cloner 3000',   icon: '🧬', baseCost: 15000000,      sps: 180000, click: 0, desc: '+180,000 SPS' },
    { id: 'click_9',      name: 'Meteor Shower',       icon: '🌠', baseCost: 30000000,      sps: 0, click: 150000, desc: '+150,000 Click Power' },
    { id: 'alchemy',      name: 'Dumpling Alchemy',    icon: '🧪', baseCost: 50000000,      sps: 550000, click: 0, desc: '+550,000 SPS' },
    { id: 'click_quake',  name: 'Earthquake',          icon: '💥', baseCost: 65000000,      sps: 0, click: 300000, desc: '+300,000 Click Power' },
    { id: 'click_10',     name: 'Quantum Tap',         icon: '⚛️', baseCost: 100000000,     sps: 0, click: 500000, desc: '+500,000 Click Power' },
    { id: 'wizard',       name: 'Dough Wizard',        icon: '🧙', baseCost: 150000000,     sps: 1500000, click: 0, desc: '+1.5M SPS' },
    { id: 'moon',         name: 'Lunar Base',          icon: '🌖', baseCost: 250000000,     sps: 2500000, click: 0, desc: '+2.5M SPS' },
    { id: 'click_11',     name: 'Telekinetic Crush',   icon: '🧠', baseCost: 350000000,     sps: 0, click: 1800000, desc: '+1.8M Click Power' },
    { id: 'portal',       name: 'Squishy Portal',      icon: '🌀', baseCost: 500000000,     sps: 4500000, click: 0, desc: '+4.5M SPS' },
    { id: 'click_grav',   name: 'Gravity Crush',       icon: '🌌', baseCost: 750000000,     sps: 0, click: 3500000, desc: '+3.5M Click Power' },
    
    // --- Late Game ---
    { id: 'click_12',     name: 'Titan Stomp',         icon: '🦶', baseCost: 1000000000,    sps: 0, click: 5000000, desc: '+5M Click Power' },
    { id: 'time_machine', name: 'Time Machine',        icon: '⏳', baseCost: 1800000000,    sps: 15000000, click: 0, desc: '+15M SPS' },
    { id: 'starlight',    name: 'Starlight Forge',     icon: '✨', baseCost: 2500000000,    sps: 20000000, click: 0, desc: '+20M SPS' },
    { id: 'click_13',     name: 'Orbital Strike',      icon: '🛰️', baseCost: 3500000000,    sps: 0, click: 18000000, desc: '+18M Click Power' },
    { id: 'dimension',    name: 'Squishy Dimension',   icon: '🌌', baseCost: 6000000000,    sps: 45000000, click: 0, desc: '+45M SPS' },
    { id: 'click_14',     name: 'Solar Flare',         icon: '🌞', baseCost: 10000000000,   sps: 0, click: 55000000, desc: '+55M Click Power' },
    { id: 'click_super',  name: 'Supermassive Tap',    icon: '🏋️', baseCost: 20000000000,   sps: 0, click: 100000000, desc: '+100M Click Power' },
    { id: 'spaceship',    name: 'Dumpling Cruiser',    icon: '🚀', baseCost: 35000000000,   sps: 180000000, click: 0, desc: '+180M SPS' },
    { id: 'click_15',     name: 'Supernova Squeeze',   icon: '💥', baseCost: 60000000000,   sps: 0, click: 350000000, desc: '+350M Click Power' },
    { id: 'alien',        name: 'Alien Squishers',     icon: '👽', baseCost: 100000000000,  sps: 600000000, click: 0, desc: '+600M SPS' },
    { id: 'nebula_harv',  name: 'Nebula Harvester',    icon: '🌠', baseCost: 200000000000,  sps: 1200000000, click: 0, desc: '+1.2B SPS' },
    { id: 'click_16',     name: 'Galactic Pinch',      icon: '🌌', baseCost: 350000000000,  sps: 0, click: 1800000000, desc: '+1.8B Click Power' },
    { id: 'planet',       name: 'Dumpling Planet',     icon: '🌍', baseCost: 600000000000,  sps: 3500000000, click: 0, desc: '+3.5B SPS' },
    { id: 'click_gamma',  name: 'Gamma Ray Burst',     icon: '☢️', baseCost: 900000000000,  sps: 0, click: 4500000000, desc: '+4.5B Click Power' },
    { id: 'click_17',     name: 'Black Hole Pull',     icon: '⚫', baseCost: 1500000000000, sps: 0, click: 7500000000, desc: '+7.5B Click Power' },
    { id: 'sun',          name: 'Dough Sun',           icon: '☀️', baseCost: 2500000000000, sps: 12000000000, click: 0, desc: '+12B SPS' },
    { id: 'quasar',       name: 'Quasar Engine',       icon: '💫', baseCost: 5000000000000, sps: 25000000000, click: 0, desc: '+25B SPS' },
    { id: 'click_18',     name: 'Cosmic Collision',    icon: '☄️', baseCost: 8000000000000, sps: 0, click: 40000000000, desc: '+40B Click Power' },
    { id: 'galaxy',       name: 'Squishy Galaxy',      icon: '💫', baseCost: 12000000000000, sps: 55000000000, click: 0, desc: '+55B SPS' },
    { id: 'click_19',     name: 'Dimensional Tear',    icon: '✂️', baseCost: 25000000000000, sps: 0, click: 125000000000, desc: '+125B Click Power' },
    { id: 'click_string', name: 'Cosmic String Snap',  icon: '🧵', baseCost: 40000000000000, sps: 0, click: 200000000000, desc: '+200B Click Power' },
    
    // --- God Tier ---
    { id: 'blackhole',    name: 'Dough Black Hole',    icon: '🕳️', baseCost: 65000000000000,sps: 300000000000, click: 0, desc: '+300B SPS' },
    { id: 'click_20',     name: 'Reality Snap',        icon: '🤌', baseCost: 100000000000000,sps: 0, click: 500000000000, desc: '+500B Click Power' },
    { id: 'entropy',      name: 'Entropy Reverser',    icon: '🔄', baseCost: 150000000000000,sps: 600000000000, click: 0, desc: '+600B SPS' },
    { id: 'multiverse',   name: 'Squish Multiverse',   icon: '🪐', baseCost: 250000000000000,sps: 800000000000, click: 0, desc: '+800B SPS' },
    { id: 'click_21',     name: 'Timeline Erase',      icon: '⏳', baseCost: 600000000000000,sps: 0, click: 3000000000000, desc: '+3T Click Power' },
    { id: 'click_delete', name: 'Existence Delete',    icon: '🗑️', baseCost: 800000000000000,sps: 0, click: 4000000000000, desc: '+4T Click Power' },
    { id: 'timeline',     name: 'Timeline Collapse',   icon: '💠', baseCost: 1500000000000000,sps: 4500000000000, click: 0, desc: '+4.5T SPS' },
    { id: 'click_22',     name: 'Omniversal Clap',     icon: '👏', baseCost: 3000000000000000,sps: 0, click: 15000000000000, desc: '+15T Click Power' },
    { id: 'sentience',    name: 'Dumpling Sentience',  icon: '🧠', baseCost: 5000000000000000, sps: 15000000000000, click: 0, desc: '+15T SPS' },
    { id: 'abstract',     name: 'Abstract Concept',    icon: '👁️', baseCost: 10000000000000000, sps: 30000000000000, click: 0, desc: '+30T SPS' },
    { id: 'click_23',     name: 'Godly Puncture',      icon: '🗡️', baseCost: 25000000000000000, sps: 0, click: 120000000000000, desc: '+120T Click Power' },
    { id: 'matrix',       name: 'The Squish Matrix',   icon: '💻', baseCost: 50000000000000000, sps: 150000000000000, click: 0, desc: '+150T SPS' },
    { id: 'click_24',     name: 'Big Bang Poke',       icon: '🌌', baseCost: 100000000000000000, sps: 0, click: 550000000000000, desc: '+550T Click Power' },
    { id: 'god',          name: 'Dumpling Deity',      icon: '👑', baseCost: 250000000000000000, sps: 800000000000000, click: 0, desc: '+800T SPS' },
    { id: 'click_25',     name: 'Developer Override',  icon: '⌨️', baseCost: 500000000000000000, sps: 0, click: 2500000000000000, desc: '+2.5Qa Click Power' },
    { id: 'creator',      name: 'The Developer',       icon: '💻', baseCost: 999999999999999999, sps: 9999999999999999, click: 0, desc: '+9.9Qa SPS' }
];

// ==========================================
// SKINS DATA (Massively Expanded + Perm Shop Skins)
// ==========================================
// ==========================================
// SKINS DATA (Massively Expanded + Perm Shop Skins)
// ==========================================
const SKINS_DATA = [
    // --- Exclusive Shop Permanent Skins (WITH EQUIPPED PERKS) ---
    { 
        id: 'ascendant',  
        name: 'Golden Ascendant',   
        cost: 0,        
        css: 'radial-gradient(circle at 30% 30%, #fffde7, #fbc02d)',
        isExclusive: true,
        perkMult: 15.0 // +15x Multiplier when equipped
    },
    { 
        id: 'galactic',   
        name: 'Galactic Overlord',  
        cost: 0,        
        css: 'radial-gradient(circle at 30% 30%, #81d4fa, #01579b)',
        isExclusive: true,
        perkMult: 150.0 // +150x Multiplier when equipped
    },
    { 
        id: 'sourcecode', 
        name: 'The Source Code',    
        cost: 0,        
        css: 'repeating-linear-gradient(0deg, #050505, #00ff66 2px, #000000 4px)',
        isExclusive: true,
        perkMult: 1000.0 // +1000x Multiplier when equipped
    },

    // --- Common Flavors ---
    { id: 'classic',    name: 'Classic Dough',      cost: 0,        css: 'radial-gradient(circle at 30% 30%, #fff3e0, #ffcc80)' },
    { id: 'vanilla',    name: 'Vanilla Bean',       cost: 75,       css: 'radial-gradient(circle at 30% 30%, #ffffff, #fff59d)' },
    { id: 'lemon',      name: 'Lemon Zest',         cost: 150,      css: 'radial-gradient(circle at 30% 30%, #fff9c4, #fbc02d)' },
    { id: 'mint',       name: 'Fresh Mint',         cost: 250,      css: 'radial-gradient(circle at 30% 30%, #b2dfdb, #009688)' },
    { id: 'matcha',     name: 'Matcha Green',       cost: 500,      css: 'radial-gradient(circle at 30% 30%, #e8f5e9, #81c784)' },
    { id: 'cherry',     name: 'Cherry Bomb',        cost: 800,      css: 'radial-gradient(circle at 30% 30%, #ffcdd2, #e53935)' },
    { id: 'blueberry',  name: 'Blueberry Burst',    cost: 1200,     css: 'radial-gradient(circle at 30% 30%, #e3f2fd, #42a5f5)' },
    { id: 'strawberry', name: 'Strawberry Pink',    cost: 2500,     css: 'radial-gradient(circle at 30% 30%, #fce4ec, #f06292)' },
    { id: 'grape',      name: 'Grape Jelly',        cost: 5000,     css: 'radial-gradient(circle at 30% 30%, #f3e5f5, #ab47bc)' },
    { id: 'chocolate',  name: 'Dark Chocolate',     cost: 8500,     css: 'radial-gradient(circle at 30% 30%, #795548, #3e2723)' },
    
    // --- Foods & Snacks ---
    { id: 'pizza',      name: 'Pepperoni Pizza',    cost: 12000,    css: 'radial-gradient(circle at 30% 30%, #ffcc80 40%, #e53935 60%, #fbc02d 100%)' },
    { id: 'pancake',    name: 'Syrup Pancake',      cost: 16000,    css: 'linear-gradient(to bottom, #ffe082 20%, #ffca28 60%, #5d4037 100%)' },
    { id: 'burger',     name: 'Cheeseburger',       cost: 20000,    css: 'linear-gradient(to bottom, #d7ccc8 25%, #4caf50 35%, #795548 50%, #ffeb3b 65%, #d7ccc8 75%)' },
    { id: 'hotdog',     name: 'Glizzy Dumpling',    cost: 28000,    css: 'linear-gradient(to right, #ffcc80 20%, #d32f2f 40%, #d32f2f 60%, #ffcc80 80%)' },
    { id: 'sushi',      name: 'Salmon Nigiri',      cost: 35000,    css: 'linear-gradient(to right, #ff8a65 40%, #ffffff 45%, #ff8a65 55%, #ffffff 60%, #ff8a65 100%)' },
    { id: 'taco',       name: 'Spicy Taco',         cost: 50000,    css: 'radial-gradient(circle at 50% 50%, #ffeb3b 30%, #4caf50 50%, #e53935 70%, #ffb300 100%)' },

    // --- Special Patterns ---
    { id: 'tie_dye',    name: 'Tie-Dye Swirl',      cost: 65000,    css: 'conic-gradient(from 45deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' },
    { id: 'rainbow',    name: 'Rainbow Squish',     cost: 85000,    css: 'linear-gradient(45deg, #ff9a9e, #fecfef, #a1c4fd, #c2e9fb)' },
    { id: 'watermelon', name: 'Watermelon',         cost: 150000,   css: 'linear-gradient(135deg, #ff4e50 45%, #f9d423 45%, #f9d423 55%, #4caf50 55%)' },
    { id: 'neapolitan', name: 'Neapolitan Ice Cream', cost: 250000, css: 'linear-gradient(to right, #6d4c41 33%, #fff3e0 33%, #fff3e0 66%, #f8bbd0 66%)' },
    { id: 'camo',       name: 'Tactical Camo',      cost: 400000,   css: 'radial-gradient(circle, #33691e 20%, #558b2f 40%, #1b5e20 60%, #827717 80%)' },
    { id: 'leopard',    name: 'Leopard Print',      cost: 550000,   css: 'repeating-radial-gradient(circle at 20% 20%, #ffb300, #ffb300 5px, #4e342e 6px, #ffb300 10px)' },
    { id: 'zebra',      name: 'Zebra Stripes',      cost: 750000,   css: 'repeating-linear-gradient(90deg, #fff, #fff 20px, #000 20px, #000 40px)' },
    { id: 'crystal',    name: 'Quartz Crystal',     cost: 900000,   css: 'linear-gradient(135deg, #f3e5f5, #e1bee7, #ce93d8, #ba68c8)' },
    
    // --- Elements & Textures ---
    { id: 'earth',      name: 'Mossy Earth',        cost: 1500000,  css: 'radial-gradient(circle at 30% 30%, #8bc34a, #33691e)' },
    { id: 'water',      name: 'Ocean Ripple',       cost: 3000000,  css: 'radial-gradient(circle at 30% 30%, #b2ebf2, #00838f)' },
    { id: 'amethyst',   name: 'Geode Amethyst',     cost: 4000000,  css: 'radial-gradient(circle at 50% 50%, #ea80fc, #aa00ff, #4a148c)' },
    { id: 'fire',       name: 'Blazing Fire',       cost: 6000000,  css: 'radial-gradient(circle at 30% 30%, #ffff00, #ff5722, #b71c1c)' },
    { id: 'emerald',    name: 'Radiant Emerald',    cost: 9000000,  css: 'radial-gradient(circle at 30% 30%, #b9f6ca, #00e676, #1b5e20)' },
    { id: 'ice',        name: 'Frostbite',          cost: 12000000, css: 'linear-gradient(to bottom right, #e0ffff, #87ceeb, #00bfff, #fff)' },
    { id: 'sapphire',   name: 'Deep Sapphire',      cost: 20000000, css: 'radial-gradient(circle at 30% 30%, #8c9eff, #2979ff, #000051)' },
    { id: 'lightning',  name: 'Thunderstorm',       cost: 25000000, css: 'radial-gradient(circle at 50% 50%, #ffffff 10%, #ffeb3b 20%, #311b92 80%)' },
    { id: 'lava',       name: 'Magma Core',         cost: 50000000, css: 'radial-gradient(circle at 50% 50%, #ffeb3b 5%, #ff5722 30%, #212121 90%)' },
    { id: 'slime',      name: 'Toxic Slime',        cost: 85000000, css: 'radial-gradient(circle at 30% 30%, #ccff90, #76ff03, #33691e)' },
    { id: 'pearl',      name: 'Oyster Pearl',       cost: 100000000,css: 'radial-gradient(circle at 40% 40%, #ffffff, #fce4ec, #e0f7fa, #f3e5f5)' },

    // --- Precious Materials ---
    { id: 'bronze',     name: 'Aged Bronze',        cost: 150000000,css: 'linear-gradient(135deg, #a1887f, #5d4037, #3e2723)' },
    { id: 'silver',     name: 'Polished Silver',    cost: 300000000,css: 'linear-gradient(135deg, #f5f5f5, #9e9e9e, #e0e0e0, #616161)' },
    { id: 'rosegold',   name: 'Rose Gold',          cost: 500000000,css: 'linear-gradient(135deg, #ffcdd2, #ef9a9a, #e57373, #ef5350)' },
    { id: 'gold',       name: 'Solid Gold',         cost: 750000000,css: 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)' },
    { id: 'platinum',   name: 'Pure Platinum',      cost: 1500000000,css:'radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0, #9e9e9e)' },
    { id: 'meteorite',  name: 'Space Meteorite',    cost: 2000000000,css:'repeating-linear-gradient(45deg, #424242, #424242 10px, #616161 10px, #616161 20px)' },
    { id: 'obsidian',   name: 'Obsidian Glass',     cost: 3000000000,css:'radial-gradient(circle at 30% 30%, #424242, #212121, #000000)' },
    { id: 'ruby',       name: 'Blood Ruby',         cost: 7500000000,css:'radial-gradient(circle at 30% 30%, #ff8a80, #d50000, #b71c1c)' },
    { id: 'diamond',    name: 'Flawless Diamond',   cost: 15000000000,css:'radial-gradient(circle at 30% 30%, #ffffff, #e0f7fa, #b2ebf2, #4dd0e1)' },
    { id: 'stardust',   name: 'Stardust',           cost: 25000000000,css:'radial-gradient(circle at 50% 50%, #ffffff, #fff59d, #212121)' },
    
    // --- Cosmic & Impossible ---
    { id: 'holo',       name: 'Holographic',        cost: 50000000000, css: 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3)' },
    { id: 'nebula',     name: 'Cosmic Nebula',      cost: 150000000000, css: 'radial-gradient(circle at 30% 30%, #ff8a65, #ba68c8, #3f51b5, #1a237e)' },
    { id: 'pulsar',     name: 'Pulsar Star',        cost: 250000000000, css: 'radial-gradient(circle at 50% 50%, #ffffff, #00e5ff, #000000)' },
    { id: 'supernova',  name: 'Supernova Burst',    cost: 400000000000, css: 'radial-gradient(circle, #ffffff, #ffff00, #ff0000, #800080, #000000)' },
    { id: 'event_horizon',name:'Event Horizon',     cost: 800000000000, css: 'radial-gradient(circle at 50% 50%, #000000 30%, #ff3d00 35%, #000000 100%)' },
    { id: 'darkmatter', name: 'Dark Matter',        cost: 1000000000000, css: 'radial-gradient(circle at 50% 50%, #311b92, #1a237e, #000000)' },
    { id: 'glitch',     name: 'Corrupted Data',     cost: 3500000000000, css: 'repeating-linear-gradient(45deg, #000, #000 10px, #0f0 10px, #0f0 20px, #f0f 20px, #f0f 30px)' },
    { id: 'binary_code',name: 'Binary Stream',      cost: 8000000000000, css: 'repeating-linear-gradient(0deg, #1b5e20, #00e676 2px, #000000 4px)' },
    { id: 'matrix',     name: 'The Code',           cost: 10000000000000, css: 'repeating-linear-gradient(0deg, #000, #000 5px, #0f0 6px, #000 10px)' },
    { id: 'void',       name: 'The Void',           cost: 50000000000000, css: 'radial-gradient(circle at 50% 50%, #212121 0%, #000000 100%)' },
    { id: 'transcendence',name:'Transcendence',     cost: 100000000000000, css: 'linear-gradient(to right, #ffffff, #e0e0e0, #ffffff)' },
    { id: 'invisible',  name: 'Invisibility Cloak', cost: 250000000000000, css: 'rgba(255, 255, 255, 0.05)' },
    { id: '4d_tesseract',name:'4D Tesseract',       cost: 500000000000000, css: 'conic-gradient(from 90deg, #000000, #ffffff, #000000, #ffffff)' },
    { id: 'infinite',   name: 'Infinite Squish',    cost: 999999999999999, css: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }
];
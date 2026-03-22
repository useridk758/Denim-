const subtitle = document.getElementById('subtitle');
let currentTimeZone = "local";
let currentLang = "en";

// 1. Language Data
const translations = {
    en: { launch: "GO", settings: "SETTINGS", music: "MUSIC", games: "GAMES", placeholder: "Search the web..." },
    es: { launch: "IR", settings: "AJUSTES", music: "MÚSICA", games: "JUEGOS", placeholder: "Buscar en la web..." },
    fr: { launch: "ALLER", settings: "PARAMÈTRES", music: "MUSIQUE", games: "JEUX", placeholder: "Chercher..." },
    jp: { launch: "行く", settings: "設定", music: "音楽", games: "ゲーム", placeholder: "検索..." }
};

// 2. Time & Subtitle Cycle
function updateUI() {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    if (currentTimeZone !== "local") options.timeZone = currentTimeZone;
    const timeStr = new Intl.DateTimeFormat('en-US', options).format(new Date());

    const phrases = [
        "join https://discord.gg/UDWHxyG6",
        "v.3 is out now",
        `the time is ${timeStr}`
    ];
    
    // Cycle phrases every few seconds or keep random
    if (!subtitle.dataset.index) subtitle.dataset.index = 0;
    subtitle.innerText = phrases[subtitle.dataset.index];
}

setInterval(updateUI, 1000);
setInterval(() => { subtitle.dataset.index = (parseInt(subtitle.dataset.index) + 1) % 3; }, 5000);

// 3. Navigation & Search (RESTORED)
function handleSearch(e) {
    e.preventDefault();
    openSite(document.getElementById('url-input').value);
}

function handleNavEnter(e) {
    if (e.key === 'Enter') openSite(document.getElementById('nav-url-input').value);
}

function openSite(url) {
    if (!url) return;
    document.getElementById('loader').classList.remove('hidden');
    if (!url.includes('.') ) url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    else if (!/^http/.test(url)) url = 'https://' + url;

    document.getElementById('ui').classList.add('hidden');
    document.getElementById('nav-bar').classList.remove('hidden');
    const viewer = document.getElementById('content-viewer');
    viewer.style.display = 'block';
    viewer.src = url;
    document.getElementById('nav-url-input').value = url;
}

viewer.onload = () => document.getElementById('loader').classList.add('hidden');

function goHome() {
    document.getElementById('ui').classList.remove('hidden');
    document.getElementById('nav-bar').classList.add('hidden');
    document.getElementById('content-viewer').style.display = 'none';
    document.getElementById('content-viewer').src = '';
}

// 4. Settings Makeover Logic
function toggleSettings() { document.getElementById('settings-modal').classList.toggle('hidden'); }

function showTab(e, tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.remove('hidden');
    e.currentTarget.classList.add('active');
}

function saveSettings() {
    // Apply Color
    document.getElementById('main-title').style.color = document.getElementById('set-color-input').value;
    
    // Apply Timezone
    currentTimeZone = document.getElementById('timezone-select').value;
    
    // Apply Language
    currentLang = document.getElementById('lang-select').value;
    const t = translations[currentLang];
    document.getElementById('launch').innerText = t.launch;
    document.getElementById('nav-settings').innerText = t.settings;
    document.getElementById('nav-music').innerText = t.music;
    document.getElementById('nav-games').innerText = t.games;
    document.getElementById('url-input').placeholder = t.placeholder;

    toggleSettings();
    updateUI();
}

function openMusic() { openSite('https://monochrome.tf/'); }

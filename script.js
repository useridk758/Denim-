const subtitle = document.getElementById('subtitle');
let currentTimeZone = "local";

// Time Logic
function updateTimeDisplay() {
    const tzSelect = document.getElementById('timezone-select');
    if (tzSelect) currentTimeZone = tzSelect.value;

    const phrases = [
        "join https://discord.gg/UDWHxyG6",
        "v.3 is out now",
        getTimeString()
    ];
    
    // Logic to pick a phrase. If you want it random on home, use the previous random logic.
    // For this makeover, let's keep it on a set cycle or random.
    const randomIndex = Math.floor(Math.random() * phrases.length);
    subtitle.innerText = phrases[randomIndex];
}

function getTimeString() {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    if (currentTimeZone !== "local") options.timeZone = currentTimeZone;
    
    const timeStr = new Intl.DateTimeFormat('en-US', options).format(new Date());
    return `the time is ${timeStr}`;
}

// Update time every second if the subtitle is showing time
setInterval(() => {
    if (subtitle.innerText.includes("the time is")) {
        subtitle.innerText = getTimeString();
    }
}, 1000);

// Tab Logic
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

// Initial Call
updateTimeDisplay();

// --- Proxy Logic ---
function openSite(url, hideUrl = false) {
    if (!url) return;
    document.getElementById('ui').classList.add('fade-out');
    document.getElementById('loader').classList.remove('hidden');
    setTimeout(() => {
        if (!url.includes('.') && !hideUrl) url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
        else if (!/^http(s?):\/\//.test(url)) url = 'https://' + url;
        
        document.getElementById('ui').classList.add('hidden');
        document.getElementById('content-viewer').style.display = 'block';
        document.getElementById('nav-bar').classList.remove('hidden');
        document.getElementById('content-viewer').src = url;
    }, 500);
}

document.getElementById('content-viewer').onload = () => document.getElementById('loader').classList.add('hidden');

function goHome() {
    document.getElementById('content-viewer').style.display = 'none';
    document.getElementById('nav-bar').classList.add('hidden');
    document.getElementById('ui').classList.remove('hidden');
    document.getElementById('ui').classList.remove('fade-out');
    updateTimeDisplay();
}

function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.classList.toggle('hidden');
}

function saveSettings() {
    const colorVal = document.getElementById('set-color-input').value;
    document.getElementById('main-title').style.color = colorVal;
    toggleSettings();
}

function openMusic() { openSite('https://monochrome.tf/', true); }

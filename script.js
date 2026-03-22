const ui = document.getElementById('ui');
const viewer = document.getElementById('content-viewer');
const navBar = document.getElementById('nav-bar');
const navUrlInput = document.getElementById('nav-url-input');
const urlInput = document.getElementById('url-input');
const modal = document.getElementById('settings-modal');
const loader = document.getElementById('loader');
const subtitle = document.getElementById('subtitle');

// Random Subtitle Logic
const phrases = [
    "join https://discord.gg/UDWHxyG6",
    "v.3 is out now",
    "the time is idk"
];

function setRandomSubtitle() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    subtitle.innerText = phrases[randomIndex];
}

// Call subtitle on load
setRandomSubtitle();

function openSite(url, hideUrl = false) {
    if (!url) return;
    ui.classList.add('fade-out');
    loader.classList.remove('hidden');
    loader.style.opacity = "1";
    setTimeout(() => {
        if (!url.includes('.') && !hideUrl) {
            url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
        } else if (!/^http(s?):\/\//.test(url)) {
            url = 'https://' + url;
        }
        ui.classList.add('hidden');
        ui.classList.remove('fade-out');
        viewer.style.display = 'block';
        viewer.style.opacity = '0';
        navBar.classList.remove('hidden');
        navBar.style.display = 'flex';
        viewer.src = url;
        navUrlInput.value = hideUrl ? "Music Player" : url;
    }, 500);
}

viewer.onload = () => {
    loader.classList.add('hidden');
    viewer.style.opacity = '1';
};

function openMusic() {
    openSite('https://monochrome.tf/', true);
}

function goHome() {
    viewer.style.opacity = '0';
    loader.classList.add('hidden');
    setTimeout(() => {
        viewer.style.display = 'none';
        navBar.classList.add('hidden');
        navBar.style.display = 'none';
        ui.classList.remove('hidden');
        viewer.src = '';
        urlInput.value = '';
        setRandomSubtitle(); // Get a new random phrase when returning home
    }, 500);
}

document.querySelector('.search-container').addEventListener('submit', (e) => {
    e.preventDefault();
    openSite(urlInput.value);
});

navUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') openSite(navUrlInput.value);
});

function toggleSettings() {
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.style.opacity = "0";
        setTimeout(() => modal.style.opacity = "1", 10);
    } else {
        modal.style.opacity = "0";
        setTimeout(() => modal.classList.add('hidden'), 400);
    }
}

function saveSettings() {
    const colorVal = document.getElementById('set-color-input').value;
    document.getElementById('main-title').style.color = colorVal;
    toggleSettings();
}

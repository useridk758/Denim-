const ui = document.getElementById('ui');
const viewer = document.getElementById('content-viewer');
const navBar = document.getElementById('nav-bar');
const navUrlInput = document.getElementById('nav-url-input');
const urlInput = document.getElementById('url-input');
const modal = document.getElementById('settings-modal');

function openSite(url) {
    if (!url) return;
    if (!url.includes('.')) {
        url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    } else if (!/^http(s?):\/\//.test(url)) {
        url = 'https://' + url;
    }
    
    ui.classList.add('hidden');
    viewer.style.display = 'block';
    navBar.classList.remove('hidden');
    navBar.style.display = 'flex';
    viewer.src = url;
    navUrlInput.value = url;
}

function goHome() {
    viewer.style.display = 'none';
    navBar.classList.add('hidden');
    navBar.style.display = 'none';
    ui.classList.remove('hidden');
    viewer.src = '';
    urlInput.value = '';
}

document.querySelector('.search-container').addEventListener('submit', (e) => {
    e.preventDefault();
    openSite(urlInput.value);
});

navUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') openSite(navUrlInput.value);
});

// Settings Logic with Fade
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

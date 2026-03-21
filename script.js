const ui = document.getElementById('ui');
const viewer = document.getElementById('content-viewer');
const navBar = document.getElementById('nav-bar');
const navUrlInput = document.getElementById('nav-url-input');
const urlInput = document.getElementById('url-input');

function openSite(url) {
    if (!url) return;
    // Format URL
    if (!url.includes('.')) {
        url = 'https://www.google.com' + encodeURIComponent(url);
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

// Search Listeners
document.querySelector('.search-container').addEventListener('submit', (e) => {
    e.preventDefault();
    openSite(urlInput.value);
});

navUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') openSite(navUrlInput.value);
});

// Settings Logic
function toggleSettings() {
    document.getElementById('settings-modal').classList.toggle('hidden');
}

function saveSettings() {
    const titleVal = document.getElementById('set-title-input').value;
    const colorVal = document.getElementById('set-color-input').value;
    
    if (titleVal) document.getElementById('main-title').innerText = titleVal;
    document.getElementById('main-title').style.color = colorVal;
    
    toggleSettings();
}

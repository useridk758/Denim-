const ui = document.getElementById('ui');
const viewer = document.getElementById('content-viewer');
const navBar = document.getElementById('nav-bar');
const navUrlInput = document.getElementById('nav-url-input');

function loadUrl(url) {
    if (!url) return;
    if (!url.includes('.')) {
        url = 'https://www.google.com' + encodeURIComponent(url);
    } else if (!/^http(s?):\/\//.test(url)) {
        url = 'https://' + url;
    }
    
    ui.style.display = 'none';
    viewer.style.display = 'block';
    navBar.style.display = 'flex';
    viewer.src = url;
    navUrlInput.value = url;
}

// Home Search
document.querySelector('.search-container').addEventListener('submit', (e) => {
    e.preventDefault();
    loadUrl(document.getElementById('url-input').value);
});

// Nav Bar Search
document.getElementById('nav-go-btn').onclick = () => loadUrl(navUrlInput.value);

// Exit Button
document.getElementById('exit-btn').onclick = () => {
    viewer.style.display = 'none';
    navBar.style.display = 'none';
    ui.style.display = 'flex';
    viewer.src = '';
};

// Settings Logic
function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function saveSettings() {
    const newTitle = document.getElementById('set-title').value;
    const newColor = document.getElementById('set-color').value;
    const dimVal = document.getElementById('set-dim').value;

    if (newTitle) document.getElementById('main-title').innerText = newTitle;
    document.getElementById('main-title').style.color = newColor;
    ui.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.${dimVal}), rgba(0,0,0,0.${dimVal})), url("background.jpg")`;
    
    toggleSettings();
}

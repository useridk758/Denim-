const ui = document.getElementById('ui');
const viewer = document.getElementById('content-viewer');
const navBar = document.getElementById('nav-bar');
const navUrlInput = document.getElementById('nav-url-input');
const urlInput = document.getElementById('url-input');
const modal = document.getElementById('settings-modal');

function openSite(url, hideUrl = false) {
    if (!url) return;
    
    // Fade UI out
    ui.classList.add('fade-out');
    
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
        // If hideUrl is true (for Music), we set a fake label or keep it blank
        navUrlInput.value = hideUrl ? "Music Player" : url;
        
        // Fade Viewer in
        setTimeout(() => {
            viewer.style.opacity = '1';
        }, 50);
    }, 500);
}

function openMusic() {
    // Specifically opens the music site with the URL hidden
    openSite('https://monochrome.tf/', true);
}

function goHome() {
    viewer.style.opacity = '0';
    setTimeout(() => {
        viewer.style.display = 'none';
        navBar.classList.add('hidden');
        navBar.style.display = 'none';
        ui.classList.remove('hidden');
        viewer.src = '';
        urlInput.value = '';
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

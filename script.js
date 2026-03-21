const form = document.querySelector('form');
const input = document.getElementById('url-input');
const viewer = document.getElementById('content-viewer');
const ui = document.getElementById('ui');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let url = input.value.trim();

    if (!url) return;

    // Basic logic to handle searching vs direct URL
    if (!url.includes('.')) {
        url = 'https://www.google.com' + encodeURIComponent(url);
    } else if (!/^http(s?):\/\//.test(url)) {
        url = 'https://' + url;
    }

    ui.style.opacity = '0';
    setTimeout(() => {
        ui.style.display = 'none';
        viewer.style.display = 'block';
        viewer.src = url;
    }, 500);
});

// Press ESC to go back to the Denim! home screen
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        viewer.style.display = 'none';
        ui.style.display = 'flex';
        ui.style.opacity = '1';
        viewer.src = '';
    }
});

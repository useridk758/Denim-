const form = document.querySelector('form');
const input = document.getElementById('url-input');
const viewer = document.getElementById('content-viewer');
const ui = document.getElementById('ui');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let url = input.value.trim();

    if (!url) return;

    // Add https if missing
    if (!/^http(s?):\/\//.test(url)) {
        url = 'https://' + url;
    }

    // 1. Show the viewer
    viewer.style.display = 'block';
    // 2. Hide the main UI
    ui.style.display = 'none';
    // 3. Set the source to the URL
    viewer.src = url;
});

// To go back, you can add a listener for a key like 'Escape'
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        viewer.style.display = 'none';
        ui.style.display = 'flex';
        viewer.src = '';
    }
});

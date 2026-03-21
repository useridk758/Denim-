const form = document.querySelector('form');
const input = document.getElementById('url-input');
const viewer = document.getElementById('content-viewer');
const ui = document.getElementById('ui');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let url = input.value.trim();
    if (!url) return;

    if (!url.includes('.')) {
        url = 'https://www.google.com' + encodeURIComponent(url);
    } else if (!/^http(s?):\/\//.test(url)) {
        url = 'https://' + url;
    }

    ui.style.display = 'none';
    viewer.style.display = 'block';
    viewer.src = url;
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        viewer.style.display = 'none';
        ui.style.display = 'flex';
        viewer.src = '';
    }
});

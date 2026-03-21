const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();

    // Register UV Service Worker
    try {
        await window.navigator.serviceWorker.register('./uv/uv.sw.js', {
            scope: __uv$config.prefix
        });

        let url = input.value.trim();
        if (!url.includes('.')) url = 'https://www.google.com' + url;
        else if (!/^http(s?):\/\//.test(url)) url = 'https://' + url;

        // This line opens the URL within your proxy context
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    } catch (err) {
        alert("Proxy failed to load. Make sure you uploaded the UV folder!");
        console.error(err);
    }
});

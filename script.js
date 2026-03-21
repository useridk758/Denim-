const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();

    // Register Service Worker from the UV folder
    try {
        await window.navigator.serviceWorker.register('./uv/uv.sw.js', {
            scope: __uv$config.prefix
        });

        let url = input.value.trim();
        // Check if it's a URL or a search query
        if (!url.includes('.')) {
            url = 'https://www.google.com' + encodeURIComponent(url);
        } else if (!/^http(s?):\/\//.test(url)) {
            url = 'https://' + url;
        }

        // Launch into the proxy service on your site
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    } catch (err) {
        console.error("Could not load proxy engine:", err);
    }
});

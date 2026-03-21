const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    // Register the proxy engine
    try {
        await window.navigator.serviceWorker.register('./uv/uv.sw.js', {
            scope: __uv$config.prefix
        });

        let url = input.value.trim();
        if (!url.includes('.')) {
            url = 'https://www.google.com' + encodeURIComponent(url);
        } else if (!/^http(s?):\/\//.test(url)) {
            url = 'https://' + url;
        }

        // Opens the site inside your proxy on your same domain
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    } catch (e) {
        console.error("UV Failed. Did you upload the /uv/ folder?", e);
    }
});

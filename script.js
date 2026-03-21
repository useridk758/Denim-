const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    try {
        // Register the Service Worker
        await window.navigator.serviceWorker.register('./uv/uv.sw.js', {
            scope: __uv$config.prefix
        });

        let url = input.value.trim();
        
        // Handle search vs direct URL
        if (!url.includes('.')) {
            url = 'https://www.google.com' + encodeURIComponent(url);
        } else if (!/^http(s?):\/\//.test(url)) {
            url = 'https://' + url;
        }

        // Redirect into the proxy frame
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    } catch (err) {
        alert("Failed to load proxy. Ensure the /uv/ folder is uploaded.");
        console.error(err);
    }
});

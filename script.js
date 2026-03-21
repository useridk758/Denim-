const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    // Register the proxy's "engine"
    await window.navigator.serviceWorker.register('./uv/uv.sw.js', {
        scope: __uv$config.prefix
    });

    let url = input.value.trim();
    if (!url.includes('.')) url = 'https://www.google.com' + url;
    else if (!/^http(s?):\/\//.test(url)) url = 'https://' + url;

    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});

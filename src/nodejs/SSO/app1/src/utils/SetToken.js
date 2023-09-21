window.addEventListener('message', (e) => {
    if (e.data && e.data.token) {
        localStorage.setItem('token', e.data.token)
    }
})
let iframe = document.createElement('iframe');
iframe.width = 0;
iframe.height = 0;
iframe.style.display = 'none';
iframe.src = 'http://localhost:8080'
document.body.appendChild(iframe);
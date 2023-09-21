window.addEventListener('message', (e) => {
    if (e.data && e.data.token) {
        console.log('有token执行')
        localStorage.setItem('token', e.data.token)
    }
    console.log(localStorage.getItem('token'), '设置后的token')
})
let iframe = document.createElement('iframe');
iframe.width = 0;
iframe.height = 0;
iframe.style.display = 'none';
iframe.src = 'http://localhost:8080'
document.body.appendChild(iframe);
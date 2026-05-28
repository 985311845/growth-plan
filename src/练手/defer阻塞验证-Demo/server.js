/**
 * defer 阻塞验证服务器
 * 
 * 运行方式：
 * 1. 确保你已安装 Node.js
 * 2. 在当前目录下打开终端，执行：node server.js
 * 3. 浏览器访问 http://localhost:3000
 * 4. 打开 F12 → Network 面板 和 Console 面板观察
 * 5. 按 Ctrl+C 停止服务器
 */

const http = require('http');

// 模拟延迟响应 JS 文件
function sendScript(res, delayMs, name) {
  res.writeHead(200, {
    'Content-Type': 'text/javascript; charset=utf-8',
    'Cache-Control': 'no-cache'
  });

  setTimeout(() => {
    const code = `console.log('%c[${name}] 执行，时间: ' + performance.now().toFixed(0) + 'ms', 'color: ${name === 'B' ? 'red' : 'green'}; font-weight: bold;');`;
    res.end(code);
  }, delayMs);
}

const server = http.createServer((req, res) => {
  if (req.url === '/a.js') {
    console.log(`[${new Date().toLocaleTimeString()}] 收到 A 请求，将在 0.5秒后响应`);
    return sendScript(res, 500, 'A');
  }
  if (req.url === '/b.js') {
    console.log(`[${new Date().toLocaleTimeString()}] 收到 B 请求，将在 5秒后响应（故意很慢）`);
    return sendScript(res, 10000, 'B');
  }
  if (req.url === '/c.js') {
    console.log(`[${new Date().toLocaleTimeString()}] 收到 C 请求，将在 0.5秒后响应`);
    return sendScript(res, 500, 'C');
  }

  // 返回 HTML 页面
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>defer 阻塞验证</title>
  <script>
    // 辅助函数：在控制台打带时间戳的日志
    window.log = function(msg) {
      var t = performance.now().toFixed(0);
      console.log('[' + t + 'ms]', msg);
    };
  </script>
  <!-- 三个 defer 脚本：A 和 C 很快，B 故意很慢 -->
  <script defer src="/a.js"></script>
  <script defer src="/b.js"></script>
  <script defer src="/c.js"></script>
</head>
<body>
  <h2>defer 阻塞验证 Demo</h2>
  <p>请打开 F12 → Console 和 Network 面板观察</p>
  <p>页面内容已渲染</p>
  <script>
    log('HTML 解析完成（DOM 已就绪）');
  </script>
</body>
</html>`);
});

server.listen(3000, () => {
  console.log('============================================');
  console.log('🚀 服务器已启动');
  console.log('👉 请在浏览器打开 http://localhost:3000');
  console.log('🔧 打开 F12 → Network + Console 观察');
  console.log('🛑 按 Ctrl+C 停止服务器');
  console.log('============================================');
});

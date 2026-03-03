const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const pwaTags = `
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#4ECDC4" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Pact" />
    <link rel="apple-touch-icon" href="/icon-192x192.png" />`;

const swScript = `<script>if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js');});}</script>`;

html = html.replace('</head>', pwaTags + '\n  </head>');
html = html.replace('</body>', swScript + '</body>');

fs.writeFileSync(indexPath, html);
console.log('PWA tags injected into dist/index.html');

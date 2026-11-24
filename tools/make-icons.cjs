// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、白い十字（病院）と「割」の字。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <g><rect x="38" y="14" width="24" height="44" rx="4" fill="#fffdf7"/><rect x="28" y="24" width="44" height="24" rx="4" fill="#fffdf7"/><text x="50" y="90" font-size="26" font-weight="900" text-anchor="middle" fill="#f6d77a" font-family="Noto Sans CJK JP,sans-serif">割</text></g></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();

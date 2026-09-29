const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { spawn } = require("child_process");

const root = process.cwd();
const pack = path.join(root, "horizontal-video-pack");
const overlayDir = path.join(pack, "overlays");
const outDir = path.join(pack, "videos");
const profileDir = path.join(pack, ".chrome-profile-" + Date.now());

const chrome = fs.existsSync("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe")
  ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const ffmpeg = "D:\\AI-Video-Workflow\\tools\\ffmpeg\\ffmpeg-8.1.1-essentials_build\\bin\\ffmpeg.exe";
const fps = 15;
const width = 1920;
const height = 1080;
const port = 9223 + Math.floor(Math.random() * 2000);

const clips = [
  ["intro-title.html", 5],
  ["token-waste-flow.html", 15],
  ["cost-router-flow.html", 8],
  ["model-decision-card.html", 12],
  ["before-after.html", 12],
  ["ending-card.html", 8],
];

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(profileDir, { recursive: true });

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJson(url) {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch {}
    await wait(250);
  }
  throw new Error(`Chrome DevTools not ready: ${url}`);
}

function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const raw = typeof event.data === "string"
      ? event.data
      : Buffer.from(event.data).toString("utf8");
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    }
  };
  ws.onclose = () => {
    for (const { reject } of pending.values()) reject(new Error("CDP WebSocket closed"));
    pending.clear();
  };
  return new Promise((resolve, reject) => {
    ws.onerror = reject;
    ws.onopen = () => resolve({
      send(method, params = {}) {
        const callId = ++id;
        ws.send(JSON.stringify({ id: callId, method, params }));
        return new Promise((resolve, reject) => pending.set(callId, { resolve, reject }));
      },
      close() { ws.close(); },
    });
  });
}

async function renderClip(client, html, seconds) {
  const input = path.join(overlayDir, html);
  const output = path.join(outDir, html.replace(/\.html$/i, ".mp4"));
  const frames = Math.round(seconds * fps);
  const fileUrl = pathToFileURL(input).href;

  await client.send("Page.navigate", { url: fileUrl });
  await wait(900);

  const ff = spawn(ffmpeg, [
    "-y",
    "-f", "image2pipe",
    "-framerate", String(fps),
    "-vcodec", "png",
    "-i", "-",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-r", "30",
    "-movflags", "+faststart",
    output,
  ], { stdio: ["pipe", "ignore", "pipe"] });

  let err = "";
  ff.stderr.on("data", (d) => err += d.toString());

  for (let i = 0; i < frames; i++) {
    const shot = await client.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: false,
    });
    ff.stdin.write(Buffer.from(shot.data, "base64"));
    await wait(1000 / fps);
  }
  ff.stdin.end();

  await new Promise((resolve, reject) => {
    ff.on("close", (code) => code === 0 ? resolve() : reject(new Error(err)));
  });
  console.log(`${html} -> ${path.relative(root, output)}`);
}

(async () => {
  console.log(`chrome: ${chrome}`);
  console.log(`ffmpeg: ${ffmpeg}`);
  const browser = spawn(chrome, [
    "--headless=new",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    `--window-size=${width},${height}`,
    "--disable-gpu",
    "--disable-gpu-compositing",
    "--disable-features=VizDisplayCompositor,UseSkiaRenderer",
    "--disable-extensions",
    "--disable-component-extensions-with-background-pages",
    "--disable-gpu-sandbox",
    "--disable-dev-shm-usage",
    "--hide-scrollbars",
    "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe"] });
  browser.stderr.on("data", (d) => {
    const line = d.toString();
    if (/error|failed|crash/i.test(line)) process.stderr.write(line);
  });

  try {
    console.log(`devtools: http://127.0.0.1:${port}/json/list`);
    const list = await waitForJson(`http://127.0.0.1:${port}/json/list`);
    console.log(`targets: ${list.length}`);
    const page = list.find((x) => x.type === "page") || list[0];
    console.log(`page: ${page && page.webSocketDebuggerUrl}`);
    const client = await cdp(page.webSocketDebuggerUrl);
    console.log("cdp connected");
    await client.send("Page.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width, height, deviceScaleFactor: 1, mobile: false,
    });

    for (const [html, seconds] of clips) {
      await renderClip(client, html, seconds);
    }
    client.close();
  } finally {
    browser.kill();
  }
})().catch((error) => {
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
});

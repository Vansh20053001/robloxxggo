import { chromium } from 'playwright';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const root = path.resolve('static');
const port = 8090;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || '127.0.0.1'}`);
  let file = path.join(root, url.pathname === '/' ? 'index.html' : url.pathname);

  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(root, 'index.html');
  }

  response.setHeader('Content-Type', types[path.extname(file)] || 'text/plain; charset=utf-8');
  fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));

const routes = [
  '/',
  '/top_100_trending_now_games',
  '/games/most_played',
  '/game/4924922222',
  '/search?q=brookhaven',
  '/genres',
];

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];

page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => {
  const text = message.text();
  if (message.type() === 'error' && !text.includes('ERR_NETWORK_ACCESS_DENIED') && !text.includes('Failed to load resource')) {
    errors.push(text);
  }
});

for (const route of routes) {
  try {
    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('header', { timeout: 10000 });
    await page.waitForSelector('main', { timeout: 10000 });
    const title = await page.title();
    const h1 = await page.locator('h1').first().textContent({ timeout: 2000 }).catch(() => '');
    console.log(`${route} :: ${title} :: ${h1 || 'no h1'}`);
  } catch (error) {
    errors.push(`${route}: ${error.message}`);
    break;
  }
}

const gameHref = errors.length ? null : await page.locator('a[href^="/game/"]').first().getAttribute('href', { timeout: 5000 }).catch(() => null);
if (gameHref) {
  await page.goto(`http://127.0.0.1:${port}${gameHref}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('header');
  console.log(`${gameHref} :: ${await page.title()}`);
}

await browser.close();
server.close();

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

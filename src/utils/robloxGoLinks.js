const ROBLOXGO_HOSTS = new Set(['robloxgo.com', 'www.robloxgo.com']);

const trimTrailingSlash = (path = '') => (path.length > 1 ? path.replace(/\/+$/, '') : path);

const decodePart = (value = '') => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const chartPath = (key = '') => (
  key === 'top_100_trending_now_games'
    ? '/top_100_trending_now_games'
    : `/chart?chart=${encodeURIComponent(key)}`
);

export const toLocalRobloxGoPath = (href = '') => {
  if (!href || typeof href !== 'string') return href;

  let url;
  try {
    url = new URL(href, 'https://www.robloxgo.com');
  } catch {
    return href;
  }

  if (!ROBLOXGO_HOSTS.has(url.hostname)) return href;

  const path = trimTrailingSlash(url.pathname);
  const parts = path.split('/').filter(Boolean).map(decodePart);
  const suffix = `${url.search || ''}${url.hash || ''}`;

  if (!parts.length) return `/${suffix}`;

  const [section] = parts;

  if (section === 'game' && parts[1]) {
    const gameId = parts[1];
    const codeIndex = parts.indexOf('roblox-game-codes');
    const eventsIndex = parts.indexOf('events');
    const guideIndex = parts.indexOf('guide');
    const watchIndex = parts.indexOf('watch');

    if (codeIndex >= 0) return `/game/${gameId}/roblox-game-codes${suffix}`;
    if (eventsIndex >= 0 && parts[eventsIndex + 1]) {
      const eventId = parts[eventsIndex + 1];
      const eventSlug = parts[eventsIndex + 2] || 'event';
      return `/game/${gameId}/events/${eventId}/${eventSlug}${suffix}`;
    }
    if (guideIndex >= 0) {
      const guideSlug = parts[guideIndex + 1];
      return guideSlug ? `/game/${gameId}/guide/${guideSlug}${suffix}` : `/game/${gameId}/guide${suffix}`;
    }
    if (watchIndex >= 0) return `/game/${gameId}${suffix}`;

    return `/game/${gameId}${suffix}`;
  }

  if (section === 'blog') {
    if (parts[1] === 'post' && parts[2]) return `/blog/post/${parts[2]}${suffix}`;
    return `/blog${suffix}`;
  }

  if (section === 'guide' && parts[1]) return `/guide/${parts[1]}${suffix}`;
  if (section === 'developer' && parts[1]) {
    return parts[2] ? `/developer/${parts[1]}/${parts[2]}${suffix}` : `/developer/${parts[1]}${suffix}`;
  }
  if ((section === 'genre' || section === 'genres') && parts[1]) return `/genres/${parts[1]}${suffix}`;
  if (section === 'chart' && parts[1]) return `${chartPath(parts[1])}${url.hash || ''}`;
  if (section === 'list' && parts[1]) return `/list/${parts[1]}${suffix}`;

  const routeMap = {
    about: '/about',
    about_roblox: '/about',
    advertise: '/advertise',
    blog: '/blog',
    charts: '/charts',
    contact: '/contact',
    developers: '/developers',
    events: '/events',
    games: '/games/most_played',
    guides: '/guides',
    image_gallery: '/image_gallery',
    lists: '/lists',
    privacy: '/privacy',
    roblox_game_guides_and_walkthroughs: '/roblox_game_guides_and_walkthroughs',
    roblox_platforms: '/roblox_platforms',
    terms: '/terms',
    video_gallery: '/video_gallery',
  };

  if (routeMap[section]) return `${routeMap[section]}${suffix}`;

  return `${path}${suffix}`;
};

export const cleanRobloxGoLinks = (root) => {
  root.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const localPath = toLocalRobloxGoPath(href);

    if (localPath === href) return;

    link.setAttribute('href', localPath);
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });
};

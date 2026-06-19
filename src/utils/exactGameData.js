import exactGames from '../data/robloxgo_exact_details.json';

export const nameToSlug = (name = '') => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const parseFormattedNumber = (value) => {
  if (!value) return 0;
  if (typeof value === 'number') return value;

  const parsed = Number.parseInt(value.toString().replace(/,/g, ''), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const parseRating = (value) => {
  if (!value) return 0;
  if (typeof value === 'number') return value;

  const parsed = Number.parseInt(value.toString().replace('%', ''), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const parseCreatedOnDate = (value) => {
  if (!value) return 0;

  const [day, month, year] = value.split('/').map(Number);
  if (!day || !month || !year) return 0;

  return new Date(year, month - 1, day).getTime();
};

const getGameIdFromUrl = (url = '') => {
  const match = String(url).match(/\/game\/(\d+)/);
  return match ? match[1] : null;
};

const exactGamesById = new Map();
const exactGamesBySlug = new Map();

exactGames.forEach((game) => {
  const id = String(game.game_id || getGameIdFromUrl(game.url) || '');
  const slug = nameToSlug(game.name);

  if (id) exactGamesById.set(id, game);
  if (slug) exactGamesBySlug.set(slug, game);
});

export const findExactGame = (game = {}) => {
  const id = String(game.game_id || game.id || getGameIdFromUrl(game.url || game.gameUrl) || '');
  const slug = game.slug || nameToSlug(game.name || game.title || game.gameName || '');

  return exactGamesById.get(id) || exactGamesBySlug.get(slug) || null;
};

export const toGameCardData = (game) => {
  const slug = nameToSlug(game.name);

  return {
    id: game.game_id,
    title: game.name,
    slug,
    image: game.image,
    players: parseFormattedNumber(game.active_players),
    activePlayers: parseFormattedNumber(game.active_players),
    favorites: parseFormattedNumber(game.favorites),
    visits: parseFormattedNumber(game.visits),
    plays: parseFormattedNumber(game.visits),
    reviews: parseFormattedNumber(game.upvotes),
    rating: parseRating(game.rating),
    releaseDate: game.created_on,
    developer: game.created_by,
    creator: game.created_by,
    category: game.genre,
    description: game.about_game || '',
  };
};

export const enrichGameCardData = (game) => {
  const exactGame = findExactGame(game);

  if (!exactGame) return game;

  return {
    ...game,
    ...toGameCardData(exactGame),
  };
};

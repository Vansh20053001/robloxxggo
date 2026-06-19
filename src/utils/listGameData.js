import { nameToSlug } from './exactGameData';

export const GAME_LIST_PAGE_SIZE = 30;

export const getRobloxListItems = (data) => {
  if (Array.isArray(data)) return data;
  return data.games || data.game || [];
};

const getGameIdFromUrl = (url = '') => {
  const match = url.match(/\/game\/(\d+)\//);
  return match ? match[1] : null;
};

export const toListGameCardData = (game, index) => {
  const title = game.name || 'Roblox Game';
  const id = getGameIdFromUrl(game.url) || `${nameToSlug(title)}-${index}`;

  return {
    id,
    title,
    slug: nameToSlug(title),
    image: game.image,
    favorites: game.likes || game.selection1 || game.Rating || '0',
    players: game.active_players || '0',
  };
};

export const getPagedGames = (games, page, pageSize = GAME_LIST_PAGE_SIZE) => {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;

  return games.slice(start, start + pageSize);
};

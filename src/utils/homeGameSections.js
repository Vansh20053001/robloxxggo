import homeMostPlayedData from '../data/robloxgo_mostplayed.json';
import homeFavoriteData from '../data/roblox_favorite.json';
import { enrichGameCardData, nameToSlug } from './exactGameData';
import { getRobloxListItems } from './listGameData';

const getGameId = (url = '') => {
  const match = String(url).match(/\/game\/(\d+)/);
  return match ? match[1] : null;
};

export const toHomeGame = (game, index) => {
  const title = game.title || game.name || game.gameName || 'Roblox Game';
  const id = game.id || getGameId(game.url || game.gameUrl) || `${nameToSlug(title)}-${index}`;

  return enrichGameCardData({
    id,
    title,
    slug: game.slug || nameToSlug(title),
    image: game.image || game.thumbnail_image || '',
    activePlayers: game.activePlayers || game.players || game.active_players || '0',
    visits: game.plays || game.visits || game.selection1 || '0',
    favorites: game.favorites || game.likes || '0',
  });
};

export const formatMetric = (value) => {
  if (value === undefined || value === null || value === '') return '0';
  if (typeof value === 'string' && /[KMB]\+$/i.test(value.trim())) return value;

  const numericValue = typeof value === 'number'
    ? value
    : Number.parseInt(value.toString().replace(/,/g, ''), 10);

  if (Number.isNaN(numericValue)) return value.toString();
  if (numericValue >= 1000000000) return `${Math.floor(numericValue / 1000000000)}B+`;
  if (numericValue >= 1000000) return `${Math.floor(numericValue / 1000000)}M+`;
  if (numericValue >= 1000) return `${Math.floor(numericValue / 1000)}K+`;

  return numericValue.toString();
};

export const getGameImage = (game) => {
  return game.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(game.title)}`;
};

export const popularNow = getRobloxListItems(homeFavoriteData).slice(0, 5).map(toHomeGame);
export const allTimeHits = getRobloxListItems(homeMostPlayedData).slice(0, 5).map(toHomeGame);

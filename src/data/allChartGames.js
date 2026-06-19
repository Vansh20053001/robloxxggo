import trendingGames from './trendingGames';
import mostPlayedData from './robloxgo_top_charts/robloxgo_top100_mostplayed.json';
import favoritesData from './robloxgo_top_charts/robloxgo_top100_favorites.json';
import uncopylockedData from './robloxgo_top_charts/robloxgo_top100_uncopylocked.json';
import rngData from './robloxgo_top_charts/robloxgo_top100_rng.json';
import towerDefenseData from './robloxgo_top_charts/robloxgo_top100_towerdefense.json';
import battlegroundData from './robloxgo_top_charts/robloxgo_top100_battlegrounds.json';
import susData from './robloxgo_top_charts/robloxgo_top100_sus.json';
import casinoData from './robloxgo_top_charts/robloxgo_top100_casino.json';
import medievalData from './robloxgo_top_charts/robloxgo_top100_medieval.json';
import twoPlayerData from './robloxgo_top_charts/robloxgo_top100_2players.json';

const parseNumber = (v) => {
  if (v == null) return null;
  const s = String(v).replace(/[^0-9]/g, '');
  return s ? parseInt(s, 10) : null;
};

const getGameId = (url = '') => {
  const match = String(url).match(/\/game\/(\d+)/);
  return match ? match[1] : null;
};

const getSlugFromUrl = (url = '') => {
  const parts = String(url).split('/').filter(Boolean);
  return parts.length ? decodeURIComponent(parts[parts.length - 1]).toLowerCase() : null;
};

const stripGuideCta = (text = '') => String(text).replace(/\nTo the guide\s*$/i, '').trim();

const normalizeGame = (g, index) => {
  const url = g.url || g.game_name_url || g.gameUrl || '';
  const id = g.id || getGameId(url) || (g.slug && Number(g.slug) ? g.slug : null);
  const slug = g.slug || getSlugFromUrl(url) || (id ? String(id) : null);
  const title = g.game_name || g.title || g.gameName || g.name || '';

  return {
    id,
    slug,
    rank: g.rank || g.rankLabel || `#${index + 1}`,
    rankLabel: g.rank || g.rankLabel || `#${index + 1}`,
    title,
    gameName: title,
    gameUrl: url,
    activePlayers: g.active_players || g.ActivePlayers || g.players || '',
    players: g.active_players || g.ActivePlayers || g.players || '',
    image: g.thumbnail_image || g.image || '',
    imageUrl: g.thumbnail_image_url || g.imageUrl || '',
    favorites: g.Favorites || g.favorites || '',
    plays: g.Visits || g.visits || '',
    reviews: g.Upvotes || g.upvotes || '',
    votes: g.Downvotes || g.downvotes || '',
    updated:
      g.Last_Update || g.Last_Updates || g.last_update || g.lastUpdate || '',
    category: g.Genre || g.genre || g.category || '',
    categoryId: g.Genre || g.genre || g.category || '',
    description: stripGuideCta(g.about_game || g.description || ''),
    fullDescription: stripGuideCta(g.about_game || g.description || ''),
    getCodeUrl: g.Get_Code_url || g.get_code_url || g.getCodeUrl || '',
    eventsUrl: g.events_url || g.event_url || g.eventsUrl || '',
    developer: g.created_by || g.developer || '',
    releaseDate: g.release_date || g.releaseDate || '',
    rating: g.rating || '',
  };
};

const chartDataLists = [
  ...trendingGames,
  ...(mostPlayedData.most_played || []),
  ...(favoritesData.favorite_game || []),
  ...(uncopylockedData.uncopylocked_games || []),
  ...(rngData.rng_games || []),
  ...(towerDefenseData.towerdef_games || []),
  ...(battlegroundData.battleground_game || []),
  ...(susData.sus_game || []),
  ...(casinoData.casino_games || []),
  ...(medievalData.medieval_games || []),
  ...(twoPlayerData.twoplayer_game || []),
];

const allChartGames = chartDataLists.map(normalizeGame);

const dedupeGames = Object.values(
  allChartGames.reduce((map, game) => {
    const key = game.slug || game.id || `${game.title}-${game.rank}`;
    if (!map[key]) {
      map[key] = game;
    }
    return map;
  }, {}),
);

export default dedupeGames;

import trendingFile from './robloxgo_top_charts/robloxg_top100_trending.json';

const trendingData = trendingFile;

const getGameId = (url = '') => {
  const match = url.match(/\/game\/([^/]+)/);
  return match ? match[1] : '';
};

const getSlugFromUrl = (url = '') => {
  const parts = url.split('/').filter(Boolean);
  const slug = parts[parts.length - 1] || '';
  return decodeURIComponent(slug).toLowerCase();
};

const getRankNumber = (rank = '') => {
  const value = String(rank).replace('#', '');
  const rankNumber = Number(value);
  return Number.isNaN(rankNumber) ? '' : rankNumber;
};

const stripGuideCta = (text = '') => text.replace(/\nTo the guide\s*$/i, '').trim();

const trendingGames = (trendingData.trending_games || []).map((game) => ({
  id: getGameId(game.game_name_url),
  rank: getRankNumber(game.rank),
  rankLabel: game.rank || '',
  title: game.game_name || '',
  gameName: game.game_name || '',
  slug: getSlugFromUrl(game.game_name_url),
  gameUrl: game.game_name_url || '',
  activePlayers: game.active_players || '',
  players: game.active_players || '',
  image: game.thumbnail_image || '',
  imageUrl: game.thumbnail_image_url || '',
  favorites: game.Favorites || '',
  plays: game.Visits || '',
  reviews: game.Upvotes || '',
  downvotes: game.Downvotes || '',
  updated: game.Last_Update || '',
  category: game.Genre || '',
  categoryId: game.Genre || '',
  description: stripGuideCta(game.about_game || ''),
  fullDescription: stripGuideCta(game.about_game || ''),
  getCodeUrl: game.Get_Code_url || '',
  eventsUrl: game.events_url || '',
  developer: '',
  releaseDate: '',
  rating: ''
}));

export default trendingGames;

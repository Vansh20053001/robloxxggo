import React, { useMemo } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import topCharts, { getChartUrl } from '../data/topCharts';
import trendingGames from '../data/trendingGames';
import mostPlayedData from '../data/robloxgo_top_charts/robloxgo_top100_mostplayed.json';
import favoritesData from '../data/robloxgo_top_charts/robloxgo_top100_favorites.json';
import uncopylockedData from '../data/robloxgo_top_charts/robloxgo_top100_uncopylocked.json';
import rngData from '../data/robloxgo_top_charts/robloxgo_top100_rng.json';
import towerDefenseData from '../data/robloxgo_top_charts/robloxgo_top100_towerdefense.json';
import battlegroundData from '../data/robloxgo_top_charts/robloxgo_top100_battlegrounds.json';
import susData from '../data/robloxgo_top_charts/robloxgo_top100_sus.json';
import casinoData from '../data/robloxgo_top_charts/robloxgo_top100_casino.json';
import medievalData from '../data/robloxgo_top_charts/robloxgo_top100_medieval.json';
import twoPlayerData from '../data/robloxgo_top_charts/robloxgo_top100_2players.json';
import homeMostPlayedData from '../data/robloxgo_mostplayed.json';
import homeFavoriteData from '../data/roblox_favorite.json';
import { enrichGameCardData, nameToSlug } from '../utils/exactGameData';
import { getRobloxListItems } from '../utils/listGameData';
import '../styles/style.css';

const chartSources = {
  top_100_most_played_roblox_games: mostPlayedData.most_played || mostPlayedData.most_played || [],
  top_100_players_favorite_roblox_games: favoritesData.favorite_game || favoritesData.favorite_game || [],
  top_100_roblox_uncopylocked_games: uncopylockedData.uncopylocked_games || uncopylockedData.uncopylocked_games || [],
  top_100_roblox_rng_games: rngData.rng_games || rngData.rng_games || [],
  top_100_roblox_tower_defense_games: towerDefenseData.towerdef_games || towerDefenseData.towerdef_games || [],
  top_100_roblox_battleground_games: battlegroundData.battleground_game || battlegroundData.battleground_game || [],
  top_100_roblox_sus_games: susData.sus_game || susData.sus_game || [],
  top_100_roblox_casino_games: casinoData.casino_games || casinoData.casino_games || [],
  top_100_roblox_medieval_games: medievalData.medieval_games || medievalData.medieval_games || [],
  top_100_roblox_2_player_games: twoPlayerData.twoplayer_game || twoPlayerData.twoplayer_game || [],
};

const GAMES_PER_PAGE = 10;

const getGameId = (url = '') => {
  const match = String(url).match(/\/game\/(\d+)/);
  return match ? match[1] : null;
};

const getSlugFromUrl = (url = '') => {
  const parts = String(url).split('/').filter(Boolean);
  return parts.length ? decodeURIComponent(parts[parts.length - 1]).toLowerCase() : null;
};

const toHomeGame = (game, index) => {
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

const formatMetric = (value) => {
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

const getGameImage = (game) => {
  return game.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(game.title)}`;
};

const popularNow = getRobloxListItems(homeFavoriteData).slice(0, 5).map(toHomeGame);
const allTimeHits = getRobloxListItems(homeMostPlayedData).slice(0, 5).map(toHomeGame);

const loadChartFromFile = (chartKey) => {
  return chartSources[chartKey] || null;
};

const parseNumber = (v) => {
  if (v == null) return null;
  const s = String(v).replace(/[^0-9]/g, '');
  return s ? parseInt(s, 10) : null;
};

const getChartGames = (chartKey) => {
  const chartData = chartKey === 'top_100_trending_now_games'
    ? trendingGames
    : loadChartFromFile(chartKey);

  if (chartData) {
    return chartData.slice(0, 100).map((g, i) => ({
      id: g.id || getGameId(g.url || g.game_name_url) || null,
      slug: g.slug || getSlugFromUrl(g.url || g.game_name_url) || getGameId(g.url || g.game_name_url) || null,
      rank: g.rank || `#${i + 1}`,
      gameName: g.game_name || g.title || g.gameName || '',
      plays: parseNumber(g.Visits || g.visits) || null,
      favorites: parseNumber(g.Favorites || g.favorites) || null,
      activePlayers: parseNumber(g.active_players || g.ActivePlayers) || null,
    }));
  }

  return [];
};

const getValueLabel = (chartKey) => {
  switch (chartKey) {
    case 'top_100_trending_now_games':
      return 'Active Players';
    case 'top_100_most_played_roblox_games':
      return 'Plays';
    case 'top_100_players_favorite_roblox_games':
      return 'Favorites';
    case 'top_100_roblox_uncopylocked_games':
    case 'top_100_roblox_rng_games':
    case 'top_100_roblox_tower_defense_games':
    case 'top_100_roblox_battleground_games':
    case 'top_100_roblox_sus_games':
    case 'top_100_roblox_casino_games':
    case 'top_100_roblox_medieval_games':
    case 'top_100_roblox_2_player_games':
      return 'Plays';
    default:
      return 'Value';
  }
};

const getRowValue = (game, chartKey) => {
  if (chartKey === 'top_100_trending_now_games') return game.activePlayers || game.players || 'N/A';
  if (chartKey === 'top_100_players_favorite_roblox_games') return game.favorites || 'N/A';
  return game.plays || game.favorites || 'N/A';
};

export default function TopChart() {
  const [searchParams] = useSearchParams();
  const chartKey = searchParams.get('chart') || '';
  if (chartKey === 'top_100_trending_now_games') {
    return <Navigate to="/top_100_trending_now_games" replace />;
  }

  const chart = topCharts.find((item) => item.key === chartKey);
  const page = Number(searchParams.get('page')) || 1;
  const chartGames = useMemo(() => getChartGames(chartKey), [chartKey]);
  const valueLabel = getValueLabel(chartKey);
  const totalPages = Math.max(1, Math.ceil(chartGames.length / GAMES_PER_PAGE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (currentPage - 1) * GAMES_PER_PAGE;
  const currentGames = chartGames.slice(startIndex, startIndex + GAMES_PER_PAGE);

  const createPageLink = (pageNumber) => {
    const params = new URLSearchParams();
    if (chartKey) params.set('chart', chartKey);
    if (pageNumber > 1) params.set('page', pageNumber);
    return `/chart?${params.toString()}`;
  };

  return (
    <Layout>
      <section className="bnr_970">
        <center />
      </section>
      <span class="push">
        <span class="circle_border">
          <span class="circle">
            <img loading="lazy" src="https://cdn.nichesites.pikoya.com/general/images/alarm" title="Alarm" alt="Roblox Strategy Hub: Stats, Videos &amp; Power Tips" class="mobile" />
          </span>
        </span>
      </span>
      <div className="wrap top-chart-layout">
        <section className="main" >
          <div className="page_top" title="Best Roblox Games - Top 100 Chart" style={{ backgroundImage: 'url(//cdn.static.pikoya.com/robloxgo/images/page_title_bg_top_100.jpg)' }}>
          <h1 className="page-title" style={{ width: '100%' }}>
            {chart ? chart.label : 'Top 100 Roblox Charts'}
          </h1>
          </div>
          <span className="head-text">
            {chart
              ? chart.description
              : 'Select a Top 100 chart request from the sidebar or choose a chart query to see its content.'}
          </span>

          {chart ? (
            <>
              <div className="top-chart-list">
                {currentGames.map((game, index) => (
                  <Link
                    key={`${chartKey}-${game.slug || game.id || index}`}
                    to={`/game/${game.id || game.slug || index}`}
                    className="row"
                  >
                    <div className="num">{game.rank || startIndex + index + 1}</div>
                    <div className="name">{game.gameName || game.title || 'Untitled Game'}</div>
                    <div className="value" title={valueLabel}>
                      {getRowValue(game, chartKey)}
                    </div>
                  </Link>
                ))}
              </div>
              <ListPagination currentPage={currentPage} totalPages={totalPages} getPagePath={createPageLink} />

              <section>
                <div className="head">
                  <h2>
                    <Link to="/games/favorite">Popular Roblox Games Right Now</Link>
                  </h2>
                  <Link to="/games/favorite" className="small_link">
                    See all
                  </Link>
                </div>
                <div className="items">
                  {popularNow.map((game) => (
                    <Link key={game.id} to={`/game/${game.slug}`} className="game">
                      <img loading="lazy" src={getGameImage(game)} title={game.title} alt={game.title} />
                      <div className="details">
                        <h4>{game.title}</h4>
                        <div className="stats">
                          <div className="left_stats">
                            <img src="//cdn.static.pikoya.com/robloxgo/images/heart.svg" title="Favorites" alt="Favorites" />
                            <label>{formatMetric(game.favorites)}</label>
                          </div>
                          <div className="right_stats">
                            <img src="//cdn.static.pikoya.com/robloxgo/images/avatar.svg" title="Active Players" alt="Active Players" />
                            <label>{formatMetric(game.activePlayers)}</label>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <div className="head">
                  <h2>
                    <Link to="/games/most_played">All-Time Roblox Hits</Link>
                  </h2>
                  <Link to="/games/most_played" className="small_link">
                    See all
                  </Link>
                </div>
                <div className="items">
                  {allTimeHits.map((game) => (
                    <Link key={game.id} to={`/game/${game.slug}`} className="game">
                      <img loading="lazy" src={getGameImage(game)} title={game.title} alt={game.title} />
                      <div className="details">
                        <h4>{game.title}</h4>
                        <div className="stats">
                          <div className="left_stats">
                            <img src="//cdn.static.pikoya.com/robloxgo/images/game_preview_flag.svg" title="Visits" alt="Visits" />
                            <label>{formatMetric(game.visits)}</label>
                          </div>
                          <div className="right_stats">
                            <img src="//cdn.static.pikoya.com/robloxgo/images/avatar.svg" title="Active Players" alt="Active Players" />
                            <label>{formatMetric(game.activePlayers)}</label>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <div className="list">
              {topCharts.map((item) => (
                <Link key={item.key} to={getChartUrl(item.key)} className="row">
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </section>
        
        <section className="sidebar" style={{ flex: '0 0 300px' }}>
          <div className="bnr_250">
            <center />
          </div>
          <TopCharts />
          <TopLists />
        </section>
      </div>
    </Layout>
  );
}

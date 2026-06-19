import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import trendingGames from '../data/trendingGames';
import uncopylockedData from '../data/robloxgo_top_charts/robloxgo_top100_uncopylocked.json';
import towerDefenseData from '../data/robloxgo_top_charts/robloxgo_top100_towerdefense.json';
import battlegroundData from '../data/robloxgo_top_charts/robloxgo_top100_battlegrounds.json';
import twoPlayerData from '../data/robloxgo_top_charts/robloxgo_top100_2players.json';
import airplaneData from '../data/robloxgo_betlists/roblox_bestairplane.json';
import apocalypseData from '../data/robloxgo_betlists/roblox_bestapocalypse.json';
import avatarData from '../data/robloxgo_betlists/roblox_bestavatar.json';
import backroomsData from '../data/robloxgo_betlists/roblox_bestbackrooms.json';
import escapeData from '../data/robloxgo_betlists/roblox_bestescape.json';
import fashionData from '../data/robloxgo_betlists/roblox_bestfashion.json';
import prisonData from '../data/robloxgo_betlists/roblox_bestprison.json';
import schoolData from '../data/robloxgo_betlists/roblox_bestschool.json';
import socialData from '../data/robloxgo_betlists/roblox_bestsocial.json';
import swordData from '../data/robloxgo_betlists/roblox_bestswords.json';
import trainData from '../data/robloxgo_betlists/roblox_besttrain.json';
import { nameToSlug } from '../utils/exactGameData';
import { getRobloxListItems } from '../utils/listGameData';
import { allTimeHits, formatMetric, getGameImage, popularNow } from '../utils/homeGameSections';

const LIST_PAGE_SIZE = 3;

const listSources = {
  best_trending_now_games: {
    title: 'Best Trending Now Roblox Games',
    description:
      'Hand-picked and daily-updated, your destination for Roblox top games! Check out Best Trending Now Roblox Games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: trendingGames,
  },
  best_roblox_uncopylocked_games: {
    title: 'Best Roblox Uncopylocked Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox uncopylocked games on RobloxGo.com',
    valueLabel: 'Visits',
    games: uncopylockedData.uncopylocked_games || [],
  },
  best_roblox_tower_defense_games: {
    title: 'Best Roblox Tower Defense Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox tower defense games on RobloxGo.com',
    valueLabel: 'Visits',
    games: towerDefenseData.towerdef_games || [],
  },
  best_roblox_battleground_games: {
    title: 'Best Roblox Battleground Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox battleground games on RobloxGo.com',
    valueLabel: 'Visits',
    games: battlegroundData.battleground_game || [],
  },
  best_roblox_2_player_games: {
    title: 'Best Roblox 2 Player Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox 2 player games on RobloxGo.com',
    valueLabel: 'Visits',
    games: twoPlayerData.twoplayer_game || [],
  },
  best_roblox_airplane_games: {
    title: 'Best Roblox Airplane Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox airplane games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: getRobloxListItems(airplaneData),
  },
  best_roblox_backrooms_games: {
    title: 'Best Roblox Backrooms Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox backrooms games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: getRobloxListItems(backroomsData),
  },
  best_roblox_sword_games: {
    title: 'Best Roblox Sword Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox sword games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: getRobloxListItems(swordData),
  },
  best_roblox_apocalypse_games: {
    title: 'Best Roblox Apocalypse Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox apocalypse games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: getRobloxListItems(apocalypseData),
  },
  best_roblox_fashion_games: {
    title: 'Best Roblox Fashion Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox fashion games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: getRobloxListItems(fashionData),
  },
  best_roblox_school_games: {
    title: 'Best Roblox School Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox school games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: getRobloxListItems(schoolData),
  },
  best_roblox_avatar_games: {
    title: 'Best Roblox Avatar Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox avatar games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: getRobloxListItems(avatarData),
  },
  best_roblox_escape_games: {
    title: 'Best Roblox Escape Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox escape games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: getRobloxListItems(escapeData),
  },
  best_roblox_social_games: {
    title: 'Best Roblox Social Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox social games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: getRobloxListItems(socialData),
  },
  best_roblox_prison_games: {
    title: 'Best Roblox Prison Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox prison games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: getRobloxListItems(prisonData),
  },
  best_roblox_train_games: {
    title: 'Best Roblox Train Games',
    description: 'Hand-picked and daily-updated, explore the best Roblox train games on RobloxGo.com',
    valueLabel: 'Active Players',
    games: getRobloxListItems(trainData),
  },
};

const getGameId = (url = '') => {
  const match = String(url).match(/\/game\/(\d+)/);
  return match ? match[1] : null;
};

const getSlugFromUrl = (url = '') => {
  const parts = String(url).split('/').filter(Boolean);
  return parts.length ? decodeURIComponent(parts[parts.length - 1]).toLowerCase() : '';
};

const normalizeListGame = (game, index, valueLabel) => {
  const url = game.gameUrl || game.game_name_url || game.url || '';
  const title = game.gameName || game.game_name || game.title || game.name || 'Roblox Game';
  const gameId = game.id || getGameId(url);
  const slug = game.slug || getSlugFromUrl(url) || nameToSlug(title);
  const rankNumber = game.rank || Number(String(game.rankLabel || '').replace('#', '')) || index + 1;
  const rawValue = valueLabel === 'Active Players'
    ? game.activePlayers || game.active_players || game.players
    : game.Visits || game.visits || game.Favorites || game.favorites || game.activePlayers || game.active_players;
  const value = String(rawValue || '0').replace(new RegExp(`\\s*${valueLabel}\\s*$`, 'i'), '');

  return {
    id: gameId || `${slug}-${index}`,
    slug,
    detailKey: gameId || slug,
    title,
    rankLabel: game.rankLabel || `${rankNumber}`,
    image: game.image || game.thumbnail_image || '',
    value: value || '0',
  };
};

const createPageLink = (listKey, pageNumber) => {
  return pageNumber > 1 ? `/list/${listKey}/${pageNumber}` : `/list/${listKey}`;
};

const GameSection = ({ title, to, games, metric }) => (
  <section>
    <div className="head">
      <h2>
        <Link to={to}>{title}</Link>
      </h2>
      <Link to={to} className="small_link">
        See all
      </Link>
    </div>
    <div className="items">
      {games.map((game) => (
        <Link key={game.id} to={`/game/${game.slug}`} className="game">
          <img loading="lazy" src={getGameImage(game)} title={game.title} alt={game.title} />
          <div className="details">
            <h4>{game.title}</h4>
            <div className="stats">
              <div className="left_stats">
                <img
                  src={metric === 'visits'
                    ? '//cdn.static.pikoya.com/robloxgo/images/game_preview_flag.svg'
                    : '//cdn.static.pikoya.com/robloxgo/images/heart.svg'}
                  title={metric === 'visits' ? 'Visits' : 'Favorites'}
                  alt={metric === 'visits' ? 'Visits' : 'Favorites'}
                />
                <label>{formatMetric(metric === 'visits' ? game.visits : game.favorites)}</label>
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
);

export default function TopList() {
  const { listKey = 'best_trending_now_games', page } = useParams();
  const list = listSources[listKey];

  if (!list) {
    return <Navigate to="/lists" replace />;
  }

  const normalizedGames = list.games.map((game, index) => normalizeListGame(game, index, list.valueLabel));
  const totalPages = Math.max(1, Math.ceil(normalizedGames.length / LIST_PAGE_SIZE));
  const requestedPage = Number(page) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const startIndex = (currentPage - 1) * LIST_PAGE_SIZE;
  const currentGames = normalizedGames.slice(startIndex, startIndex + LIST_PAGE_SIZE);

  return (
    <Layout>
      <section className="bnr_970">
        <center />
      </section>
      <span className="push">
        <span className="circle_border">
          <span className="circle">
            <img loading="lazy" src="https://cdn.nichesites.pikoya.com/general/images/alarm" title="Alarm" alt="Roblox Strategy Hub: Stats, Videos &amp; Power Tips" className="mobile" />
          </span>
        </span>
      </span>
      <h1 className="page-title" style={{ width: '100%' }}>
        {list.title}
      </h1>

      <section className="main">
        <span className="head-text">{list.description}</span>

        <div className="list">
          {currentGames.map((game) => (
            <Link key={`${listKey}-${game.id}`} to={`/game/${game.detailKey}`} className="list-item">
              <div className="image">
                <div className="tag">{game.rankLabel}</div>
                <div className="head">
                  <h1>{game.title}</h1>
                  <div className="info">
                    {game.value} {list.valueLabel}
                  </div>
                </div>
                <img loading="lazy" src={game.image} title={game.title} alt={`${game.title} - Roblox Strategy Hub: Stats, Videos & Power Tips`} />
              </div>
            </Link>
          ))}
        </div>

        <ListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          getPagePath={(pageNumber) => createPageLink(listKey, pageNumber)}
        />

        <GameSection title="Popular Roblox Games Right Now" to="/games/favorite" games={popularNow} metric="favorites" />
        <GameSection title="All-Time Roblox Hits" to="/games/most_played" games={allTimeHits} metric="visits" />
      </section>

      <section className="sidebar">
        <div className="bnr_250">
          <center />
        </div>
        <TopLists />
        <TopCharts />
      </section>
    </Layout>
  );
}

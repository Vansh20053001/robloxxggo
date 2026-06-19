import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import TopLists from '../components/TopLists';
import favoriteData from '../data/roblox_favorite.json';
import mostPlayedData from '../data/robloxgo_mostplayed.json';
import topCharts, { getChartUrl } from '../data/topCharts';
import { enrichGameCardData, nameToSlug } from '../utils/exactGameData';
import { getRobloxListItems } from '../utils/listGameData';

const chartLinks = topCharts;

const getGameIdFromUrl = (url = '') => {
  const match = String(url).match(/\/game\/(\d+)/);
  return match ? match[1] : null;
};

const toChartGame = (game, index) => {
  const title = game.title || game.name || game.gameName || 'Roblox Game';
  const id = game.id || getGameIdFromUrl(game.url || game.gameUrl) || `${nameToSlug(title)}-${index}`;

  return enrichGameCardData({
    id,
    title,
    slug: game.slug || nameToSlug(title),
    image: game.image || game.thumbnail_image || '',
    activePlayers: game.activePlayers || game.players || game.active_players || '0',
    visits: game.plays || game.visits || game.selection1 || '0',
    favorites: game.favorites || game.likes || game.Rating || '0',
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

const getGameImage = (game) => game.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(game.title)}`;

const popularNow = getRobloxListItems(favoriteData).slice(0, 5).map(toChartGame);
const allTimeHits = getRobloxListItems(mostPlayedData).slice(0, 5).map(toChartGame);

export default function Charts() {
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
      <div>
        <div className="page_top" title="Best Roblox Games - Top 100 Chart" style={{ backgroundImage: 'url(//cdn.static.pikoya.com/robloxgo/images/page_title_bg_top_100.jpg)' }}>
          <h1 className="page-title">Best Roblox Games - Top 100 Chart</h1>
        </div>

        <span className="head-text">Your destination for Roblox top games! Hand-picked and daily-updated, check out Roblox games Top lists by theme and genre</span>

        <div className="wrap" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div className="main">
            <div className="list">
              {chartLinks.map((c) => (
                <Link key={c.key} to={getChartUrl(c.key)} className="row">
                  {c.label}
                </Link>
              ))}
            </div>

            <section>
              <div className="head">
                <h2><Link to="/games/favorite">Popular Roblox Games Right Now</Link></h2>
                <Link to="/games/favorite" className="small_link">See all</Link>
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
                <h2><Link to="/games/most_played">All-Time Roblox Hits</Link></h2>
                <Link to="/games/most_played" className="small_link">See all</Link>
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
          </div>

          <div className="sidebar" style={{ flex: '0 0 300px' }}>
            <div className="bnr_250">
              <center />
            </div>
            <TopLists />
          </div>
        </div>
      </div>
    </Layout>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import TopCharts from '../components/TopCharts';
import {
  allTimeHits,
  formatMetric,
  getGameImage,
  popularNow,
} from '../utils/homeGameSections';

const bestLists = [
  { label: 'Best Trending Now Roblox Games', url: '/list/best_trending_now_games' },
  { label: 'Best Roblox Uncopylocked Games', url: '/list/best_roblox_uncopylocked_games' },
  { label: 'Best Roblox Tower Defense Games', url: '/list/best_roblox_tower_defense_games' },
  { label: 'Best Roblox Battleground Games', url: '/list/best_roblox_battleground_games' },
  { label: 'Best Roblox 2 Player Games', url: '/list/best_roblox_2_player_games' },
  { label: 'Best Roblox Airplane Games', url: '/list/best_roblox_airplane_games' },
  { label: 'Best Roblox Backrooms Games', url: '/list/best_roblox_backrooms_games' },
  { label: 'Best Roblox Sword Games', url: '/list/best_roblox_sword_games' },
  { label: 'Best Roblox Apocalypse Games', url: '/list/best_roblox_apocalypse_games' },
  { label: 'Best Roblox Fashion Games', url: '/list/best_roblox_fashion_games' },
  { label: 'Best Roblox School Games', url: '/list/best_roblox_school_games' },
  { label: 'Best Roblox Avatar Games', url: '/list/best_roblox_avatar_games' },
  { label: 'Best Roblox Escape Games', url: '/list/best_roblox_escape_games' },
  { label: 'Best Roblox Social Games', url: '/list/best_roblox_social_games' },
  { label: 'Best Roblox Prison Games', url: '/list/best_roblox_prison_games' },
  { label: 'Best Roblox Train Games', url: '/list/best_roblox_train_games' },
];

const GameSection = ({ title, to, games, metric }) => (
  <section>
    <div className="head">
      <h2><Link to={to}>{title}</Link></h2>
      <Link to={to} className="small_link">See all</Link>
    </div>
    <div className="items">
      {games.map((game) => (
        <Link key={game.id} to={`/game/${game.id || game.slug}`} className="game">
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

export default function Lists() {
  return (
    <Layout>
      <section className="bnr_970">
        <center />
      </section>
      <span className="push">
        <span className="circle_border">
          <span className="circle">
            <img loading="lazy" src="https://cdn.nichesites.pikoya.com/general/images/alarm" title="Alarm" alt="Roblox Strategy Hub: Stats, Videos & Power Tips" className="mobile" />
          </span>
        </span>
      </span>
      <div>
        <div className="page_top" style={{ backgroundImage: 'url(//cdn.static.pikoya.com/robloxgo/images/page_title_bg_charts.jpg)' }}>
          <h1 className="page-title">Best Roblox Games - Top Lists</h1>
        </div>

        <div className="wrap" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          <div className="main">
            <span className="head-text">
              Your destination for Roblox top games! Hand-picked and daily-updated, check out Roblox games Top lists by theme and genre
            </span>

            <div className="list">
              {bestLists.map((item) => (
                <Link key={item.label} to={item.url} className="row">
                  {item.label}
                </Link>
              ))}
            </div>

            <GameSection
              title="Popular Roblox Games Right Now"
              to="/games/favorite"
              games={popularNow}
              metric="favorites"
            />

            <GameSection
              title="All-Time Roblox Hits"
              to="/games/most_played"
              games={allTimeHits}
              metric="visits"
            />
          </div>

          <div className="sidebar">
            <div className="bnr_250">
              <center />
            </div>
            <TopCharts />
          </div>
        </div>
      </div>
    </Layout>
  );
}

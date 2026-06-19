import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import exactGames from '../data/robloxgo_exact_details.json';
import {
  allTimeHits,
  formatMetric,
  getGameImage,
  popularNow,
} from '../utils/homeGameSections';
import '../styles/style.css';

const genreSlug = (name = '') => (
  String(name)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
);

const genreLabel = (name = '') => `${name} Games`;

const genres = Array.from(
  exactGames
    .filter((game) => game?.success && game.genre)
    .reduce((items, game) => {
      const name = String(game.genre).trim();
      const key = name.toLowerCase();

      if (!items.has(key)) {
        items.set(key, {
          name,
          slug: genreSlug(name),
          count: 1,
        });
      } else {
        items.get(key).count += 1;
      }

      return items;
    }, new Map())
    .values()
).sort((a, b) => a.name.localeCompare(b.name));

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

export default function Genre() {
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
        <div className="page_top" title="Roblox Games By Genres" style={{ backgroundImage: 'url(//cdn.static.pikoya.com/robloxgo/images/page_title_bg_genres.jpg)' }}>
          <h1 className="page-title">Roblox Games By Genres</h1>
        </div>

        <div className="wrap" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div className="main">
            <span className="head-text">
              Looking for your next Roblox game? Explore and browse through millions of Roblox games in your favorite genre
            </span>

            <div className="list" style={{ marginTop: '24px' }}>
              {genres.map((genre, index) => (
                <React.Fragment key={genre.slug}>
                  {index === 7 && (
                    <section className="bnr_728">
                      <center />
                    </section>
                  )}
                  <Link to={`/genres/${genre.slug}`} className="row">
                    {genreLabel(genre.name)}
                  </Link>
                </React.Fragment>
              ))}
            </div>

            <GameSection
              title="Popular Roblox Games Right Now"
              to="/chart/top_100_trending_now_games"
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
            <TopLists />
          </div>
        </div>
      </div>
    </Layout>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import trendingGames from '../data/trendingGames';
import mostPlayedData from '../data/robloxgo_mostplayed.json';
import favoriteData from '../data/roblox_favorite.json';
import topRankedData from '../data/roblox_topranked.json';
import highlightData from '../data/highlight_details.json';
import guideData from '../data/roblox_guide.json';
import { enrichGameCardData, nameToSlug } from '../utils/exactGameData';
import { getRobloxListItems } from '../utils/listGameData';
import '../styles/style.css';

const getGameIdFromUrl = (url = '') => {
  const match = url.match(/\/game\/(\d+)\//);
  return match ? match[1] : null;
};

const toHomeGame = (game, index) => {
  const title = game.title || game.name || game.gameName || 'Roblox Game';
  const id = game.id || getGameIdFromUrl(game.url || game.gameUrl) || `${nameToSlug(title)}-${index}`;

  return enrichGameCardData({
    id,
    title,
    slug: game.slug || nameToSlug(title),
    image: game.image || game.thumbnail_image || '',
    creator: game.developer || game.created_by || game.category || 'Roblox Creator',
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

const trendingNow = trendingGames.slice(0, 4).map(toHomeGame);
const popularNow = getRobloxListItems(favoriteData).slice(0, 5).map(toHomeGame);
const allTimeHits = getRobloxListItems(mostPlayedData).slice(0, 5).map(toHomeGame);
const topRated = getRobloxListItems(topRankedData).slice(0, 5).map(toHomeGame);

const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const getSlugFromUrl = (url = '') => String(url).split('/').filter(Boolean).pop() || '';

const toArticlePost = (post, type) => {
  const title = post.title || post.name || 'RobloxGo';
  const slug = getSlugFromUrl(post.details_url || post.url) || post.slug || nameToSlug(title);

  return {
    title,
    description: stripHtml(post.short_description || post.subtitle || post.description || ''),
    link: type === 'highlight' ? `/highlight/${slug}` : `/guide/${slug}`,
    image: post.image || post.thumbnail || '/api/placeholder/400/300',
  };
};

const newsPosts = (Array.isArray(highlightData) ? highlightData : [])
  .slice(0, 3)
  .map((post) => toArticlePost(post, 'highlight'));

const getGuideItems = (data) => {
  if (Array.isArray(data)) return data;
  return data.guide || data.guides || data.game || data.games || [];
};

const guidePosts = getGuideItems(guideData)
  .slice(0, 3)
  .map((post) => toArticlePost(post, 'guide'));

function getGameImage(game) {
  return game.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(game.title)}`;
}

export default function Home() {
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

      <div className="wrap" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="main" style={{ flex: '1 1 0', minWidth: '0' }}>
          <section>
            <div className="head">
              <h2>
                <Link to="/top_100_trending_now_games">Trending Now on Roblox</Link>
              </h2>
              <Link to="/top_100_trending_now_games" className="small_link">
                See all
              </Link>
            </div>
            <div className="featured_grid items">
              {trendingNow.map((game) => (
                <Link key={game.id} to={`/game/${game.slug}`} className="game">
                  <img src={getGameImage(game)} title={game.title} alt={game.title} />
                  <div className="details">
                    <h4>{game.title}</h4>
                    <div className="small_text">{game.creator}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

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

          <section>
            <div className="head">
              <h2>
                <Link to="/games/top_ranked">Top-Rated Roblox Games</Link>
              </h2>
              <Link to="/games/top_ranked" className="small_link">
                See all
              </Link>
            </div>
            <div className="items">
              {topRated.map((game) => (
                <Link key={game.id} to={`/game/${game.slug}`} className="game">
                  <img loading="lazy" src={getGameImage(game)} title={game.title} alt={game.title} />
                  <div className="details">
                    <h4>{game.title}</h4>
                    <div className="stats">
                      <div className="left_stats">
                        <img src="//cdn.static.pikoya.com/robloxgo/images/heart.svg" title="Rating" alt="Rating" />
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
                <Link to="/highlights">Roblox Highlights & News</Link>
              </h2>
              <Link to="/highlights" className="small_link">
                See all
              </Link>
            </div>
            <div className="items">
              {newsPosts.map((post) => (
                <div key={post.title} className="post">
                  <Link to={post.link}>
                    <img loading="lazy" src={post.image} title={post.title} alt={post.title} />
                  </Link>
                  <div className="details">
                    <h2>
                      <Link to={post.link}>{post.title}</Link>
                    </h2>
                    <div className="short">{post.description}</div>
                    <Link to={post.link} className="button">
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="head">
              <h2>
                <Link to="/guides">Roblox Tips & Guides</Link>
              </h2>
              <Link to="/guides" className="small_link">
                See all
              </Link>
            </div>
            <div className="items">
              {guidePosts.map((post) => (
                <div key={post.title} className="post">
                  <Link to={post.link}>
                    <img loading="lazy" src={post.image} title={post.title} alt={post.title} />
                  </Link>
                  <div className="details">
                    <h2>
                      <Link to={post.link}>{post.title}</Link>
                    </h2>
                    <div className="short">{post.description}</div>
                    <Link to={post.link} className="button">
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="sidebar" style={{ flex: '0 0 300px' }}>
          <div className="bnr_250">
            <center />
          </div>

          <TopCharts />
          <TopLists />
        </div>
      </div>
    </Layout>
  );
}

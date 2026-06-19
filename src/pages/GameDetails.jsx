import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import NotFound from '../components/NotFound';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import exactGames from '../data/robloxgo_exact_details.json';
import allChartGames from '../data/allChartGames';
import '../styles/style.css';

// Helper function to convert game name to slug format
const nameToSlug = (name = '') => {
  return String(name)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const getSlugFromUrl = (url = '') => {
  const parts = String(url).split('/').filter(Boolean);
  return parts.length ? nameToSlug(decodeURIComponent(parts[parts.length - 1])) : '';
};

const getEventId = (url = '') => {
  const match = String(url).match(/\/events\/(\d+)/);
  return match ? match[1] : '';
};

const getEventSlug = (url = '') => {
  const parts = String(url).split('/').filter(Boolean);
  const eventsIndex = parts.findIndex((part) => part === 'events');
  return eventsIndex >= 0 && parts[eventsIndex + 2]
    ? nameToSlug(decodeURIComponent(parts[eventsIndex + 2]))
    : '';
};

const getEventPath = (gameId, event = {}) => {
  const eventId = getEventId(event.event_url);
  const eventSlug = getEventSlug(event.event_url) || nameToSlug(event.event_name);
  return `/game/${gameId}/events/${eventId}/${eventSlug}`;
};

const validExactGames = exactGames.filter((item) => item?.success && item.name);

const chartAliasesBySlug = new Map();

allChartGames.forEach((game) => {
  const aliases = [
    game.slug,
    getSlugFromUrl(game.gameUrl),
    nameToSlug(game.title || game.gameName),
  ].filter(Boolean);

  aliases.forEach((alias) => {
    if (!chartAliasesBySlug.has(alias)) {
      chartAliasesBySlug.set(alias, game.id || null);
    }
  });
});

const findExactGame = (routeSlug) => {
  const normalizedSlug = nameToSlug(routeSlug);
  const aliasId = chartAliasesBySlug.get(normalizedSlug);

  return validExactGames.find((item) => (
    String(item.game_id) === routeSlug ||
    String(item.game_id) === aliasId ||
    nameToSlug(item.name) === normalizedSlug ||
    getSlugFromUrl(item.url) === normalizedSlug
  ));
};

export default function GameDetails() {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [relatedGames, setRelatedGames] = useState([]);

  useEffect(() => {
    const foundGame = findExactGame(slug);
    
    if (!foundGame) {
      setGame(null);
      setRelatedGames([]);
      return;
    }

    // Transform the exact game data to match expected structure
    const transformedGame = {
      id: foundGame.game_id,
      title: foundGame.name,
      image: foundGame.image,
      imageAlt: foundGame.image_alt,
      activePlayers: foundGame.active_players,
      players: foundGame.active_players,
      favorites: foundGame.favorites,
      plays: foundGame.visits,
      reviews: foundGame.upvotes,
      votes: foundGame.downvotes,
      updated: foundGame.last_update,
      rating: foundGame.rating,
      developer: foundGame.created_by,
      releaseDate: foundGame.created_on,
      category: foundGame.genre,
      description: foundGame.about_game,
      fullDescription: foundGame.about_game,
      gameUrl: foundGame.url,
      events: foundGame.events,
      eventsUrl: foundGame.about_url,
      slug: slug
    };

    setGame(transformedGame);
    
    // Find related games by genre
    const relatedGamesData = validExactGames
      .filter((item) => item.genre === foundGame.genre && item.game_id !== foundGame.game_id)
      .slice(0, 5)
      .map((item) => ({
        id: item.game_id,
        title: item.name,
        image: item.image,
        favorites: item.favorites,
        players: item.active_players,
        slug: nameToSlug(item.name)
      }));
    
    setRelatedGames(relatedGamesData);
  }, [slug]);

  if (!game) {
    return (
      <Layout>
        <NotFound
          title="Game Not Found"
          message="The game you are looking for does not exist in our database."
        />
      </Layout>
    );
  }

  const codeDetailsPath = `/game/${game.id}/roblox-game-codes`;
  const displayDescription = game.fullDescription || game.description || '';

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
          <div style={{ marginBottom: '24px' }}>
            <h1 className="page-title">{game.title}</h1>
            <span className="head-text">Explore essential details for {game.title}.</span>
          </div>

          <div className="game_block">
            <div className="image">
                <img src={game.image} alt={game.title} style={{ width: '100%', display: 'block', borderRadius: '8px' }} />
                
            </div>

            <div className="game_details game_details_grid">
              {[
                { icon: 'user.svg', label: 'Players', value: game.players },
                { icon: 'fav.svg', label: 'Favorites', value: game.favorites },
                { icon: 'visit.svg', label: 'Visits', value: game.plays },
                { icon: 'like.svg', label: 'Upvotes', value: game.reviews },
                { icon: 'dislike.svg', label: 'Downvotes', value: game.votes },
                { icon: 'update.svg', label: 'Updated', value: game.updated }
              ].map((item) => (
                <div key={item.label} className="item">
                  <div className="icon">
                    <img src={`//cdn.static.pikoya.com/robloxgo/images/${item.icon}`} title={item.label} alt={item.label} />
                  </div>
                  <div className="details">
                    <h4>{item.label}</h4>
                    <span className="input">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="block">
              <div className="flex between">
                <p>
                  <b>Get the latest{game.title} codes and rewards-updated June 2026!</b>
                </p>
                <Link className="button med" to={codeDetailsPath}>
                  Get Code
                </Link>
              </div>
            </div>

            <div className="block">
              <h2>About {game.title}</h2>
              <p>{displayDescription}</p>
            </div>

            {game.events && game.events.length > 0 && (
              <section>
                <div className="head">
                  <h2>{game.title} Events</h2>
                  <Link to="/events" className="small_link">See all</Link>
                </div>
                <div className="items hive">
                  {game.events.map((event, index) => (
                    <div key={index} className="post">
                      <Link to={getEventPath(game.id, event)} className="post-image">
                        <div className={`label right ${event.event_status === 'Live' ? 'live' : ''}`}>
                          {event.event_status}
                        </div>
                        <img 
                          src={event.event_image} 
                          title={event.event_image_title} 
                          alt={event.event_image_alt}
                        />
                      </Link>
                      <div className="details">
                        <h2>
                          <Link to={getEventPath(game.id, event)}>
                            {event.event_name}
                          </Link>
                        </h2>
                        <h3>{event.event_subtitle}</h3>
                        <Link to={getEventPath(game.id, event)} className="button">Event Details</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="head">
                <h2>Similar Games</h2>
                <Link to="/top_100_trending_now_games" className="small_link">Browse all</Link>
              </div>
              <div className="items">
                {relatedGames.map((related) => (
                  <Link key={related.id} to={`/game/${related.slug}`} className="game">
                    <img loading="lazy" src={related.image} title={related.title} alt={related.title} />
                    <div className="details">
                      <h4>{related.title}</h4>
                      <div className="stats">
                        <div className="left_stats">
                          <img src="//cdn.static.pikoya.com/robloxgo/images/heart.svg" title="Favorites" alt="Favorites" />
                          <label>{related.favorites}</label>
                        </div>
                        <div className="right_stats">
                          <img src="//cdn.static.pikoya.com/robloxgo/images/avatar.svg" title="Players" alt="Players" />
                          <label>{related.players}</label>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <div className="game_faq">
              <h3 className="faq_title">Frequently Asked Questions about {game.title}</h3>
              <div className="tabs">
                {[
                  {
                    id: 'faq1',
                    question: `When was ${game.title} updated?`,
                    answer: game.updated ? `${game.title} was last updated ${game.updated}.` : ''
                  },
                  {
                    id: 'faq2',
                    question: `What type of game is ${game.title}?`,
                    answer: game.category ? `${game.title} is a ${game.category} game. ${game.description}` : game.description
                  },
                  {
                    id: 'faq3',
                    question: `Is ${game.title} free to play?`,
                    answer: `Yes. ${game.title} is free on Roblox, with optional in-game purchases for cosmetics and upgrades.`
                  },
                  {
                    id: 'faq4',
                    question: `How many people play ${game.title}?`,
                    answer: game.players ? `${game.players} players are active in ${game.title}.` : ''
                  }
                ].map((faq) => (
                  <div key={faq.id} className="tab">
                    <input id={faq.id} type="checkbox" />
                    <label className="tab-label" htmlFor={faq.id}>{faq.question}</label>
                    <div className="tab-content">{faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar" style={{ flex: '0 0 300px' }}>
          <div className="bnr_250">
            <center />
          </div>

          <TopCharts />
          <TopLists />

          <div className="game_details" style={{ marginTop: '24px' }}>
            <div className="item">
              <div className="icon">
                <img src="//cdn.static.pikoya.com/robloxgo/images/medal.svg" title="Rating" alt="Rating" />
              </div>
              <div className="details">
                <h4>Rating</h4>
                <span className="input">{game.rating}</span>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src="//cdn.static.pikoya.com/robloxgo/images/edit.svg" title="Created By" alt="Created By" />
              </div>
              <div className="details">
                <h4>Developer</h4>
                <span className="input">{game.developer}</span>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src="//cdn.static.pikoya.com/robloxgo/images/date.svg" title="Created On" alt="Created On" />
              </div>
              <div className="details">
                <h4>Created</h4>
                <span className="input">{game.releaseDate}</span>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src="//cdn.static.pikoya.com/robloxgo/images/type.svg" title="Genre" alt="Genre" />
              </div>
              <div className="details">
                <h4>Genre</h4>
                <span className="input">{game.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

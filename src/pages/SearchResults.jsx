import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import exactGames from '../data/robloxgo_exact_details.json';
import allChartGames from '../data/allChartGames';
import developers from '../data/developers.json';
import eventDetails from '../data/event_details.json';
import codeDetails from '../data/game_codes_details.json';
import guideData from '../data/roblox_guide.json';
import guideDetails from '../data/guide_details.json';
import highlightDetails from '../data/highlight_details.json';
import gameguideData from '../data/game_guides_with_faq_success.json';
import videoHub from '../data/roblox_videohub.json';
import topCharts, { getChartUrl } from '../data/topCharts';
import { getTotalPages, paginateArray } from '../utils/helpers';
import { nameToSlug, toGameCardData } from '../utils/exactGameData';
import '../styles/style.css';

const topLists = [
  { title: 'Best Trending Now Roblox Games', url: '/list/best_trending_now_games' },
  { title: 'Best Roblox Uncopylocked Games', url: '/list/best_roblox_uncopylocked_games' },
  { title: 'Best Roblox Tower Defense Games', url: '/list/best_roblox_tower_defense_games' },
  { title: 'Best Roblox Battleground Games', url: '/list/best_roblox_battleground_games' },
  { title: 'Best Roblox 2 Player Games', url: '/list/best_roblox_2_player_games' },
  { title: 'Best Roblox Airplane Games', url: '/list/best_roblox_airplane_games' },
  { title: 'Best Roblox Backrooms Games', url: '/list/best_roblox_backrooms_games' },
  { title: 'Best Roblox Sword Games', url: '/list/best_roblox_sword_games' },
  { title: 'Best Roblox Apocalypse Games', url: '/list/best_roblox_apocalypse_games' },
  { title: 'Best Roblox Fashion Games', url: '/list/best_roblox_fashion_games' },
  { title: 'Best Roblox School Games', url: '/list/best_roblox_school_games' },
  { title: 'Best Roblox Avatar Games', url: '/list/best_roblox_avatar_games' },
  { title: 'Best Roblox Escape Games', url: '/list/best_roblox_escape_games' },
  { title: 'Best Roblox Social Games', url: '/list/best_roblox_social_games' },
  { title: 'Best Roblox Prison Games', url: '/list/best_roblox_prison_games' },
  { title: 'Best Roblox Train Games', url: '/list/best_roblox_train_games' },
];

const staticPages = [
  {
    type: 'Page',
    title: 'Home',
    description: 'Roblox game discovery, charts, lists, guides, highlights, game codes, and events.',
    url: '/',
  },
  {
    type: 'Page',
    title: 'About RobloxGo',
    description: 'About RobloxGo and Roblox as a game discovery platform.',
    url: '/about',
  },
  {
    type: 'Page',
    title: 'Roblox Platform',
    description: 'All Roblox platforms, PC, mobile, console, virtual reality, Roblox Player, and Roblox Studio.',
    url: '/roblox_platforms',
  },
  { type: 'Page', title: 'Roblox Game Codes', description: 'Browse Roblox game codes and rewards.', url: '/roblox-game-codes' },
  { type: 'Page', title: 'Roblox Events', description: 'Live and upcoming Roblox game events.', url: '/events' },
  { type: 'Page', title: 'Roblox Guides', description: 'Roblox tips and guides.', url: '/guides' },
  { type: 'Page', title: 'Roblox Highlights & News', description: 'Roblox highlights, news, and blog posts.', url: '/highlights' },
  { type: 'Page', title: 'Roblox Game Guides', description: 'Game walkthroughs and guides.', url: '/gameguides' },
  { type: 'Page', title: 'Roblox Video Gallery', description: 'Roblox gameplay videos, pro tips, walkthroughs, and hidden tricks.', url: '/video_gallery' },
  { type: 'Page', title: 'Media Gallery', description: 'Roblox image gallery with game pictures, adventures, and characters.', url: '/image_gallery' },
  { type: 'Page', title: 'Play Free Online Games', description: 'Play cool, fun and free online games from action to adventure.', url: '/localgame' },
  { type: 'Page', title: 'Roblox Genres', description: 'Browse Roblox games by genre.', url: '/genres' },
  { type: 'Page', title: 'Top Creators', description: 'Developer and creator profiles.', url: '/developers' },
  { type: 'Page', title: 'Top Charts', description: 'Top 100 Roblox game charts.', url: '/charts' },
  { type: 'Page', title: 'Top Lists', description: 'Best Roblox game lists.', url: '/lists' },
  { type: 'Page', title: 'New Releases', description: 'New Roblox game releases.', url: '/games/new' },
  { type: 'Page', title: 'All-Time Hits', description: 'Most played Roblox games.', url: '/games/most_played' },
  { type: 'Page', title: 'Top-Ranked Games', description: 'Top ranked Roblox games.', url: '/games/top_ranked' },
  { type: 'Page', title: 'Fan Favorites', description: 'Players favorite Roblox games.', url: '/games/favorite' },
  { type: 'Page', title: 'Most Liked Games', description: 'Most liked Roblox games.', url: '/games/vote_up' },
  { type: 'Page', title: 'Contact', description: 'Contact RobloxGo.', url: '/contact' },
  { type: 'Page', title: 'Privacy Policy', description: 'RobloxGo privacy policy.', url: '/privacy' },
  { type: 'Page', title: 'Terms of Use', description: 'RobloxGo terms of use.', url: '/terms' },
];

const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const getSlugFromUrl = (url = '') => String(url).split('/').filter(Boolean).pop() || '';

const getGameIdFromUrl = (url = '') => {
  const match = String(url).match(/\/game\/(\d+)/);
  return match ? match[1] : null;
};

const getDeveloperIdFromUrl = (url = '') => {
  const match = String(url).match(/\/developer\/([^/]+)/);
  return match ? match[1] : null;
};

const getArticleSlug = (item) => getSlugFromUrl(item.details_url || item.url) || nameToSlug(item.title || '');

const cleanTitle = (title = '') => String(title).replace(/^RobloxGo\s*-\s*/i, '').trim();

const makeResult = ({ type, title, description, url, image, keywords = [] }) => ({
  id: `${type}-${url}-${title}`,
  type,
  title: cleanTitle(title),
  description: stripHtml(description),
  url,
  image,
  searchText: [
    type,
    title,
    description,
    url,
    ...keywords,
  ].map((value) => stripHtml(value)).join(' ').toLowerCase(),
});

const genres = Array.from(
  exactGames
    .filter((game) => game?.success && game.genre)
    .reduce((items, game) => {
      const name = String(game.genre).trim();
      const key = name.toLowerCase();
      if (!items.has(key)) items.set(key, { name, count: 1 });
      else items.get(key).count += 1;
      return items;
    }, new Map())
    .values(),
);

const exactGameResults = exactGames
  .filter((game) => game?.success)
  .map(toGameCardData)
  .map((game) => makeResult({
    type: 'Game',
    title: game.title,
    description: game.description,
    url: `/game/${game.slug}`,
    image: game.image,
    keywords: [game.developer, game.category, game.rating, game.visits, game.favorites],
  }));

const chartGameResults = allChartGames.map((game) => makeResult({
  type: 'Game',
  title: game.title || game.gameName,
  description: game.description || `${game.title || game.gameName} Roblox game`,
  url: `/game/${game.slug || game.id}`,
  image: game.image || game.imageUrl,
  keywords: [game.category, game.developer, game.rank, game.plays, game.favorites],
}));

const guideResults = [
  ...(guideData.guide || []),
  ...(Array.isArray(guideDetails) ? guideDetails : []),
].map((item) => makeResult({
  type: 'Guide',
  title: item.title,
  description: item.subtitle || item.short_description || item.content_text || item.content_html,
  url: `/guide/${getArticleSlug(item)}`,
  image: item.image,
}));

const highlightResults = (Array.isArray(highlightDetails) ? highlightDetails : []).map((item) => makeResult({
  type: 'Highlight',
  title: item.title,
  description: item.short_description || item.content_text || item.content_html,
  url: `/highlight/${getArticleSlug(item)}`,
  image: item.image,
  keywords: [item.info],
}));

const gameguideResults = (Array.isArray(gameguideData) ? gameguideData : []).map((item) => {
  const gameId = getGameIdFromUrl(item.pageUrl || item.url);
  const slug = getArticleSlug({ ...item, url: item.pageUrl || item.url });
  return makeResult({
    type: 'Game Guide',
    title: item.title,
    description: item.contentText || item.contentHtml,
    url: gameId ? `/game/${gameId}/guide/${slug}` : `/gameguide/${slug}`,
    image: item.image,
    keywords: [
      ...(Array.isArray(item.faqs) ? item.faqs.flatMap((faq) => [faq.question, faq.shortAnswer, faq.fullAnswer]) : []),
    ],
  });
});

const eventResults = eventDetails.map((event) => makeResult({
  type: 'Event',
  title: event.event_name,
  description: event.description || event.event_subtitle,
  url: `/game/${event.game_id}/events/${event.event_id}/${nameToSlug(event.event_name)}`,
  image: event.event_image,
  keywords: [event.event_subtitle, event.start_time, event.end_time],
}));

const codeResults = codeDetails.map((code) => makeResult({
  type: 'Code',
  title: `${code.game_slug || code.game_id} Roblox Game Codes`,
  description: [
    ...(code.active_codes || []).map((item) => `${item.code} ${item.reward}`),
    ...(code.expired_codes || []).map((item) => `${item.code} ${item.reward}`),
  ].join(' '),
  url: `/game/${code.game_id}/roblox-game-codes`,
  keywords: [code.game_slug, code.game_id],
}));

const videoItems = Array.isArray(videoHub) ? videoHub : videoHub.selection1 || [];

const videoResults = videoItems.map((video) => {
  const gameId = getGameIdFromUrl(video.url);

  return makeResult({
    type: 'Video',
    title: video.title || 'Roblox Video',
    description: 'Roblox gameplay video, walkthrough, tip, or trick.',
    url: gameId ? `/game/${gameId}` : '/video_gallery',
    image: video.image,
    keywords: [video.url],
  });
});

const developerResults = developers.map((developer) => makeResult({
  type: 'Creator',
  title: developer.developerName || developer.name || 'Roblox Creator',
  description: developer.about || `${developer.developerName || developer.name || 'Roblox Creator'} Roblox developer`,
  url: `/developer/${getDeveloperIdFromUrl(developer.pageUrl) || developer.id || developer.developer_id || ''}/${encodeURIComponent(nameToSlug(developer.developerName || developer.name || 'Roblox Creator'))}`,
  image: developer.profileImage || developer.image,
  keywords: [
    developer.stats?.followers,
    developer.stats?.friends,
    developer.stats?.following,
    developer.stats?.dateJoined,
    ...(Array.isArray(developer.creations) ? developer.creations.map((creation) => creation.gameName) : []),
  ],
}));

const genreResults = genres.map((genre) => makeResult({
  type: 'Genre',
  title: `${genre.name} Games`,
  description: `${genre.count} Roblox games in ${genre.name}.`,
  url: `/genres/${nameToSlug(genre.name).replace(/-/g, '_')}`,
  keywords: [genre.name],
}));

const chartResults = topCharts.map((chart) => makeResult({
  type: 'Chart',
  title: chart.label,
  description: chart.description,
  url: getChartUrl(chart.key),
}));

const listResults = topLists.map((list) => makeResult({
  type: 'List',
  title: list.title,
  description: `${list.title} list.`,
  url: list.url,
}));

const allSearchResults = Object.values(
  [
    ...staticPages.map(makeResult),
    ...exactGameResults,
    ...chartGameResults,
    ...guideResults,
    ...highlightResults,
    ...gameguideResults,
    ...eventResults,
    ...codeResults,
    ...videoResults,
    ...developerResults,
    ...genreResults,
    ...chartResults,
    ...listResults,
  ].reduce((items, result) => {
    const key = `${result.type}-${result.url}-${result.title}`.toLowerCase();
    if (!items[key]) items[key] = result;
    return items;
  }, {}),
);

const searchProject = (query) => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  return allSearchResults
    .filter((result) => terms.every((term) => result.searchText.includes(term)))
    .sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
      const bTitle = b.title.toLowerCase().includes(query.toLowerCase()) ? 0 : 1;
      return aTitle - bTitle || a.title.localeCompare(b.title);
    });
};

const SearchResultItem = ({ result }) => (
  <Link
    to={result.url}
    className="row"
    style={{
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      padding: '12px',
    }}
  >
    {result.image && (
      <img
        loading="lazy"
        src={result.image}
        alt={result.title}
        style={{
          width: '96px',
          aspectRatio: '16 / 9',
          objectFit: 'cover',
          borderRadius: '4px',
          flex: '0 0 auto',
        }}
      />
    )}
    <span style={{ minWidth: 0 }}>
      <span style={{ display: 'block', color: 'var(--accent2)', fontSize: '12px', marginBottom: '4px' }}>
        {result.type}
      </span>
      <span style={{ display: 'block', color: 'var(--white)', fontSize: '18px', marginBottom: '4px' }}>
        {result.title}
      </span>
      {result.description && (
        <span
          style={{
            color: 'var(--light-grey)',
            display: '-webkit-box',
            fontSize: '13px',
            lineHeight: 1.4,
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {result.description}
        </span>
      )}
    </span>
  </Link>
);

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const results = useMemo(() => searchProject(query), [query]);
  const totalPages = getTotalPages(results.length, itemsPerPage);
  const paginatedResults = paginateArray(results, currentPage, itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <Layout>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Search Results</h1>
          <p className="page-description">
            {query
              ? results.length > 0
                ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                : `No results found for "${query}"`
              : 'Search for games, guides, codes, events, charts, creators, genres, and pages.'}
          </p>
        </div>
      </div>

      <div className="container">
        <section className="page-section">
          {paginatedResults.length > 0 ? (
            <>
              <div className="list">
                {paginatedResults.map((result) => (
                  <SearchResultItem key={result.id} result={result} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                Try searching for a game, guide, event, code, creator, chart, list, or page.
              </p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

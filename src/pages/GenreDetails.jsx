import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import GameGrid from '../components/GameGrid';
import ListPagination from '../components/ListPagination';
import NotFound from '../components/NotFound';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import exactGames from '../data/robloxgo_exact_details.json';
import { GAME_LIST_PAGE_SIZE, getPagedGames } from '../utils/listGameData';
import { parseFormattedNumber, toGameCardData } from '../utils/exactGameData';
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

const genreGroups = Array.from(
  exactGames
    .filter((game) => game?.success && game.genre)
    .reduce((items, game) => {
      const name = String(game.genre).trim();
      const slug = genreSlug(name);

      if (!items.has(slug)) {
        items.set(slug, {
          name,
          slug,
          games: [],
        });
      }

      items.get(slug).games.push(game);
      return items;
    }, new Map())
    .values()
);

const getGenreGroup = (slug = '') => (
  genreGroups.find((item) => item.slug === slug) || null
);

const dedupeGamesById = (games) => (
  Array.from(
    games.reduce((items, game) => {
      const id = String(game.game_id || game.url || game.name || '');

      if (id && !items.has(id)) {
        items.set(id, game);
      }

      return items;
    }, new Map()).values()
  )
);

export default function GenreDetails() {
  const { genreSlug: routeGenreSlug, page } = useParams();
  const genre = getGenreGroup(routeGenreSlug);

  if (!genre) {
    return (
      <Layout>
        <NotFound
          title="Genre Not Found"
          message="The Roblox genre you are looking for is not available in our database."
        />
      </Layout>
    );
  }

  const allGenreGames = dedupeGamesById(genre.games)
    .slice()
    .sort((a, b) => parseFormattedNumber(b.active_players) - parseFormattedNumber(a.active_players))
    .map(toGameCardData);
  const totalPages = Math.ceil(allGenreGames.length / GAME_LIST_PAGE_SIZE);
  const currentPage = Math.min(totalPages, Math.max(1, Number(page) || 1));
  const genreGames = getPagedGames(allGenreGames, currentPage);
  const genreTitle = `${genre.name} Roblox Games`;

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

      <div className="wrap" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="main" style={{ flex: '1 1 0', minWidth: '0' }}>
          <div className="page_top" title={genreTitle} style={{ backgroundImage: 'url(//cdn.static.pikoya.com/robloxgo/images/page_title_bg_top_100.jpg)' }}>
            <h1 className="page-title">{genreTitle}</h1>
          </div>

          <span className="head-text">
            Browse {allGenreGames.length.toLocaleString()} {genre.name} Roblox games from our latest game details data. Pick a game to see stats, guides, codes, events, and more.
          </span>

          <GameGrid games={genreGames} />
          <ListPagination basePath={`/genres/${genre.slug}`} currentPage={currentPage} totalPages={totalPages} />
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

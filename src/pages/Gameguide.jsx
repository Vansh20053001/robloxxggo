import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import gameguideData from '../data/game_guides_with_faq_success.json';
import exactGames from '../data/robloxgo_exact_details.json';
import { getTotalPages, paginateArray } from '../utils/helpers';
import '../styles/style.css';

const gameguides = Array.isArray(gameguideData) ? gameguideData : [];
const exactGamesById = new Map(
  exactGames
    .filter((game) => game?.success && game.game_id)
    .map((game) => [String(game.game_id), game]),
);

const nameToSlug = (name = '') => (
  String(name)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
);

const getGameIdFromUrl = (url = '') => {
  const match = String(url).match(/\/game\/(\d+)/);
  return match ? match[1] : '';
};

const getGameguideSlug = (gameguide) => {
  const sourceUrl = gameguide.pageUrl || gameguide.details_url || gameguide.url || '';
  const sourceSlug = sourceUrl.split('/').filter(Boolean).pop();
  return sourceSlug || gameguide.slug || nameToSlug(getGameguideTitle(gameguide));
};

const getGameguideTitle = (gameguide) => gameguide.title || 'Roblox Game Guide';
const getGameguideSubtitle = (gameguide) => gameguide.contentText || gameguide.contentHtml || 'Roblox game guide';
const getGameguideImage = (gameguide) => {
  const gameId = getGameIdFromUrl(gameguide.pageUrl);
  const exactGame = exactGamesById.get(String(gameId));
  return exactGame?.image || gameguide.image || '/api/placeholder/400/300';
};
const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const getGameguidePath = (gameguide) => {
  const gameId = getGameIdFromUrl(gameguide.pageUrl);
  const gameguideSlug = getGameguideSlug(gameguide);

  return gameId ? `/game/${gameId}/guide/${gameguideSlug}` : `/gameguide/${gameguideSlug}`;
};

export default function Gameguide() {
  const { page } = useParams();
  const location = useLocation();
  const itemsPerPage = 6;
  const totalPages = getTotalPages(gameguides.length, itemsPerPage);
  const requestedPage = Number(page) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages || 1);
  const paginatedGameguides = paginateArray(gameguides, currentPage, itemsPerPage);
  const basePath = location.pathname.startsWith('/roblox_game_guides_and_walkthroughs')
    ? '/roblox_game_guides_and_walkthroughs'
    : '/gameguides';

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
      <div className="wrap gameguide-page" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="main" style={{ flex: '1 1 0', minWidth: '0' }}>
          <h1 className="page-title" style={{ width: '100%' }}>
            Roblox Games Guides (June 2026)
          </h1>
          <span className="head-text">
            Master your favorite Roblox games with our complete guides, tips, and walkthroughs. Updated every month with new strategies and secrets to help you win.
          </span>

          <div className="head" />

          <div className="items">
            {paginatedGameguides.map((gameguide) => {
              const title = getGameguideTitle(gameguide);
              const subtitle = stripHtml(getGameguideSubtitle(gameguide));
              const gameguidePath = getGameguidePath(gameguide);

              return (
                <div className="post" key={gameguide.gameguide_id || gameguide.id || title}>
                  <Link to={gameguidePath} className="post-image">
                    <div className="label">Game Guide</div>
                    <div className="label right orange">Updated</div>
                    <img
                      src={getGameguideImage(gameguide)}
                      title={title}
                      alt={title}
                    />
                  </Link>

                  <div className="details">
                    <h2>
                      <Link to={gameguidePath}>{title}</Link>
                    </h2>
                    <div className="flex">
                      <div className="short">
                        {subtitle}
                      </div>
                      <Link to={gameguidePath} className="button">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {paginatedGameguides.length === 0 && (
            <div className="block">
              <p>No Roblox game guides are available yet.</p>
            </div>
          )}

          <ListPagination basePath={basePath} currentPage={currentPage} totalPages={totalPages || 1} />
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

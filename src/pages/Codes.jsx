import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import ListPagination from '../components/ListPagination';
import exactGames from '../data/robloxgo_exact_details.json';
import { paginateArray, getTotalPages } from '../utils/helpers';
import '../styles/style.css';

const codeGames = exactGames.filter((item) => item?.success && item.get_code_url);

const getCodePath = (game) => `/game/${game.game_id}/roblox-game-codes`;

export default function Codes() {
  const { page } = useParams();
  const location = useLocation();
  const itemsPerPage = 6;
  const totalPages = getTotalPages(codeGames.length, itemsPerPage);
  const requestedPage = Number(page) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages || 1);
  const paginatedGames = paginateArray(codeGames, currentPage, itemsPerPage);
  const basePath = location.pathname.startsWith('/roblox-game-codes') ? '/roblox-game-codes' : '/codes';

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
        <h1 className="page-title" style={{ width: '100%' }}>
          Roblox Games Codes (June 2026)
        </h1>

        <div className="wrap" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div className="main">
            <span className="head-text">
              Check out all the latest Roblox game codes - updated monthly with new rewards, tips, and step-by-step redemption guides for your favorite games.
            </span>

            <div className="items">
              {paginatedGames.map((game) => (
                <div key={game.game_id} className="post">
                  <Link to={getCodePath(game)}>
                    <img loading="lazy" src={game.image || '/api/placeholder/400/300'} title={`RobloxGo - ${game.name} Codes`} alt={`${game.name} Codes`} />
                  </Link>
                  <div className="details">
                    <h2>
                      <Link to={getCodePath(game)}>{`RobloxGo - ${game.name} Codes June 2026 - All Active & Expired Codes`}</Link>
                    </h2>
                    <div className="short">
                      Grab the latest {game.name} codes for June 2026, including active rewards, expired codes, and simple redemption tips.
                    </div>
                    <Link to={getCodePath(game)} className="button">Get Code</Link>
                  </div>
                </div>
              ))}
            </div>

            {paginatedGames.length === 0 && (
              <div className="block">
                <p>No Roblox code pages matched your search.</p>
              </div>
            )}

            <ListPagination basePath={basePath} currentPage={currentPage} totalPages={totalPages || 1} />
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

import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import GameGrid from '../components/GameGrid';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import newGamesData from '../data/robloxgo_newgames.json';
import { GAME_LIST_PAGE_SIZE, getPagedGames, getRobloxListItems, toListGameCardData } from '../utils/listGameData';
import '../styles/style.css';

const allNewGames = getRobloxListItems(newGamesData).map(toListGameCardData);

export default function NewGames() {
  const { page } = useParams();
  const totalPages = Math.ceil(allNewGames.length / GAME_LIST_PAGE_SIZE);
  const currentPage = Math.min(totalPages, Math.max(1, Number(page) || 1));
  const newestGames = getPagedGames(allNewGames, currentPage);

  return (
    <Layout>
      <section className="bnr_970">
        <center />
      </section>
      <span class="push">
        <span class="circle_border">
          <span class="circle">
            <img loading="lazy" src="https://cdn.nichesites.pikoya.com/general/images/alarm" title="Alarm" alt="Roblox Strategy Hub: Stats, Videos &amp; Power Tips" class="mobile" />
          </span>
        </span>
      </span>
      <div className="wrap" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="main" style={{ flex: '1 1 0', minWidth: '0' }}>
          <div className="page_top" title="Best Roblox Games - Top 100 Chart" style={{ backgroundImage: 'url(//cdn.static.pikoya.com/robloxgo/images/page_title_bg_top_100.jpg)' }}>
          <h1 className="page-title" style={{ width: '100%' }}>
            New Roblox Games
          </h1>
          </div>
          <span className="head-text">
            Discover all-new Roblox games, newest releases, and up-and-coming games on RobloxGo.com
          </span>

          <GameGrid games={newestGames} />
          <ListPagination basePath="/games/new" currentPage={currentPage} totalPages={totalPages} />
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

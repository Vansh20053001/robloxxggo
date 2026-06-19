import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import GameGrid from '../components/GameGrid';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import mostPlayedData from '../data/robloxgo_mostplayed.json';
import { GAME_LIST_PAGE_SIZE, getPagedGames, getRobloxListItems, toListGameCardData } from '../utils/listGameData';
import '../styles/style.css';

const allMostPlayedGames = getRobloxListItems(mostPlayedData).map(toListGameCardData);

export default function MostPlayed() {
  const { page } = useParams();
  const totalPages = Math.ceil(allMostPlayedGames.length / GAME_LIST_PAGE_SIZE);
  const currentPage = Math.min(totalPages, Math.max(1, Number(page) || 1));
  const mostPlayedGames = getPagedGames(allMostPlayedGames, currentPage);

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
            <h1 className="page-title">Most Played Roblox Games</h1>
          </div>

          <span className="head-text">
            Check out Roblox's all-time hit games! With millions of players and upvotes, sort through Roblox top-of-the-charts games and pick your favorite games.
          </span>

          <GameGrid games={mostPlayedGames} />
          <ListPagination basePath="/games/most_played" currentPage={currentPage} totalPages={totalPages} />
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

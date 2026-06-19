import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import GameGrid from '../components/GameGrid';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import voteUpData from '../data/roblox_voteup.json';
import { GAME_LIST_PAGE_SIZE, getPagedGames, getRobloxListItems, toListGameCardData } from '../utils/listGameData';
import '../styles/style.css';

const allMostLikedGames = getRobloxListItems(voteUpData).map(toListGameCardData);

export default function MostLiked() {
  const { page } = useParams();
  const totalPages = Math.ceil(allMostLikedGames.length / GAME_LIST_PAGE_SIZE);
  const currentPage = Math.min(totalPages, Math.max(1, Number(page) || 1));
  const mostLikedGames = getPagedGames(allMostLikedGames, currentPage);

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
            <h1 className="page-title">Most Liked Roblox Games</h1>
          </div>
          <span className="head-text">
            Discover Roblox's most liked games - all in one place! Get real-time stats, reviews and ranking of the most beloved Roblox games on RobloxGo.com.
          </span>

          <GameGrid games={mostLikedGames} />
          <ListPagination basePath="/games/vote_up" currentPage={currentPage} totalPages={totalPages} />
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

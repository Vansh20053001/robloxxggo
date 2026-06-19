import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import GameGrid from '../components/GameGrid';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import favoriteData from '../data/roblox_favorite.json';
import { GAME_LIST_PAGE_SIZE, getPagedGames, getRobloxListItems, toListGameCardData } from '../utils/listGameData';
import '../styles/style.css';

const allFavoriteGames = getRobloxListItems(favoriteData).map(toListGameCardData);

export default function FanFavorite() {
  const { page } = useParams();
  const totalPages = Math.ceil(allFavoriteGames.length / GAME_LIST_PAGE_SIZE);
  const currentPage = Math.min(totalPages, Math.max(1, Number(page) || 1));
  const favoriteGames = getPagedGames(allFavoriteGames, currentPage);

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
            <h1 className="page-title">Fan Favorite Roblox Games</h1>
          </div>

          <span className="head-text">
            Discover Roblox's most beloved games and the community favorites ranked by player popularity on RobloxGo.
          </span>

          <GameGrid games={favoriteGames} />
          <ListPagination basePath="/games/favorite" currentPage={currentPage} totalPages={totalPages} />
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

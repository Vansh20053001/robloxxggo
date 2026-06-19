import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import GameCard from '../components/GameCard';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import imageGalleryData from '../data/roblox_imagegal.json';
import {
  allTimeHits,
  popularNow,
} from '../utils/homeGameSections';
import { getTotalPages, paginateArray } from '../utils/helpers';
import '../styles/style.css';

const ITEMS_PER_PAGE = 12;

const galleryItems = (imageGalleryData.images || []).map((item, index) => {
  const thumb = item.image || item.thumb || item.thumbnail || '';
  const original = item.original || item.fullImage || thumb.replace(/_thumb(\.[a-z]+)$/i, '$1');

  return {
    id: item.id || `gallery-image-${index + 1}`,
    title: item.title || 'Roblox gallery image',
    thumb,
    original,
  };
}).filter((item) => item.thumb);

const GameSection = ({ title, to, games }) => (
  <section>
    <div className="head">
      <h2><Link to={to}>{title}</Link></h2>
      <Link to={to} className="small_link">See all</Link>
    </div>
    <div className="items">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  </section>
);

export default function MediaGallery() {
  const { page } = useParams();
  const currentPage = Number(page) || 1;
  const [activeIndex, setActiveIndex] = useState(null);
  const totalPages = getTotalPages(galleryItems.length, ITEMS_PER_PAGE);
  const paginatedItems = paginateArray(galleryItems, currentPage, ITEMS_PER_PAGE);
  const pageStartIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const activeItem = activeIndex !== null ? galleryItems[activeIndex] : null;

  const showPrevious = (event) => {
    event.stopPropagation();
    setActiveIndex((index) => (index - 1 + galleryItems.length) % galleryItems.length);
  };

  const showNext = (event) => {
    event.stopPropagation();
    setActiveIndex((index) => (index + 1) % galleryItems.length);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (activeIndex === null) return;
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => (index - 1 + galleryItems.length) % galleryItems.length);
      if (event.key === 'ArrowRight') setActiveIndex((index) => (index + 1) % galleryItems.length);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex]);

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
      <div className="content gallery_page">
        <main className="main">
          <div className="head">
            <h1>Roblox Image Gallery</h1>
            <span className="head-text">
              Scroll through tons of awesome game pics, wild adventures, and cool characters from all your favorite Roblox games!
            </span>
          </div>

          <div className="section-gallery">
            <div className="items">
              {paginatedItems.map((item, index) => (
                <button
                  type="button"
                  className="card"
                  id={item.id}
                  key={item.id}
                  onClick={() => setActiveIndex(pageStartIndex + index)}
                  style={{ padding: 0, marginTop: 0 }}
                >
                  <picture>
                    <img
                      src={item.thumb}
                      alt={`${item.title} - Roblox Strategy Hub: Stats, Videos & Power Tips`}
                      title={item.title}
                      className="thumb"
                    />
                  </picture>
                </button>
              ))}
            </div>

            <ListPagination basePath="/image_gallery" currentPage={currentPage} totalPages={totalPages} />
          </div>

          <div className="bnr_728">
            <center />
          </div>

          <GameSection title="Popular Roblox Games Right Now" to="/games/favorite" games={popularNow} />
          <GameSection title="All-Time Roblox Hits" to="/games/most_played" games={allTimeHits} />
        </main>

        <div className="sidebar">
          <div className="bnr_250">
            <center />
          </div>
          <TopCharts />
          <TopLists />
        </div>
      </div>

      {activeItem && (
        <div className="popup" onClick={() => setActiveIndex(null)}>
          <span id="close" onClick={() => setActiveIndex(null)}>x</span>
          <button id="prev" className="nav-button" type="button" onClick={showPrevious}>‹</button>
          <img id="popup-img" src={activeItem.original} alt={activeItem.title} title={activeItem.title} />
          <button id="next" className="nav-button" type="button" onClick={showNext}>›</button>
        </div>
      )}
    </Layout>
  );
}

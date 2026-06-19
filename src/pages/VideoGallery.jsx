import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import GameCard from '../components/GameCard';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import exactGames from '../data/robloxgo_exact_details.json';
import videoHub from '../data/roblox_videohub.json';
import videoLinks from '../data/video_links_success.json';
import { getTotalPages, paginateArray } from '../utils/helpers';
import { parseFormattedNumber, toGameCardData } from '../utils/exactGameData';
import '../styles/style.css';

const ITEMS_PER_PAGE = 9;

const exactGameCards = exactGames
  .filter((game) => game?.success)
  .map(toGameCardData);

const popularGames = [...exactGameCards]
  .sort((a, b) => parseFormattedNumber(b.activePlayers) - parseFormattedNumber(a.activePlayers))
  .slice(0, 5);

const allTimeGames = [...exactGameCards]
  .sort((a, b) => parseFormattedNumber(b.visits) - parseFormattedNumber(a.visits))
  .slice(0, 5);

const getGameIdFromUrl = (url = '') => {
  const match = String(url).match(/\/game\/(\d+)/);
  return match ? match[1] : null;
};

const getVideoIdFromUrl = (url = '') => {
  const match = String(url).match(/\/watch\/([^/?#]+)/);
  return match ? match[1] : url;
};

const videoLinkMap = new Map(
  (Array.isArray(videoLinks) ? videoLinks : []).map((video) => [getVideoIdFromUrl(video.pageUrl), video]),
);

const videoItems = (Array.isArray(videoHub) ? videoHub : videoHub.selection1 || []).map((video) => {
  const videoDetails = videoLinkMap.get(getVideoIdFromUrl(video.url));

  return {
    ...video,
    playback: videoDetails || null,
  };
});

const VideoCard = ({ video, onPlay }) => {
  const title = video.title || 'Roblox video';
  const hasPlayableVideo = Boolean(video.playback?.videoUrl);

  return (
    <button
      type="button"
      className="game"
      onClick={() => hasPlayableVideo && onPlay(video)}
      disabled={!hasPlayableVideo}
      aria-label={`Play ${title}`}
    >
      <img
        className="hover-swap"
        loading="lazy"
        src={video.image}
        title={title}
        alt={`${title} - Roblox Strategy Hub: Stats, Videos & Power Tips`}
      />
      {video.time && <span className="time">{video.time}</span>}
      <div className="details">
        <h4>{title}</h4>
      </div>
    </button>
  );
};

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

export default function VideoGallery() {
  const { page } = useParams();
  const currentPage = Number(page) || 1;
  const [activeVideo, setActiveVideo] = useState(null);
  const totalPages = getTotalPages(videoItems.length, ITEMS_PER_PAGE);
  const paginatedVideos = paginateArray(videoItems, currentPage, ITEMS_PER_PAGE);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveVideo(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

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
      <div className="content video_page">
        <main className="main">
          <div className="head">
            <h1>The Ultimate Roblox Video Gallery</h1>
            <span className="head-text">
              Looking for gameplay, pro tips, and hidden tricks? Explore the RobloxGo Video Gallery, featuring walkthroughs, secrets, and tutorials for all types of players. Watch, learn, and level up your Roblox gameplay.
            </span>
          </div>

          <section className="videos">
            <div className="items">
              {paginatedVideos.map((video) => (
                <VideoCard key={getVideoIdFromUrl(video.url)} video={video} onPlay={setActiveVideo} />
              ))}
            </div>
          </section>

          <ListPagination basePath="/video_gallery" currentPage={currentPage} totalPages={totalPages} />

          <div className="bnr_728">
            <center />
          </div>

          <GameSection title="Popular Roblox Games Right Now" to="/top_100_trending_now_games" games={popularGames} />
          <GameSection title="All-Time Roblox Hits" to="/games/most_played" games={allTimeGames} />
        </main>

        <div className="sidebar">
          <div className="bnr_250">
            <center />
          </div>
          <TopCharts />
          <TopLists />
        </div>
      </div>

      {activeVideo?.playback?.videoUrl && (
        <div className="popup video-popup" onClick={() => setActiveVideo(null)}>
          <button id="close" type="button" onClick={() => setActiveVideo(null)}>x</button>
          <div className="video-popup__player" onClick={(event) => event.stopPropagation()}>
            <video
              src={activeVideo.playback.videoUrl}
              poster={activeVideo.playback.poster || activeVideo.playback.previewImage || activeVideo.image}
              controls
              autoPlay
            >
              <source src={activeVideo.playback.videoUrl} type={activeVideo.playback.videoType || 'video/mp4'} />
            </video>
            <h3>{activeVideo.playback.title || activeVideo.title}</h3>
            {getGameIdFromUrl(activeVideo.playback.pageUrl || activeVideo.url) && (
              <Link to={`/game/${getGameIdFromUrl(activeVideo.playback.pageUrl || activeVideo.url)}`} className="button">
                View game
              </Link>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

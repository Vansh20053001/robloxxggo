import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Genre from './pages/Genre';
import GenreDetails from './pages/GenreDetails';
import Codes from './pages/Codes';
import CodeDetails from './pages/CodeDetails';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Guide from './pages/Guide';
import GuideDetails from './pages/GuideDetails';
import Highlight from './pages/Highlight';
import HighlightDetails from './pages/HighlightDetails';
import Gameguide from './pages/Gameguide';
import GameguideDetails from './pages/GameguideDetails';
import Developers from './pages/Developers';
import DeveloperDetails from './pages/DeveloperDetails';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import RobloxPlatform from './pages/RobloxPlatform';
import MediaGallery from './pages/MediaGallery';
import VideoGallery from './pages/VideoGallery';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import TrendingNow from './pages/TrendingNow';
import Lists from './pages/Lists';
import Charts from './pages/Charts';
import TopChart from './pages/TopChart';
import TopList from './pages/TopList';
import NewGames from './pages/NewGames';
import MostPlayed from './pages/MostPlayed';
import TopRanked from './pages/TopRanked';
import FanFavorite from './pages/FanFavorite';
import MostLiked from './pages/MostLiked';
import NotFoundPage from './pages/NotFoundPage';

// Styles
import './styles/style.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top_100_trending_now_games" element={<TrendingNow />} />
        <Route path="/chart" element={<TopChart />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/list/:listKey" element={<TopList />} />
        <Route path="/list/:listKey/:page" element={<TopList />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/games/new" element={<NewGames />} />
        <Route path="/games/new/:page" element={<NewGames />} />
        <Route path="/games/most_played" element={<MostPlayed />} />
        <Route path="/games/most_played/:page" element={<MostPlayed />} />
        <Route path="/games/top_ranked" element={<TopRanked />} />
        <Route path="/games/top_ranked/:page" element={<TopRanked />} />
        <Route path="/games/favorite" element={<FanFavorite />} />
        <Route path="/games/favorite/:page" element={<FanFavorite />} />
        <Route path="/games/vote_up" element={<MostLiked />} />
        <Route path="/games/vote_up/:page" element={<MostLiked />} />
        <Route path="/game/:gameSlug/events/:eventId/:eventSlug" element={<EventDetails />} />
        <Route path="/game/:gameSlug/roblox-game-codes" element={<CodeDetails />} />
        <Route path="/game/:slug" element={<GameDetails />} />
        <Route path="/genres" element={<Genre />} />
        <Route path="/genres/:genreSlug" element={<GenreDetails />} />
        <Route path="/genres/:genreSlug/:page" element={<GenreDetails />} />
        <Route path="/codes" element={<Codes />} />
        <Route path="/codes/:page" element={<Codes />} />
        <Route path="/roblox-game-codes" element={<Codes />} />
        <Route path="/roblox-game-codes/:page" element={<Codes />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:page" element={<Events />} />
        <Route path="/guides" element={<Guide />} />
        <Route path="/guides/:page" element={<Guide />} />
        <Route path="/guide/:guideSlug" element={<GuideDetails />} />
        <Route path="/highlights" element={<Highlight />} />
        <Route path="/highlights/:page" element={<Highlight />} />
        <Route path="/highlight/:highlightSlug" element={<HighlightDetails />} />
        <Route path="/blog" element={<Highlight />} />
        <Route path="/blog/:page" element={<Highlight />} />
        <Route path="/blog/post/:highlightSlug" element={<HighlightDetails />} />
        <Route path="/gameguides" element={<Gameguide />} />
        <Route path="/gameguides/:page" element={<Gameguide />} />
        <Route path="/gameguide/:gameguideSlug" element={<GameguideDetails />} />
        <Route path="/roblox_game_guides_and_walkthroughs" element={<Gameguide />} />
        <Route path="/roblox_game_guides_and_walkthroughs/:page" element={<Gameguide />} />
        <Route path="/game/:gameId/guide" element={<GameguideDetails />} />
        <Route path="/game/:gameId/guide/:gameguideSlug" element={<GameguideDetails />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/developers/:page" element={<Developers />} />
        <Route path="/developer/:id" element={<DeveloperDetails />} />
        <Route path="/developer/:id/:developerSlug" element={<DeveloperDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/roblox_platforms" element={<RobloxPlatform />} />
        <Route path="/video_gallery" element={<VideoGallery />} />
        <Route path="/video_gallery/:page" element={<VideoGallery />} />
        <Route path="/image_gallery" element={<MediaGallery />} />
        <Route path="/image_gallery/:page" element={<MediaGallery />} />  
        <Route path="/contact" element={<Contact />} />
        <Route path="/advertise" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/style.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) setActiveSubMenu(null);
  };

  const handleSubMenuClick = (menuId) => {
    setActiveSubMenu(activeSubMenu === menuId ? null : menuId);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setActiveSubMenu(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
    closeMenus();
  };

  return (
    <>
      <span
        id="black_cover"
        className={`black_cover ${activeSubMenu ? 'active' : ''}`}
        onClick={closeMenus}
      ></span>

      <header id="header" className={`header ${menuOpen ? 'open' : ''}`}>
        <div className="wrap">
          <span className="logo">
            <Link to="/" onClick={closeMenus}>
              <img
                src="https://cdn.static.pikoya.com/robloxgo/images/logo"
                alt="RobloxGo"
                title="RobloxGo - Game Discovery Platform"
              />
            </Link>
          </span>

          <span
            id="menu_toggle"
            className={`tb_menu_toggle ${menuOpen ? 'tb_animate_toggle' : ''}`}
            onClick={toggleMenu}
          >
            <i></i>
            <i></i>
            <i></i>
          </span>

          <div id="menu" className={`menu_top ${menuOpen ? 'open' : ''}`}>
            <menu>
              {/* Games Menu */}
              <div
                id="games_sub_menu"
                className={`sub sub-drop ${activeSubMenu === 'games_sub_menu' ? 'active' : ''}`}
                onClick={() => handleSubMenuClick('games_sub_menu')}
              >
                <div className="item">
                  <img src="	https://cdn.static.pikoya.com/robloxgo/images/icon_games" title="Games" alt="Games" />
                  <span>Games</span>
                  <span className="drop">
                    <span className="arrow"></span>
                  </span>
                </div>
                <div className="items">
                  <Link to="/top_100_trending_now_games" onClick={closeMenus}>Trending Now</Link>
                  <Link to="/games/new" onClick={closeMenus}>New Releases</Link>
                  <Link to="/games/most_played" onClick={closeMenus}>All-Time Hits</Link>
                  <Link to="/games/top_ranked" onClick={closeMenus}>Top-Ranked</Link>
                  <Link to="/games/favorite" onClick={closeMenus}>Fan Favorites</Link>
                  <Link to="/games/vote_up" onClick={closeMenus}>Most Liked</Link>
                </div>
              </div>

              {/* Lists */}
              <Link to="/lists" className="item" onClick={closeMenus}>
                <img src="//cdn.static.pikoya.com/robloxgo/images/icon_lists" title="RobloxGo - Check out top Roblox Lists" alt="RobloxGo - Check out top Roblox Game Lists" />
                <span>Best Lists</span>
              </Link>

              {/* Charts */}
              <Link to="/charts" className="item" onClick={closeMenus}>
                <img src="//cdn.static.pikoya.com/robloxgo/images/icon_charts" title="RobloxGo - Check out top Roblox Charts" alt="RobloxGo - Check out top Roblox Charts" />
                <span>Top Charts</span>
              </Link>

              {/* Codes */}
              <Link to="/codes" className="item" onClick={closeMenus}>
                <img src="//cdn.static.pikoya.com/robloxgo/images/icon_gift" title="RobloxGo - Check out Roblox Game Codes" alt="RobloxGo - Check out Roblox game codes" />
                <span>Codes</span>
              </Link>

              {/* Events */}
              <Link to="/events" className="item" onClick={closeMenus}>
                <img src="//cdn.static.pikoya.com/robloxgo/images/icon_bolt" title="RobloxGo - Check out all Roblox live and upcoming events" alt="RobloxGo - Check out all Roblox live and upcoming events" />
                <span>Events</span>
              </Link>

              {/* More Menu */}
              <div
                id="more_sub_menu"
                className={`sub sub-drop ${activeSubMenu === 'more_sub_menu' ? 'active' : ''}`}
                onClick={() => handleSubMenuClick('more_sub_menu')}
              >
                <div className="item">
                  <img src="//cdn.static.pikoya.com/robloxgo/images/icon_more" title="RobloxGo - Check out more pages" alt="Roblox Guides, Top Roblox Games Charts, Top Games List on RobloxGo" />
                  <span>More</span>
                  <span className="drop">
                    <span className="arrow"></span>
                  </span>
                </div>
                <div className="items">
                  <Link to="/guides" onClick={closeMenus}>Guides</Link>
                  <Link to="/highlights" onClick={closeMenus}>Highlights & News</Link>
                  <Link to="/gameguides" onClick={closeMenus}>Game Guides</Link>
                  <Link to="/video_gallery" onClick={closeMenus}>Video Hub</Link>
                  <Link to="/image_gallery" onClick={closeMenus}>Media Gallery</Link>
                  <Link to="/developers" onClick={closeMenus}>Top Creators</Link>
                  <Link to="/genres" onClick={closeMenus}>Roblox Genres</Link>
                  <Link to="/roblox_platforms" onClick={closeMenus}>Roblox Platform</Link>
                  <Link to="/about" onClick={closeMenus}>About Roblox</Link>
                </div>
              </div>
            </menu>

            <span className="search" onClick={() => { }}>
              <form onSubmit={handleSearchSubmit} id="search-form">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

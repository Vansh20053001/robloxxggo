import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img 
                src="https://cdn.static.pikoya.com/robloxgo/images/logo" 
                alt="RobloxGo" 
                title="RobloxGo - Game Discovery Platform"
              />
          </Link>
        </div>

        <div className="menu-first">
          <h3>Explore RobloxGo</h3>
          <menu>
            <Link to="/games/most_played" className="item">Roblox Games</Link>
            <Link to="/lists" className="item">Top Lists</Link>
            <Link to="/games" className="item">Top Charts</Link>
            <Link to="/genres" className="item">Game Genres</Link>
          </menu>
        </div>

        <div className="menu-second">
          <h3>RobloxGo News</h3>
          <menu>
            <Link to="/highlights" className="item">Blog</Link>
            <Link to="/guides" className="item">Guides</Link>
          </menu>
        </div>

        <div className="menu-third">
          <h3>About RobloxGo</h3>
          <menu>
            <Link to="/about" className="item">About</Link>
            <Link to="/privacy" className="item">Privacy Policy</Link>
            <Link to="/terms" className="item">Terms of use</Link>
            <Link to="/contact" className="item">Contact</Link>
            <Link to="/advertise" className="item">Advertise With Us</Link>
          </menu>
        </div>

        <div className="menu-fourth">
          <h3>Follow Us</h3>
          <menu>
            <a 
              href="https://www.facebook.com" 
              className="item" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="icon fb">
                <span title="Facebook">f</span>
              </span>
            </a>
            <a 
              href="https://www.youtube.com" 
              className="item" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="icon yt">
                <span title="YouTube">▶</span>
              </span>
            </a>
            <a 
              href="https://www.tiktok.com" 
              className="item" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="icon tk">
                <span title="TikTok">♪</span>
              </span>
            </a>
          </menu>
        </div>
      </div>

      <div className="copyrights">Operated by Pikoya</div>
      <div className="disclaimer">
        We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Roblox.
      </div>
    </footer>
  );
}

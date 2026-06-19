import React from 'react';
import { Link } from 'react-router-dom';
import { enrichGameCardData } from '../utils/exactGameData';
import '../styles/style.css';

export default function GameCard({ game }) {
  const cardGame = enrichGameCardData(game);
  const formatStat = (value) => {
    if (value === undefined || value === null || value === '') return '0';

    if (typeof value === 'string' && /[KMB]\+$/i.test(value.trim())) {
      return value;
    }

    const numericValue = typeof value === 'number'
      ? value
      : Number.parseInt(value.toString().replace(/,/g, ''), 10);

    if (Number.isNaN(numericValue)) return value.toString();
    if (numericValue >= 1000000000) return `${Math.floor(numericValue / 1000000000)}B+`;
    if (numericValue >= 1000000) return `${Math.floor(numericValue / 1000000)}M+`;
    if (numericValue >= 1000) return `${Math.floor(numericValue / 1000)}K+`;

    return numericValue.toString();
  };

  const title = cardGame.title || cardGame.name || 'Roblox Game';

  return (
    <Link to={`/game/${cardGame.id || cardGame.slug}`} className="game">
      <img loading="lazy" src={cardGame.image} title={`RobloxGo - ${title}`} alt={`RobloxGo - ${title}`} />

      <div className="details">
        <h4>{title}</h4>

        <div className="stats">
          <div className="left_stats">
            <img src="//cdn.static.pikoya.com/robloxgo/images/heart.svg" title="Favorites" alt={`${title} favorites`} />
            <label>{formatStat(cardGame.favorites)}</label>
          </div>

          <div className="right_stats">
            <img src="//cdn.static.pikoya.com/robloxgo/images/avatar.svg" title="Active Players" alt={`${title} active players`} />
            <label>{formatStat(cardGame.players)}</label>
          </div>
        </div>
      </div>
    </Link>
  );
}

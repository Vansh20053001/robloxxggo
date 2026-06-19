import React from 'react';
import GameCard from './GameCard';
import '../styles/style.css';

export default function GameGrid({ games }) {
  if (games.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>No games found.</p>
      </div>  
    );
  }

  return (
    <section className="light game-grid">
      <div className="items">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}

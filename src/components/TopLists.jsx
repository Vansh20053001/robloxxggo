import React from 'react';
import { Link } from 'react-router-dom';

const topLists = [
  { label: 'Best Trending Now Roblox Games', url: '/list/best_trending_now_games' },
  { label: 'Best Roblox Uncopylocked Games', url: '/list/best_roblox_uncopylocked_games' },
  { label: 'Best Roblox Tower Defense Games', url: '/list/best_roblox_tower_defense_games' },
  { label: 'Best Roblox Battleground Games', url: '/list/best_roblox_battleground_games' },
  { label: 'Best Roblox 2 Player Games', url: '/list/best_roblox_2_player_games' },
  { label: 'Best Roblox Airplane Games', url: '/list/best_roblox_airplane_games' },
  { label: 'Best Roblox Backrooms Games', url: '/list/best_roblox_backrooms_games' },
  { label: 'Best Roblox Sword Games', url: '/list/best_roblox_sword_games' },
  { label: 'Best Roblox Apocalypse Games', url: '/list/best_roblox_apocalypse_games' },
  { label: 'Best Roblox Fashion Games', url: '/list/best_roblox_fashion_games' },
  { label: 'Best Roblox School Games', url: '/list/best_roblox_school_games' },
  { label: 'Best Roblox Avatar Games', url: '/list/best_roblox_avatar_games' },
  { label: 'Best Roblox Escape Games', url: '/list/best_roblox_escape_games' },
  { label: 'Best Roblox Social Games', url: '/list/best_roblox_social_games' },
  { label: 'Best Roblox Prison Games', url: '/list/best_roblox_prison_games' },
  { label: 'Best Roblox Train Games', url: '/list/best_roblox_train_games' },
];

export default function TopLists() {
  return (
    <>
      <h2>Top Lists</h2>
      <div className="list">
        {topLists.map((item) => (
          <Link key={item.label} to={item.url} className="item">
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}

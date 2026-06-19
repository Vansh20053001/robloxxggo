const topCharts = [
  {
    key: 'top_100_trending_now_games',
    label: 'Top 100 Trending Now Roblox Games',
    description:
      'Daily-updated, the only place for Roblox top of the charts games! Check out Top 100 Trending Now Roblox Games on RobloxGo.com',
    route: '/top_100_trending_now_games',
  },
  {
    key: 'top_100_most_played_roblox_games',
    label: 'Top 100 Most Played Roblox Games',
    description:
      "Check out Roblox's all-time hit games! With millions of players and upvotes, sort through Roblox top-of-the-charts games and pick your favorite games.",
  },
  {
    key: 'top_100_players_favorite_roblox_games',
    label: 'Top 100 Players Favorite Roblox Games',
    description:
      "Discover Roblox's most beloved games and the community favorites ranked by player popularity on RobloxGo.",
  },
  {
    key: 'top_100_roblox_uncopylocked_games',
    label: 'Top 100 Roblox Uncopylocked Games',
    description:
      'Browse the top Roblox games that are uncopylocked for more open access play.',
  },
  {
    key: 'top_100_roblox_rng_games',
    label: 'Top 100 Roblox Rng Games',
    description:
      'Play the top Roblox RNG games with unpredictable loot and random rewards.',
  },
  {
    key: 'top_100_roblox_tower_defense_games',
    label: 'Top 100 Roblox Tower Defense Games',
    description:
      'Defend your base with the best Roblox Tower Defense games from the Top 100 chart.',
  },
  {
    key: 'top_100_roblox_battleground_games',
    label: 'Top 100 Roblox Battleground Games',
    description:
      'Battle it out in the top Roblox battleground games with action-packed multiplayer combat.',
  },
  {
    key: 'top_100_roblox_sus_games',
    label: 'Top 100 Roblox Sus Games',
    description:
      'Find the top Roblox SUS games, where mystery and betrayal run wild.',
  },
  {
    key: 'top_100_roblox_casino_games',
    label: 'Top 100 Roblox Casino Games',
    description:
      'Explore the top Roblox casino-style games with exciting slots, card games and gambling fun.',
  },
  {
    key: 'top_100_roblox_medieval_games',
    label: 'Top 100 Roblox Medieval Games',
    description:
      'Explore the top Roblox medieval games with castles, knights, quests and adventure.',
  },
  {
    key: 'top_100_roblox_2_player_games',
    label: 'Top 100 Roblox 2 Player Games',
    description:
      'Play the best Roblox games for two players, perfect for cooperative or competitive duos.',
  },
];

export const getChartUrl = (key) => {
  const chart = topCharts.find((item) => item.key === key);
  return chart?.route || `/chart?chart=${encodeURIComponent(key)}`;
};

export default topCharts;

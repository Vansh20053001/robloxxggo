import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import NotFound from '../components/NotFound';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import exactGames from '../data/robloxgo_exact_details.json';
import gameCodeDetails from '../data/game_codes_details.json';
import '../styles/style.css';

const nameToSlug = (name = '') => (
  String(name)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
);

const getSlugFromUrl = (url = '') => {
  const parts = String(url).split('/').filter(Boolean);
  const gameIndex = parts.findIndex((part) => part === 'game');
  const gameSlug = gameIndex >= 0 ? parts[gameIndex + 2] : parts[parts.length - 1];
  return gameSlug ? nameToSlug(decodeURIComponent(gameSlug)) : '';
};

const parseCount = (value = '') => Number(String(value).replace(/[^\d]/g, '')) || 0;

const getCodePath = (game) => `/game/${game.game_id}/roblox-game-codes`;

const getRobloxPath = (game) => `/game/${game.game_id}`;

const getRank = (game, key) => {
  const ranked = exactGames
    .filter((item) => item?.success && parseCount(item[key]) > 0)
    .sort((a, b) => parseCount(b[key]) - parseCount(a[key]));
  const index = ranked.findIndex((item) => String(item.game_id) === String(game.game_id));
  return index >= 0 ? `#${(index + 1).toLocaleString()}` : 'N/A';
};

const codeGames = exactGames.filter((item) => item?.success && item.get_code_url);

const findGame = (gameSlug = '') => {
  const normalizedSlug = nameToSlug(gameSlug);

  return codeGames.find((item) => (
    String(item.game_id) === String(gameSlug) ||
    nameToSlug(item.name) === normalizedSlug ||
    getSlugFromUrl(item.url) === normalizedSlug ||
    getSlugFromUrl(item.get_code_url) === normalizedSlug
  ));
};

const getScrapedCodeDetails = (game) => (
  gameCodeDetails.find((item) => String(item.game_id) === String(game.game_id)) || {
    active_codes: [],
    expired_codes: [],
  }
);

const getCodeValue = (item) => item.code || item.Code || item.value || '';

const getRewardValue = (item) => {
  const reward = item.reward || item.Reward || item.description || '';
  return String(reward).replace(/^\s*-\s*/, '');
};

const StatItem = ({ icon, label, value }) => (
  <div className="item">
    <div className="icon">
      <img src={`//cdn.static.pikoya.com/robloxgo/images/${icon}.svg`} title={label} alt={label} />
    </div>
    <div className="details">
      <h4>{label}</h4>
      <span className="input">{value || 'N/A'}</span>
    </div>
  </div>
);

const ActiveCodeLine = ({ item }) => {
  const code = getCodeValue(item);
  const reward = getRewardValue(item);

  return (
  <li>
    <b className="color-green">{code}</b>
    {reward ? ` - ${reward}` : ''}
  </li>
  );
};

const ExpiredCodesLine = ({ codes }) => (
  <p>
    <br />
    {codes.map((item, index) => (
      <React.Fragment key={`${getCodeValue(item)}-${index}`}>
        {index > 0 ? ' | ' : ''}
        <span className="color-red">❌</span> {getCodeValue(item)}
      </React.Fragment>
    ))}
    <br />
  </p>
);

const MoreCodePost = ({ game }) => (
  <div className="post">
    <Link to={getCodePath(game)}>
      <img
        loading="lazy"
        src={game.image || '/api/placeholder/400/300'}
        title={`RobloxGo - ${game.name} Codes June 2026`}
        alt={`RobloxGo - ${game.name} Codes June 2026`}
      />
    </Link>
    <div className="details">
      <h2>
        <Link to={getCodePath(game)}>{`RobloxGo - ${game.name} Codes June 2026 - All Active & Expired Codes`}</Link>
      </h2>
      <div className="short">
        Grab the latest {game.name} codes for June 2026, including active rewards, expired codes, and redemption tips.
      </div>
      <Link to={getCodePath(game)} className="button">Read more</Link>
    </div>
  </div>
);

export default function CodeDetails() {
  const { gameSlug } = useParams();
  const game = findGame(gameSlug);

  if (!game) {
    return (
      <Layout>
        <NotFound
          title="Codes Not Found"
          message="The Roblox codes page you are looking for is not available in our database."
        />
      </Layout>
    );
  }

  const scrapedCodes = getScrapedCodeDetails(game);
  const activeCodes = scrapedCodes.active_codes || [];
  const expiredCodes = scrapedCodes.expired_codes || [];
  const moreGames = codeGames.filter((item) => String(item.game_id) !== String(game.game_id)).slice(0, 5);
  const robloxUrl = `https://roblox.com/games/${game.game_id}`;

  return (
    <Layout>
      <section className="bnr_970">
        <center />
      </section>
      <span className="push">
        <span className="circle_border">
          <span className="circle">
            <img loading="lazy" src="https://cdn.nichesites.pikoya.com/general/images/alarm" title="Alarm" alt="Roblox Strategy Hub: Stats, Videos & Power Tips" className="mobile" />
          </span>
        </span>
      </span>

      <div className="content">
        <div className="main">
          <div className="post_content">
            <div className="content">
              <h1>{`${game.name} Codes June 2026 - All Active & Expired Codes`}</h1>
              <p className="short">
                Welcome to our <a href={robloxUrl} target="_blank" rel="noreferrer">{game.name}</a> codes guide. Use this page to check active codes, expired codes, and the safest ways to redeem rewards in-game.
              </p>

              <div className="image" style={{ marginBottom: '24px' }}>
                <img src={game.image || '/api/placeholder/768/432'} title={`${game.name} Codes`} alt={`${game.name} Codes`} />
              </div>

              <h3>{`Active ${game.name} Codes`}</h3>
              {activeCodes.length > 0 ? (
                <ul>
                  {activeCodes.map((item, index) => (
                    <ActiveCodeLine key={`${getCodeValue(item)}-${index}`} item={item} />
                  ))}
                </ul>
              ) : (
                <p>No active codes are listed for {game.name} right now. Check back soon for fresh rewards and updates.</p>
              )}

              <h3>{`Expired ${game.name} Codes`}</h3>
              {expiredCodes.length > 0 ? (
                <ExpiredCodesLine codes={expiredCodes} />
              ) : (
                <p>No expired codes are listed yet for {game.name}.</p>
              )}

              <h3>{`How to Redeem ${game.name} Codes`}</h3>
              <ol>
                <li>Launch {game.name} on Roblox.</li>
                <li>Open the in-game codes, shop, rewards, or settings menu.</li>
                <li>Copy one active code from this page.</li>
                <li>Paste it into the code box and press redeem or enter.</li>
                <li>If a code fails, check spelling and try another active code.</li>
              </ol>

              <h3>{`Where to Find New ${game.name} Codes`}</h3>
              <ul>
                <li>Follow the creator, {game.created_by || 'the developer'}, for official updates.</li>
                <li>Watch for update logs, milestones, events, and seasonal reward drops.</li>
                <li>Bookmark this RobloxGo page for an easy monthly codes check.</li>
              </ul>
            </div>
          </div>

          <section className="bnr_728">
            <center />
          </section>

          <section>
            <div className="head">
              <h2><Link to="/roblox-game-codes">More Roblox Game Codes</Link></h2>
              <Link to="/roblox-game-codes" className="small_link">See all</Link>
            </div>
            <div className="items">
              {moreGames.map((item) => (
                <MoreCodePost key={item.game_id} game={item} />
              ))}
            </div>
          </section>
        </div>

        <div className="sidebar">
          <div className="bnr_250">
            <center />
          </div>

          <TopCharts />
          <TopLists />


          <div className="block">
            <Link className="button" to={getRobloxPath(game)}>Game Details</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

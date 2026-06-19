import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import NotFound from '../components/NotFound';
import GameCard from '../components/GameCard';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import developers from '../data/developers.json';
import '../styles/style.css';

const nameToSlug = (name = '') => (
  String(name)
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
);

const getDeveloperIdFromUrl = (url = '') => {
  const match = String(url).match(/\/developer\/([^/]+)/);
  return match ? match[1] : '';
};

const getDeveloperId = (developer, index = 0) => (
  getDeveloperIdFromUrl(developer.pageUrl) ||
  developer.id ||
  developer.developer_id ||
  developer.creator_id ||
  developer.user_id ||
  index + 1
);

const getDeveloperName = (developer = {}) => (
  developer.developerName ||
  developer.name ||
  developer.developer_name ||
  developer.creator_name ||
  developer.username ||
  'Roblox Creator'
);

const findDeveloper = (id = '', developerSlug = '') => {
  const normalizedSlug = String(developerSlug || '').toLowerCase();

  return developers.find((developer, index) => {
    const developerId = String(getDeveloperId(developer, index));
    const slug = nameToSlug(getDeveloperName(developer)).toLowerCase();

    return developerId === String(id) || (normalizedSlug && slug === normalizedSlug);
  });
};

const getGameIdFromUrl = (url = '') => {
  const match = String(url).match(/\/game\/(\d+)/);
  return match ? match[1] : '';
};

const getGameSlugFromUrl = (url = '') => {
  const parts = String(url).split('/').filter(Boolean);
  return parts.length ? parts[parts.length - 1] : '';
};

const toCreationGameCard = (creation = {}) => {
  const gameId = creation.gameId || getGameIdFromUrl(creation.gameUrl);
  const title = creation.gameName || creation.name || 'Roblox Game';

  return {
    id: gameId || title,
    slug: gameId || getGameSlugFromUrl(creation.gameUrl) || nameToSlug(title),
    title,
    image: creation.imageUrl || creation.image || '/api/placeholder/300/300',
    favorites: creation.favorites || '0',
    players: creation.activePlayers || '0',
    activePlayers: creation.activePlayers || '0',
  };
};

const StatItem = ({ label, value }) => (
  <div className="item">
    <div className="details">
      <h4>{label}</h4>
      <div className="input">{value || '0'}</div>
    </div>
  </div>
);

export default function DeveloperDetails() {
  const { id, developerSlug } = useParams();
  const developer = findDeveloper(id, developerSlug);

  if (!developer) {
    return (
      <Layout>
        <NotFound
          title="Developer Not Found"
          message="The developer you are looking for does not exist in our database."
        />
      </Layout>
    );
  }

  const name = getDeveloperName(developer);
  const stats = developer.stats || {};
  const creations = Array.isArray(developer.creations) ? developer.creations : [];

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
      <div className="content developer">
        <div className="main">
          <div className="block">
            <div className="top">
              <img
                className="prof-pic"
                src={developer.profileImage || developer.image || '/api/placeholder/300/300'}
                title={name}
                alt={name}
                style={{ width: '160px', height: '160px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <div>
                <h1 className="dev-name">{name}</h1>
                {developer.about ? (
                  <p className="about">{developer.about}</p>
                ) : (
                  <p className="about">No developer bio is available yet.</p>
                )}
              </div>
            </div>

            <div className="game_details">
              <StatItem label="Friends" value={stats.friends} />
              <StatItem label="Followers" value={stats.followers} />
              <StatItem label="Following" value={stats.following} />
              <StatItem label="Date Joined" value={stats.dateJoined} />
            </div>
          </div>

          <section className="collection">
            <div className="head">
              <h2>{name}'s Creations</h2>
            </div>
            <div className="items">
              {creations.map((creation) => (
                <GameCard key={creation.gameId || creation.gameName} game={toCreationGameCard(creation)} />
              ))}
            </div>
          </section>

          {creations.length === 0 && (
            <div className="block">
              <p>This developer does not have any listed creations yet.</p>
            </div>
          )}
        </div>

        <div className="sidebar">
          <div className="bnr_250">
            <center />
          </div>

          <TopCharts />
          <TopLists />
        </div>
      </div>
    </Layout>
  );
}

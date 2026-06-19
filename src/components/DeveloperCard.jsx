import React from 'react';
import { Link } from 'react-router-dom';
import { formatNumber } from '../utils/helpers';
import '../styles/style.css';

export default function DeveloperCard({ developer }) {
  return (
    <Link to={`/developer/${developer.id}`} style={{ textDecoration: 'none' }}>
      <div className="game" style={{ backgroundColor: '#313742', display: 'flex', flexDirection: 'column' }}>
        <img src={developer.image} alt={developer.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />

        <div className="details" style={{ padding: '12px' }}>
          <h4 style={{ marginBottom: '8px' }}>
            {developer.name}
            {developer.verified && <span style={{ color: 'var(--green)', marginLeft: '4px' }}>✓</span>}
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--light-grey)', marginBottom: '12px' }}>
            {developer.description.substring(0, 50)}...
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--accent2)' }}>{formatNumber(developer.followers)}</div>
              <div style={{ color: 'var(--light-grey)', fontSize: '10px' }}>Followers</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--accent2)' }}>{developer.games.length}</div>
              <div style={{ color: 'var(--light-grey)', fontSize: '10px' }}>Games</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

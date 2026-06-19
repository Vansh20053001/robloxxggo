import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

export default function NotFound({ title = '404 - Not Found', message = 'The page you are looking for does not exist.' }) {
  return (
    <div className="page_error" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
      <section style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '72px', marginBottom: '24px' }}>🔍</div>
        <h1 style={{ fontSize: '32px', marginBottom: '12px', color: 'var(--white)' }}>{title}</h1>
        <p style={{ fontSize: '16px', color: 'var(--light-grey)', marginBottom: '24px' }}>{message}</p>
        <Link to="/" className="small_link">
          ← Back to Home
        </Link>
      </section>
    </div>
  );
}

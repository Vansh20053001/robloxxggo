import React from 'react';
import { Link } from 'react-router-dom';
import topCharts, { getChartUrl } from '../data/topCharts';

export default function TopCharts() {
  return (
    <>
      <h2>Top Charts</h2>
      <div className="list">
        {topCharts.map((item) => (
          <Link key={item.key} to={getChartUrl(item.key)} className="item">
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}

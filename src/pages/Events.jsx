import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import events from '../data/event_details.json';
import { getTotalPages, paginateArray } from '../utils/helpers';
import '../styles/style.css';

const nameToSlug = (name = '') => (
  String(name)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
);

const parseEventDate = (value = '') => {
  const timestamp = Date.parse(`${value}, 2026`);
  return Number.isNaN(timestamp) ? null : new Date(timestamp);
};

const getEventStatus = (event) => {
  const startDate = parseEventDate(event.start_time);
  const endDate = parseEventDate(event.end_time);
  const now = new Date();

  if (startDate && now < startDate) return { label: 'Upcoming', className: 'orange' };
  if (startDate && endDate && now >= startDate && now <= endDate) return { label: 'Live Now', className: 'green' };
  return { label: 'Expired', className: 'red' };
};

const getEventPath = (event) => `/game/${event.game_id}/events/${event.event_id}/${nameToSlug(event.event_name)}`;

export default function Events() {
  const { page } = useParams();
  const itemsPerPage = 6;
  const totalPages = getTotalPages(events.length, itemsPerPage);
  const requestedPage = Number(page) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages || 1);
  const paginatedEvents = paginateArray(events, currentPage, itemsPerPage);

  const formatDescription = (description) => {
    if (!description) return '';
    return description.length > 120 ? `${description.slice(0, 120).trim()}...` : description;
  };

  return (
    <Layout>
      <section className="bnr_970">
        <center>
        </center>
      </section>
      <span className="push">
        <span className="circle_border">
          <span className="circle">
            <img loading="lazy" src="https://cdn.nichesites.pikoya.com/general/images/alarm" title="Alarm" alt="Roblox Strategy Hub: Stats, Videos &amp; Power Tips" className="mobile" />
          </span>
        </span>
      </span>
      <div className="wrap" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="main" style={{ flex: '1 1 0', minWidth: '0' }}>
          <h1 className="page-title" style={{ width: '100%' }}>
            Roblox Games Events (June 2026)
          </h1>
          <span className="head-text">
            Find live and upcoming events happening inside Roblox games 🎮<br />
            Jump into limited-time challenges, special in-game moments, and awesome rewards. This page is updated daily, so there's always something new to check out! ✨
          </span>

          <div className="head" />

          <div className="items">
            {paginatedEvents.map((event) => {
              const status = getEventStatus(event);

              return (
                <div className="post" key={event.event_id}>
                  <Link to={getEventPath(event)} className="post-image">
                    <div className="label">Event</div>
                    <div className={`label right ${status.className}`}>{status.label}</div>
                    <img
                      src={event.event_image}
                      title={event.event_name}
                      alt={event.event_name}
                    />
                  </Link>

                  <div className="details">
                    <h2>
                      <Link to={getEventPath(event)}>{event.event_name}</Link>
                    </h2>
                    <h3>{event.event_subtitle}</h3>
                    <span className="input">
                      {event.start_time} - {event.end_time}
                    </span>
                    <div className="flex">
                      <div className="short">
                        {formatDescription(event.description)}
                      </div>
                      <Link to={getEventPath(event)} className="button">
                        Event Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <ListPagination basePath="/events" currentPage={currentPage} totalPages={totalPages} />
        </div>

        <div className="sidebar" style={{ flex: '0 0 300px' }}>
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

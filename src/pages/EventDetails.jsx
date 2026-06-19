import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import NotFound from '../components/NotFound';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import exactGames from '../data/robloxgo_exact_details.json';
import eventDetails from '../data/event_details.json';
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
  return parts.length ? nameToSlug(decodeURIComponent(parts[parts.length - 1])) : '';
};

const getEventId = (url = '') => {
  const match = String(url).match(/\/events\/(\d+)/);
  return match ? match[1] : '';
};

const getEventPath = (game, event) => {
  const eventId = event.event_id || getEventId(event.event_url);
  const eventSlug = nameToSlug(event.event_name);
  return `/game/${game.game_id}/events/${eventId}/${eventSlug}`;
};

const parseEventDate = (value = '') => {
  const timestamp = Date.parse(`${value}, 2026`);
  return Number.isNaN(timestamp) ? null : new Date(timestamp);
};

const getStatusMeta = (status = '', event = {}) => {
  const normalized = status.toLowerCase();

  if (normalized === 'live') {
    return { label: 'Live', className: 'live', tagClass: 'green' };
  }

  if (normalized.includes('start') || normalized.includes('upcoming')) {
    return { label: 'Upcoming', className: 'orange', tagClass: 'orange' };
  }

  if (event.start_time || event.end_time) {
    const startDate = parseEventDate(event.start_time);
    const endDate = parseEventDate(event.end_time);
    const now = new Date();

    if (startDate && now < startDate) {
      return { label: 'Upcoming', className: 'orange', tagClass: 'orange' };
    }

    if (startDate && endDate && now >= startDate && now <= endDate) {
      return { label: 'Live', className: 'live', tagClass: 'green' };
    }

    if (endDate && now > endDate) {
      return { label: 'Expired', className: 'red', tagClass: 'blue' };
    }
  }

  return { label: 'Expired', className: 'red', tagClass: 'blue' };
};

const getExactEvent = (game, eventId) => (
  game?.events?.find((item) => getEventId(item.event_url) === eventId) || null
);

const EventPost = ({ game, event }) => {
  const exactEvent = getExactEvent(game, event.event_id);
  const status = getStatusMeta(exactEvent?.event_status, event);

  return (
    <div className="post">
      <Link to={getEventPath(game, event)} className="post-image">
        <div className="label">New Content</div>
        <div className={`label right ${status.className}`}>{status.label}</div>
        <img src={event.event_image} title={event.event_name} alt={event.event_name} />
      </Link>
      <div className="details">
        <h2>
          <Link to={getEventPath(game, event)}>{event.event_name}</Link>
        </h2>
        <h3>{event.event_subtitle}</h3>
        <span className="input">
          {event.start_time} - {event.end_time}
        </span>
        <div className="flex">
          <div className="short">{event.description || event.event_subtitle}</div>
          <Link to={getEventPath(game, event)} className="button">
            Event Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function EventDetails() {
  const { gameSlug, eventId } = useParams();
  const normalizedGameSlug = nameToSlug(gameSlug);
  const event = eventDetails.find((item) => String(item.event_id) === eventId);
  const game = exactGames.find((item) => (
    item?.success &&
    item.name &&
    (
      String(item.game_id) === String(event?.game_id || gameSlug) ||
      String(item.game_id) === gameSlug ||
      nameToSlug(item.name) === normalizedGameSlug ||
      getSlugFromUrl(item.url) === normalizedGameSlug
    )
  ));

  if (!game || !event) {
    return (
      <Layout>
        <NotFound
          title="Event Not Found"
          message="The Roblox event you are looking for is not available in our database."
        />
      </Layout>
    );
  }

  const exactEvent = getExactEvent(game, event.event_id);
  const status = getStatusMeta(exactEvent?.event_status, event);
  const gamePath = `/game/${game.game_id}`;
  const otherEvents = eventDetails.filter((item) => String(item.game_id) === String(game.game_id) && String(item.event_id) !== String(eventId));
  const upcomingEvents = otherEvents.filter((item) => {
    const itemStatus = getStatusMeta(getExactEvent(game, item.event_id)?.event_status, item).label;
    return itemStatus === 'Live' || itemStatus === 'Upcoming';
  });
  const pastEvents = otherEvents.filter((item) => !upcomingEvents.includes(item));

  return (
    <Layout>
      <section className="bnr_970">
        <center />
      </section>
      <span class="push">
        <span class="circle_border">
          <span class="circle">
            <img loading="lazy" src="https://cdn.nichesites.pikoya.com/general/images/alarm" title="Alarm" alt="Roblox Strategy Hub: Stats, Videos &amp; Power Tips" class="mobile" />
          </span>
        </span>
      </span>
      <h1 className="page-title" style={{ width: '100%' }}>
        {event.event_name}
      </h1>

      <div className="wrap game_page" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="main" style={{ flex: '1 1 0', minWidth: '0' }}>
          <h2>
            <Link to={gamePath} className="blue"> {game.name} </Link>
          </h2>

          <div className="image">
            <div className="label">New Content</div>
            <div className={`label right ${status.className}`}>{status.label}</div>
            <img
              alt={`${event.event_name} Events | RobloxGo`}
              title={`${event.event_name} Events | RobloxGo`}
              src={event.event_image}
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <h3>{event.event_subtitle}</h3>

          <div className="info">
            {event.start_time} - {event.end_time}
          </div>

          <span className="head-text">
            {event.description || event.event_subtitle || `Stay up to date with ${event.event_name}.`}
          </span>

          {upcomingEvents.length > 0 && (
            <>
              <div className="head">
                <h2>
                  <Link to={gamePath}>{game.name}</Link> <span className={`tag ${status.tagClass}`}>Upcoming Events</span>
                </h2>
              </div>
              <div className="items">
                {upcomingEvents.slice(0, 3).map((item) => (
                  <EventPost key={getEventId(item.event_url)} game={game} event={item} />
                ))}
              </div>
            </>
          )}

          {pastEvents.length > 0 && (
            <>
              <div className="head">
                <h2>
                  <Link to={gamePath}>{game.name}</Link> <span className="tag blue">Past Events</span>
                </h2>
              </div>
              <div className="items">
                {pastEvents.slice(0, 6).map((item) => (
                  <EventPost key={getEventId(item.event_url)} game={game} event={item} />
                ))}
              </div>
            </>
          )}

          <div className="block">
            <div className="flex between">
              <p>
                <b>Get the latest {game.name} codes and rewards - updated June 2026!</b>
              </p>
              <Link className="button med" to={`/game/${game.game_id}/roblox-game-codes`}>
                Get Code
              </Link>
            </div>
          </div>
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

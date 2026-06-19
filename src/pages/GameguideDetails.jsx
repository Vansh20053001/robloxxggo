import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import NotFound from '../components/NotFound';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import gameguideData from '../data/game_guides_with_faq_success.json';
import exactGames from '../data/robloxgo_exact_details.json';
import { cleanRobloxGoLinks } from '../utils/robloxGoLinks';
import '../styles/style.css';

const gameguides = Array.isArray(gameguideData) ? gameguideData : [];
const validGames = exactGames.filter((item) => item?.success && item.game_id);
const gamesById = new Map(validGames.map((game) => [String(game.game_id), game]));

const nameToSlug = (name = '') => (
  String(name)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
);

const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const getGameIdFromUrl = (url = '') => {
  const match = String(url).match(/\/game\/(\d+)/);
  return match ? match[1] : '';
};

const getGameIdFromGuide = (gameguide = {}) => getGameIdFromUrl(gameguide.pageUrl || gameguide.url || '');

const getGameguideTitle = (gameguide = {}) => gameguide.title || 'Roblox Game Guide';

const getGameguideSlug = (gameguide = {}) => {
  const sourceUrl = gameguide.pageUrl || gameguide.details_url || gameguide.url || '';
  const sourceSlug = sourceUrl.split('/').filter(Boolean).pop();
  return sourceSlug || gameguide.slug || nameToSlug(getGameguideTitle(gameguide));
};

const getGameguidePath = (gameguide) => {
  const gameId = getGameIdFromGuide(gameguide);
  const slug = getGameguideSlug(gameguide);
  return gameId ? `/game/${gameId}/guide/${slug}` : `/gameguide/${slug}`;
};

const getGameguideSubtitle = (gameguide = {}) => {
  if (gameguide.contentText) {
    return gameguide.contentText.split(/\s+/).slice(0, 42).join(' ');
  }

  return stripHtml(gameguide.contentHtml).split(/\s+/).slice(0, 42).join(' ');
};

const getGameguideImage = (gameguide = {}) => {
  const exactGame = gamesById.get(String(getGameIdFromGuide(gameguide)));
  return exactGame?.image || gameguide.image || '/api/placeholder/768/432';
};

const getGameguideImageAlt = (gameguide) => `${getGameguideTitle(gameguide)} - Roblox Strategy Hub: Stats, Videos & Power Tips`;

const getGameguideHtml = (gameguide) => {
  const html = gameguide.contentHtml || gameguide.content_html || gameguide.body_html || gameguide.content || '';

  if (!html) return '';

  if (typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const content = doc.querySelector('.post_content > .content');

    if (content) {
      content.querySelector('h1')?.remove();
      content.querySelectorAll('.autors-widget').forEach((item) => item.remove());
      cleanRobloxGoLinks(content);
      return content.innerHTML;
    }

    cleanRobloxGoLinks(doc.body);
    return doc.body.innerHTML;
  }

  return html;
};

const findGameguide = (gameguideSlug = '') => {
  const normalizedSlug = nameToSlug(gameguideSlug);

  return gameguides.find((gameguide) => (
    String(getGameguideSlug(gameguide)) === String(gameguideSlug) ||
    nameToSlug(getGameguideSlug(gameguide)) === normalizedSlug ||
    nameToSlug(getGameguideTitle(gameguide)) === normalizedSlug
  ));
};

const GameguideBody = ({ gameguide }) => {
  const html = getGameguideHtml(gameguide);

  if (html) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return <p>{gameguide.contentText || getGameguideSubtitle(gameguide)}</p>;
};

const MoreGameguidePost = ({ gameguide }) => {
  const title = getGameguideTitle(gameguide);

  return (
    <div className="post">
      <Link to={getGameguidePath(gameguide)}>
        <img
          loading="lazy"
          src={getGameguideImage(gameguide)}
          title={title}
          alt={getGameguideImageAlt(gameguide)}
        />
      </Link>
      <div className="details">
        <h2>
          <Link to={getGameguidePath(gameguide)}>{title}</Link>
        </h2>
        <div className="short">
          {getGameguideSubtitle(gameguide)}
        </div>
        <Link to={getGameguidePath(gameguide)} className="button">Read more</Link>
      </div>
    </div>
  );
};

const GameguideCodeBlock = ({ game }) => {
  if (!game?.get_code_url) return null;

  return (
    <div className="block">
      <div className="flex between">
        <p>
          <b>
            Get the latest {game.name} codes and rewards - updated June 2026!
          </b>
        </p>
        <Link className="button med" to={`/game/${game.game_id}/roblox-game-codes`}>
          Get Code
        </Link>
      </div>
    </div>
  );
};

const cleanFaqAnswer = (faq, allFaqs = [], index = 0) => {
  let answer = String(faq.fullAnswer || faq.shortAnswer || '').replace(/\s+/g, ' ').trim();
  const question = String(faq.question || '').replace(/\s+/g, ' ').trim();

  if (!answer) return '';

  if (question) {
    const questionIndex = answer.indexOf(question);
    if (questionIndex >= 0) {
      answer = answer.slice(questionIndex + question.length).trim();
    }
  }

  const otherQuestions = allFaqs
    .filter((_, faqIndex) => faqIndex !== index)
    .map((item) => String(item.question || '').replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const stopMarkers = [
    ...otherQuestions,
    'Similar Games to',
    'Similar Games',
    'Rating',
    'Top Charts',
    'Top Lists',
  ];

  const lowerAnswer = answer.toLowerCase();
  const stopIndex = stopMarkers.reduce((nearest, marker) => {
    const markerIndex = lowerAnswer.indexOf(marker.toLowerCase());
    if (markerIndex <= 0) return nearest;
    return nearest === -1 ? markerIndex : Math.min(nearest, markerIndex);
  }, -1);

  if (stopIndex > -1) {
    answer = answer.slice(0, stopIndex).trim();
  }

  return answer
    .replace(/\s*\.{3,}\s*Show more\s*$/i, '')
    .replace(/\s*Show more\s*$/i, '')
    .replace(/\s*\.{3,}\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const GameguideFaq = ({ gameguide, game }) => {
  const faqs = Array.isArray(gameguide.faqs) ? gameguide.faqs.filter((faq) => faq.question) : [];

  if (!faqs.length) return null;

  return (
    <div className="game_faq">
      <h3 className="faq_title">Frequently Asked Questions about {game?.name || getGameguideTitle(gameguide)}</h3>
      <div className="tabs">
        {faqs.map((faq, index) => {
          const inputId = `gameguide-faq-${index + 1}`;
          const answer = cleanFaqAnswer(faq, faqs, index);

          return (
            <div className="tab" key={`${faq.question}-${index}`}>
              <input id={inputId} type="checkbox" />
              <label className="tab-label" htmlFor={inputId}>{faq.question}</label>
              <div className="tab-content">
                <p>{answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function GameguideDetails() {
  const { gameId, gameguideSlug } = useParams();
  const gameguide = gameId
    ? gameguides.find((item) => String(getGameIdFromGuide(item)) === String(gameId) && (!gameguideSlug || getGameguideSlug(item) === gameguideSlug)) ||
      gameguides.find((item) => String(getGameIdFromGuide(item)) === String(gameId)) ||
      findGameguide(gameguideSlug)
    : findGameguide(gameguideSlug);

  if (!gameguide) {
    return (
      <Layout>
        <NotFound
          title="Game Guide Not Found"
          message="The Roblox game guide you are looking for is not available in our database."
        />
      </Layout>
    );
  }

  const title = getGameguideTitle(gameguide);
  const subtitle = getGameguideSubtitle(gameguide);
  const localGame = gamesById.get(String(getGameIdFromGuide(gameguide)));
  const moreGameguides = gameguides.filter((item) => getGameguideSlug(item) !== getGameguideSlug(gameguide)).slice(0, 6);

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

      <div className="content content_page">
        <div className="main">
          <div className="post_content">
            <div className="content">
              <h1>{title}</h1>
              {subtitle && (
                <div className="short">
                  {subtitle}
                </div>
              )}
              <GameguideBody gameguide={gameguide} />
            </div>
          </div>

          <section className="bnr_728">
            <center />
          </section>

          <GameguideCodeBlock game={localGame} />
          <GameguideFaq gameguide={gameguide} game={localGame} />

          <section>
            <div className="head">
              <h2><Link to="/gameguides">More Game Guides</Link></h2>
              <Link to="/gameguides" className="small_link">See all</Link>
            </div>
            <div className="items">
              {moreGameguides.map((item) => (
                <MoreGameguidePost key={getGameguideSlug(item)} gameguide={item} />
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
        </div>
      </div>
    </Layout>
  );
}

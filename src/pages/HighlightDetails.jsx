import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import NotFound from '../components/NotFound';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import highlightDetails from '../data/highlight_details.json';
import { cleanRobloxGoLinks } from '../utils/robloxGoLinks';
import '../styles/style.css';

const highlights = Array.isArray(highlightDetails) ? highlightDetails : [];

const nameToSlug = (name = '') => (
  String(name)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
);

const getHighlightTitle = (highlight) => highlight.title || highlight.highlight_title || highlight.name || 'Roblox Highlight';
const getHighlightSubtitle = (highlight) => highlight.short_description || highlight.subtitle || highlight.highlight_subtitle || highlight.excerpt || highlight.summary || '';
const getHighlightImage = (highlight) => highlight.detail_image || highlight.hero_image || highlight.image || highlight.highlight_image || highlight.thumbnail || '/api/placeholder/768/432';
const getHighlightInfo = (highlight) => highlight.info || `${highlight.date || highlight.published_at || highlight.updated_at || 'June 2026'} by ${highlight.author || highlight.writer || 'RobloxGo'}`;
const getHighlightImageTitle = (highlight) => highlight.image_title || getHighlightTitle(highlight);
const getHighlightImageAlt = (highlight) => highlight.image_alt || `${getHighlightTitle(highlight)} - Roblox Strategy Hub: Stats, Videos & Power Tips`;

const getHighlightSlug = (highlight) => {
  const sourceUrl = highlight.details_url || highlight.url || '';
  const sourceSlug = sourceUrl.split('/').filter(Boolean).pop();
  return sourceSlug || highlight.slug || highlight.highlight_slug || highlight.highlight_id || highlight.id || nameToSlug(getHighlightTitle(highlight));
};

const getHighlightPath = (highlight) => `/highlight/${getHighlightSlug(highlight)}`;

const findHighlight = (highlightSlug = '') => {
  const normalizedSlug = nameToSlug(highlightSlug);

  return highlights.find((highlight) => (
    String(getHighlightSlug(highlight)) === String(highlightSlug) ||
    nameToSlug(getHighlightSlug(highlight)) === normalizedSlug ||
    nameToSlug(getHighlightTitle(highlight)) === normalizedSlug
  ));
};

const getHighlightHtml = (highlight) => {
  const html = highlight.content_html || highlight.body_html || highlight.details_html || highlight.content || highlight.body || highlight.details || '';

  if (!html) return '';

  if (typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const content = doc.querySelector('.post_content > .content');

    if (content) {
      content.querySelector('.short')?.remove();
      content.querySelectorAll('.autors-widget').forEach((item) => item.remove());
      cleanRobloxGoLinks(content);
      return content.innerHTML;
    }

    cleanRobloxGoLinks(doc.body);
    return doc.body.innerHTML;
  }

  const contentMatch = html.match(/<div class="content">\s*<div class="short">[\s\S]*?<\/div>([\s\S]*?)<\/div>\s*<\/div>/);
  return contentMatch ? contentMatch[1] : html;
};

const HighlightBody = ({ highlight }) => {
  const html = getHighlightHtml(highlight);
  const sections = highlight.sections || highlight.article || [];

  if (html) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  if (Array.isArray(sections) && sections.length > 0) {
    return (
      <>
        {sections.map((section, index) => (
          <React.Fragment key={`${section.heading || section.title || 'section'}-${index}`}>
            {(section.heading || section.title) && <h3>{section.heading || section.title}</h3>}
            {section.image && (
              <p>
                <img src={section.image} title={section.heading || section.title || getHighlightTitle(highlight)} alt={section.heading || section.title || getHighlightTitle(highlight)} />
              </p>
            )}
            {section.text && <p>{section.text}</p>}
            {Array.isArray(section.paragraphs) && section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={`${paragraph.slice(0, 24)}-${paragraphIndex}`}>{paragraph}</p>
            ))}
          </React.Fragment>
        ))}
      </>
    );
  }

  return (
    <p>
      More details for this highlight will be added soon.
    </p>
  );
};

const MoreHighlightPost = ({ highlight }) => {
  const title = getHighlightTitle(highlight);

  return (
    <div className="post">
      <Link to={getHighlightPath(highlight)}>
        <img
          loading="lazy"
          src={getHighlightImage(highlight)}
          title={title}
          alt={getHighlightImageAlt(highlight)}
        />
      </Link>
      <div className="details">
        <h2>
          <Link to={getHighlightPath(highlight)}>{title}</Link>
        </h2>
        <div className="short">
          {getHighlightSubtitle(highlight)}
        </div>
        <Link to={getHighlightPath(highlight)} className="button">Read more</Link>
      </div>
    </div>
  );
};

export default function HighlightDetails() {
  const { highlightSlug } = useParams();
  const highlight = findHighlight(highlightSlug);

  if (!highlight) {
    return (
      <Layout>
        <NotFound
          title="Highlight Not Found"
          message="The Roblox highlight you are looking for is not available in our database."
        />
      </Layout>
    );
  }

  const title = getHighlightTitle(highlight);
  const subtitle = getHighlightSubtitle(highlight);
  const moreHighlights = highlights.filter((item) => getHighlightSlug(item) !== getHighlightSlug(highlight)).slice(0, 4);

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
            <div className="image">
              <div className="head">
                <h1>{title}</h1>
                <div className="info">{getHighlightInfo(highlight)}</div>
              </div>
              <img
                src={getHighlightImage(highlight)}
                title={getHighlightImageTitle(highlight)}
                alt={getHighlightImageAlt(highlight)}
              />
            </div>
            <div className="content">
              {subtitle && (
                <div className="short">
                  {subtitle}
                </div>
              )}
              <HighlightBody highlight={highlight} />
            </div>
          </div>

          <section className="bnr_728">
            <center />
          </section>

          <section>
            <div className="head">
              <h2><Link to="/highlights">More Highlights & News</Link></h2>
              <Link to="/highlights" className="small_link">See all</Link>
            </div>
            <div className="items">
              {moreHighlights.map((item) => (
                <MoreHighlightPost key={getHighlightSlug(item)} highlight={item} />
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

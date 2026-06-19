import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import NotFound from '../components/NotFound';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import guideDetails from '../data/guide_details.json';
import { cleanRobloxGoLinks } from '../utils/robloxGoLinks';
import '../styles/style.css';

const guides = Array.isArray(guideDetails) ? guideDetails : [];

const nameToSlug = (name = '') => (
  String(name)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
);

const getGuideTitle = (guide) => guide.title || guide.guide_title || guide.name || 'Roblox Guide';
const getGuideSubtitle = (guide) => guide.short_description || guide.subtitle || guide.guide_subtitle || guide.excerpt || guide.summary || '';
const getGuideImage = (guide) => guide.detail_image || guide.hero_image || guide.image || guide.guide_image || guide.thumbnail || '/api/placeholder/768/432';
const getGuideInfo = (guide) => guide.info || `${guide.date || guide.published_at || guide.updated_at || 'June 2026'} by ${guide.author || guide.writer || 'RobloxGo'}`;
const getGuideImageTitle = (guide) => guide.image_title || getGuideTitle(guide);
const getGuideImageAlt = (guide) => guide.image_alt || `${getGuideTitle(guide)} - Roblox Strategy Hub: Stats, Videos & Power Tips`;

const getGuideSlug = (guide) => {
  const sourceUrl = guide.details_url || guide.url || '';
  const sourceSlug = sourceUrl.split('/').filter(Boolean).pop();
  return sourceSlug || guide.slug || guide.guide_slug || guide.guide_id || guide.id || nameToSlug(getGuideTitle(guide));
};

const getGuidePath = (guide) => `/guide/${getGuideSlug(guide)}`;

const findGuide = (guideSlug = '') => {
  const normalizedSlug = nameToSlug(guideSlug);

  return guides.find((guide) => (
    String(getGuideSlug(guide)) === String(guideSlug) ||
    nameToSlug(getGuideSlug(guide)) === normalizedSlug ||
    nameToSlug(getGuideTitle(guide)) === normalizedSlug
  ));
};

const getGuideHtml = (guide) => {
  const html = guide.content_html || guide.body_html || guide.details_html || guide.content || guide.body || guide.details || '';

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

const GuideBody = ({ guide }) => {
  const html = getGuideHtml(guide);
  const sections = guide.sections || guide.article || [];

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
                <img src={section.image} title={section.heading || section.title || getGuideTitle(guide)} alt={section.heading || section.title || getGuideTitle(guide)} />
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
      More details for this guide will be added soon.
    </p>
  );
};

const MoreGuidePost = ({ guide }) => {
  const title = getGuideTitle(guide);

  return (
    <div className="post">
      <Link to={getGuidePath(guide)}>
        <img
          loading="lazy"
          src={getGuideImage(guide)}
          title={title}
          alt={getGuideImageAlt(guide)}
        />
      </Link>
      <div className="details">
        <h2>
          <Link to={getGuidePath(guide)}>{title}</Link>
        </h2>
        <div className="short">
          {getGuideSubtitle(guide)}
        </div>
        <Link to={getGuidePath(guide)} className="button">Read more</Link>
      </div>
    </div>
  );
};

export default function GuideDetails() {
  const { guideSlug } = useParams();
  const guide = findGuide(guideSlug);

  if (!guide) {
    return (
      <Layout>
        <NotFound
          title="Guide Not Found"
          message="The Roblox guide you are looking for is not available in our database."
        />
      </Layout>
    );
  }

  const title = getGuideTitle(guide);
  const subtitle = getGuideSubtitle(guide);
  const moreGuides = guides.filter((item) => getGuideSlug(item) !== getGuideSlug(guide)).slice(0, 4);

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
                <div className="info">{getGuideInfo(guide)}</div>
              </div>
              <img
                src={getGuideImage(guide)}
                title={getGuideImageTitle(guide)}
                alt={getGuideImageAlt(guide)}
              />
            </div>
            <div className="content">
              {subtitle && (
                <div className="short">
                  {subtitle}
                </div>
              )}
              <GuideBody guide={guide} />
            </div>
          </div>

          <section className="bnr_728">
            <center />
          </section>

          <section>
            <div className="head">
              <h2><Link to="/guides">More Tips & Guides</Link></h2>
              <Link to="/guides" className="small_link">See all</Link>
            </div>
            <div className="items">
              {moreGuides.map((item) => (
                <MoreGuidePost key={getGuideSlug(item)} guide={item} />
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

import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import highlightData from '../data/highlight_details.json';
import { getTotalPages, paginateArray } from '../utils/helpers';
import '../styles/style.css';

const highlights = Array.isArray(highlightData)
  ? highlightData
  : Array.isArray(highlightData?.highlight)
    ? highlightData.highlight
    : Array.isArray(highlightData?.blog)
      ? highlightData.blog
      : [];

const nameToSlug = (name = '') => (
  String(name)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
);

const getHighlightTitle = (highlight) => highlight.title || highlight.highlight_title || highlight.name || 'Roblox Highlight';
const getHighlightSubtitle = (highlight) => highlight.subtitle || highlight.short_description || highlight.highlight_subtitle || highlight.category || 'Roblox highlight';
const getHighlightImage = (highlight) => highlight.image || highlight.highlight_image || highlight.thumbnail || '/api/placeholder/400/300';

const getHighlightPath = (highlight) => {
  const sourceUrl = highlight.details_url || highlight.url || '';
  const sourceSlug = sourceUrl.split('/').filter(Boolean).pop();
  const highlightSlug = sourceSlug || highlight.slug || highlight.highlight_slug || highlight.highlight_id || highlight.id || nameToSlug(getHighlightTitle(highlight));

  return `/highlight/${highlightSlug}`;
};

export default function Highlight() {
  const { page } = useParams();
  const location = useLocation();
  const itemsPerPage = 6;
  const totalPages = getTotalPages(highlights.length, itemsPerPage);
  const requestedPage = Number(page) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages || 1);
  const paginatedHighlights = paginateArray(highlights, currentPage, itemsPerPage);
  const basePath = location.pathname.startsWith('/blog') ? '/blog' : '/highlights';

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
      <div className="wrap highlight-page" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="main" style={{ flex: '1 1 0', minWidth: '0' }}>
          <h1 className="page-title" style={{ width: '100%' }}>
            Roblox Highlights & News
          </h1>
          <span className="head-text">
            Stay in the loop with what’s buzzing in the Roblox universe! From game updates and new releases to creator spotlights and platform trends - we’ve got all the highlights you need to keep your Roblox world spinning.
          </span>

          <div className="head" />

          <div className="items">
            {paginatedHighlights.map((highlight) => {
              const title = getHighlightTitle(highlight);
              const subtitle = getHighlightSubtitle(highlight);
              const highlightPath = getHighlightPath(highlight);

              return (
                <div className="post" key={highlight.highlight_id || highlight.id || title}>
                  <Link to={highlightPath} className="post-image">
                    <div className="label">Highlight</div>
                    <div className="label right orange">Updated</div>
                    <img
                      src={getHighlightImage(highlight)}
                      title={title}
                      alt={title}
                    />
                  </Link>

                  <div className="details">
                    <h2>
                      <Link to={highlightPath}>{title}</Link>
                    </h2>
                    <div className="flex">
                      <div className="short">
                        {subtitle}
                      </div>
                      <Link to={highlightPath} className="button">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {paginatedHighlights.length === 0 && (
            <div className="block">
              <p>No Roblox highlights are available yet.</p>
            </div>
          )}

          <ListPagination basePath={basePath} currentPage={currentPage} totalPages={totalPages || 1} />
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

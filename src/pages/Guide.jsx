import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import guideData from '../data/roblox_guide.json';
import { getTotalPages, paginateArray } from '../utils/helpers';
import '../styles/style.css';

const guides = Array.isArray(guideData?.guide) ? guideData.guide : [];

const nameToSlug = (name = '') => (
  String(name)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
);

const getGuideTitle = (guide) => guide.title || guide.guide_title || guide.name || 'Roblox Guide';
const getGuideSubtitle = (guide) => guide.subtitle || guide.guide_subtitle || guide.category || 'Roblox guide';
const getGuideImage = (guide) => guide.image || guide.guide_image || guide.thumbnail || '/api/placeholder/400/300';

const getGuidePath = (guide) => {
  const sourceUrl = guide.details_url || guide.url || '';
  const sourceSlug = sourceUrl.split('/').filter(Boolean).pop();
  const guideSlug = sourceSlug || guide.slug || guide.guide_slug || guide.guide_id || guide.id || nameToSlug(getGuideTitle(guide));

  return `/guide/${guideSlug}`;
};

export default function Guide() {
  const { page } = useParams();
  const itemsPerPage = 6;
  const totalPages = getTotalPages(guides.length, itemsPerPage);
  const requestedPage = Number(page) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages || 1);
  const paginatedGuides = paginateArray(guides, currentPage, itemsPerPage);

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
      <div className="wrap guide-page" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="main" style={{ flex: '1 1 0', minWidth: '0' }}>
          <h1 className="page-title" style={{ width: '100%' }}>
            Roblox Guides
          </h1>
          <span className="head-text">
            Find Roblox guides, tips, walkthroughs, and strategy updates for your favorite games.
          </span>

          <div className="head" />

          <div className="items">
            {paginatedGuides.map((guide) => {
              const title = getGuideTitle(guide);
              const subtitle = getGuideSubtitle(guide);
              const guidePath = getGuidePath(guide);

              return (
                <div className="post" key={guide.guide_id || guide.id || title}>
                  <Link to={guidePath} className="post-image">
                    <div className="label">Guide</div>
                    <div className="label right orange">Updated</div>
                    <img
                      src={getGuideImage(guide)}
                      title={title}
                      alt={title}
                    />
                  </Link>

                  <div className="details">
                    <h2>
                      <Link to={guidePath}>{title}</Link>
                    </h2>
                    <div className="flex">
                      <div className="short">
                        {subtitle}
                      </div>
                      <Link to={guidePath} className="button">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {paginatedGuides.length === 0 && (
            <div className="block">
              <p>No Roblox guides are available yet.</p>
            </div>
          )}

          <ListPagination basePath="/guides" currentPage={currentPage} totalPages={totalPages || 1} />
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

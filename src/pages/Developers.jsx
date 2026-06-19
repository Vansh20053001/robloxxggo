import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ListPagination from '../components/ListPagination';
import TopCharts from '../components/TopCharts';
import TopLists from '../components/TopLists';
import developers from '../data/developers.json';
import { getTotalPages, paginateArray } from '../utils/helpers';
import '../styles/style.css';

const ITEMS_PER_PAGE = 20;

const nameToSlug = (name = '') => (
  String(name)
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
);

const getDeveloperName = (developer) => (
  developer.developerName ||
  developer.name ||
  developer.developer_name ||
  developer.creator_name ||
  developer.username ||
  'Roblox Creator'
);

const getDeveloperIdFromUrl = (url = '') => {
  const match = String(url).match(/\/developer\/([^/]+)/);
  return match ? match[1] : '';
};

const getDeveloperId = (developer, index) => (
  getDeveloperIdFromUrl(developer.pageUrl) ||
  developer.id ||
  developer.developer_id ||
  developer.creator_id ||
  developer.user_id ||
  index + 1
);

const getDeveloperPath = (developer, index) => {
  const id = getDeveloperId(developer, index);
  return `/developer/${id}/${encodeURIComponent(nameToSlug(getDeveloperName(developer)))}`;
};

export default function Developers() {
  const { page } = useParams();
  const totalPages = getTotalPages(developers.length, ITEMS_PER_PAGE);
  const requestedPage = Number(page) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages || 1);
  const paginatedDevelopers = paginateArray(developers, currentPage, ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

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
      <div className="content developers_page">
        <div className="main">
          <div
            className="page_top"
            title="Roblox Developers and Creators"
            style={{ backgroundImage: 'url(//cdn.static.pikoya.com/robloxgo/images/page_title_bg_developers.jpg)' }}
          >
            <h1 className="page-title">Roblox Developers and Creators</h1>
          </div>

          <span className="head-text">
            Check out the most comprehensive Roblox Developer List only on RobloxGo! Get the latest stats, see what games your favorite developers are into, and explore the awesome world of creators shaping the Roblox universe
          </span>

          <div className="list">
            {paginatedDevelopers.map((developer, index) => {
              const absoluteIndex = startIndex + index;
              const name = getDeveloperName(developer);

              return (
                <Link
                  key={`${getDeveloperId(developer, absoluteIndex)}-${name}`}
                  to={getDeveloperPath(developer, absoluteIndex)}
                  className="row"
                >
                  {name}
                </Link>
              );
            })}
          </div>

          {paginatedDevelopers.length === 0 && (
            <div className="block">
              <p>No Roblox developers are available yet.</p>
            </div>
          )}

          <ListPagination basePath="/developers" currentPage={currentPage} totalPages={totalPages || 1} />
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

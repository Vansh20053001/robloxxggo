import React from 'react';
import { Link } from 'react-router-dom';
import { getPaginationItems } from '../utils/helpers';
import '../styles/style.css';

export default function ListPagination({ basePath, currentPage, totalPages, getPagePath }) {
  if (totalPages <= 1) return null;

  const pageUrl = (page) => {
    if (getPagePath) return getPagePath(page);
    return page === 1 ? basePath : `${basePath}/${page}`;
  };
  const pages = getPaginationItems(currentPage, totalPages);

  return (
    <div className="pager">
      {currentPage > 1 && (
        <Link to={pageUrl(currentPage - 1)} className="flip prev" aria-label="Previous page">
          &lsaquo;
        </Link>
      )}

      {pages.map((page, index) => (
        typeof page === 'number' ? (
          <Link key={page} to={pageUrl(page)} className={`num${page === currentPage ? ' cur' : ''}`}>
            {page}
          </Link>
        ) : (
          <span key={`ellipsis-${index}`} className="num pager-ellipsis">...</span>
        )
      ))}

      {currentPage < totalPages && (
        <Link to={pageUrl(currentPage + 1)} className="flip next" aria-label="Next page">
          &rsaquo;
        </Link>
      )}
    </div>
  );
}

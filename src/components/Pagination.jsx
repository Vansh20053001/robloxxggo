import React from 'react';
import { getPaginationItems } from '../utils/helpers';
import '../styles/style.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPaginationItems(currentPage, totalPages);

  const handleClick = (event, page) => {
    event.preventDefault();
    onPageChange(page);
  };

  return (
    <div className="pager">
      <a
        className={`flip prev${currentPage === 1 ? ' disabled' : ''}`}
        onClick={(event) => currentPage > 1 && handleClick(event, currentPage - 1)}
        href="#"
        aria-label="Previous page"
        style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto', opacity: currentPage === 1 ? 0.5 : 1 }}
      >
        &lsaquo;
      </a>

      {pages.map((page, index) => (
        typeof page === 'number' ? (
          <a
            key={page}
            className={page === currentPage ? 'num cur' : 'num'}
            onClick={(event) => handleClick(event, page)}
            href="#"
          >
            {page}
          </a>
        ) : (
          <span key={`ellipsis-${index}`} className="num pager-ellipsis">...</span>
        )
      ))}

      <a
        className={`flip next${currentPage === totalPages ? ' disabled' : ''}`}
        onClick={(event) => currentPage < totalPages && handleClick(event, currentPage + 1)}
        href="#"
        aria-label="Next page"
        style={{ pointerEvents: currentPage === totalPages ? 'none' : 'auto', opacity: currentPage === totalPages ? 0.5 : 1 }}
      >
        &rsaquo;
      </a>
    </div>
  );
}

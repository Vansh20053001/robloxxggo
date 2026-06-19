export const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const searchGames = (games, query) => {
  if (!query.trim()) return games;

  const lowerQuery = query.toLowerCase();
  return games.filter(game =>
    game.title.toLowerCase().includes(lowerQuery) ||
    game.description.toLowerCase().includes(lowerQuery) ||
    game.developer.toLowerCase().includes(lowerQuery) ||
    game.category.toLowerCase().includes(lowerQuery) ||
    (game.tags && game.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
};

export const filterGames = (games, filters) => {
  return games.filter(game => {
    if (filters.category && game.categoryId !== filters.category) return false;
    if (filters.minRating && game.rating < filters.minRating) return false;
    return true;
  });
};

export const sortGames = (games, sortBy) => {
  const sorted = [...games];
  
  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => b.plays - a.plays);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    case 'name':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};

export const paginateArray = (array, page, itemsPerPage) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
};

export const getTotalPages = (totalItems, itemsPerPage) => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const getPaginationItems = (currentPage, totalPages) => {
  const safeTotalPages = Math.max(1, Number(totalPages) || 1);
  const safeCurrentPage = Math.min(Math.max(1, Number(currentPage) || 1), safeTotalPages);

  if (safeTotalPages <= 5) {
    return Array.from({ length: safeTotalPages }, (_, index) => index + 1);
  }

  const pages = [1];
  const startPage = Math.max(2, safeCurrentPage - 1);
  const endPage = Math.min(safeTotalPages - 1, safeCurrentPage + 1);

  if (startPage > 2) pages.push('...');

  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }

  if (endPage < safeTotalPages - 1) pages.push('...');

  pages.push(safeTotalPages);

  return pages;
};

export const getStarRating = (rating) => {
  const stars = Math.round(rating);
  return Array(5)
    .fill(0)
    .map((_, i) => (i < stars ? '★' : '☆'))
    .join('');
};

export const highlightText = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts
    .map((part, i) => (part.toLowerCase() === query.toLowerCase() ? `<mark>${part}</mark>` : part))
    .join('');
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

export const isEventActive = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return now >= start && now <= end;
};

export const getTimeLeft = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end - now;
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days}d left`;
  if (hours > 0) return `${hours}h left`;
  
  return 'Ending soon';
};

import './Pagination.css';

const Pagination = ({ postsPerPage, length, handlePagination, currentPage }) => {
  const paginationNumbers = [];
  for (let i = 1; i < Math.ceil(length / postsPerPage) + 1; i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="pagination">
      {paginationNumbers.map((pageNumber) => (
        <button
          className={currentPage === pageNumber ? 'active' : ''}
          key={pageNumber}
          onClick={() => handlePagination(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
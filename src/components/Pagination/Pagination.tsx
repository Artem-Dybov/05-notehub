import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <ul className={css.pagination}>
      <li
        className={`${css.arrow} ${page === 1 ? css.disabled : ""}`}
        onClick={handlePrev}
        style={{ cursor: page === 1 ? "not-allowed" : "pointer" }}
        aria-disabled={page === 1}
        aria-label="Previous page"
      >
        ←
      </li>

      {pages.map((p) => (
        <li
          key={p}
          className={p === page ? css.active : ""}
          onClick={() => p !== page && onPageChange(p)}
          style={{ cursor: p === page ? "default" : "pointer" }}
          aria-current={p === page ? "page" : undefined}
          role="button"
          tabIndex={p === page ? -1 : 0}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && p !== page) {
              onPageChange(p);
            }
          }}
        >
          <a>{p}</a>
        </li>
      ))}

      <li
        className={`${css.arrow} ${page === totalPages ? css.disabled : ""}`}
        onClick={handleNext}
        style={{ cursor: page === totalPages ? "not-allowed" : "pointer" }}
        aria-disabled={page === totalPages}
        aria-label="Next page"
      >
        →
      </li>
    </ul>
  );
};

"use client";

import { useState } from "react";

export default function Pagination({ totalPages = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <ul className="pagination">
        <li className={currentPage === 1 ? "disabled" : ""}>
          <a
            href="#"
            className="btn-prev"
            onClick={(e) => {
              e.preventDefault();
              goToPage(currentPage - 1);
            }}
          >
            <i className="lni-angle-left"></i> prev
          </a>
        </li>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <li key={page} className={currentPage === page ? "active" : ""}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li className={currentPage === totalPages ? "disabled" : ""}>
          <a
            href="#"
            className="btn-next"
            onClick={(e) => {
              e.preventDefault();
              goToPage(currentPage + 1);
            }}
          >
            Next <i className="lni-angle-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

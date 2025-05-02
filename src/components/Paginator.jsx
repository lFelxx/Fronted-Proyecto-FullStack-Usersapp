import { Link } from "react-router-dom";

export const Paginator = ({ url, paginator }) => {

    return (
        <nav aria-label="Page navigation" className="mt-4 d-flex justify-content-center">
            <ul className="pagination pagination-sm shadow-sm">
                {/* Primera página */}
                <li className={`page-item ${paginator.first ? 'disabled' : ''}`}>
                    <Link className="page-link" to={`${url}/0`} title="Primera página">
                        <i className="bi bi-chevron-bar-left"></i>
                    </Link>
                </li>

                {/* Página anterior */}
                <li className={`page-item ${paginator.number === 0 ? 'disabled' : ''}`}>
                    <Link className="page-link" to={`${url}/${paginator.number - 1}`} title="Página anterior">
                        <i className="bi bi-chevron-double-left"></i>
                    </Link>
                </li>

                {/* Página actual (puedes mostrar más si quieres: rango) */}
                <li className="page-item active" aria-current="page">
                    <span className="page-link bg-secondary border-0">
                        {paginator.number + 1} / {paginator.totalPages}
                    </span>
                </li>

                {/* Página siguiente */}
                <li className={`page-item ${paginator.number >= paginator.totalPages - 1 ? 'disabled' : ''}`}>
                    <Link className="page-link" to={`${url}/${paginator.number + 1}`} title="Página siguiente">
                        <i className="bi bi-chevron-double-right"></i>
                    </Link>
                </li>

                {/* Última página */}
                <li className={`page-item ${paginator.last ? 'disabled' : ''}`}>
                    <Link className="page-link" to={`${url}/${paginator.totalPages - 1}`} title="Última página">
                        <i className="bi bi-chevron-bar-right"></i>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
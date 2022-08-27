import './pagination.css';

const maxPages = 6;

export default function({totalPages,pokemonsPerPage, searchParam, setSearchParams}){

    const actualPage = (searchParam.offset/pokemonsPerPage)+1;

    const handleSetPage = (numberPage) => {
        if(numberPage-1 < 0 || numberPage-1 > totalPages || numberPage === actualPage) return;

        setSearchParams({
            ...searchParam,
            offset: (numberPage-1)*pokemonsPerPage
        });
    }

    const pages = [];
    const toPage = (actualPage + maxPages) > (totalPages+1) ? (totalPages+1) : (actualPage + maxPages);
    const fromPage = (actualPage > 3) ? actualPage-3 : 1;


    for(let i=fromPage ; i <= (toPage); i++){
        pages.push(<div key={`pokemon-page-${i}`} className={'pagination-number '+(actualPage===i?'pagination-number-selected':'')} onClick={() => handleSetPage(i)}>{i}</div>);
    }

    return( 
    <div className="pagination">
            <div className="pagination-first" onClick={() => handleSetPage(1)}>
                    &#171;
            </div>
            <div className="pagination-prev" onClick={() => handleSetPage((actualPage-1))}>
                    &#8249;
            </div>
            <div className="pagination-numbers">
                {pages}
            </div>
            <div className="pagination-next" onClick={() => handleSetPage((actualPage+1))}>
                &#8250;
            </div>
            <div className="pagination-end" onClick={() => handleSetPage(totalPages+1)}>
                &#187;
            </div>
    </div>
    );

}
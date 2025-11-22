import { useState, useMemo } from "react";
import { useWindowSize } from '../../hooks/screenResize.hook.jsx';
import { SCREEN_SIZE } from '../../config.jsx';
import { GridContainer, PaginationContainer } from "./PaginatedGrid.style";

const calculatePages = (items, isMobile, columns, rows) => {
    const COLS = isMobile ? 1 : columns;
    const ROWS = isMobile ? 4 : rows;
    const pages = [];
    
    let currentPage = [];

    // grid occupation
    let grid = Array(ROWS).fill().map(() => Array(COLS).fill(false));

    //if grid spot is free
    const isSpotFree = (r, c, rSpan, cSpan) => {
        if (r + rSpan > ROWS || c + cSpan > COLS) return false;
        for (let i = 0; i < rSpan; i++) {
            for (let j = 0; j < cSpan; j++) {if (grid[r + i][c + j]) return false;}
        }
        return true;
    };

    //mark grid spot as occupied
    const markSpot = (r, c, rSpan, cSpan) => {
        for (let i = 0; i < rSpan; i++) {
            for (let j = 0; j < cSpan; j++) {
                grid[r + i][c + j] = true;
            }
        }
    };

    // process items
    let queue = [...items];

    // fill pages
    while (queue.length > 0) {
        let placed = false;
        let firstFreeSpot = null;

        for (let c = 0; c < COLS; c++) {
            for (let r = 0; r < ROWS; r++) {
                if (!grid[r][c]) {
                    firstFreeSpot = { r, c };
                    break;
                }
            }
            if (firstFreeSpot) break;
        }

        if (firstFreeSpot) {
            let itemIndex = -1;
            
            for (let i = 0; i < queue.length; i++) {
                const item = queue[i];
                const cSpan = isMobile ? 1 : Math.min(item.column || 1, COLS);
                const rSpan = item.row || 1;
                
                if (isSpotFree(firstFreeSpot.r, firstFreeSpot.c, rSpan, cSpan)) {
                    itemIndex = i;
                    break;
                }
            }

            if (itemIndex !== -1) {
                const item = queue[itemIndex];
                const cSpan = isMobile ? 1 : Math.min(item.column || 1, COLS);
                const rSpan = item.row || 1;
                
                markSpot(firstFreeSpot.r, firstFreeSpot.c, rSpan, cSpan);
                currentPage.push({
                    ...item,
                    column: cSpan,
                    gridPos: {
                        rowStart: firstFreeSpot.r + 1,
                        colStart: firstFreeSpot.c + 1
                    }
                });
                queue.splice(itemIndex, 1);
                placed = true;
            } else {
                
                 for (let i = 0; i < queue.length; i++) {
                    const item = queue[i];
                    const cSpan = isMobile ? 1 : Math.min(item.column || 1, COLS);
                    const rSpan = item.row || 1;

                    let spotFound = null;
                    for (let c = 0; c < COLS; c++) {
                        for (let r = 0; r < ROWS; r++) {
                            if (isSpotFree(r, c, rSpan, cSpan)) {
                                spotFound = { r, c };
                                break;
                            }
                        }
                        if (spotFound) break;
                    }

                    if (spotFound) {
                        markSpot(spotFound.r, spotFound.c, rSpan, cSpan);
                        currentPage.push({
                            ...item,
                            column: cSpan,
                            gridPos: {
                                rowStart: spotFound.r + 1,
                                colStart: spotFound.c + 1
                            }
                        });
                        queue.splice(i, 1);
                        i--;
                        placed = true;
                    }
                }
            }
        } 

        
        if (!placed) {
             if (currentPage.length > 0) {
                pages.push(currentPage);
                currentPage = [];
                grid = Array(ROWS).fill().map(() => Array(COLS).fill(false));
            } else {
                 if (queue.length > 0) {
                     console.error("Item too big for grid:", queue[0]);
                     queue.shift();
                 }
            }
        }
    }

    if (currentPage.length > 0) {
        pages.push(currentPage);
    }

    return pages;
};

export const PaginatedGrid = ({ items, renderItem, columns = 4, rows = 2 }) => {
    const isMobile = useWindowSize(parseInt(SCREEN_SIZE.mobile));
    const pages = useMemo(() => calculatePages(items, isMobile, columns, rows), [items, isMobile, columns, rows]);
    const pagesNumber = pages.length;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageIndex) => {
        if (pageIndex < 1 || pageIndex > pagesNumber) return;
        setCurrentPage(pageIndex);
    }
    
    const currentItems = pages[currentPage - 1] || [];

    return (
        <div className="listContainer">
            <GridContainer $columns={isMobile ? 1 : columns} $rows={isMobile ? 4 : rows}>
                {currentItems.map(item => {
                    const RenderItem = renderItem;
                    return <RenderItem key={item.id} {...item} />;
                })}
            </GridContainer>
            <PaginationContainer>
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >Précédent</button>
                
                {Array.from({ length: pagesNumber }, (_, index) => {
                    const pageIndex = index + 1; 
                    return (
                        <span 
                            key={pageIndex} 
                            className={pageIndex === currentPage ? 'active-page' : ''}
                            onClick={() => handlePageChange(pageIndex)} 
                        >
                            {pageIndex}
                        </span>
                    );
                })}

                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagesNumber}
                >Suivant</button>
            </PaginationContainer>
        </div>
    )
}

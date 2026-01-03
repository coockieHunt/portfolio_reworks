import { useState, useMemo, useEffect } from 'react';
import { useWindowSize } from '../../hooks/useScreenResize.hook';
import { SCREEN_SIZE } from '../../config';
import { GridContainer, PaginationContainer } from './PaginatedGrid.style';

export interface IPaginatedGridProps {
    items: Array<{
        id: string | number;
        column?: number;
        row?: number;
        [key: string]: any;
    }>;
    renderItem: React.ComponentType<any>;
    columns?: number;
    rows?: number;
    gap_desktop?: number;
    gap_mobile?: number;
}

export interface IGridItem {
    id: string | number;
    column: number;
    row: number;
    gridPos: {
        rowStart: number;
        colStart: number;
    };
    [key: string]: any;
}

import { Button } from '../Button/Button';

/**
 * PaginatedGrid component displays a paginated grid of items, supporting custom row and column spans per item.
 * It adapts the grid layout for mobile and desktop screens, and provides pagination controls.
 *
 * @component
 * @param {Object[]} items - The array of items to display in the grid. Each item can have optional `column` and `row` properties for custom spans.
 * @param {function} renderItem - A function or React component to render each item. Receives item props.
 * @param {number} [columns=4] - Number of columns in the grid for desktop screens.
 * @param {number} [rows=2] - Number of rows in the grid for desktop screens.
 * @returns {JSX.Element} The rendered paginated grid component.
 */

const calculatePages = (
    items: Array<{
        id: string | number;
        column?: number;
        row?: number;
        [key: string]: any;
    }>,
    isMobile: boolean,
    columns: number,
    rows: number,
) => {
    const COLS = isMobile ? 1 : columns;
    const ROWS = isMobile ? 4 : rows;
    const pages: IGridItem[][] = [];

    let currentPage: IGridItem[] = [];

    // grid occupation
    let grid = Array(ROWS)
        .fill(false)
        .map(() => Array(COLS).fill(false));

    //if grid spot is free
    const isSpotFree = (r, c, rSpan, cSpan) => {
        if (r + rSpan > ROWS || c + cSpan > COLS) return false;
        for (let i = 0; i < rSpan; i++) {
            for (let j = 0; j < cSpan; j++) {
                if (grid[r + i][c + j]) return false;
            }
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
        let firstFreeSpot: { r: number; c: number } | null = null;

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

                if (
                    isSpotFree(firstFreeSpot.r, firstFreeSpot.c, rSpan, cSpan)
                ) {
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
                    row: item.row ?? 1,
                    gridPos: {
                        rowStart: firstFreeSpot.r + 1,
                        colStart: firstFreeSpot.c + 1,
                    },
                });
                queue.splice(itemIndex, 1);
                placed = true;
            } else {
                for (let i = 0; i < queue.length; i++) {
                    const item = queue[i];
                    const cSpan = isMobile
                        ? 1
                        : Math.min(item.column || 1, COLS);
                    const rSpan = item.row || 1;

                    let spotFound: { r: number; c: number } | null = null;
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
                            row: item.row ?? 1,
                            gridPos: {
                                rowStart: spotFound.r + 1,
                                colStart: spotFound.c + 1,
                            },
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
                grid = Array(ROWS)
                    .fill(false)
                    .map(() => Array(COLS).fill(false));
            } else {
                if (queue.length > 0) {
                    console.error('Item too big for grid:', queue[0]);
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

export const PaginatedGrid = ({
    items,
    renderItem,
    columns = 4,
    rows = 2,
    gap_desktop = 10,
    gap_mobile = 10,
}: IPaginatedGridProps) => {
    const isMobile = !!useWindowSize(parseInt(SCREEN_SIZE.mobile) + 600);
    const pages = useMemo(
        () => calculatePages(items, isMobile, columns, rows),
        [items, isMobile, columns, rows],
    );
    const pagesNumber = pages.length;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [isMobile]); // Reset to first page on screen size change

    const handlePageChange = (pageIndex) => {
        if (pageIndex < 1 || pageIndex > pagesNumber) return;
        setCurrentPage(pageIndex);
    };

    const currentItems = pages[currentPage - 1] || [];

    const HideOnePage = pagesNumber <= 1;

    if (HideOnePage) {
        return (
            <div className="listContainer">
                <GridContainer
                    $columns={isMobile ? 1 : columns}
                    $rows={isMobile ? 4 : rows}
                    $gap={isMobile ? gap_mobile : gap_desktop}
                >
                    {items.map((item) => {
                        const RenderItem = renderItem;
                        return <RenderItem key={item.id} {...item} />;
                    })}
                </GridContainer>
            </div>
        );
    } else {
        return (
            <div className="listContainer">
                <GridContainer
                    $columns={isMobile ? 1 : columns}
                    $rows={isMobile ? 4 : rows}
                    $gap={isMobile ? gap_mobile : gap_desktop}
                >
                    {currentItems.map((item) => {
                        const RenderItem = renderItem;
                        return <RenderItem key={item.id} {...item} />;
                    })}
                </GridContainer>
                <PaginationContainer>
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        color="color-mix(in srgb, var(--secondary), transparent 20%)"
                    >
                        Précédent
                    </Button>

                    {Array.from({ length: pagesNumber }, (_, index) => {
                        const pageIndex = index + 1;
                        return (
                            <span
                                key={pageIndex}
                                className={
                                    pageIndex === currentPage
                                        ? 'active-page'
                                        : ''
                                }
                                onClick={() => handlePageChange(pageIndex)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handlePageChange(pageIndex);
                                    }
                                }}
                            >
                                {pageIndex}
                            </span>
                        );
                    })}

                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pagesNumber}
                        color="color-mix(in srgb, var(--secondary), transparent 20%)"
                    >
                        Suivant
                    </Button>
                </PaginationContainer>
            </div>
        );
    }
};

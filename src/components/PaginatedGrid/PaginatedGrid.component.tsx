import { useState, useEffect } from 'react';
import { useWindowSize } from '../../hooks/useScreenResize.hook';
import { SCREEN_SIZE } from '../../config';
import { ListContainer, GridContainer, PaginationContainer } from './PaginatedGrid.style';
import { Button } from '../Button/Button';

export interface IPaginatedGridProps {
    items: Array<{
        id: string | number;
        [key: string]: any;
    }>;
    renderItem: React.ComponentType<any>;
    itemsPerPageDesktop?: number;
    itemsPerPageMobile?: number;
    gap_desktop?: number;
    gap_mobile?: number;
    hidePagination?: boolean;
}

export const PaginatedGrid = ({
    items,
    renderItem,
    itemsPerPageDesktop = 6,
    itemsPerPageMobile = 4,
    gap_desktop = 10,
    gap_mobile = 10,
    hidePagination = false,
}: IPaginatedGridProps) => {
    const isMobile = !!useWindowSize(parseInt(SCREEN_SIZE.mobile) + 600);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = isMobile ? itemsPerPageMobile : itemsPerPageDesktop;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [isMobile, itemsPerPage]);

    const handlePageChange = (pageIndex: number) => {
        if (pageIndex < 1 || pageIndex > totalPages) return;
        setCurrentPage(pageIndex);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    const showPagination = !hidePagination && totalPages > 1;

    return (
        <ListContainer>
            <GridContainer $gap={gap_desktop} $gapMobile={gap_mobile}>
                {currentItems.map((item) => {
                    const RenderItem = renderItem;
                    return <RenderItem key={item.id} {...item} />;
                })}
            </GridContainer>
            
            {showPagination && (
                <PaginationContainer>
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        color="color-mix(in srgb, var(--secondary), transparent 20%)"
                    >
                        Précédent
                    </Button>

                    {Array.from({ length: totalPages }, (_, index) => {
                        const pageIndex = index + 1;
                        return (
                            <span
                                key={pageIndex}
                                className={pageIndex === currentPage ? 'active-page' : ''}
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
                        disabled={currentPage === totalPages}
                        color="color-mix(in srgb, var(--secondary), transparent 20%)"
                    >
                        Suivant
                    </Button>
                </PaginationContainer>
            )}
        </ListContainer>
    );
};
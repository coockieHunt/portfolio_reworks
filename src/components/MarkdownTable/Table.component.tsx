import React from 'react';

import * as Styled from './table.style';

/**
 * table component
 * @param children - the table content
 * @returns a styled table component
 */
export const Table = ({ children }: { children: React.ReactNode }) => {
    return (
        <Styled.TableWrapper>
            <Styled.StyledTable>{children}</Styled.StyledTable>
        </Styled.TableWrapper>
    );
};

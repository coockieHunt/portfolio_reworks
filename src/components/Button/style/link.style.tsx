import styled from 'styled-components';

export const LinkContainer = styled.span`
    cursor: pointer;
    color: var(--primary);
    text-decoration: underline;

    &:hover {
        color: var(--secondary);
    }
`;

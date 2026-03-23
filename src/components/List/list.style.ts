import styled from "styled-components";

export const ListLiWrapper = styled.ul`
    list-style: none;
    padding: 0;
    margin: 5px 0 0 20px;

    & > li {
        position: relative;
        padding-left: 20px; 
        line-height: 1.6;
        font-size: 0.95rem;
        margin-bottom: 8px;

        &::before {
            content: '▹';
            position: absolute;
            left: 0;
            margin-top: -5px;
            color: var(--primary);
            font-size: 1.2rem;
            line-height: 1.6;
        }

        & > ul, & > ol {
            margin: 5px 0 5px 0; 
        }
    }
`;

export const ListOlWrapper = styled.ol`
    padding-left: 20px;
    margin: 15px 0 15px 20px;

    & > li {
        margin-bottom: 8px;
        line-height: 1.6;
        font-size: 0.95rem;
        padding-left: 10px;

        &::marker {
            color: var(--primary); 
            font-weight: bold;
            font-size: 1.1rem;
        }

        & > ul, & > ol {
            margin: 5px 0 5px 0;
        }
    }
`;
import styled from "styled-components";

export const InfoDataTextContainer = styled.div`
    width: 100%;
    text-align: center;
    padding: 4rem 0;
   
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;

    & strong {
        font-size: 1.7rem;
        color: var(--primary);
    }

    & .sub {
        font-size: 1rem;
        color: var(--font-subtle);
    }
`;
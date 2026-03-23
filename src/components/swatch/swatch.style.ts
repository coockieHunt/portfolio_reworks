import styled from 'styled-components';

export const SwatchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--background-elevated);
    transition: all 0.3s ease;
    border-bottom: 5px solid var(--border);


    .headerColor{
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1.1em;
        border-bottom: 1px solid var(--border);
    }

    .swatch-info {
        padding: 15px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        strong {
            color: var(--primary);
            font-weight: 600;
            font-size: 1.05em;
        }

        small {
            color: var(--text-secondary);
            font-size: 0.9em;
            line-height: 1.4;
        }
    }   
`;
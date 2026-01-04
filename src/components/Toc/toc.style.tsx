import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    position: sticky;
    top: 20px;
    align-self: flex-start;
    padding: 15px;
    max-height: 95vh;

    & h2 {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 24px;
        color: var(--primary);
        letter-spacing: 0.5px;
        text-transform: uppercase;
        opacity: 0.9;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    & ul {
        display: flex;
        flex-direction: column;
        gap: 5px;
        overflow-y: auto;
        max-height: calc(95vh - 60px);
        padding-right: 10px;
    }

    & li {
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        border-radius: 8px;
        padding: 10px 12px;
        list-style: none;
        overflow: hidden;
        position: relative;
        
        color: var(--font-subtle);
        background: transparent;
        
        transition: 
            background-color 0.2s ease,
            transform 0.15s ease,
            color 0.2s ease;
        
        &:hover {
            will-change: transform;
            transform: translateX(3px);
            background: rgba(255, 255, 255, 0.03);
            color: var(--font-primary);
        }

        &.active {
            background: color-mix(
                in srgb,
                var(--secondary) 20%,
                var(--background-secondary) 80%
            );
            color: var(--primary);
            font-weight: 500;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 3px;
                height: 60%;
                background: var(--primary);
                border-radius: 0 2px 2px 0;
            }
        }

        & a {
            text-decoration: none;
            color: inherit;
            flex: 1;
            line-height: 1.5;
            word-break: break-word;
            
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        & span {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 24px;
            height: 24px;
            cursor: pointer;
            border-radius: 4px;
            background: transparent;
            transition: 
                background-color 0.2s ease,
                transform 0.2s ease;

            & svg {
                width: 16px;
                height: 16px;
                color: var(--font-subtle);
                transition: color 0.2s ease;
            }

            &:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: scale(1.1);

                & svg {
                    color: var(--primary);
                }
            }

            &:active {
                transform: scale(0.95);
            }

            &:focus-visible {
                outline: 2px solid var(--primary);
                outline-offset: 2px;
            }
        }
    }
`;
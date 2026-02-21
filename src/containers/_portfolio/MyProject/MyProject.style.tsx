import styled from 'styled-components';
import { SCREEN_SIZE, BORDER_RADIUS } from '@/config';

import { ThinScroolBar, fadeInTranslate } from '@/styles/utils.style';

export const Container = styled.div`

`;


export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 85%;
    gap: 30px;

    padding-bottom: 40px;


    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 94%;
    }
`;

export const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
`;


export const ProjectCard = styled.div`
    border: 1px solid var(--border-subtle);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    height: 650px;

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        height: 500px;
    }
    
    box-sizing: border-box;
    border-radius: ${BORDER_RADIUS.large};
    box-shadow: 0 8px 32px color-mix(in srgb, var(--background-secondary) 40%, transparent);
    
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease;

    & .tab-content {
        flex-shrink: 0;
        background: var(--background-secondary);
        border-bottom: 1px solid var(--border);

        & ul {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;

            & li {
                cursor: pointer;
                padding: 18px 25px;
                display: flex;
                align-items: center;
                gap: 12px;
                position: relative;
                transition: all 0.3s ease;
                font-weight: 600;
                font-size: 0.95em;
                color: var(--font-subtle);
                border-bottom: 2px solid transparent;

                &:hover {
                    background: color-mix(in srgb, var(--background-secondary) 50%, transparent);
                }

                &.selected {
                    color: var(--primary);
                    border-bottom-color: var(--border-light);
                }

                & svg {
                    font-size: 1.1em;
                    transition: transform 0.3s ease;
                }

                @media (max-width: ${SCREEN_SIZE.mobile}) {
                    padding: 15px;
                    flex: 1;
                    justify-content: center;
                    font-size: 0.9em;
                }
            }
        }
    }

    & [role='tabpanel'] {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        min-height: 0; 
        overflow: hidden; 
        animation: ${fadeInTranslate} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    & .container_preview {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        min-height: 0; 

        & .content {
            padding: clamp(15px, 3vw, 25px);
            display: flex;
            flex-direction: column;
            gap: clamp(10px, 2vw, 20px);
            flex: 1;
            overflow-y: hidden;

            & .title {
                font-size: clamp(1.2em, 5vw, 2em);
                font-weight: 800;
                margin: 0;
                letter-spacing: -0.5px;
                line-height: 1.2;
            }

            & span {
                font-size: clamp(0.75em, 2vw, 0.9em);
                font-weight: 500;
                opacity: 0.9;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            & p {
                background: var(--background-secondary);
                border: 1px solid var(--border);
                padding: clamp(12px, 2vw, 20px);
                border-radius: ${BORDER_RADIUS.medium};
                line-height: 1.6;
                margin: 0;
                flex: 1;
                color: var(--font-subtle);
                overflow-y: auto;
                font-size: clamp(0.8em, 1.5vw, 1em);

                ${ThinScroolBar}
            }

            & ul {
                display: flex;
                flex-wrap: wrap;
                list-style: none;
                padding: 0;
                margin: 0;
                gap: clamp(6px, 1vw, 8px);

                & li {
                    color: var(--font-subtle);
                    padding: clamp(8px, 1vw, 10px) clamp(10px, 1.5vw, 15px);
                    border-radius: ${BORDER_RADIUS.medium};
                    font-size: clamp(0.65em, 1vw, 0.8em);
                    font-weight: 600;
                    border: 1px solid
                        color-mix(in srgb, var(--primary), transparent 81%);
                    background: color-mix(
                        in srgb,
                        var(--primary),
                        transparent 94%
                    );
                    transition: all 0.2s ease;
                    cursor: default;
                    white-space: nowrap;

                    &:hover {
                        transform: translateY(-2px);
                    }
                }
            }
        }

        & .footer {
            margin-top: auto;
            width: 100%;
            background: var(--background-secondary);
            border-top: 1px solid var(--border);

            & .cta {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: clamp(10px, 2vw, 15px);
                padding: clamp(10px, 2vw, 16px);

                & .project_code {
                    background: var(--primary);
                    border-color: var(--border-dark);
                    font-size: clamp(0.8em, 1.5vw, 0.95em);
                    padding: clamp(8px, 1vw, 12px) clamp(10px, 1.7vw, 16px);

                    &:hover {
                        background: var(--primary);
                        box-shadow: 0 0 15px
                            color-mix(in srgb, var(--primary), transparent 62%);
                    }
                }
            }

            & .fenceFotter {
                background: var(--primary);
                font-size: 0.85em;
                font-weight: 700;
                padding: 8px 20px;
                display: flex;
                align-items: center;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                color: var(--font-on-primary);

                & span {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
            }
        }

        &.favorite .content .title {
            color: var(--primary);
        }
    }

    & .container_galery {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-auto-rows: 160px; 
        gap: 20px;
        align-content: start;
        padding: 25px;
        flex: 1;
        min-height: 0; 
        overflow-y: auto;

        & .preview_img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: ${BORDER_RADIUS.medium};
            border: 2px solid transparent;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: 0 4px 10px color-mix(in srgb, var(--background-secondary) 30%, transparent);
            background-color: var(--background-secondary);

            &:hover {
                border-color: var(--primary);
                filter: brightness(1.1);
            }
        }

        ${ThinScroolBar}

        @media (max-width: ${SCREEN_SIZE.mobile}) {
            grid-template-columns: 1fr;
        }
    }
`;

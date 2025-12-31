import styled from 'styled-components';
import { SCREEN_SIZE, BORDER_RADIUS } from '@/config';

import { ThinScroolBar, fadeInTranslate } from '@/styles/utils.style';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    position: relative;
    width: 85%;

    @media (max-width: ${SCREEN_SIZE.mobile}) { width: 94%; }
    @media (max-width: 1200px) { padding-bottom: 30px; }
`;

export const ProjectCard = styled.div`
    border: 1px solid color-mix(in srgb, var(--primary), transparent 88%);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    min-height: 500px; 
    
    box-sizing: border-box; 
    border-radius: ${BORDER_RADIUS.large};
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    & .tab-content {
        flex-shrink: 0; 
        background: rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);

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
                    background: rgba(255, 255, 255, 0.03);
                }

                &.selected {
                    color: var(--primary);
                    border-bottom-color: var(--primary);
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
    
    & [role="tabpanel"] {
        display: flex;      
        flex-direction: column;
        flex: 1;           
        width: 100%;
        min-height: 0;     
        animation: ${fadeInTranslate} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    & .container_preview {
        display: flex;
        flex-direction: column;
        flex: 1;            
        min-height: 0;      
        width: 100%;
        
        & .content {
            padding: 25px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            flex: 1;        
            overflow-y: hidden; 
            
            & .title {
                font-size: 2em;
                font-weight: 800;
                margin: 0;
                letter-spacing: -0.5px;
            }

            & span {
                font-size: 0.9em;
                font-weight: 500;
                opacity: 0.9;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            & p {
                background: rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.05);
                padding: 20px;
                border-radius: ${BORDER_RADIUS.medium};
                line-height: 1.7em;
                margin: 0;
                flex: 1;
                max-height: 250px; 
                min-height: 100px;
                color: var(--font-subtle);
                overflow-y: auto;
                
                ${ThinScroolBar}

                &:hover {
                    background: rgba(0, 0, 0, 0.3);
                    border-color: rgba(255, 255, 255, 0.1);
                }
            }

            & ul {
                display: flex;
                flex-wrap: wrap;
                list-style: none;
                padding: 0;
                margin: 0;
                gap: 8px;

                & li {
                    color: var(--font-subtle);
                    padding: 10px 15px;
                    border-radius: ${BORDER_RADIUS.medium}; 
                    font-size: 0.8em;
                    font-weight: 600;
                    border: 1px solid color-mix(in srgb, var(--primary), transparent 81%);
                    background: color-mix(in srgb, var(--primary), transparent 94%);
                    transition: all 0.2s ease;
                    cursor: default;

                    &:hover {transform: translateY(-2px);}
                }
            }
        }
        
        & .footer {
            margin-top: auto; 
            width: 100%;
            background: rgba(0,0,0,0.2);
            border-top: 1px solid rgba(255,255,255,0.05);
            
            & .cta {
                display: flex;
                flex-wrap: wrap; 
                align-items: center;
                gap: 15px;
                padding: 20px;
                

                & .project_code {
                    background: var(--primary);
                    border-color: var(--primary);
                    
                    &:hover {
                        background: var(--primary);
                        box-shadow: 0 0 15px color-mix(in srgb, var(--primary), transparent 62%);
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
        gap: 20px;
        padding: 25px;
        flex: 1; 
        overflow-y: auto;

        & .preview_img {
            width: 100%;
            height: 160px; 
            object-fit: cover;
            border-radius: ${BORDER_RADIUS.medium};
            border: 2px solid transparent;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            background-color: rgba(0,0,0,0.3);
            
            &:hover {
                transform: scale(1.03);
                border-color: var(--primary);
                box-shadow: 0 10px 25px rgba(0,0,0,0.4);
                filter: brightness(1.1);
            }
        }

        ${ThinScroolBar}

        /* in gallery one ligne on mobile */
        @media (max-width: ${SCREEN_SIZE.mobile}) {grid-template-columns: 1fr;}
    }
`;
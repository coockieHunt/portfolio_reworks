import styled, { keyframes, css } from 'styled-components'; 
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';
import { SCREEN_SIZE } from '@/config.js';

const imageWidth = 300;
const imageHeight = imageWidth;

const imageWidthMobile = 200;
const imageHeightMobile = 200;

const shimmer = keyframes`
    0% {
        background-position: -468px 0;
    }
    100% {
        background-position: 468px 0;
    }
`;

const fadeInSlideUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const Tag = styled.span<{ $color?: string }>`
    font-size: 0.8rem;
    border-radius: 4px;
    font-weight: bold;
    padding: 2px 10px;
    border: 1px solid ${props => props.$color || '#333'};
    color: #fff;
    background-color: ${props => props.$color ? HexToRgbaConverter(props.$color, 0.1) : 'transparent'};
`;

export const PostPreview = styled.article<{ $loading: boolean }>`
    background-color: var(--background-secondary); 
    border: 1px solid ${HexToRgbaConverter('var(--border-dark)', 0.4)};
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: ${fadeInSlideUp} 0.5s ease-out;
    opacity: ${props => (props.$loading ? 0.8 : 1)};
    pointer-events: ${props => (props.$loading ? 'none' : 'auto')};


    & > a {
        display: flex;
        flex-direction: row;
        text-decoration: none;
        color: inherit;
        width: 100%;
    }

    & .lazy-wrapper {
        flex-shrink: 0;
        width: ${imageWidth}px;
        height: ${imageHeight}px;
        min-width: ${imageWidth}px;
        min-height: ${imageHeight}px;
    }

    & img {
        flex-shrink: 0;
        width: ${imageWidth}px;
        height: ${imageHeight}px;
        overflow: hidden;
        object-fit: cover;
        display: ${props => props.$loading ? 'none' : 'block'};
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        & .lazy-wrapper {
            width: ${imageWidthMobile}px;
            height: ${imageHeightMobile}px;
            min-width: ${imageWidthMobile}px;
            min-height: ${imageHeightMobile}px;
        }

        & img {
            width: ${imageWidthMobile}px;
            height: ${imageHeightMobile}px;
        }   
    }

    & .content {
        flex: 1;
        padding: 20px;
        display: flex;
        flex-direction: column;

        & h2 {
            font-size: 1.2rem;
            color: var(--primary);
            font-weight: normal;
            margin-bottom: 10px;

            & .index {
                font-weight: bold;
                font-size: 1.2rem;
                margin-right: 5px;
                color: white;
            }
        }

        .tagList {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 10px;
            flex-wrap: wrap;

           
        }
       
        .info {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 0;
            
            .brace {
                display: block;
                color: #abb2bf39;
                font-weight: bold;
                font-size: 0.9rem;
                line-height: 1;
            }

            p {
                margin: 5px 0;
                padding-left: 15px;
                line-height: 1.5;
                flex: 1;
            }

            @media (max-width: ${SCREEN_SIZE.mobile}) {
                .brace{
                    display: none;
                }

                p {
                    padding-left: 0;
                    
                    display: -webkit-box;
                    -webkit-line-clamp: 5; 
                    -webkit-box-orient: vertical;
                    
                    overflow: hidden;
                    text-overflow: ellipsis;

                    flex: none; 
                }
            }
        }

        .footer {
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px solid #333;
            
            small {
                color: var(--font-subtle);
                font-style: italic;
                display: block;
            }
        }
    }

    &:hover {
        border-color: var(--border-light);
     
        & img {
            transition: filter 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        & > a {
            flex-direction: column;
        }

        & .lazy-wrapper {
            width: 100%;
            height: 200px;
            min-width: 100%;
            min-height: 200px;
        }

        & img {
            width: 100%;
        }

        & .content {
            .tagList {
                margin-bottom: 20px;
            }
        }
    }

    ${props => props.$loading && css`
        background: #1e1e1e;
        background-image: linear-gradient(
            to right,
            #1e1e1e 0%,
            #2a2a2a 20%,
            #1e1e1e 40%,
            #1e1e1e 100%
        );
        background-repeat: no-repeat;
        background-size: 800px 100%;
        animation: ${shimmer} 1.5s infinite linear;
        border-color: #333;

        & .content {

            & h2 .index, .info p, .footer small {
                background-color: #2a2a2a;
                border-radius: 4px;
                color: transparent;

                & span{
                    color: transparent;
                    background-color: #2a2a2a;
                }
            }
        }
    `}
`;
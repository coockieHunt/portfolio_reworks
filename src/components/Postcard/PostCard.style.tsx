import styled, { keyframes, css } from 'styled-components'; 
import { HexToRgbaConverter } from '@/utils/HexToRgbaConverter';

const heightPostCard = 280;

const shimmer = keyframes`
    0% {
        background-position: -468px 0;
    }
    100% {
        background-position: 468px 0;
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
    height: ${heightPostCard}px; 
    width: 100%;
    background-color: #1e1e1e; 
    
    border: 1px solid ${HexToRgbaConverter('var(--primary)', 0.4)};
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    opacity: ${props => (props.$loading ? 0.8 : 1)};
    pointer-events: ${props => (props.$loading ? 'none' : 'auto')};

    & > a {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        text-decoration: none; 
        color: inherit;
    }

    & img {
        width: ${heightPostCard}px;
        align-self: stretch; 
        object-fit: cover;
        display: ${props => props.$loading ? 'none' : 'block'};
    }

    & .content {
        flex: 1;
        display: ${props => props.$loading ? 'none' : 'flex'};
        flex-direction: column;
        position: relative;
        padding: 15px 20px; 

        & h2 {
            font-size: 1.1rem;
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
            padding-left: 10px;
        }
       
        .info {
            padding-left: 10px; 
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
        }

        .footer {
            margin-top: 15px; 
            padding-top: 10px;
            border-top: 1px solid #333;
            
            small {
                color: #5c6370; 
                font-style: italic;
                display: block;
            }
        }
    }

    &:hover {
        border-color: var(--primary);
        box-shadow: 
            0 4px 12px ${HexToRgbaConverter('var(--primary)', 0.15)},
            0 2px 4px ${HexToRgbaConverter('var(--primary)', 0.1)};
        transform: translateY(-2px);

        & img {
            filter: brightness(1.05);
            transition: filter 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

        &::before {
            content: "";
            width: ${heightPostCard}px;
            height: 100%;
            background: rgba(255, 255, 255, 0.03);
            border-right: 1px solid #333;
        }
    `}
`;
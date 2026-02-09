import styled from 'styled-components';
import { BORDER_RADIUS, SCREEN_SIZE } from '@/config';

const statusColors = {
    online: { color: '#22c55e', shadow: 'rgba(34, 197, 94, 0.4)' },
    offline: { color: '#ef4444', shadow: 'rgba(239, 68, 68, 0.4)' },
    maintenance: { color: '#f97316', shadow: 'rgba(249, 115, 22, 0.4)' }
};

export const ServiceStatusContainer = styled.div`
    .StatusList {
        display: flex;
        flex-wrap: wrap;
        gap: 20px; 
        justify-content: center;
        align-items: flex-start;
        margin-bottom: 20px;

        .Other {
            position: relative; 
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            font-size: 5rem;
            margin-top: 10px;
            margin-left: 10px;
            color: var(--primary);

            &:hover {
                font-variation-settings: 'wght' 500;    
            }

            a {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 4px;
            }

            & .hidden {
                position: absolute;
                top: 50%;
                left: 100%; 
                transform: translateY(-50%) translateX(20px);
                font-size: 1.5rem;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease, transform 0.3s ease;
                margin-left: 15px;
                white-space: nowrap;
            }

            &:hover .hidden {
                opacity: 1;
                transform: translateY(-50%) translateX(0);
                pointer-events: auto; 
            }

            @media (max-width: ${SCREEN_SIZE.tablet}) {
                & .Other {
                    margin-top: 0;
                    gap: 0;
                }


                & .hidden {
                    position: static;
                    opacity: 1;
                    pointer-events: auto;
                    transform: none;
                    margin-left: 0;
                    font-size: 1.5rem;

                    transform: translateY(-50%);
                }

                &:hover .hidden {
                    transform: none;

                }
            }

        }

        @media (max-width: ${SCREEN_SIZE.tablet}) {
            flex-direction: column;
            align-items: center;
            padding: 0 20px;
        }
    }

`;

export const StatusBadge = styled.div<{ $Status: 'online' | 'offline' | 'maintenance' }>`
    display: flex;
    flex-direction: column;
    width: 280px; 
    
    background-color: var(--background);
    border-radius: ${BORDER_RADIUS.large};
    border: 1px solid var(--border-subtle);
    
    overflow: hidden;
    cursor: default;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-3px);
    }

    & .for {
        display: flex;
        align-items: center; 
        width: 100%;
        
        padding: 12px 16px; 
        
        background-color: var(--background-secondary); 
        border-bottom: 1px solid var(--border); 

        & .dot {
            width: 10px;     
            height: 10px;    
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;  
            
            background-color: ${(props) => statusColors[props.$Status].color};
            box-shadow: 0 0 8px ${(props) => statusColors[props.$Status].shadow};
        }

        span {
            font-weight: 600;
            line-height: 1;
            font-size: 0.95rem;
        }
    }

    .details {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px 20px 16px 20px;

        strong {
            font-size: 1.1rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;

            svg {
                color: var(--primary);
                font-size: 1.2em;
            }
        }
        
        span, p {
            font-size: 0.9rem;
            color: var(--font-subtle); 
            margin: 0;
        }
    }

    @media (max-width: ${SCREEN_SIZE.tablet}) {
        width: 100%;
        max-width: 400px;
    }
`;
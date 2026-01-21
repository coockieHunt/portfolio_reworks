import styled from 'styled-components';
import { SCREEN_SIZE } from '@/config';

export const Container = styled.div`
    flex: 1;
    position: sticky;
    top: 20px;
    align-self: flex-start;
    
    scrollbar-gutter: stable; 

    & .info {
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            user-select: none; 

            &:hover {
                background: rgba(255, 255, 255, 0.03);
            }
        }

        & h2 {
            font-size: 1.2rem;
            color: var(--font-primary);
            margin: 0;
        }
    }

    & ul {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
        padding-right: 10px; 
        
        max-height: 90vh; 
        opacity: 1;
        overflow-y: auto; 
        overflow-x: hidden;
        margin-top: 10px; 
        
        transition: 
            max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.4s ease-in-out,
            margin 0.4s ease;

        &.dropdown-closed {
            max-height: 0;
            opacity: 0;
            margin-top: 0;
            overflow: hidden;
            padding-bottom: 0;
        }
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
        position: relative;
        flex-shrink: 0; 
        
        color: var(--font-subtle);
        background: transparent;
        
        transition: all 0.2s ease;
        
        &:hover {
            transform: translateX(3px);
            background: rgba(255, 255, 255, 0.03);
            color: var(--font-primary);
        }

        &.active {
            background: color-mix(in srgb, var(--secondary) 20%, var(--background-secondary) 80%);
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
            min-width: 0; 
        }

        /* Styles pour l'icône dropdown */
        & span {
             display: flex;
             align-items: center;
             justify-content: center;
             padding: 4px;
             border-radius: 4px;
             transition: background 0.2s ease, color 0.2s ease;

             &:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--primary);
             }
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        width: 100%;
        position: static;
        & .info{
            padding: 0px;
        }
    }
`;
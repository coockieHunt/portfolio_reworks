import { SCREEN_SIZE } from '@/config';
import styled from 'styled-components';

export const Container = styled.footer`
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-top: 70px;
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto;
    min-height: 350px;
    contain: layout style;
    contain-intrinsic-size: auto 350px;
    content-visibility: auto;

    & .content-wrapper {
        z-index: 2;
        width: 70%;
        padding: 10px 20px;
    }

    @media (max-width: ${SCREEN_SIZE.tablet}) {
        & .content-wrapper {
            width: 90%;
            padding: 10px 0;
        }
    }

    & .header-text {
        text-align: center;
        margin-bottom: 20px;
        & .catch {
            font-size: 3rem;
            line-height: 1.1;

            & .left,
            & .right {
                display: inline-block;
                width: 45%;
                vertical-align: top;
            }

            @media (max-width: ${SCREEN_SIZE.tablet}) {
                position: relative;
                margin-bottom: 40px;

                & .left {
                    float: none;
                    transform: none;
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    padding: 15px 0;
                }

                & .right {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                    opacity: 0.3;
                    width: 100%;
                }
            }
        }

        .creative {
            font-weight: 700;
        }
        .indus {
            color: var(--primary);
            opacity: 0.8;
        }
    }

    .josbnfgbhibc {
        margin-bottom: 20px;
        opacity: 0.01;
        color: var(--font-subtle);
        cursor: default;
        text-align: center;
        position: relative;

        &:hover {
            opacity: 0.03;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
        }

        @media (max-width: ${SCREEN_SIZE.tablet}) {
            display: none;
        }
    }
`;

export const BackToTop = styled.button`
    color: var(--primary);
    font-weight: 600;
    background: none;
    cursor: pointer;
`;

export const Aurora = styled.div`
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    height: 100%;

    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%);
    mask-image: linear-gradient(to bottom, transparent 0%, black 20%);

    background: radial-gradient(
        ellipse 80% 75% at 50% -0%,
        var(--primary) 40%,
        var(--secondary) 4%,
        transparent 90%
    );

    filter: blur(60px);
    z-index: 0;
    pointer-events: none;
`;

export const BottomBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    margin-top: 20px;

    .copyright {
        font-size: 0.85rem;
        color: var(--font-subtle);
    }

    .social-links {
        display: flex;
        gap: 15px;
    }

    .legal-links {
        display: flex;
        gap: 20px;
        button {
            background: none;
            border: none;
            color: var(--font-subtle);
            font-size: 0.85rem;
            cursor: pointer;
            transition: color 0.3s ease;

            display: flex;
            align-items: flex-end;
            gap: 10px;

            padding: 10px 5px;

            &.backToTop {
                color: var(--primary);
                font-weight: 600;
            }

            & svg {
                margin-top: 4px;
            }

            &:hover {
                color: var(--theme-color, #fff);
            }

            & .opened {
                transform: rotate(180deg);
                transition: transform 0.3s ease;
            }
        }
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        flex-direction: column;
        gap: 20px;

        .social-links {
            order: 1;
            margin-bottom: 10px;
        }
        .copyright {
            order: 2;
        }
        .legal-links {
            order: 3;
            flex-direction: column;
            gap: 0px;
        }
    }
`;

export const LegalContent = styled.div`
    overflow: hidden;
    border-radius: 8px;

    background-color: #141414;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--font-subtle);

    transition:
        padding 0.3s ease-in-out,
        max-height 0.5s ease-in-out,
        opacity 0.3s ease-in-out,
        margin-top 0.3s ease;

    &.closed {
        max-height: 0;
        opacity: 0;
        padding: 0 2rem;
        margin-top: 0;
        border-color: transparent;
    }

    &.open {
        max-height: 5000px;
        opacity: 1;
        padding: 2rem;
        margin-top: 2rem;
    }

    & h3 {
        margin-bottom: 25px;
        font-size: 1.8rem;
        font-weight: 700;
        text-align: center;
        letter-spacing: 1px;
        text-transform: uppercase;

        &::after {
            content: '';
            display: block;
            width: 50px;
            height: 3px;
            background-color: var(--primary);
            margin: 10px auto 0;
            border-radius: 2px;
        }
    }

    & h4 {
        font-size: 1.3rem;
        margin-top: 30px;
        margin-bottom: 15px;
        font-weight: 600;
        border-left: 4px solid var(--primary);
        padding-left: 12px;
    }

    & h5 {
        font-size: 1.1rem;
        margin-top: 20px;
        margin-bottom: 10px;
        font-weight: 600;
        color: var(--font-subtle);
    }

    & h6 {
        font-size: 1rem;
        margin-top: 15px;
        margin-bottom: 8px;
        font-weight: 600;
        color: var(--font-subtle);
    }

    & p {
        font-size: 0.95rem;
        line-height: 1.7;
        margin-bottom: 12px;

        & strong {
            font-weight: 600;
        }
    }

    & a {
        color: var(--accentuate);
        text-decoration: none;
        border-bottom: 1px dotted var(--accentuate);
        transition: all 0.2s ease;

        &:hover {
            color: var(--primary);
            border-bottom: 1px solid var(--primary);
        }
    }

  

    & hr {
        border: none;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        margin: 30px 0;
    }

    &.open {
        opacity: 1;
        padding: 20px;
        margin: 20px 0 80px 0;
    }

    @media (max-width: ${SCREEN_SIZE.mobile}) {
        &.open {
            padding: 1rem;
            margin: 20px 0 100px 0;
        }

        & h3 {
            font-size: 1.4rem;
            margin-bottom: 20px;
        }

        & h4 {
            font-size: 1.1rem;
            margin-top: 25px;
        }

        & h5 {
            font-size: 1rem;
            margin-top: 15px;
        }

        & p {
            font-size: 0.9rem;
        }

        & ul {
            margin: 10px 0 10px 15px;

            & li {
                font-size: 0.9rem;
                padding-left: 18px;
            }
        }
    }
`;

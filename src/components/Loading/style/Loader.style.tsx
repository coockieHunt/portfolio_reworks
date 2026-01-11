import styled from "styled-components";

export const LoaderWrapper = styled.div`
    @keyframes loaderAnimation {
        0%, 40%, 100% {
            transform: scale(0.4);
        }
        20% {
            transform: scale(1.0);
        }
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 20px;

    margin: 40px 0;

    & .loader{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        height: 40px;

        & .loader-bar {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: var(--secondary);
            animation: loaderAnimation 1.2s infinite ease-in-out;
        }

        & .loader-bar:nth-child(1) {
            animation-delay: -0.24s;
        }
        & .loader-bar:nth-child(2) {
            animation-delay: -0.12s;
        }
        & .loader-bar:nth-child(3) {
            animation-delay: 0s;
        }
        & .loader-bar:nth-child(4) {
            animation-delay: 0.12s;
        }
        & .loader-bar:nth-child(5) {
            animation-delay: 0.24s;
        }   

    }
`;

export const LoadingText = styled.span`
    font-size: 1rem;
    color: var(--subtext);
`;
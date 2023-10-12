import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    position: fixed;
    height: 95vh;
    width: 50vh;
    bottom: 5vh;
    right: 0;
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    justify-content: start;
    z-index: 9999;
    pointer-events: none;
    padding: 10px;
`

export const AlertContainer = styled.div`
    background-color: ${props => props.$coloralert};
    box-shadow: 0 0 100px rgba(5, 0, 0, 0.336) inset;
    border-radius: 2px;
    display: flex;
    box-sizing: content-box;
    overflow: hidden;
    animation: fadeIn 0.5s ease-in;

    @keyframes fadeIn {
        from {opacity: 0;}
        to {opacity: 1;}
    }

    & button {
        background-color: ${props => props.$coloralert};
        box-shadow: 0 0 100px rgba(5, 0, 0, 0.336) inset;
        color: white;
        text-align: center;
        width: 20%;
        margin-left: auto;
        overflow: hidden;
        cursor: pointer;

        & svg {
            font-size: 1.3em;
        }
    }

    .content {
        width: 80%;

        & span {
            margin-right: 0;
            margin-left: 0;
            padding: 20px 20px;
            display: block;
            width: 100%;
            background-color: ${props => props.$coloralert};
        }
    }

    .alert-content {
        display: flex;
        flex-direction: column;
    }

    .progress-bar {
        height: 3px;
        width: 100%;
        background-color: #f9fdff;
        animation: progressAnimation linear forwards;
        display: ${props => props.timer_bar};
    }

    @keyframes progressAnimation {
        0% {
            width: 100%;
        }
        100% {
            width: 0;
        }
    }
`
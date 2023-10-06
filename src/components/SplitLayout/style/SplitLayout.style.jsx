import styled from "styled-components";

export const SplitLayout = styled.div`
    display: flex;
    background-color: ${props => props.bg_color ? props.bg_color : 'transparent'};
`

export const SplitLayoutLeft = styled.div`
    width: ${props => props.left_width ? props.left_width : "50%"};
`

export const SplitLayoutRight = styled.div`
    width: ${props => props.right_width ? props.right_width : "50%"};
`

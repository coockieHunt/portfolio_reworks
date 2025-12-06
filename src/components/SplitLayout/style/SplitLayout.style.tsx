import styled from "styled-components";

interface SplitLayoutProps {
    $bg_color?: string;
}

interface SplitLayoutLeftProps {
    $left_width?: string;
}

interface SplitLayoutRightProps {
    $right_width?: string;
}

export const SplitLayout = styled.div<SplitLayoutProps>`
    display: flex;
    background-color: ${props => props.$bg_color ? props.$bg_color : 'transparent'};
`

export const SplitLayoutLeft = styled.div<SplitLayoutLeftProps>`
    width: ${props => props.$left_width ? props.$left_width : "50%"};
`

export const SplitLayoutRight = styled.div<SplitLayoutRightProps>`
    width: ${props => props.$right_width ? props.$right_width : "50%"};
`

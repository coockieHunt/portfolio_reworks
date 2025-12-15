import styled from "styled-components";

export interface ISplitLayoutProps {
    $bg_color?: string;
}

export interface ISplitLayoutLeftProps {
    $left_width?: string;
}

export interface ISplitLayoutRightProps {
    $right_width?: string;
}


export const SplitLayout = styled.div<ISplitLayoutProps>`
    display: flex;
    background-color: ${props => props.$bg_color ? props.$bg_color : 'transparent'};
`

export const SplitLayoutLeft = styled.div<ISplitLayoutLeftProps>`
    width: ${props => props.$left_width ? props.$left_width : "50%"};
`

export const SplitLayoutRight = styled.div<ISplitLayoutRightProps>`
    width: ${props => props.$right_width ? props.$right_width : "50%"};
`

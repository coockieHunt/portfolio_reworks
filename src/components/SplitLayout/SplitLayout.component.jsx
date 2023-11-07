import React from "react";
import * as SplitLayourStyle from "./style/SplitLayout.style";

/**
 * SplitLayoutComponent
 * 
 * This component creates a split layout with customizable left and right sections.
 * 
 * @param left_width {string} - The width of the left section (e.g., '50%', '300px').
 * @param right_width {string} - The width of the right section (e.g., '50%', '300px').
 * @param background_color {string} - The background color of the split layout.
 * @param right_child {ReactNode} - Content to be displayed in the right section.
 * @param left_child {ReactNode} - Content to be displayed in the left section.
 * @param padding {string} - The padding for the content inside SplitLayoutLeft and SplitLayoutRight.
 */
export const SplitLayouComponent = ({
        left_width, 
        right_width, 
        background_color, 
        right_child, 
        left_child,
        padding
    }) => {

    return (
        <SplitLayourStyle.SplitLayout $bg_color={background_color} style={{ padding: padding }}>
            <SplitLayourStyle.SplitLayoutLeft $left_width={left_width}>
                <div className="content">
                    {left_child}
                </div>
            </SplitLayourStyle.SplitLayoutLeft>
            <SplitLayourStyle.SplitLayoutRight $right_width={right_width}>
                <div className="content">
                    {right_child}
                </div>
            </SplitLayourStyle.SplitLayoutRight>
        </SplitLayourStyle.SplitLayout>
    );
}

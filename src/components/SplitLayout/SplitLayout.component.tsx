import * as SplitLayoutStyle from "./style/SplitLayout.style";

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

interface SplitLayoutComponentProps {
    left_width?: string;
    right_width?: string;
    background_color?: string;
    right_child?: React.ReactNode;
    left_child?: React.ReactNode;
    padding?: string;
    $bg_color?: string;
    $left_width?: string;
    $right_width?: string;
}   

export const SplitLayoutComponent = ({
        left_width, 
        right_width, 
        background_color, 
        right_child, 
        left_child,
        padding
    }: SplitLayoutComponentProps) => {

    return (
        <SplitLayoutStyle.SplitLayout $bg_color={background_color} style={{ padding: padding }}>
            <SplitLayoutStyle.SplitLayoutLeft $left_width={left_width}>
                <div className="content">
                    {left_child}
                </div>
            </SplitLayoutStyle.SplitLayoutLeft>
            <SplitLayoutStyle.SplitLayoutRight $right_width={right_width}>
                <div className="content">
                    {right_child}
                </div>
            </SplitLayoutStyle.SplitLayoutRight>
        </SplitLayoutStyle.SplitLayout>
    );
}

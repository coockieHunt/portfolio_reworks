import React from 'react';
import * as Style from "./style/ScrollTag.style";

/**
 * ScroolingTagComponent - Component for displaying a scrolling tag list with pulsing animation.
 *
 * @param {string[]} Tags - Array of tags to be displayed.
 * @param {number} [Duration=15000] - Duration of the animation loop in milliseconds.
 * @param {number} [Rows=5] - Number of rows in the tag list.
 * @param {number} [TagNumber=5] - Number of tags to display in each row.
 * @param {string} [Witdth=5] - Witdth of tags list
 * 
 * @returns {JSX.Element} React component.
 */
export const ScrollTagComponent = ({
    Tags, 
    Duration = 15000, 
    Rows = 5, 
    TagNumber = 5,
    Width = '30rem',
}) => {
    const shuffle = (arr) => [...arr].sort(() => .5 - Math.random());

    const InfiniteLoopSlider = ({ children, duration, reverse = false }) => {
        return (
            <Style.LoopSlider style={{
                '--duration': `${duration}ms`,
                '--direction': reverse ? 'reverse' : 'normal'
            }}>
                <div className='inner'>
                    {children}
                    {children}
                </div>
            </Style.LoopSlider>
        );
    };

    const Tag = ({ text }) => (<Style.Tag><span>#</span> {text}</Style.Tag>);

    return (
        <Style.TagList style={{ width: Width }}>
            {[...new Array(Rows)].map((_, i) => (
                <InfiniteLoopSlider key={i} duration={Duration} reverse={i % 2}>
                    {shuffle(Tags).slice(0, TagNumber).map(tag => (
                        <Tag text={tag} key={tag}/>
                    ))}
                </InfiniteLoopSlider>
            ))}
            <Style.Fade />
        </Style.TagList>
    );
};

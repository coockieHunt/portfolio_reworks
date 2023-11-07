import React from 'react';
import { Card } from './style/Card.style';
import { COLOR } from './config';

/**
 * CardComponent is a customizable React component for rendering cards with one or two columns.
 *
 * @param {number} width - The width of the card as a percentage (default is 100%).
 * @param {number} height - The height of the card (default is auto).
 * @param {string|ReactNode} leftContent - The content for the left column.
 * @param {string|ReactNode} rightContent - The content for the right column.
 * @param {number} leftWidth - The percentage width of the left column (default is 50%).
 * @param {number} rightWidth - The percentage width of the right column (default is 50%).
 * @param {number} padding - The padding value for the card (default is 15).
 * @param {boolean} singleColumn - If true, the card will display as a single column card.
 * @param {boolean} highlightRight - If true, highlights the right column with background color and border radius.
 * @param {string} flexDirection - The flex-direction property for the card (default is 'row').
 * @param {ReactNode} children - Additional child components.
 * @returns {JSX.Element} - The CardComponent JSX.
 */
export const CardComponent = ({
  width = 100,
  height = 'auto', 
  leftContent,
  rightContent,
  leftWidth = 50, 
  rightWidth = 50, 
  padding = 15,
  singleColumn = true,
  highlightRight = false,
  flexDirection = 'row', 
  children,
}) => {
  const rightColumnStyles = {
    backgroundColor: highlightRight ? COLOR.primary : 'transparent',
    borderRadius: highlightRight ? '10px' : '0',
  };

  if (leftWidth + rightWidth !== 100) {
    console.warn("Warning: The sum of leftWidth and rightWidth should equal 100%.");
  }

  if (singleColumn) {
    return (
      <Card style={{ padding: `${padding}px`, width: `${width}%`, height: height, flexDirection }}>
        {children}
      </Card>
    );
  } else {
    return (
      <Card style={{ padding: `${padding}px`, width: `${width}%`, height: height, flexDirection }}>
        <div className='Column' style={{ flexBasis: `${leftWidth}%` }}>
          {leftContent}
        </div>
        <div className='Column' style={{ flexBasis: `${rightWidth}%`, ...rightColumnStyles }}>
          {rightContent}
        </div>
      </Card>
    );
  }
};

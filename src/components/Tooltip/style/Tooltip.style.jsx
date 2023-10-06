import styled from 'styled-components';

// Styles for Tooltip Container
export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

// Styles for Tooltip Text
export const TooltipText = styled.div`
  visibility: hidden;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 1;
  font-size: 14px;
  max-width: 200px;
  text-align: center;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;



  /* Show tooltip text on hover */
  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;


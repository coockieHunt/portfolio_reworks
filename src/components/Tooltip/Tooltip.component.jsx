import React, { useState, useLayoutEffect, useRef } from "react";
import { TooltipContainer, TooltipText } from "./style/Tooltip.style";

export const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [moveLeft, setMoveLeft] = useState(0);
  const tooltipRef = useRef(null);

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const safe_zone = 30;

      if (tooltipRect.width + tooltipRect.right >= windowWidth) {
        const moveAmount = (tooltipRect.width + tooltipRect.right - windowWidth + safe_zone) / 2
        setMoveLeft(moveAmount);
      } else {
        setMoveLeft(0);
      }
    }

  }, [isVisible]);

  if(text !== undefined){
    return (
      <TooltipContainer onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
        {children}
        {isVisible && (
          <TooltipText
            ref={tooltipRef}
            className="tooltip"
            style={{
              left: "-" + moveLeft + "px",
            }}
          >
            {text}
          </TooltipText>
        )}
      </TooltipContainer>
    );
  }

  return children
};

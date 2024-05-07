import { useState, useCallback } from "react";
import "./ResizableDiv.css";

const DraggableResizableDiv = () => {
  const [dimensions, setDimensions] = useState({ width: 100, height: 100, x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleDown = (e, resize = false) => {
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    if (resize || e.touches) {
      e.preventDefault(); // Prevent default only when resizing or on touch devices
    }
    if (resize) {
      setIsDragging(false);
      setStartPosition({
        x: clientX,
        y: clientY,
        width: dimensions.width,
        height: dimensions.height,
        resize,
      });
    } else {
      setIsDragging(true);
      setStartPosition({
        x: clientX - dimensions.x,
        y: clientY - dimensions.y,
      });
    }
    e.stopPropagation();
  };

  const handleMove = useCallback(
    (e) => {
      if (isDragging || startPosition.resize) {
        e.preventDefault(); // Prevent default actions during active dragging or resizing
      }
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      if (isDragging) {
        setDimensions((dims) => ({
          ...dims,
          x: clientX - startPosition.x,
          y: clientY - startPosition.y,
        }));
      } else if (startPosition.resize) {
        let { width, height, x, y } = dimensions;
        const { width: startWidth, height: startHeight, x: startX, y: startY } = startPosition;

        if (startPosition.resize.includes("right")) {
          width = Math.max(50, startWidth + (clientX - startX));
        }
        if (startPosition.resize.includes("left")) {
          width = Math.max(50, startWidth - (clientX - startX));
          x = dimensions.x + (clientX - startX);
          if (width === 50) {
            x = dimensions.x + startWidth - 50;
          }
        }
        if (startPosition.resize.includes("bottom")) {
          height = Math.max(50, startHeight + (clientY - startY));
        }
        if (startPosition.resize.includes("top")) {
          height = Math.max(50, startHeight - (clientY - startY));
          y = dimensions.y + (clientY - startY);
          if (height === 50) {
            y = dimensions.y + startHeight - 50;
          }
        }

        setDimensions({ width, height, x, y });
      }
    },
    [isDragging, startPosition, dimensions]
  );

  const handleUp = () => {
    setIsDragging(false);
    setStartPosition({ ...startPosition, resize: false });
  };

  return (
    <div
      className="container"
      onMouseMove={handleMove}
      onMouseUp={handleUp}
      onMouseLeave={handleUp}
      onTouchMove={handleMove}
      onTouchEnd={handleUp}
      onTouchStart={(e) => e.preventDefault()} // Generally prevent default touch behavior for the entire container
    >
      <div
        className="resizable"
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px`, transform: `translate(${dimensions.x}px, ${dimensions.y}px)` }}
        onMouseDown={(e) => handleDown(e)}
        onTouchStart={(e) => handleDown(e)}
      >
        {/* Resize handlers */}
        <div className="resizer top" onMouseDown={(e) => handleDown(e, "top")} onTouchStart={(e) => handleDown(e, "top")}></div>
        <div className="resizer right" onMouseDown={(e) => handleDown(e, "right")} onTouchStart={(e) => handleDown(e, "right")}></div>
        <div className="resizer bottom" onMouseDown={(e) => handleDown(e, "bottom")} onTouchStart={(e) => handleDown(e, "bottom")}></div>
        <div className="resizer left" onMouseDown={(e) => handleDown(e, "left")} onTouchStart={(e) => handleDown(e, "left")}></div>
        <div className="resizer top-left" onMouseDown={(e) => handleDown(e, "top-left")} onTouchStart={(e) => handleDown(e, "top-left")}></div>
        <div className="resizer top-right" onMouseDown={(e) => handleDown(e, "top-right")} onTouchStart={(e) => handleDown(e, "top-right")}></div>
        <div className="resizer bottom-left" onMouseDown={(e) => handleDown(e, "bottom-left")} onTouchStart={(e) => handleDown(e, "bottom-left")}></div>
        <div className="resizer bottom-right" onMouseDown={(e) => handleDown(e, "bottom-right")} onTouchStart={(e) => handleDown(e, "bottom-right")}></div>
      </div>
    </div>
  );
};

export default DraggableResizableDiv;

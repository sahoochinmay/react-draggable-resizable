import { useState, useCallback } from "react";
import "./ResizableDiv.css";

const DraggableResizableDiv = () => {
  const [dimensions, setDimensions] = useState({ width: 100, height: 100, x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  console.log(startPosition);

  const onMouseDown = (e, resize = false) => {
    if (resize) {
      // Prepare for resizing
      setIsDragging(false);
      setStartPosition({
        x: e.clientX,
        y: e.clientY,
        width: dimensions.width,
        height: dimensions.height,
        resize,
      });
    } else {
      // Prepare for dragging
      setIsDragging(true);
      setStartPosition({
        x: e.clientX - dimensions.x,
        y: e.clientY - dimensions.y,
      });
    }
    e.stopPropagation();
  };

  const onMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setDimensions((dims) => ({
          ...dims,
          x: e.clientX - startPosition.x,
          y: e.clientY - startPosition.y,
        }));
      } else if (startPosition.resize) {
        let { width, height, x, y } = dimensions;
        const { width: startWidth, height: startHeight, x: startX, y: startY } = startPosition;

        if (startPosition.resize.includes("right")) {
          width = Math.max(50, startWidth + (e.clientX - startX));
        }
        if (startPosition.resize.includes("left")) {
          width = Math.max(50, startWidth - (e.clientX - startX));
          x = dimensions.x + (e.clientX - startX);
          if (width === 50) {
            // Prevent x from going beyond original when at min width
            x = dimensions.x + startWidth - 50;
          }
        }
        if (startPosition.resize.includes("bottom")) {
          height = Math.max(50, startHeight + (e.clientY - startY));
        }
        if (startPosition.resize.includes("top")) {
          height = Math.max(50, startHeight - (e.clientY - startY));
          y = dimensions.y + (e.clientY - startY);
          if (height === 50) {
            // Prevent y from going beyond original when at min height
            y = dimensions.y + startHeight - 50;
          }
        }

        setDimensions({ width, height, x, y });
      }
    },
    [isDragging, startPosition, dimensions]
  );

  const onMouseUp = () => {
    setIsDragging(false);
    setStartPosition({ ...startPosition, resize: false });
  };

  return (
    <div className="container" onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
      <div
        className="resizable"
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px`, transform: `translate(${dimensions.x}px, ${dimensions.y}px)` }}
        onMouseDown={onMouseDown} // Set up for dragging
      >
        {/* Resize handlers */}
        {/* <div className="resizer top" onMouseDown={(e) => onMouseDown(e, "top")}></div> */}
        {/* <div className="resizer right" onMouseDown={(e) => onMouseDown(e, "right")}></div> */}
        {/* <div className="resizer bottom" onMouseDown={(e) => onMouseDown(e, "bottom")}></div> */}
        {/* <div className="resizer left" onMouseDown={(e) => onMouseDown(e, "left")}></div> */}
        {/* <div className="resizer top-left" onMouseDown={(e) => onMouseDown(e, "top-left")}></div> */}
        {/* <div className="resizer top-right" onMouseDown={(e) => onMouseDown(e, "top-right")}></div> */}
        {/* <div className="resizer bottom-left" onMouseDown={(e) => onMouseDown(e, "bottom-left")}></div> */}
        <div className="resizer bottom-right" onMouseDown={(e) => onMouseDown(e, "bottom-right")}></div>
      </div>
    </div>
  );
};

export default DraggableResizableDiv;

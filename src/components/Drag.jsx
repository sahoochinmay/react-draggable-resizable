import React, { useState } from "react";
import Draggable from "react-draggable";
import Resizable from "react-resizable";

const ResizableDraggable = ({ onResize, onDrag }) => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  const handleResize = (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
    onResize(size);
  };

  const handleDrag = (event, { x, y }) => {
    onDrag({ x, y });
  };

  return (
    <Draggable onDrag={handleDrag}>
      <Resizable width={width} height={height} onResize={handleResize} minConstraints={[10, 10]} maxConstraints={[300, 300]}>
        <div style={{ background: "gray" }}>
          <p>Width: {width}</p>
          <p>Height: {height}</p>
        </div>
      </Resizable>
    </Draggable>
  );
};

const Drag = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  const handleDrag = (newPosition) => {
    setPosition(newPosition);
  };

  const handleResize = (newSize) => {
    setSize(newSize);
  };

  return (
    <div
      style={{
        position: "relative",
        height: 300,
        width: 300,
        border: "1px solid black",
      }}
    >
      <ResizableDraggable onDrag={handleDrag} onResize={handleResize} />
    </div>
  );
};

export default Drag;

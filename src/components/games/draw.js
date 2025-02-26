import React, { useRef, useEffect, useState } from "react";
import Button from "../atoms/button";
import Modal from "../atoms/modal";
import HowToPlay from "../atoms/howToPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faForward,
  faWhiskeyGlass,
  faRotateRight,
  faCircleRight,
  faQuestionCircle,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import GameInstructions from "../molecules/gameInstructions";

function Draw({ onNextGame }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(true);
  const [selectedColor, setSelectedColor] = useState("black");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.6;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = selectedColor;
    ctxRef.current = ctx;
  }, [selectedColor]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const startDrawing = (e) => {
    e.preventDefault();
    const { offsetX, offsetY } = getPointerPosition(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { offsetX, offsetY } = getPointerPosition(e);
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getPointerPosition = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.touches ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const offsetY = e.touches ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;
    return { offsetX, offsetY };
  };

  return (
    <div className="draw-container">
      <button className="hint" onClick={() => setIsInfoModalOpen(true)}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </button>
      <h1>Draw</h1>
      {/* <div className="color-picker">
        {["black", "red", "blue", "green"].map((color) => (
          <button
            key={color}
            className="color-block"
            style={{ backgroundColor: color, border: selectedColor === color ? "2px solid white" : "none" }}
            onClick={() => setSelectedColor(color)}
          ></button>
        ))}
      </div> */}
      <canvas
        ref={canvasRef}
        className="draw-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      ></canvas>
      <div className="button-wrapper">
        <Button icon={faEraser} variant="secondary" onClick={clearCanvas} text="Clear" />
        <Button icon={faCircleRight} variant="pushable red" onClick={onNextGame} text="Next Game" />
      </div>
      {isInfoModalOpen && (
        <HowToPlay
          title="Draw"
          description={
            <GameInstructions
              steps={[
                {
                  icon: faWhiskeyGlass,
                  text: "Loser drinks",
                },
              ]}
            />
          }
          buttons={[
            {
              icon: faForward,
              text: "Skip game",
              variant: "secondary",
              onClick: onNextGame,
            },
            {
              icon: faGamepad,
              text: "Play game",
              variant: "pushable red",
              onClick: () => setIsInfoModalOpen(false),
            },
          ]}
          onClose={() => setIsInfoModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Draw;

import React, { useEffect, useRef } from "react";
import Button from "./button";

function HowToPlay({ title, description, buttons, onClose }) {
  const containerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !footerRef.current) return;

    const steps = containerRef.current.querySelectorAll(
      ".game-instructions li"
    ).length;
    if (steps === 0) return;

    // Step delay needs to be same as CSS transition delay in game-instructions.scss
    const stepDelay = 1000;
    const lastStepDelay = 1300 + (steps - 1) * stepDelay;

    // Add fade-in class after steps are done
    const timeoutId = setTimeout(() => {
      if (footerRef.current) {
        footerRef.current.classList.add("fade-in-footer");
      }
    }, lastStepDelay);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="how-to-play" ref={containerRef}>
      <p className="how-to-play-title">{title}</p>
      {description}

      <footer ref={footerRef} className="footer-hidden">
        {buttons.map((button, index) => (
          <Button
            key={index}
            icon={button.icon || null}
            text={button.text}
            variant={`${button.variant}`}
            dataTestId={button.dataTestId}
            onClick={() => {
              button.onClick ? button.onClick() : onClose();
            }}
          />
        ))}
      </footer>
    </div>
  );
}

export default HowToPlay;

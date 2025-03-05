import React, { useEffect, useRef } from "react";
import Button from "./button";

function HowToPlay({ title, description, buttons, onClose }) {
  const containerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    // Add overflow hidden to body when modal is open
    document.body.style.overflow = "hidden";

    // Cleanup: reset body overflow when the component is unmounted or modal is closed
    return () => {
      document.body.style.overflow = "";
    };
  }, []); // This effect runs once when the component mounts and cleans up when unmounted

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
    setTimeout(() => {
      footerRef.current.classList.add("fade-in-footer");
    }, lastStepDelay);
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

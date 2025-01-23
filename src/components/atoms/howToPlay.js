import React from "react";
import Button from "./button";

function HowToPlay({ title, description, buttons, onClose }) {
  return (
      <div
        className="how-to-play"
      >
        <header>
          <h2>{title}</h2>
        </header>

        <section>
          <p>{description}</p>
        </section>

        <footer>
          {buttons.map((button, index) => (
            <Button
              key={index}
              icon={button.icon || null} // Allow optional icons for buttons
              text={button.text}
              variant={`${button.variant}`}
              onClick={() => {
                button.onClick ? button.onClick() : onClose(); // Call button's action or close modal
              }}
            />
          ))}
        </footer>
      </div>
  );
}

export default HowToPlay;

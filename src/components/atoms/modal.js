import React, { useState } from "react";

function Modal({ title, description, buttons, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false); // Dismiss the modal
    if (onClose) onClose(); // Call the parent-provided callback if needed
  };

  if (!isVisible) return null; // Do not render if dismissed

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-description">{description}</p>
        <div className="modal-buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`btn ${button.variant || "primary"}`}
              onClick={button.onClick}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;

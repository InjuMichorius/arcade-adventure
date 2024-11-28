import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhiskeyGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/button";

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
        <FontAwesomeIcon icon={faCircleXmark} className='icon' />
        </button>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-description">{description}</p>
        <div className="modal-buttons">
          {buttons.map((button, index) => (
            <Button
            icon={faWhiskeyGlass}
            text={button.text}
              key={index}
              variant={`${button.variant}`}
              onClick={() => {
                button.onClick?.(); // Execute the button's action if provided
                handleClose(); // Close the modal after the button action
              }}
            >
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;

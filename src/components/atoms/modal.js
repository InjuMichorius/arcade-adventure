import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/button";

function Modal({ title, description, buttons, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button className="modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faCircleXmark} className="icon" />
        </button>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-description">{description}</p>
        <div className="modal-buttons">
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
        </div>
      </div>
    </div>
  );
}

export default Modal;

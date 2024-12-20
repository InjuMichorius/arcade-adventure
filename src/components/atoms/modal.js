import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/button";

function Modal({ title, description, buttons, onClose }) {
  return (
    <>
      <dialog
        className="modal"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <header>
          <h3 className="modal__title">{title}</h3>
          <button className="modal__close" onClick={onClose}>
            <FontAwesomeIcon icon={faCircleXmark} className="icon" />
          </button>
        </header>

        <section className="modal__content">{description}</section>

        <footer className="modal__buttons">
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
      </dialog>
      <div className="backdrop" onClick={onClose}></div>
    </>
  );
}

export default Modal;

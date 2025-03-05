import React, { forwardRef } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Button from "../atoms/button";

const NameInput = forwardRef(({ id, onNameChange, onDelete, avatar }, ref) => {
  const handleNameChange = (event) => {
    onNameChange(id, event.target.value);
  };

  return (
    <div className="name-input-wrapper">
      <div className="avatar-select-container">
        <img src={avatar} alt="avatar" />
      </div>
      <input
        ref={ref} // Forwarded ref to allow focusing
        type="text"
        placeholder="Enter name..."
        onChange={handleNameChange}
        maxLength="8"
      />
      <Button icon={faTrash} onClick={() => onDelete(id)} />
    </div>
  );
});

NameInput.propTypes = {
  id: PropTypes.number.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default NameInput;

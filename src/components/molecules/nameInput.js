import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function NameInput({ id, onNameChange, onDelete }) {
  const handleNameChange = (event) => {
    onNameChange(id, event.target.value);
  };

  return (
    <div className="name-input-wrapper">
      <FontAwesomeIcon icon={faCircleUser} className="icon" />
      <input type="text" placeholder="Spelernaam" onChange={handleNameChange} />
      <FontAwesomeIcon icon={faTrash} className="icon" onClick={onDelete} />
    </div>
  );
}

NameInput.propTypes = {
  id: PropTypes.number.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NameInput;

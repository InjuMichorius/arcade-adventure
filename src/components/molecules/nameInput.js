import React from "react";
import { faCircleUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Button from "./button";

function NameInput({ id, onNameChange, onDelete }) {
  const handleNameChange = (event) => {
    onNameChange(id, event.target.value);
  };

  return (
    <div className="name-input-wrapper">
      <Button icon={faCircleUser}  />
      <input type="text" placeholder="Spelernaam" onChange={handleNameChange} />
      <Button icon={faTrash} onClick={onDelete} />
    </div>
  );
}

NameInput.propTypes = {
  id: PropTypes.number.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NameInput;

import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Button from "../atoms/button";
import AvatarSelect from "../molecules/avatarSelect";

function NameInput({ id, onNameChange, onDelete }) {
  const handleNameChange = (event) => {
    onNameChange(id, event.target.value);
  };

  return (
    <div className="name-input-wrapper">
      <AvatarSelect />
      <input
        type="text"
        placeholder="Enter name.."
        onChange={handleNameChange}
      />
      <Button icon={faTrash} onClick={() => onDelete(id)} />
    </div>
  );
}

NameInput.propTypes = {
  id: PropTypes.number.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NameInput;

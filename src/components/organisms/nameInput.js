import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Button from "../molecules/button";
import AvatarSelect from "../molecules/avatarSelect";

function NameInput({ id, name, avatar, onNameChange, onDelete, onAvatarChange }) {
  const handleNameChange = (event) => {
    onNameChange(id, event.target.value);
  };

  const handleAvatarChange = (selectedAvatar) => {
    onAvatarChange(id, selectedAvatar);
  };

  return (
    <div className="name-input-wrapper">
      <AvatarSelect selectedAvatar={avatar} onAvatarChange={handleAvatarChange} />
      <input
        type="text"
        placeholder="Enter name.."
        value={name}
        onChange={handleNameChange}
      />
      <Button icon={faTrash} onClick={() => onDelete(id)} />
    </div>
  );
}

NameInput.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAvatarChange: PropTypes.func.isRequired,
};

export default NameInput;

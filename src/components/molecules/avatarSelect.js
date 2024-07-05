import React from "react";
import avatar from "../../assets/images/character1.png";

function AvatarSelect({ id, name, onNameChange, onDelete }) {
  return (
    <div className="avatar-select-container">
      <img src={avatar} alt="avatar" />
    </div>
  );
}

export default AvatarSelect;

import React, { useState } from "react";
import PropTypes from "prop-types";
import avatar1 from "../../assets/images/character1.png";
import avatar2 from "../../assets/images/character2.png";
import avatar3 from "../../assets/images/character3.png";
import avatar4 from "../../assets/images/character4.png";

// Mapping avatar names to image paths
const avatarMap = {
  avatar1: avatar1,
  avatar2: avatar2,
  avatar3: avatar3,
  avatar4: avatar4,
};

function AvatarSelect({ selectedAvatar, onAvatarChange }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClick = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleAvatarSelect = (event) => {
    onAvatarChange(event.target.value); // Call parent's function to update avatar selection
    setModalIsOpen(false);
    console.log(event.target.value)
  };

  return (
    <>
      <div onClick={handleClick} className="avatar-select-container">
        <img src={selectedAvatar} alt="Selected avatar" />
        <h1>{selectedAvatar ? selectedAvatar : "nothing"}</h1>
      </div>
      {modalIsOpen && (
        <div className="modal">
          <form>
            <p onClick={handleClick}>CLOSE</p>
            {Object.entries(avatarMap).map(([key, src]) => (
              <label key={key}>
                <img src={src} alt={key} width={100} />
                <input
                  type="radio"
                  name="avatar"
                  value={key}
                  checked={selectedAvatar === key}
                  onChange={handleAvatarSelect}
                />
              </label>
            ))}
          </form>
        </div>
      )}
    </>
  );
}

AvatarSelect.propTypes = {
  selectedAvatar: PropTypes.string.isRequired,
  onAvatarChange: PropTypes.func.isRequired,
};

export default AvatarSelect;

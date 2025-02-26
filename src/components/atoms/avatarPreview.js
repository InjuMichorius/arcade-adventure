import React from "react";
import { faWineBottle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AvatarPreview({ width, image, points }) {
  return (
    <div className="avatar-preview">
      <img src={image} alt="Avatar" width={width} />
      {points && (
        <p className="points-text">
          {points}
          <FontAwesomeIcon icon={faWineBottle} className="icon" />
        </p>
      ) }
    </div>
  );
}

export default AvatarPreview;

import React from "react";

function AvatarPreview({ imageId, points = 0, username  = "Username" }) {

  return (
    <div className="avatar-preview-container">
      {imageId}
      {points}
      {username}
    </div>
  );
}

export default AvatarPreview;

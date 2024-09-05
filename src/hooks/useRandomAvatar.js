import { useState, useEffect } from "react";
import avatar0 from "../assets/images/avatars/avatar0.avif";
import avatar1 from "../assets/images/avatars/avatar1.avif";
import avatar2 from "../assets/images/avatars/avatar2.avif";
import avatar3 from "../assets/images/avatars/avatar3.avif";
import avatar4 from "../assets/images/avatars/avatar4.avif";
import avatar5 from "../assets/images/avatars/avatar5.avif";
import avatar6 from "../assets/images/avatars/avatar6.avif";
import avatar7 from "../assets/images/avatars/avatar7.avif";
import avatar8 from "../assets/images/avatars/avatar8.avif";
import avatar9 from "../assets/images/avatars/avatar9.avif";

const avatarImages = [avatar0, avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

export function useRandomAvatar() {
  const loadAvailableAvatars = () => {
    const storedAvatars = JSON.parse(localStorage.getItem("availableAvatars"));
    return storedAvatars ? storedAvatars : avatarImages;
  };

  const [availableAvatars, setAvailableAvatars] = useState(loadAvailableAvatars);

  useEffect(() => {
    localStorage.setItem("availableAvatars", JSON.stringify(availableAvatars));
  }, [availableAvatars]);

  const getRandomAvatar = () => {
    if (availableAvatars.length === 0) return null;
    const randomAvatarIndex = Math.floor(Math.random() * availableAvatars.length);
    const selectedAvatar = availableAvatars[randomAvatarIndex];

    // Remove the selected avatar from the pool
    setAvailableAvatars((prevAvatars) =>
      prevAvatars.filter((_, index) => index !== randomAvatarIndex)
    );

    return selectedAvatar;
  };

  const returnAvatar = (avatar) => {
    // Add the avatar back to the available avatars
    setAvailableAvatars((prevAvatars) => [...prevAvatars, avatar]);
  };

  return { getRandomAvatar, returnAvatar, availableAvatars };
}

export default useRandomAvatar;

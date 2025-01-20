import React, { useEffect } from "react";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/button";
import logo from "../../assets/images/homepage-logo.svg";
import { useNavigate } from "react-router-dom";

import avatar0 from "../../assets/images/avatars/avatar0.avif";
import avatar1 from "../../assets/images/avatars/avatar1.avif";
import avatar2 from "../../assets/images/avatars/avatar2.avif";
import avatar3 from "../../assets/images/avatars/avatar3.avif";
import avatar4 from "../../assets/images/avatars/avatar4.avif";
import avatar5 from "../../assets/images/avatars/avatar5.avif";
import avatar6 from "../../assets/images/avatars/avatar6.avif";
import avatar7 from "../../assets/images/avatars/avatar7.avif";
import avatar8 from "../../assets/images/avatars/avatar8.avif";
import avatar9 from "../../assets/images/avatars/avatar9.avif";

const avatarImages = [
  avatar0,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
];

function Index() {
  const navigate = useNavigate();

  const handleSetPlayers = () => {
    navigate("/manage-players");
  };

  return (
    <div className="homepage-container">
      <main className="homepage-container__content">
        <img src={logo} width={260} className="slide-up"/>
        <div className="marquee-container slide-up">
          <div className="marquee">
            {avatarImages.map((avatar, index) => (
              <img key={index} src={avatar} alt={`Avatar ${index}`} />
            ))}
            {avatarImages.map((avatar, index) => (
              <img
                key={`clone-${index}`}
                src={avatar}
                width={150}
                height={150}
                alt={`Clone Avatar ${index}`}
              />
            ))}
          </div>
        </div>
        <ul className="slide-up">
          <li>
            <Button
              icon={faGamepad}
              variant="pushable red"
              onClick={handleSetPlayers}
              text="Play game"
            />
          </li>
        </ul>
      </main>
    </div>
  );
}

export default Index;

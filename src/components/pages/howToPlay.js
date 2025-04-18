import { useNavigate } from "react-router-dom";
import {
    faWhiskeyGlass
  } from "@fortawesome/free-solid-svg-icons";
import Button from "../atoms/button"
import GameInstructions from "../molecules/gameInstructions";

function HowToPlay() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/arcade-adventure");
  }
  return (
    <div className="no-page">
        <Button onClick={handleClick} text="Back"/>
        <GameInstructions
              steps={[
                {
                    icon: faWhiskeyGlass,
                  text: (
                    <>
                      How to play
                    </>
                  ),
                },
              ]}
            />

    </div>
  );
}

export default HowToPlay;

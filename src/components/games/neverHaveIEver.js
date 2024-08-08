import React from "react";
import Button from "../atoms/button";
import avatar from "../../assets/images/character1.png";


function NeverHaveIEver({ onNextGame }) {
  return (
    <div className="tic-tac-toe-container">
      <h1>Never have i ever</h1>
      <img src={avatar} alt="avatar" width={100} />
      <p className="description">
        "To play 'Never Have I Ever,' take turns making statements about
        something you've never done, and anyone who has done it must take a sip
        of their drink or lose a point."
      </p>
      <div>
        <Button
          variant="primary"
          onClick={() => console.log("play again")}
          text="Play again"
        />
        <Button variant="secondary" onClick={onNextGame} text="Next Game" />
      </div>
    </div>
  );
}

export default NeverHaveIEver;

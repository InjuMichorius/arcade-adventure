import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarPreview from "../atoms/avatarPreview";

const GameInstructions = ({ steps }) => {
  return (
    <ul className="game-instructions">
      {steps.map((step, index) => (
        <li key={index}>
          {step.icon && (
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={step.icon} width={12} />
            </div>
          )}
          {step.avatar && step.name && (
            <AvatarPreview width={30} image={step.avatar} alt={step.name} />
          )}
          <span className="step-text">{step.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default GameInstructions;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSound } from "../../providers/soundProvider"; // adjust path as needed

function Button({ variant, onClick, icon, text, disabled }) {
  const isPushable = variant?.includes("pushable");
  const { playClick } = useSound();

  const handleClick = (e) => {
    if (!disabled) {
      playClick();
      onClick?.(e);
    }
  };

  return (
    <button onClick={handleClick} className={variant} disabled={disabled}>
      {isPushable && (
        <>
          <span className="shadow"></span>
          <span className="edge"></span>
        </>
      )}
      <span className="front">
        {icon && <FontAwesomeIcon icon={icon} className="icon" />}
        {text}
      </span>
    </button>
  );
}

export default Button;

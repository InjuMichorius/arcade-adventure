import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({ variant, onClick, icon, text, disabled }) {
  const isPushable = variant?.includes("pushable");

  return (
    <button onClick={onClick} className={variant} disabled={disabled}>
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

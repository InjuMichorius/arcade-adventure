import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({variant, onClick, icon, text}) {
    return (
      <button onClick={onClick} className={variant}><FontAwesomeIcon icon={icon} className='icon' />{text}</button>
    );
  }
  
  export default Button;
  
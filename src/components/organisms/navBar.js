import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <nav className="navbar-container">
      <img src={logo} alt="Logo" className="logo" />
      <FontAwesomeIcon icon={faBars} className="hamburger" />
    </nav>
  );
}

export default NavBar;

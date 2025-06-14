import { useNavigate } from "react-router-dom";
import Button from "../atoms/button"

function NoPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/arcade-adventure");
  }
  return (
    <div className="no-page">
        <h1>No page found</h1>
        <p>Oops, looks like you're in a place of the website you don't belong.</p>
        <Button onClick={handleClick} text="Back to home"/>
    </div>
  );
}

export default NoPage;

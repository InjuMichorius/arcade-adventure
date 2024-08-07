import { useNavigate } from "react-router-dom";
import Button from "../atoms/button"

function NoPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/react-doodles");
  }
  return (
    <div className="no-page">
        <h1>No page found</h1>
        <p>Oops, looks like your'e in a place of the website you don't belong.</p>
    </div>
  );
}

export default NoPage;

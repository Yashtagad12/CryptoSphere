import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const date = new Date();
  const currentyear = date.getFullYear();

  return (
    <div className="footer">
      <p>
        Copyright @ {currentyear}, <Link to={"/"}>CryptoSphere</Link> . All
        Rights Reserved
      </p>
    </div>
  );
};

export default Footer;

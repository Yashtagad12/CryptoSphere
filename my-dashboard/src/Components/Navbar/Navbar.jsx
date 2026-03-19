import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import arrow_icon from "../../assets/arrow_icon.png";
import logo from "../../assets/logo.png";
import { CoinContext } from "../../Context/CoinContext";
import "./Navbar.css";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
    // Optional: close mobile menu after selection
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-header">
        <Link to="/">
          <img src={logo} alt="CryptoSphere Logo" className="logo" />
        </Link>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </div>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/features" onClick={() => setMenuOpen(false)}>
            Features
          </Link>
        </li>
        <li>
          <Link to="/pricing" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
        </li>
        <li>
          <Link to="/blogs" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
        </li>
      </ul>

      {/* Right side - currency + signup */}
      <div className="nav-right">
        <select onChange={currencyHandler} defaultValue="usd">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>

        <button>
          Sign Up
          <img src={arrow_icon} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

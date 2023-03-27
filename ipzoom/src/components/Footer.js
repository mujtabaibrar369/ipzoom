import "./Footer.css";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import Subscribe from "../buttons/Subscribe";
const Footer = (props) => {
    return (
      <div className="footer-navbar">
        <div className="footer-container">
            <div className="footer-logo-div">
                <Link to="/">
                    <img className="footer-logo" src={Logo} alt="" />
                </Link>
            </div>
            <div className="footer-product-div">
                <h5 className="product-text">Product</h5>
                <ul className="product-list">
                    <li className="product-li"><a className="li-link" href="#">Features</a></li>
                    <li className="product-li"><a className="li-link" href="#">Pricing</a></li>
                    <li className="product-li"><a className="li-link" href="#">Docs</a></li>
                    <li className="product-li"><a className="li-link" href="#">Blog</a></li>
                </ul>
            </div>
            <div className="footer-support-div">
                <h5 className="product-text">Support</h5>
                <a className="li-link" href="#">Contact Us</a>
            </div>
            <div className="subscription-div">
                <div>
                    <input
                        type="email"
                        placeholder="your email"
                        className="email-div"
                    />
                    <Subscribe></Subscribe>
                </div>
            </div>
        </div>
      </div>
    );
  };
  export default Footer;
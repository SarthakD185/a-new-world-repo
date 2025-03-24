import "../assets/css/Footer.css";
import logo from "../assets/images/ANewWorldTitleTextWhiteOnClear.png";
import { useNavigate } from 'react-router-dom';

function Footer() {

    const navigate = useNavigate();

    return (
        <div id="footer">

            <div id="footerLinks">
                
                <div id='footerBrandBtn'>
                    <img src={logo} alt="A New World Logo" onClick={() => navigate("/")}/>
                </div>

                <div id="footerTextLinksContainer">
                    <span onClick={() => navigate("/aboutus")}>About Us</span>
                    <span onClick={() => navigate("/privacyPolicy")}>Privacy Policy</span>
                    <span onClick={() => navigate("/privacyPolicy")}>Licensing</span>
                    <span onClick={() => navigate("/aboutus")}>Contact</span>
                </div>
            </div>

            

            <div id="footerCopyright">
                <hr/>
                <p>Copyright © 2025 Debug Frogs</p>
            </div>

        </div>
    );
}

export default Footer;

import "../assets/css/Footer.css";
import logo from "../assets/images/ANewWorldTitleTextWhiteOnClear.png";
import { useNavigate } from 'react-router-dom';

function Footer() {

    const navigate = useNavigate();

    return (
        <div id="footer">

            <div id="footerLinks">
                
                <div id='footerBrandBtn'>
                    <img src={logo} alt="A New World Logo" onClick={() => {navigate("/"); window.scrollTo(0, 0);}}/>
                </div>

                <div id="footerTextLinksContainer">
                    <span onClick={() => {navigate("/aboutus"); window.scrollTo(0, 0);}}>About Us</span>
                    <span onClick={() => {navigate("/privacyPolicy"); window.scrollTo(0, 0);}}>Privacy Policy</span>
                    <span onClick={() => {navigate("/security"); window.scrollTo(0, 0);}}>Security</span>
                    <span onClick={() => {navigate("/aboutus"); window.scrollTo(0, 0);}}>Contact</span>
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

import "../assets/css/Footer.css";
import logo from "../assets/images/ANewWorldTitleTextWhiteOnClear.png";


function Component() {
  return (
    <div id="footer">

        <div id="footerLinks">
            <button id="footerBrandBtn" onClick={() => window.location.replace("/#home")}>
                <img src={logo} alt="A New World Logo" />
                {/* <h1>A New World</h1> */}
            </button>

            <div id="footerTextLinksContainer">
                <a href="#">About</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Licensing</a>
                <a href="#">Contact</a>
            </div>
        </div>

        

        <div id="footerCopyright">
            <hr/>
            <p>Copyright © 2025 Debugging Frogs</p>
        </div>

    </div>
  );
}

export default Component;

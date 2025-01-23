import * as React from 'react';
import '../App.css';
import logo from '../assets/images/ANewWorldTitleTextWhiteOnClear.png';

function NavBar() {
  return (
    <div className='sticky navBar'>
      <div className='navGroup'>
        <div onClick={() => window.location.replace("/")} className='navItem'>
          <img src={logo}></img>
        </div>
        <div onClick={() => window.location.replace("/tournament")} className='navItem'>
          <span>Tournament</span>
        </div>
        <div onClick={() => window.location.replace("/gallery")} className='navItem'>
          <span>Gallery</span>
        </div>
        <div onClick={() => window.location.replace("/colleges")} className='navItem'>
          <span>Colleges</span>
        </div>
        <div onClick={() => window.location.replace("/aboutus")} className='navItem'>
          <span>About Us</span>
        </div>
      </div>

      <div className='navGroup'>
        <div onClick={() => window.location.replace("/signin")} className='navItem'>
          <span>Login</span>
        </div>
        <div onClick={() => window.location.replace("/signup")} className='navItem'>
          <span>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
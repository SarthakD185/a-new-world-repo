import * as React from 'react';
import '../App.css';

function NavBar() {
  return (
    <div className='sticky navBar'>
      <div onClick={() => window.location.replace("/")} className='navItem'>
        <span>A New World</span>
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
  );
}

export default NavBar;
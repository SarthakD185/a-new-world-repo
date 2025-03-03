import * as React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';
import '../assets/css/NavBarMobile.css';
import logo from '../assets/images/ANewWorldTitleTextWhiteOnClear.png';
import hamburger from '../assets/images/Hamburger.svg';

function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);


  // function myFunction() {
  //   // // when the hamburger menu is clicked, it will toggle the expanded class on the navGroup
  //   var navGroups = document.getElementsByClassName("navGroup");
  //   for (var i = 0; i < navGroups.length; i++) {
  //     navGroups[i].classList.toggle("expanded");
  //   }
  // }

  useEffect(() => {
    //grab the navGroups and the hamburger menu,
    // check if the click is outside the navGroup and the hamburger menu,
    // if it is, then set the isExpanded state to false
    const handleClickOutside = (event) => {
      const navGroups = document.querySelector('.navGroup');
      const hamburger = document.getElementById('navHamburger');
      console.log(navGroups);
      
      // if the click is outside the navGroup and the hamburger menu, then set the isExpanded state to false

      //when there is a click event on screen,
        //does navGroups exist? does the hamburger icon exist? If yes, check if these contain the clicked element. Then,
        //if it is outside both, then set the isExpanded state to false
        //changed the .expanded status of the navGroup to false
      if (!navGroups?.contains(event.target) && !hamburger?.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    // add an EventListener to the document to handle clicks outside the navGroup and the hamburger menu using the handleClickOutside function
    document.addEventListener('click', handleClickOutside);

    // return a cleanup function to remove the EventListener when done/when the component unmounts
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  //toggle the isExpanded state to open and close the mobile menu
  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='sticky navBar'>
      <div className={`navGroup ${isExpanded ? 'expanded' : ''}`}>
        <span onClick={() => window.location.replace("/")} className='navItem'>
          <img src={logo} alt="Logo" className='navItem' />
        </span>
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

      <div className={`navGroup ${isExpanded ? 'expanded' : ''}`}>
        <div onClick={() => window.location.replace("/signin")} className='navItem'>
          <span>Login</span>
        </div>
        <div onClick={() => window.location.replace("/signup")} className='navItem'>
          <span>Sign Up</span>
        </div>
      </div>

      <img 
        src={hamburger} 
        id='navHamburger'
        onClick={toggleMenu}
        alt="Menu"
      />
    </div>
  );
}

export default NavBar;
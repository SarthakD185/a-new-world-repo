import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { AccountContext } from '../Account'; 
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../assets/css/NavBarMobile.css';
import logo from '../assets/images/ANewWorldTitleTextWhiteOnClear.png';
import hamburger from '../assets/images/Hamburger.svg';

function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isAuthenticated, role, logout } = useContext(AccountContext);//role access
  const navigate = useNavigate();
  const menuRef = React.useRef(null);

  // Debug logs
  useEffect(() => {
    console.log('NavBar - Authentication State:', { isAuthenticated, role });
  }, [isAuthenticated, role]);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSignOut = async () => {
    logout(); 
    navigate('/'); 
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          event.target.id !== 'navHamburger') {
        setIsExpanded(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  // Close menu when navigation occurs
  const handleNavigation = (path) => {
    setIsExpanded(false);
    navigate(path);
  };

  //re render when context is available
  useEffect(() => {
    //render
  }, [isAuthenticated, role]);

  return (
    <div className={`sticky navBar ${isExpanded ? 'expanded' : ''}`} ref={menuRef}>
      <div className={`navGroup firstGroupInExpandedHamburger ${isExpanded ? 'expanded' : ''}`}>
        <span onClick={() => handleNavigation("/")} className='navItem logoItem'>
          <img src={logo} alt="Logo" className='navItem' />
        </span>
        <div onClick={() => handleNavigation("/tournament")} className='navItem'>
          <span>Tournament</span>
        </div>
        <div onClick={() => handleNavigation("/gallery")} className='navItem'>
          <span>Gallery</span>
        </div>
        <div onClick={() => handleNavigation("/colleges")} className='navItem'>
          <span>Colleges</span>
        </div>
        <div onClick={() => handleNavigation("/aboutus")} className='navItem'>
          <span>About Us</span>
        </div>
      </div>

      <div className={`navGroup ${isExpanded ? 'expanded' : ''}`}>
        {isAuthenticated ? (
          <>
            {/* Debug comment */}
            {console.log('NavBar Render - Current Role:', role)}
            
            {/* Admin Links */}
            {role === 'Admin' && (
              <>
                <div onClick={() => handleNavigation("/adminLanding")} className='navItem'>
                  <span>Admin Landing</span>
                </div>
                <div onClick={() => handleNavigation("/reports")} className='navItem'>
                  <span>Reports</span>
                </div>
              </>
            )}

            {/* Moderator Links */}
            {role === 'Moderator' && (
              <>
                <div onClick={() => handleNavigation("/moderatorLanding")} className='navItem'>
                  <span>Moderator Landing</span>
                </div>
              </>
            )}

            {/* Marketer Links */}
            {role === 'Marketer' && (
              <>
                <div onClick={() => handleNavigation("/marketer")} className='navItem'>
                  <span>Marketer Landing</span>
                </div>
              </>
            )}
            
            {/* Profile and Logout */}
            <div onClick={() => handleNavigation("/profile")} className='navItem'>
              <span>Profile</span>
            </div>
            <div onClick={() => {
              setIsExpanded(false);
              handleSignOut();
            }} className='navItem'>
              <span>Log Out</span>
            </div>
          </>
        ) : (
          <>
            <div onClick={() => handleNavigation("/signin")} className='navItem'>
              <span>Login</span>
            </div>
            <div onClick={() => handleNavigation("/signup")} className='navItem'>
              <span>Sign Up</span>
            </div>
          </>
        )}
      </div>

      {/* Hamburger Icon */}
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

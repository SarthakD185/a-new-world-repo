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

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSignOut = async () => {
    logout(); 
    navigate('/'); 
  };

  //re render when context is available
  useEffect(() => {
    //render
  }, [isAuthenticated, role]);

  return (
    <div className='sticky navBar'>
      <div className={`navGroup ${isExpanded ? 'expanded' : ''}`}>
        <span onClick={() => navigate("/")} className='navItem'>
          <img src={logo} alt="Logo" className='navItem' />
        </span>
        <div onClick={() => navigate("/tournament")} className='navItem'>
          <span>Tournament</span>
        </div>
        <div onClick={() => navigate("/gallery")} className='navItem'>
          <span>Gallery</span>
        </div>
        <div onClick={() => navigate("/colleges")} className='navItem'>
          <span>Colleges</span>
        </div>
        <div onClick={() => navigate("/aboutus")} className='navItem'>
          <span>About Us</span>
        </div>
      </div>

      <div className={`navGroup ${isExpanded ? 'expanded' : ''}`}>
        {isAuthenticated ? (
          <>
            {/* Admin Links */}
            {role === 'Admin' && (
              <>
                <div onClick={() => navigate("/adminLanding")} className='navItem'>
                  <span>Admin Landing</span>
                </div>
                <div onClick={() => navigate("/adminManageUsers")} className='navItem'>
                  <span>Manage Users</span>
                </div>
                <div onClick={() => navigate("/adminTasks")} className='navItem'>
                  <span>Uncompleted Tasks</span>
                </div>
              </>
            )}

            {/* Moderator Links */}
            {role === 'Moderator' && (
              <>
                <div onClick={() => navigate("/moderatorLanding")} className='navItem'>
                  <span>Moderator Landing</span>
                </div>
                <div onClick={() => navigate("/moderatorUsers")} className='navItem'>
                  <span>Manage Users</span>
                </div>
                <div onClick={() => navigate("/moderatorTasks")} className='navItem'>
                  <span>Uncompleted Tasks</span>
                </div>
              </>
            )}

            
            {/* USER DIV MISSING. page wont redirect because the user == is not here.*/}
            {/* Profile and Logout */}
            {/* <div onClick={() => navigate("/profile", { profile:{collegeId: profileCollegeId, collegeAffiliation: profileCollegeAffiliation, name: profileName, fullName: profileFullName, username: profileUsername, email: profileEmail, image: profileImage} })} className='navItem'> */}
            <div onClick={() => navigate("/profile")} className='navItem'>
              <span>Profile</span>
            </div>
            <div onClick={handleSignOut} className='navItem'>
              <span>Log Out</span>
            </div>
          </>
        ) : (
          <>
            <div onClick={() => navigate("/signin")} className='navItem'>
              <span>Login</span>
            </div>
            <div onClick={() => navigate("/signup")} className='navItem'>
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

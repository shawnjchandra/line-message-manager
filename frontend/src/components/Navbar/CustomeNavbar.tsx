import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './CustomNavbar.scss';
import farsLogo from '../../assets/FARS_logo.png';
import { Link } from 'react-router-dom';
import User from '../../types/User';
import { useState } from 'react';
function CustomNavbar() {
  const [profile, setProfile] = useState<User>({
    id:"",
    email:"",
    password:""
  });


  return (
    <Navbar className="custom-navbar">
      <div className="navbar-container">
        <div className="nav-left">
          <a href="/"><img src={farsLogo} className='fars-logo' /></a>
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="nav-left-links">
                    <Link to="/">Home</Link>
                    <Link to="/workspace">Workspace</Link>
                </Nav>
            </Navbar.Collapse>
        </div>
        <div className="nav-right">
            <Navbar.Collapse>
            <Nav className="nav-right-links">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </Nav>
            </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
}

export default CustomNavbar;
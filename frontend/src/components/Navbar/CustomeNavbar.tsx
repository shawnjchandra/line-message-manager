import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/_navbar.scss';
import farsLogo from '../../assets/FARS_logo.png';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar">
      <div className="navbar-container">
        <div className="nav-left">
            <img src={farsLogo} className='fars-logo' />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="nav-left-links">
                    <Link to="/">Home</Link>
                    <Link to="/templater">Editor</Link>
                </Nav>
            </Navbar.Collapse>
        </div>
        <div className="nav-right">
            <Navbar.Collapse>
            <Nav className="nav-right-links">
                <Link to="/sign-up">Sign Up</Link>
                <Link to="/login">Login</Link>
            </Nav>
            </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
}

export default CustomNavbar;
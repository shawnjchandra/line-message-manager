import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './CustomNavbar.scss';
import farsLogo from '../../assets/FARS_logo.png';
import { Link } from 'react-router-dom';
import { NavbarBrand, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useAuthStore  from '../../stores/authStore';

function CustomNavbar() {
  const { isAuthenticated, user, login, logout } = useAuthStore();
  const history=useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();

    history.replace(window.location.pathname);

  }


  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid className="navbar-inner-container">
        
        <Navbar.Brand href="/">
          <img src={farsLogo} alt="FARS" className="fars-logo" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="nav-main-links">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/workspace">Workspace</Nav.Link>
          </Nav>
          <Nav className="nav-auth-profile"> 
            {user?.email ? (
              <NavDropdown title={user.email} id="user-dropdown">
                <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="auth-buttons">
                <Link to="/register" className="btn-register">Register</Link>
                <Link to="/login" className="btn-login">Login</Link>
              </div>
            )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './CustomNavbar.scss';
import farsLogo from '../../assets/FARS_logo.png';
import { Link } from 'react-router-dom';
import { NavbarBrand, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useAuthStore  from '../../stores/authStore';
import UserProfile from '../UserProfile/UserProfile';
import { useEffect, useState } from 'react';
import { authService } from '../../services/auth';
import { useTranslation } from 'react-i18next';

function CustomNavbar() {
  const { isAuthenticated, user, logout, refresh } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);
  const history=useHistory();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    history.replace(window.location.pathname);

  }

  const handleProfile = () => {
    setShowProfile(true);
  }


  useEffect(()=>{
    const shouldHydrate = authService.validateToken() && !user;

    if (shouldHydrate) {
      refresh()
    }
  }, []);

  return (
    <><Navbar expand="lg" className="custom-navbar">
      <Container fluid className="navbar-inner-container">
        
        <Navbar.Brand href="/">
          <img src={farsLogo} alt="FARS" className="fars-logo" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="nav-main-links">
            <Nav.Link as={Link} to="/home">{t('navbar.home')}</Nav.Link>
            <Nav.Link as={Link} to="/workspace">{t('navbar.workspace')}</Nav.Link>
          </Nav>
          <Nav className="nav-auth-profile"> 
            {user?.email ? (
              <NavDropdown title={user.email} id="user-dropdown">
                <NavDropdown.Item onClick={handleProfile}>{t('navbar.profile')}</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>{t('navbar.logout')}</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="auth-buttons">
                <Link to="/register" className="btn-register">{t('navbar.register')}</Link>
                <Link to="/login" className="btn-login">{t('navbar.login')}</Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <UserProfile 
        show={showProfile} 
        onHide={() => setShowProfile(false)} 
      />
      </>
  );
}

export default CustomNavbar;
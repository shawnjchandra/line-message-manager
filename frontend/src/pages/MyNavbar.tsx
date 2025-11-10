import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/_navbar.scss';
import farsLogo from '../assets/FARS_logo.png';

function MyNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar">
      <Container className="navbar-container">
        <div className="nav-left">
            <img src={farsLogo} className='fars-logo' />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="left-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="#features">Home</Nav.Link>
                <Nav.Link href="#pricing">Editor</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </div>
        <div className="nav-right">
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
                <Nav.Link href="#deets">Sign Up</Nav.Link>
                <Nav.Link href="#login">Login</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;

// import react from 'react';
// import { Link } from 'react-router-dom';
// import farsLogo from '../assets/FARS_logo.png';
// import '../styles/_navbar.scss';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';

// const MyNavbar = () => {
//     return (
//         <nav className="custom-navbar">
//             <div className="nav-left">
//                 <div className="nav-logo">
//                     <img src={farsLogo} className="fars-logo" />
//                 </div>
//                 <ul className="nav-links-main">
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/templater">Editor</Link></li>
//                 </ul>
//             </div>
//             <div className="nav-right">
//                 <ul className="nav-links-auth">
//                     <li><Link to="/register">Sign Up</Link></li>
//                     <li><Link to="/login">Login</Link></li>
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default MyNavbar;
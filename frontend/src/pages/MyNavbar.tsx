import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/_navbar.scss';
import farsLogo from '../assets/FARS_logo.png';
import { Link } from 'react-router-dom';

function MyNavbar() {
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
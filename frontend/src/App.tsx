import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import MainTemplater from './pages/MainTemplater'
import Login from './pages/Login/Login';
import './styles/custom.scss';

function App() {
  return (
   <>
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/templater">Editor</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/templater" component={MainTemplater}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </div>
    </Router>
   </>
  );
}

export default App;

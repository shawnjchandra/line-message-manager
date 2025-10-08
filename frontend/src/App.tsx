import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import MainTemplater from './pages/MainTemplater'
import './styles/global.scss';

function App() {
  return (
   <>
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/templater">Templater</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/templater" component={MainTemplater}/>
        </Switch>
      </div>
    </Router>
   </>
  );
}

export default App;

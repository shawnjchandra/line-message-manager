import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import MainTemplater from './pages/MainTemplater'
import './styles/global.scss';
import MyNavbar from './pages/Navbar';

function App() {  
  return (
   <>
    <Router>
      <div>
        <div className="navbar">
          <MyNavbar/>
        </div>
        <Switch>
          <Route path="/" component={Home}/>
          <Route path="/templater" component={MainTemplater}/>
        </Switch>
      </div>
    </Router>
   </>
  );
}

export default App;

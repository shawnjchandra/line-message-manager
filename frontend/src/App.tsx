import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import react from 'react';
import Home from './pages/Home';
import MainTemplater from './pages/MainTemplater';
import './styles/global.scss';
import MyNavbar from './pages/MyNavbar';  

function App() {  
  return (
   <>
    <Router>
      <MyNavbar/>
        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/templater" component={MainTemplater}/>
          </Switch>
        </main>
    </Router>
   </>
  );
}

export default App;

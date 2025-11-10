import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import MainTemplater from './pages/MainTemplater'
import Login from './pages/Login/Login';
import TranslationButton  from './components/TranslationButton/TranslationButton'
import './utils/i18n'

function App() {  
  return (
   <>
    <Router>
      <div>
        <nav >
        
          <ul style={{display:'flex'}}>    {/*  Hanya untuk nyoba saja, nanti hilangin semua inline styling*/}
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
          <TranslationButton/>
      </div>
    </Router>
   </>
  );
}

export default App;

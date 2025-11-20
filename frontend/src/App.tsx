import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home'
import MainTemplater from './pages/MainTemplater'
import Login from './pages/Login/Login';
import TranslationButton  from './components/TranslationButton/TranslationButton'
import Editor from './pages/EditorPage';

import './utils/i18n'

function App() {
  return (
   <>
    <Router>
      <div>
        <nav >
        
          <ul style={{display:'flex'}}>    {/*  Hanya untuk nyoba saja, nanti hilangin semua inline styling*/}
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/editor">Editor</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/editor" component={Editor} /> 
        </Switch>
          <TranslationButton/>
      </div>
    </Router>
   </>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import MainTemplater from './pages/MainTemplater'
import Login from './pages/Login/Login';
import TranslationButton  from './components/TranslationButton/TranslationButton'
import './utils/i18n'
import MyNavbar from './pages/MyNavbar';

function App() {  
  return (
   <>
    <Router>
      <div>
        <MyNavbar/>
        
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

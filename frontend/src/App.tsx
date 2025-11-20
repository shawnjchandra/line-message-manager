import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home'
import MainTemplater from './pages/MainTemplater'
import Login from './pages/Login/Login';
import TranslationButton  from './components/TranslationButton/TranslationButton'
import Editor from './pages/AssetManager/AssetManager';

import './utils/i18n'
import CustomNavbar from './components/Navbar/CustomeNavbar';
import Register from './pages/Register/Register';

function App() {
  return (
   <>
    <Router>
        <CustomNavbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/editor" component={Editor} /> 
          <Route path="/register" component={Register} /> 
        </Switch>
          <TranslationButton/>
    </Router>
   </>
  );
}

export default App;

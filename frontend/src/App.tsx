import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home'
import Workspace from './pages/Workspace/Workspace'
import Login from './pages/Login/Login';
import TranslationButton  from './components/TranslationButton/TranslationButton'
import Editor from './pages/AssetManager/AssetManager';

import './utils/i18n'
import CustomNavbar from './components/Navbar/CustomNavbar';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import GlobalToastContainer from './components/GlobalToastContainer/GlobalToastContainer';

function App() {
  return (
   <>
    <Router>
        <CustomNavbar/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register} /> 

            <ProtectedRoute path="/workspace" component={Workspace}/>
            <ProtectedRoute path="/editor/:id" component={Editor} />            
            <ProtectedRoute path="/editor" component={Editor} />            
          
            <Route path="*">
              <Redirect to="/"/>
            </Route>
          </Switch>
          <TranslationButton/>
          <GlobalToastContainer/>
    </Router>
   </>
  );
}

export default App;

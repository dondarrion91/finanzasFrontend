import React,{Fragment,useContext} from 'react';
import './main.module.css';


// Routing
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';

// root Components
import Header from './components/Header';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';


// main components
import Dashboard from './components/dashboard/Dashboard';

// Context
import {CRMContext,CRMProvider} from './context/CRMContext';

function App() {
      
  // utilizar context en el componete
  const [auth, guardarAuth] = useContext(CRMContext);  
  
  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth,guardarAuth]}>
          <Header/>

          <Switch>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/iniciar-sesion" component={Login}/>
            <Route exact path="/registrar-usuario" component={RegisterUser}/>            
          </Switch>
        </CRMProvider>
      </Fragment>      
    </Router>    
  );
}

export default App;

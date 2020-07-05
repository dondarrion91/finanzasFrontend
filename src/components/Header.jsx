import React,{useState,useEffect,useContext} from 'react';
import styled from '@emotion/styled';

// router link
import { Link } from 'react-router-dom';

import {CRMContext,CRMProvider} from '../context/CRMContext';
import { withRouter } from 'react-router-dom';

// styled compononets
const Button = styled.button`
    margin-right:10px;
`

const Header = (props) => {      
    
    const [auth, guardarAuth] = useContext(CRMContext);

    const logout = () => {
        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token','');
        props.history.push('/iniciar-sesion');
    }

    

    return ( 
        <nav>
            <div className="nav-wrapper indigo darken-4">
                <Link to={'/dashboard'} className="brand-logo">Finanzas Personales</Link>                
                    {
                       !auth.auth ?   
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><Link to={'/registrar-usuario'}>Registrarse</Link></li>
                                    <li><Link to={'/iniciar-sesion'}>Iniciar Sesión</Link></li> 
                                </ul>
                            :
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                   <Button className="waves-effect waves-light btn" onClick={logout}>Cerrar Sesión</Button>                 
                                </ul>
                    }                                                   
            </div>
        </nav>
     );
}
 
export default withRouter(Header);
import React,{ useState,useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import axios from 'axios';

// COntext
import { CRMContext } from '../context/CRMContext';

const Logintitle = styled.h4`
    text-align:center;
    color: white;
`

const Input = styled.input`    
    color: white;    
`

const Login = (props) => {
    
    // Auth y token
    const [auth, guardarAuth] = useContext(CRMContext);

    // User Credentials
    const [credentials, setCredentials] = useState({});
    

    const readData = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        });
    }

    // Login function
    const login = async e => {        
        // generate token
        try{            
            const res = await axios.post('http://localhost:5000/api/v1/user/login',credentials);

            // save token in localstorage
            const { token } = res.data;            
            localStorage.setItem('token',token); 
             
            guardarAuth({
                token,
                auth: true
            });  
            
            // success alert
            Swal.fire(
                'login correcto',
                'Has iniciado sesión',                
                'success'
            )  

            // redirect
            props.history.push('/dashboard');

        }catch(error){
            console.log(error);            
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: error.response.data.message                 
            }) 
        }
    }

    return ( 
        <div className="row">
            <form className="col offset-s4 s4"
                onSubmit={e => {
                    e.preventDefault();
                    login();
                }}
            >
                <Logintitle>Iniciar Sesión</Logintitle>
                <div className="row">                    
                    <div className="input-field col s12">
                        <Input name="email" id="email" type="email" className="validate" onChange={readData} required/>
                        <label htmlFor="email">Email</label>
                    </div>                                 
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <Input name="password" id="password" type="password" className="validate" onChange={readData} required/>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>

                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i className="material-icons right"></i>
                </button>
                
            </form>
        </div>
     );
}
 
export default withRouter(Login);
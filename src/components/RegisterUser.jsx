import React,{useState} from 'react';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import Swal from 'sweetalert2';

// styled components
const Logintitle = styled.h4`
    text-align:center;
    color: white;
`

const Input = styled.input`    
    color: white;    
`
// Register function
const Register = (props) => {


    // User Credentials
    const [credentials, setCredentials] = useState({});

    const readData = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        });
    }

    // new user register function
    const register = async e => {        
        // 
        try{            
            
            // add new user 
            await axios.post('http://localhost:5000/api/v1/user/register',credentials);                                  

            Swal.fire(
                'Registro exitoso',
                'Usuario creado con exito',                
                'success'
            )  

            // redirect
            props.history.push('/iniciar-sesion');

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
                    register();
                }}
            >
                <Logintitle>Registrar Usuario</Logintitle>
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
 
export default withRouter(Register);
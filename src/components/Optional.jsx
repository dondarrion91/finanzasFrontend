import React,{useState} from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';

// styled components
const Logintitle = styled.h4`
    text-align:center;
    color: white;
`

const Input = styled.input`    
    color: white;    
`

const Container = styled.div`    
    grid-column: span 9;
`

const Optional = (props) => {

    // User Credentials
    const [optional, setOptional] = useState({});

    // archivo = state
    const [file,setFile] = useState('');

    const readData = (e) => {
        setOptional({
            ...optional,
            [e.target.name] : e.target.value
        });
    }

    // Update user optional data
    const update = async e => {        

        // formdata
        const formData = new FormData();
        formData.append('fullname',optional.fullname);
        formData.append('birthdate',optional.birthdate);
        formData.append('image',file);

        let token = localStorage.getItem("token");

        try{
            const res = await axios.put('http://localhost:5000/api/v1/user/update',formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type':'multipart/form-data'
                }
            });

            if(res.status === 200){
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.message,
                    'success'
                )
            }
            
            props.history.push('/');

        }catch(error){
            console.log(error)
            // lanzar alerta
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: 'Vuelve a intentarlo'                  
            })  
        }
    }

    // save image in state
    const readFile = e => {        
        setFile(e.target.files[0]);
    }    

    

    return (    
        <Container>
            <div className="row">
                <form className="col offset-s3 s6"
                    onSubmit={e => {
                        e.preventDefault();
                        update();
                    }}
                >
                    <Logintitle>Completa tus datos</Logintitle>
                    <div className="row">                    
                        <div className="input-field col s12">
                            <Input name="fullname" id="fullname" type="text" className="validate" onChange={readData} required/>
                            <label htmlFor="fullname">Nombre completo</label>
                        </div>                                 
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <Input name="birthdate" id="birthdate" type="date" className="datepicker" onChange={readData} required/>
                            <label htmlFor="birthdate">Fecha de nacimiento</label>
                        </div>
                    </div>

                    <div className="row">
                        <label htmlFor="birthdate">Imagen de perfil</label>
                        <div className="input-field col s12">                        
                            <Input name="image" id="image" type="file" className="validate" onChange={readFile} required/>
                        </div>
                    </div>

                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i className="material-icons right"></i>
                    </button>
                </form>
            </div>
        </Container>                     
     );
}
 
export default Optional;
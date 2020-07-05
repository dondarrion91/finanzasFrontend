import React,{Fragment} from 'react';
import styled from '@emotion/styled';

// router link
import { Link } from 'react-router-dom';


// styled components
const Sidebar = styled.div`      
    grid-column: span 3;
    height:100%;
    background-color:rgb(41, 45, 47);
    color: white;
    font-weight:bold;
    .boton-update{        
        display:block;
        width:50%
    }
`

const SideTitle = styled.h2`
    font-size:16px;
    margin:0;
    padding:10px 0px;
    border: 1px solid #212425;
    border-top:0px;
    border-left:0px;
    border-right:0px;
    padding-left:30px;
    
`

const Image = styled.img`            
    width: 56px;
    height:56px;
    margin: 0px 30px;
    align-self: center;
`

const NavText = styled.p`
    font-size:12px;
    text-align:left;
`

const Navdata = styled.div`
    margin:12px;
    padding:5px;     
    
`

const Userheader = styled.div`
    display:flex;
    border-bottom: 1px solid #212425;  
`

const UserBody = styled.div`
    display:flex;
    flex-direction:column;    
    padding-left:30px;    
`


const Collection = styled.div`
    padding:0px 30px;
    h4{
        font-size:16px;
    }
    .collection{
        .collection-item{
            background:#3b8f89;
            color:#FFFFFF;
        }
    }    
`

const Aside = ({user}) => {
    return (         
        <Fragment>
            <Sidebar>
                <SideTitle>Datos de usuario:</SideTitle>
                <Userheader>
                    {                    
                        user.image ? <Image src={`http://localhost:5000/${user.image}`} alt=""/> : <Image src={`https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg`} alt=""/>
                    }  
                    <Navdata>
                        <NavText>Correo electronico: {user.email}</NavText>                                             
                        {
                            user.admin ? <NavText>Administrador</NavText> : <NavText>Usuario</NavText>
                        }
                    </Navdata>  
                </Userheader>   
                <UserBody>
                        {
                            user.fullname ? <NavText>Nombre Completo: {user.fullname}</NavText>  : null
                        }                      
                    <NavText>                    
                        {
                            user.birthdate ? <span>Fecha de nacimiento:  {user.birthdate.slice(0,10)}</span> : null
                        }    
                    </NavText>                
                    <Link to={'/completar-registro'} className="btn waves-effect waves-light boton-update">Modificar Datos</Link>                                                                 
                </UserBody>
                <Collection>
                    <h4>Registros:</h4>
                    <div class="collection">                        
                        <Link to={'/registers'} class="collection-item">Ver Registros</Link>                        
                    </div>
                    <div class="collection">                        
                        <Link to={'/agregar-registro'} class="collection-item">Agregar Registro</Link>                        
                    </div>
                    <div class="collection">                        
                        <Link to={'/editar-registro'} class="collection-item">Editar Registro</Link>                        
                    </div>
                    <div class="collection">                        
                        <Link to={'/eliminar-registro'} class="collection-item">Eliminar Registro</Link>                        
                    </div>
                </Collection>                               
            </Sidebar>                                      
        </Fragment>        
     );
}
 
export default Aside;
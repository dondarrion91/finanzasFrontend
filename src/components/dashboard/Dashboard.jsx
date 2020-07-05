import React,{useState,useEffect,Fragment,useContext} from 'react';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import {CRMContext} from '../../context/CRMContext';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';

// components
import Aside from './Aside';
import Registers from './registros/Registers';
import Optional from '../Optional';

// sytled components
const Grid = styled.div`
    display:grid;
    grid-template-columns: repeat(12,8.333333333333334%);
    border: 3px solid #212425;
    border-bottom:0px;
    border-left:0px;
    border-right:0px;
`

const Dashboard = (props) => {

    // auth context
    const [auth, guardarAuth] = useContext(CRMContext);

    // user data state
    const [user, setUser] = useState({});    
    

    useEffect(() => {
        // get user data
        const getUser = async() => {
            const token = localStorage.getItem("token");
            
            if(!auth.auth){
                // redirect
                props.history.push('/iniciar-sesion');
            }else{
                try{
                    const res = await axios.get("http://localhost:5000/api/v1/user",{
                        headers: {
                            'Authorization': `Bearer ${token}`                
                        }
                    });                             
            
                    setUser(res.data);
                }catch(error){
                    console.log(error);
                    props.history.push('/iniciar-sesion');
                }                             
            }                        
            
        }
        getUser();
    }, []);
        
    
    return (                          
    <Router>
        <Fragment>                                  
                <Grid>
                    <Aside
                        user={user}
                    /> 
                    <Switch>
                        <Route exact path="/registers" component={Registers}/>
                        <Route exact path="/completar-registro" component={() => <Optional user={user}/>}/>
                    </Switch>                    
                </Grid>                                              
        </Fragment>      
    </Router>    
     );
}
 
export default withRouter(Dashboard);
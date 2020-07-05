import React,{useState,useEffect,useContext} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import {CRMContext} from '../../../context/CRMContext';

// components
import Register from './Register';

// styled components
const Table = styled.table`
    grid-column:span 9;    
    color:white;   
    thead{
        background-color:rgb(41, 45, 47);
    }
`

const Registers = () => {

    // auth context
    const [auth, guardarAuth] = useContext(CRMContext);

    // registers
    const [registros, setregistros] = useState([]);

    
    useEffect(() => {
        const getRegisters = async() => {
            const res = await axios.get('http://localhost:5000/api/v1/user/registers',{
                headers: {
                    'Authorization': `Bearer ${auth.token}`                
                }
            });

            setregistros(res.data);
            
        }
        getRegisters();
    },[]);
        
    console.log(registros);

    return ( 
        <Table>
        <thead>
          <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Categoría</th>
              <th>Moneda</th>
              <th>Monto</th>
          </tr>
        </thead>

        <tbody>
            {
                registros.map(element => (
                    <Register
                        key={element.id}
                        registro={element}
                    />
                ))
            }                    
        </tbody>
      </Table>
     );
}
 
export default Registers;
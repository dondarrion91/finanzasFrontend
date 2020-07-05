import React from 'react';

const Register = ({registro}) => {
    return ( 
        <tr>
            <td>{registro.date.slice(0,10)}</td>
            <td>{registro.type}</td>
            <td>{registro.category}</td>
            <td>{registro.currency}</td>
            <td>{registro.cost}</td>
        </tr>
     );
}
 
export default Register;
import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import './Rent.css';

const Rent = (props) => {

    let navigate = useNavigate();

    const alquilar = async () => {
         //this pody corresponds to the order from postman
        let body = {
            price: 10,
            peliculaId: props.id,
            usuarioId: props.idUser,
            fecha: 20220221 
        }

        console.log (body);
    

        let config = {
        headers: { Authorization: `Bearer ${props.token}` }
        };

        try {

        let res = await axios.post("http://localhost:3500/orders",body,config);

        console.log (res, "soy res");

        if(res){
        console.log(res);
        navigate("/");
         }

      } catch (error) {
      console.log(error)
       }
    }

    return (
        <div className="designRent" onClick={()=>alquilar()}>Order it now!</div>
    )
}

export default Rent;
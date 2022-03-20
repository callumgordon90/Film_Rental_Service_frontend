import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import './Rent.css';

const Rent = (props) => {

    let navigate = useNavigate();

    const myFunction = async () => { 
        alert("Thank you for your purchase! It will be dispatched to your address automatically. We will now return you to the home page so you can continue browsing our excellent films");
    }

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
        <div className="designRent" onClick={()=>{ alquilar(); myFunction() }}>Order it now!</div>





    )
}

export default Rent;
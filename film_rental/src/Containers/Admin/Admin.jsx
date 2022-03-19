import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { GENERATE_ORDER } from '../../redux/types';

import './Admin.css';







const AdminOrders = (props) => {

    //Hooks
    const [orders, setOrders] = useState([]);

      //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
      let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };
      
      


    useEffect(()=>{
        getOrders();
    },[]);


    const getOrders = async () => {
     
        try {

            let res = await axios.get(`http://localhost:3500/orders/retrieve`, config);
            console.log(res.data);
                setOrders(res.data);
                setTimeout(()=>{

                    setOrders(res.data);
                     
                    props.dispatch({type:GENERATE_ORDER, payload: orders});
                },500);
                

        } catch (error) {
            console.log(error);
        }
    };


    if(props.credentials?.usuario.role === true){
       
        return (

            <div className = "introText"> <h1>Admin Section Only. Database of Orders</h1>
            <h2>Orders are listed by: Order ID, User ID, Film ID and Date of Order</h2> 


            <div className="field">
                <div className="data"> {
                    
                        orders.map((order, index)=> {
                            return(
                                <div className="database"key={index}>
                                        <p>Order ID : {order.id} </p>
                                        <p>User ID : {order.usuarioId} </p>
                                        <p>Film ID Number : {order.peliculaId} </p>     
                                        <p>Date of Order : {order.fecha} </p>     
                                </div>)     
                        })     
                }</div>  
               
            </div>

            </div>


        )}else{
            return (
                <div className='designHome'>
                    <div className="marginLoader">
                        <img src={require('../../img/loader.gif')} alt="loading"/>
                    </div>
                </div>
            )
        }
    
 };


export default connect((state)=>({
    credentials: state.credentials,
    order: state.order
}))(AdminOrders);

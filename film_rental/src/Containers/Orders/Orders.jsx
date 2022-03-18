import React, {useState, useEffect} from 'react';
import Button from '../../Components/Button/Button';
import axios from 'axios';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {GENERATE_ORDER} from '../../redux/types';

import './Orders.css';

const Orders = (props) => {

    let navigate = useNavigate();

    //Hooks
    const [orders, setOrders] = useState([]);

      //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
      let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    useEffect(()=>{
        getOrders();
    },[]);

    useEffect(()=>{
        if(props.credentials.token === ""){
            navigate("/");
        }
    });

    const getOrders = async () => {

        let id = props.credentials.user.id

        try {

            let res = await axios.get(`http://localhost:3500/orders/usuario/${id}`, config);

            setTimeout(()=>{

                setOrders(res.data);
               
                props.dispatch({type:GENERATE_ORDER, payload: orders});
            },1500);

        } catch (error) {
            console.log(error);
        }
    };
    

    if(props.credentials?.user === false){
     
        return (
            <div className="designOrders">
                <div className="data">
                    <div className="title"> {
                        
                        orders.map((order, index) => {
                            
                            return (
                               
                                <div key={index}>
                                    {order.title }
                                </div>
                            )
                        })
                    }</div>
                </div>
                <Button destiny={"Movies"} url={"/movies"}/>
                <Button destiny={"Profile"} url={"/profile"}/>
               
            </div>
        )
    
    }else{
        return(
            <div className="admin">
                {navigate("/adminorders")}
            </div>
            
        )
        
    }

};

export default connect((state)=>({
    credentials: state.credentials
}))(Orders);
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { GENERATE_ORDER } from '../../redux/types';

import './Admin.css';

const AdminUsers = (props) => {

    //Hooks
    const [usuarios, setUsers] = useState([]);

      //CREATE THE CONFIGURATION OF THE HEADER TO BE SENT
      let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };
      
      


    useEffect(()=>{
        getUsers();
    },[]);


    const getUsers = async () => {
     
        try {

            let res = await axios.get(`http://localhost:3500/usuarios/retrieve`, config);
            console.log(res.data);

                    setUsers(res.data);

        } catch (error) {
            console.log(error);
        }
    };
   


    if(props.credentials?.usuario.role === true){
       
        return (

            <div className = "introText"> <h1>Admin Section Only. Database of Customers</h1>
            <h2>Customers are listed by: first name, surname and email address</h2> 


            <div className="field">
                <div className="data"> {
                    
                        usuarios.map((usuario, index)=> {
                            return(
                                <div className="database"key={index}>
                                        <p>First Name : {usuario.name} </p>
						                <p>Surname : {usuario.surname} </p>
                                        <p>Contact : {usuario.email} </p>
                                        
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
    credentials: state.credentials
}))(AdminUsers);
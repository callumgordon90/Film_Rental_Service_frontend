import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {MODIFY_CREDENTIALS} from '../../redux/types';
import axios from 'axios';

import "./Profile.css";

const Profile = (props) => {

    
    
   
        return (
            <div className = "introText"> <h1>Welcome to your profile page {props.credentials?.usuario.name}!</h1>
            <h2>Thank you for choosing the Film Rental Service</h2>
            
            <div className="designProfile2">We pride ourselves on our excellent 'one-touch' service. Simply find the film that you want on our home page, click on the icon, and it will be dispatched to you immediately by post. Don't see anything you like on the home page? No problem! You can use the search bar at the top to browse our warehouses. If we don't have it in store, simply write us an email and we will order it in immediately!</div>
       
        
            </div>
        
        )
    

}


export default connect((state) => ({
    credentials: state.credentials
}))(Profile);
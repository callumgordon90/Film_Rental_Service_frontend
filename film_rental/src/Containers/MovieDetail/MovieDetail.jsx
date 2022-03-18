import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Rent from '../../Components/Rent/Rent';
import {raiz} from '../../utiles';

import './MovieDetail.css';

const MovieDetail = (props) => {

    let navigate = useNavigate();
    


    useEffect(()=> {
        //Checking if there is information about the chosen film in redux. In the case that there is NO information
        // it will redirect to home

        if(props.search?.title === undefined){
            navigate("/");
        }
    });

        return(
            <div className='designFilm'>
                <div className="filmDetailHalf">
                    <div className="dataFilm">{props.search?.title}</div>
                    <div className="dataFilm">{props.search?.overview}</div>
                    <div className="dataFilm">
                        {
                            //IN CASE TOKEN IS TRUE, IF RENT ELEMENT IS INCLUDED
                            props.credentials.token && < Rent id={props.search.id} token={props.credentials.token} idUser={props.credentials.usuario.id}/>
                        }
                    </div>
                </div>
                <div className="filmDetailHalf">
                    <img className="cartel" src={raiz + props.search.image} alt={props.search.title}/></div>    
            </div>
        )
   
}

export default connect((state) => ({
    credentials: state.credentials,
    search : state.search.film
}))(MovieDetail);


import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { MOVIE_DETAIL } from '../../redux/types';
import {raiz} from '../../utiles';
import './SearchResults.css';
import { Card } from 'antd';


const SearchResults = (props) => {

    // const [films, setFilms] = useState([]);
    let navigate = useNavigate();

    useEffect(()=>{
        //console.log(props.films);
    },[]);

    //useEffect custom para el hook films

     useEffect(()=>{
         console.log("films have transformed, ", props.films);
     },[props.films]);

    

    const escogePelicula = (pelicula) => {
        
        console.log(pelicula, "I have chosen this one....");
        //Guardamos la pelicula escogida en redux
        props.dispatch({type:MOVIE_DETAIL, payload: pelicula});


        //Redirigimos a movieDetail con navigate
        navigate("/moviedetail");
    }
 
    if(props.films.results[0]?.id !== undefined){
        return(

            <div className = "introText"> <h1>See something you like here on our database? </h1>
            <h2>Even if the film you want isn't in store.. we can order it from our warehouse! Email to find out more</h2> 



            <div className="designRooster">
                

                {
                    //Voy a mapear las películas
                    props.films.results.map(pelicula => {
                        //a cada elemento que voy a mapear
                        //le brindo un KEY (obligatorio) que lo distinguirá de
                        //el resto de elementos
                        return (
                            //Al mapear, cada elemento que se itera del array (en este caso pelicula es ese elemento),
                            //si le hacemos propiedad onclick y pasamos el elemento como argumento,
                            //a esa funcion le va a llegar el objeto que hayamos clickado entero
                            <div key={pelicula.id} onClick={()=>escogePelicula(pelicula)}>
                                <img className='cartel' src={raiz + pelicula.poster_path} alt={pelicula.title}/>
                            </div>
                        )
                    })
                }
                
            </div>
            </div>
        )
    }else{
        return (
            <div className='designHome'>
                <div className="marginLoader">
                    <img src={require('../../img/loader.gif')} alt="loading"/>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    //Este films que se invocará mediante props.films valdrá lo que vale en redux peliculas
    films: state.search.peliculas
}))(SearchResults);
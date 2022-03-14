import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { MOVIE_DETAIL } from '../../redux/types';
import {raiz} from '../../utiles';
import './Home.css';
import { Card } from 'antd';
import 'antd/dist/antd.css';

const Home = (props) => {

    const [films, setFilms] = useState([]);
    let navigate = useNavigate();
    const { Meta } = Card;

    useEffect(()=>{
        //No es correcto realizar el try catch en el useEffect
        //dado que el useEffect es en si un proceso con un callback, meter un proceso
        //asíncrono traería problemas y React no lo permite, por ello, llamamos a una funcion
        //que habremos hecho nosotros y se encargará de ello

        traePelis();
    },[]);

    //useEffect custom para el hook films

    useEffect(()=>{
        console.log("films has changed, ", films);
    },[films]);

    const traePelis = async () => {

        try {

            let res = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-En");
            
            

            //Una vez han venido los datos del backend, nosotros, lo siguiente que haremos para que no se pierdan
            //será setear esos datos en el hook, haciendo que las peliculas estén disponibles 
            //para los return del componente.

            setTimeout(()=>{

                setFilms(res.data.results);
            },2000);

        } catch (error) {
            console.log(error);
        }
    };

    const escogePelicula = (pelicula) => {
        
        console.log(pelicula);
        //Guardamos la pelicula escogida en redux
        props.dispatch({type:MOVIE_DETAIL, payload: pelicula});


        //Redirigimos a movieDetail con navigate
        navigate("/moviedetail");
    }
 
    if(films[0]?.id != undefined){
        return(
            <div className="designRooster">

                {
                    //Voy a mapear las películas
                    films.map(pelicula => {
                        //a cada elemento que voy a mapear
                        //le brindo un KEY (obligatorio) que lo distinguirá de
                        //el resto de elementos
                        return (
                            //Al mapear, cada elemento que se itera del array (en este caso pelicula es ese elemento),
                            //si le hacemos propiedad onclick y pasamos el elemento como argumento,
                            //a esa funcion le va a llegar el objeto que hayamos clickado entero
                            <div className="cardPelicula" key={pelicula.id} onClick={()=>escogePelicula(pelicula)}>
                                <img className="fotoCard" src={raiz + pelicula.poster_path} alt={pelicula.title}/>
                                <p>{pelicula.overview}</p>
                            </div>
                            
                        )
                    })
                }
                
            </div>
        )
    }else{
        return (
            <div className='designHome'>
                <div className="marginLoader">
                    <img src={require('../../img/loader.gif')} alt="cargador"/>
                </div>
            </div>
        )
    }
}

export default connect()(Home);
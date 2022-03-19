import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGOUT, MOVIES_TITLE } from '../../redux/types';
import { connect } from 'react-redux';
import axios from 'axios';
import 'antd/dist/antd.css';
import {
    Input,
    Button
} from 'antd';

import './Header.css';

const Header = (props) => {

    let navigate = useNavigate();

    const [titulo, setTitulo] = useState("");

    useEffect(() => {
        console.log("credentials inside header", props.credentials);
    })

    const navegar = (lugar) => {

        setTimeout(() => {
            navigate(lugar);
        }, 200);

    }

    const logOut = () => {
        //Borrar de RDX las credenciales
        props.dispatch({ type: LOGOUT });

        setTimeout(() => {
            navigate("/");
        }, 1500);
    }

    const manejador = (ev) => {
        setTitulo(ev.target.value);
    }

    const busquedaPorTitulo = async () => {
    
        //Axios que trae resultados....

        try {
            let resultados = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&query=${titulo}&page=1&include_adult=false`);
            // Original endpoint was this: https://videostore-backend.herokuapp.com/films/custom?arg=${titulo}
            // and this: `https://api.themoviedb.org/3/search/movie?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&query=${titulo}&page=1&include_adult=false`)


            //Guardo en redux los resultados de las películas

            props.dispatch({type: MOVIES_TITLE, payload: resultados.data});

            setTimeout(()=>{
                navigate("/searchresults");
            },500);


        } catch (error) {
            console.log(error);
        }
    }

    if (!props.credentials?.token) {
        return (
            <div className='designHeader'>
                <div className="headerSpace"></div>
                <div className="headerSpace searchDesign">
                    <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Search for a film by title!" onChange={(ev)=>manejador(ev)}/>
                        <Button onClick={()=>busquedaPorTitulo()} type="primary">Search!</Button>
                    </Input.Group>
                    <div className="relleno"></div>
                </div>
                <div className="headerSpace linksDesign">
                    <div className="welcomelink" onClick={() => navegar("/welcome")}>Welcome</div>
                    <div className="link" onClick={() => navegar("/login")}>Login</div>
                    <div className="link" onClick={() => navegar("/register")}>Sign up</div>
                </div>
            </div>
        )

    } else if (props.credentials?.token && props.credentials?.usuario.role === true) {

        return (
            <div className='designHeader'>
                <div className="headerSpace"></div>
                <div className="headerSpace searchDesign">
                    <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Search for a film by title!" onChange={(ev)=>manejador(ev)}/>
                        <Button onClick={()=>busquedaPorTitulo()} type="primary">Go!</Button>
                    </Input.Group>
                    <div className="relleno"></div>
                </div>
                <div className="headerSpace linksDesign">
                    <div className="link" onClick={() => navegar("/profile")}>{props.credentials?.usuario.name}</div>
                    
                    <div className="link"onClick={()=>navegar("/admin")}>Admin</div>
                    <div className="link"onClick={()=>navegar("/adminusers")}>Users</div>
                    
                    <div className="link" onClick={() => logOut()}>Logout</div>
                    {console.log ("estamos como admin")}
                </div>
            </div>
        )
        


    } else {
        return (
            <div className='designHeader'>
                <div className="headerSpace"></div>
                <div className="headerSpace searchDesign">
                    <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Search for a film by title!" onChange={(ev)=>manejador(ev)}/>
                        <Button onClick={()=>busquedaPorTitulo()} type="primary">Go!</Button>
                    </Input.Group>
                    <div className="relleno"></div>
                </div>
                <div className="headerSpace linksDesign">
                    <div className="link" onClick={() => navegar("/profile")}>{props.credentials?.usuario.name}</div>
                    
                    <div className="link" onClick={() => logOut()}>Logout</div>
                    
                </div>
            </div>
        )
    }



}

export default connect((state) => ({
    credentials: state.credentials
}))(Header);

//..
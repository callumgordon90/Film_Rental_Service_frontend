import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {checkError} from '../../utiles';
import './Register.css';

const Register = () => {

    let navigate = useNavigate();

    
    //hooks

    const [datosUsuario, setDatosUsuario] = useState({
            nombre: "", apellido: "", edad: "", email: "", 
            dni: "", password: "", password2: "", telefono: "", 
            numCuenta: ""
    });

    const [msgError, setMsgError] = useState("");

    //useEffect

    useEffect(()=>{
        //se ejecuta la primera vez que se ejecuta tan solamente
    },[]);

    useEffect(()=>{
        //se ejecuta cada vez que se actualiza CUALQUIER HOOK  
    })

    // useEffect(()=>{
    //     //useEffect observable que sólo se ejecutará cuando
    //     //datosUsuario mute
    // },
    // [datosUsuario])
    

    //Handler (manejador)
    const rellenarDatos = (e) => {
            setDatosUsuario({...datosUsuario, 
                [e.target.name]: e.target.value})
    };


    //Funciones locales del componente

    const registrame = async () => {

        //Array de distintos campos

        setMsgError("");
        let error = "";

        let arrayCampos = Object.entries(datosUsuario);
        
        // //1 comprobación de errores antes de enviar al backend

        if(datosUsuario.password !== datosUsuario.password2){

            return (setMsgError("The two passwords must be the same"));

        }else{
            setMsgError("");
        }

        for(let elemento of arrayCampos){
            error = checkError(elemento[0],elemento[1]);

            if(error !== "ok"){
                setMsgError(error);
                return;
            };
        };

        console.log("everything has worked correctly")

        // we create the body

        let body = {
            nombre: datosUsuario.nombre,
            apellido: datosUsuario.apellido,
            edad: datosUsuario.edad,
            email: datosUsuario.email,
            dni: datosUsuario.dni,
            password: datosUsuario.password,
            telefono: parseInt(datosUsuario.telefono),
            numCuenta: datosUsuario.numCuenta
        }

        console.log("This is called body", body);
        //3 send to axios

        try {
            
            let resultado = await axios.post("https://movie-db-geekshubs.herokuapp.com/usuarios", body);
            console.log(resultado);
            
                setTimeout(()=>{
                    navigate("/login");
                },1000);
            
            
            
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <div className='designRegister'>
             
            <div className="cardRegister">
                <div className="upCardRegister">Sign up to the Film Rental Service here:</div>
                <div className="middleCardRegister">
                    {<pre>{JSON.stringify(datosUsuario, null,2)}</pre>}
                    <input type="text" name="nombre" id="nombre" title="nombre" placeholder="Name:" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="text" name="apellido" id="apellido" title="apellido" placeholder="Surname:" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="text" name="edad" id="edad" title="edad" placeholder="Age:" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="email" name="email" id="email" title="email" placeholder="Email:" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="text" name="dni" id="dni" title="dni" placeholder="DNI" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="password" name="password" id="password" title="password" placeholder="Password" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="password" name="password2" id="password2" title="password2" placeholder="Repeat Password" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="text" name="telefono" id="telefono" title="telefono" placeholder="Telephone" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="text" name="numCuenta" id="numCuenta" title="numCuenta" placeholder="Number of Account" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                </div>
                <div className="bottomCardRegister">
                    {msgError}
                    <div className="botonRegistro" onClick={()=>registrame()}>
                        Register me!
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;
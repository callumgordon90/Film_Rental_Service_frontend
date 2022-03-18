import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {checkError} from '../../utiles';
import './Register.css';

const Register = () => {

    let navigate = useNavigate();

    
    //hooks

    const [datosUsuario, setDatosUsuario] = useState({
        name: "", age: "", surname: "", 
        nickname: "", email: "", password: "", 
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

        // setMsgError("");
        // let error = "";

        // let arrayCampos = Object.entries(datosUsuario);
        
        // //1 comprobación de errores antes de enviar al backend

        

        // for(let elemento of arrayCampos){
        //     error = checkError(elemento[0],elemento[1]);

        //     if(error !== "ok"){
        //         setMsgError(error);
        //         return;
        //     };
        // };

        // console.log("everything has worked correctly")

        // we create the body

        let body = {
            name: datosUsuario.name,
            age: datosUsuario.age,
            surname: datosUsuario.surname,
            nickname: datosUsuario.nickname,
            email: datosUsuario.email,
            password: datosUsuario.password
        }

        console.log("This is called body", body);
        //3 send to axios

        try {
            
            let resultado = await axios.post("http://localhost:3500/usuarios", body);
            console.log(resultado);
            
            // "https://api-film-deployed.herokuapp.com/usuarios"
            // http://localhost:3500/usuarios
           
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

                   
                    <input type="text" name="name" id="name" title="name" placeholder="Name:" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="text" name="age" id="age" title="age" placeholder="Age:" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="text" name="surname" id="surname" title="surname" placeholder="Surname"  autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="text" name="nickname" id="nickname" title="nickname" placeholder="Nickname" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="email" name="email" id="email" title="email" placeholder="Email" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="password" name="password" id="password" title="Password" placeholder="Password" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    
                    
               
               
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
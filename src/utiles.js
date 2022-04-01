export const raiz = "https://image.tmdb.org/t/p/w185";


export const checkError = (type,value) => {


    switch(type) {

        case 'email' :

            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ) {
                
                return "Error! Introduce a valid email.";
            }else{
                return "Ok";
            };
            
        
        case 'nombre': 

            if (! /[a-z]/gi.test(value) ) {
                return "Error! Introduce a valid name.";
            }else{
                return "Ok";
            };

        
        case 'telefono':

            if (! /[\d()+-]/g.test(value) ) {
                return "Error! Introduce a valid telephone number.";
            }else{
                return "Ok";
            };

        default:
            return "Ok";
        

    }
};


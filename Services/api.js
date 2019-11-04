import axios from 'axios' ;

const producao = false ;

const api = axios.create({
    
    baseURL:  (producao) ? 'http://heliosilva.online' :
                           'http://10.0.0.107:5000' ,
});

export default api ;
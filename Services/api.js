import axios from 'axios' ;

const producao = false ;

const api = axios.create({
    
    baseURL:  (producao) ? 'http://heliosilva.online' :
                           'http://192.168.0.104:5000' ,
});

export default api ;
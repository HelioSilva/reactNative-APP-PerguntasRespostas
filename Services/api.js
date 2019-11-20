import axios from 'axios' ;

const trabalho = true ;

const api = axios.create({
    
    baseURL:  (trabalho) ? 'http://10.0.0.102:4545'    :
                           'http://192.168.0.104:4545' ,
});


export default api ;
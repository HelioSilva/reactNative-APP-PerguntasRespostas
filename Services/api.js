import axios from 'axios' ;

const local = false ;

const api = axios.create({
    
    baseURL:  (local) ? 'http://10.0.0.102:4545'    :
                           'http://3.90.37.26:4545' ,
});


export default api ;
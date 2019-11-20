import {combineReducers} from 'redux';

import userReducer from './userReducer';
import listagemReducer from './listagemReducer' ;
import concursoReducer from './concursoReducer' ;

export default combineReducers({
    userReducer ,
    listagemReducer,
    concursoReducer

});
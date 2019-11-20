import React from 'react';  

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import {Provider} from 'react-redux';
import Store from './src/Store/index';


import Home      from './src/Home/index';
import Perguntas from './src/Perguntas/index';
import Resultado from './src/Resultado/index';

const MainNavigator = createStackNavigator({
  Home ,
  Perguntas,
  Resultado
},{
  initialRouteName:'Home',
  defaultNavigationOptions:{
    header:null     
  }
  
});

const Navegador = createAppContainer(MainNavigator);

export default ()=>{
  return(
    <Provider store={Store}>
      <Navegador/>
    </Provider>
  )
};






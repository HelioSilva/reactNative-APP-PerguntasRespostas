import React,{useState,useEffect} from 'react';
import { StyleSheet,FlatList, Text,TouchableOpacity,Picker } from 'react-native';
import {BrContent} from 'brcomponentsrn';
import api from '../../Services/api';

import {connect} from 'react-redux';


export function Home({dados,dispatch,navigation}) {

//  const [dados,setDados]        = useState('');
  const [refreshing,setRefresh] = useState(false);

  function getInit(all){
    return{
      type:"API",
      data:all
    }
  }

  function getPergunta(){
    return{
        type:"PROXIMA_PERGUNTA"
    }
}

  async function loadDados(){
   // setRefresh(true);
    console.log('Consultando api...');
    const response = await api.post('/showOnce',
             {id:"5dc053b35198aa1f40a78a45"}) ; 
    dispatch(getInit( [response.data] ));
  }

  useEffect(
    ()=>{
      loadDados();
    },[]
  );

  return (
    <BrContent flex={1} safe>
      
      <BrContent flex={0.4} middle bg='#74c'>
        <Text style={{color:'#fff',fontSize:18}}>Concurso Bíblico APP v7</Text>
      </BrContent>
      <BrContent flex style={{margin: 10}}>
        <FlatList
            onRefresh={() => loadDados()}
            refreshing={refreshing}
            data={dados}
            keyExtractor={dados._id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={()=>{
                dispatch(getPergunta());
                navigation.navigate('Perguntas');
                
              }}>
                  <BrContent flex={1} row bg='rgba(150,42,99,0.5)' style={{marginTop: 2,padding: 15, borderRadius: 5,}} >
                  <Text></Text>
                  <Text style={{color:'#fff',fontSize:16, fontWeight:'bold'}}>{item.title}</Text>
                </BrContent>
              </TouchableOpacity>
              
            ) }
          />
      </BrContent>

    </BrContent>
  );
}


export default connect(state => ({
    dados:state.dados
}))(Home);

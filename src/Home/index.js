import React,{useState,useEffect} from 'react';
import {Modal, FlatList, Text,TouchableOpacity,TouchableHighlight } from 'react-native';
import {BrContent} from 'brcomponentsrn';
import api from '../../Services/api';

import {connect} from 'react-redux';

import Constants from 'expo-constants';



export function Home({dados,user,dispatch,navigation}) {

//  const [dados,setDados]        = useState('');
  const [refreshing,setRefresh] = useState(false);
  const [modal,setModal] = useState(false);

  function getInit(all){
    return{
      type:"API",
      data:all
    }
  }

  function setU(data){
    return{
      type:"SET_USER",
      data:data
    }
  }

  function getPergunta(numConc){
    return{
        type:"INIT_CONCURSO",
        data: numConc
    }
  }

  async function loadDados(){

    const url = '/showUsers/'+Constants.installationId;
    const currentUser = await api.get(url);

 
    if(currentUser.data.length > 0){
      dispatch(setU(currentUser.data[0]))
    }else{
      navigation.navigate('Register'); 
    }





   // setRefresh(true);
    console.log('Consultando api...');
    const response = await api.get('/showConcursos') ; 
    dispatch(getInit( response.data ));
  }

  useEffect(
    ()=>{
      loadDados();
    },[]
  );

  return (
    <BrContent flex={1} safe>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

            <BrContent flex={1} middle bg= '#3c5'>
            <Text>{Constants.installationId}</Text>

              <TouchableHighlight
                  onPress={() => {
                    setModal(false)
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
            </BrContent>

            

            </Modal>


      
      <BrContent flex={0.4} alignCenter bg='#74c' justifyAround>
        <Text onPress={()=>{setModal(true)}} style={{color:'#fff',fontSize:18}}>Perguntas e respostas!?</Text>
        <Text>{user.nome}</Text>
        <Text>{user.device}</Text>
      </BrContent>
      <BrContent flex={1} style={{margin: 10}}>
        <FlatList
            onRefresh={() => loadDados()}
            refreshing={refreshing}
            data={dados}
            keyExtractor={dados._id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={async()=>{

                const res = await  api.post('/duplicidadeParticipacao/'+item._id,{
                  device : user.device
                });

                if(res.data.res == true){
                  alert('Ja participou')
                }else{
                  dispatch(getPergunta(item));
                  navigation.navigate('Perguntas');  
                }


                              
              }}>
         

                    <BrContent flex={1} row justifyBetween bg='rgba(150,42,99,0.5)' style={{marginTop: 2,padding: 15, borderRadius: 5,}}  >
                        <Text style={{color:'#fff',fontSize:16, fontWeight:'bold'}}>{item.title}</Text>
                        <Text>Autor:{item.autor}</Text>               
                    </BrContent>
            
                
   
                    
              </TouchableOpacity>
              
            ) }
          />
      </BrContent>

    </BrContent>
  );
}


export default connect(state => ({
    dados:state.dados,
    user : state.user
}))(Home);

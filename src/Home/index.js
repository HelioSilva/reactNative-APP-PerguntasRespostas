import React,{useState,useEffect} from 'react';
import {Modal, FlatList, Text,TouchableOpacity,TouchableHighlight } from 'react-native';
import {BrContent} from 'brcomponentsrn';
import api from '../../Services/api';

import {connect} from 'react-redux';

import Constants from 'expo-constants';



export function Home(props) {

//  const [dados,setDados]        = useState('');
  const [refreshing,setRefresh] = useState(false);
  const [modal,setModal] = useState(false);


  async function loadDados(){

    const url = '/showUsers/'+Constants.installationId;
    const currentUser = await api.get(url);
 
    if(currentUser.data.length > 0){
      props.setDevice(currentUser.data[0].device)
      props.setNome(currentUser.data[0].nome);
    }else{
      navigation.navigate('Register'); 
    }

    // setRefresh(true);
    console.log('Consultando api...');
    await api.get('/showConcursos').then((r)=>{

      props.setDados(r.data)
    }).catch((e)=>{
      alert(e)
    }) ; 
    
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
        <Text>{props.user.nome}</Text>
        <Text>{props.user.device}</Text>

      </BrContent>
      <BrContent flex={1} style={{margin: 10}}>
    
        <FlatList
            onRefresh={() => loadDados()}
            refreshing={refreshing}
            data={props.dados}
            keyExtractor={props.dados._id}
            renderItem={({item}) => (
              <TouchableOpacity onPress={async()=>{

                const res = await  api.post('/duplicidadeParticipacao/'+item._id,{
                  device : props.user.device
                });

                if(res.data.res == false){
                  alert('Ja participou')
                }else{
                 props.setConcurso(item);
                 props.navigation.navigate('Perguntas');  
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

const mapStateToProps = (state)=>({
  user : state.userReducer,
  dados : state.listagemReducer.dados
})

const mapDispatchToProps = (dispatch)=>({
  setDevice:(device) => dispatch({type:'SET_DEVICE' , payload:{device}}),
  setNome:(nome) => dispatch({type:'SET_NOME', payload:{nome}}) ,
  setDados:(dados) => dispatch({type:'SET_DADOS',payload:{dados}}),
  setConcurso:(concurso) => dispatch({type:'SET_CONCURSO',payload:{concurso}})
})


export default connect(mapStateToProps,mapDispatchToProps)(Home);

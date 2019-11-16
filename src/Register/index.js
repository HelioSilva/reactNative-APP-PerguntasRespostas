import React ,{useState} from 'react';
import { View,Text,TouchableHighlight } from 'react-native';
import {BrContent} from 'brcomponentsrn';
import {connect} from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import api from '../../Services/api';
import Constants from 'expo-constants';

export  function Register({navigation}) {

    const [nome,setNome] = useState('');

  return (
    <BrContent flex={1} middle bg= '#74c'>
        <TextInput 
          placeholder="Digite seu nome aqui"
          value={nome}
          onChangeText={(n)=>{setNome(n)}}
          style={{
              width:'80%',
              backgroundColor:'#fff',
              height:45,
              fontSize:20,
              marginBottom:15,
              borderRadius:10,
              alignItems:'center',
              padding: 10,
          }}  />

          <TouchableHighlight onPress={
             async ()=>{
                const currentUser = await api.post('/insertUser',{
                    "nome":nome,
                    "device":Constants.installationId,
                    "scoreGeral": 0
                });

                if (currentUser.data._id != ''){
                    navigation.navigate('Home'); 
                }
              }
          }>

            <BrContent vw='50%' vh='15%' middle bg='#fff' style={{ borderRadius: 250,padding:15}}>          
            <Text style={{fontSize:25,color:'#a4e'}}>Register</Text>
            </BrContent>

          </TouchableHighlight>
      
        
    </BrContent>
  );

}

export default connect(state => ({

}))(Register);
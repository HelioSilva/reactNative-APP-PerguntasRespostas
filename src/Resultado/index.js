import React,{useEffect} from 'react';
import { View,Text } from 'react-native';
import {BrContent} from 'brcomponentsrn';
import {connect} from 'react-redux';

import api from '../../Services/api';

// import { Container } from './styles';

export  function Resultado({user,concurso,score,quant}) {

  useEffect(
    ()=>{

      const response = api.post('/setScore',{
        device:user.device,
        score : score
      });

      const response2 = api.post('/addDeviceConcurso/'+concurso._id,{
        device:user.device,
        nome: user.nome,
        score : score
      });
      
    },[]
  );


  return (
    <BrContent flex={1} middle bg='#74c'>
      <BrContent vw='50%' vh='15%' middle bg='#fff' style={{ borderRadius: 250,}}>
          <Text style={{fontSize:25,color:'#a4e'}}>Score: {(score*quant.total)} %</Text>
      </BrContent>
        
    </BrContent>
  );

}


export default connect(state => ({
    score:state.pontos,
    quant :state.qtd,
    user: state.user,
    concurso:state.concurso
}))(Resultado);
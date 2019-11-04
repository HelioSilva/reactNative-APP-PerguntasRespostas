import React from 'react';
import { View,Text } from 'react-native';
import {BrContent} from 'brcomponentsrn';
import {connect} from 'react-redux';

// import { Container } from './styles';

export  function Resultado({score,quant}) {
  return (
    <BrContent flex middle bg='#74c'>
      <BrContent vw='50%' vh='15%' middle bg='#fff' style={{ borderRadius: 250,}}>
          <Text style={{fontSize:25,color:'#a4e'}}>Score: {(score*quant.total)} %</Text>
      </BrContent>
        
    </BrContent>
  );

}


export default connect(state => ({
    score:state.pontos,
    quant :state.qtd
}))(Resultado);
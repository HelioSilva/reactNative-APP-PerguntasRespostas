import React from 'react';
import { View,Text } from 'react-native';
import {BrContent} from 'brcomponentsrn';

// import { Container } from './styles';

export default function Tempo({limit, tempo}) {

    function getFonte(){

        return 14; 
    }

    function getCor(){
        switch (tempo) {
            case limit<5:
                return '#015'
                break;
           
        
            default:
                return '#90d444' 
                break;
        }
        
    }


  return (
    <BrContent middle vw={50} bg='#fff' style={{borderRadius: 25,}}>
        <Text style={{color:getCor(),fontSize:getFonte(),fontWeight:'bold'}}>{tempo}</Text>
    </BrContent>
  );
}

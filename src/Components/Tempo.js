import React from 'react';
import { View,Text } from 'react-native';
import {BrContent} from 'brcomponentsrn';

// import { Container } from './styles';

export default function Tempo({limit, tempo}) {

    function getFonte(){
        return 12+(tempo+2)
    }

    function getCor(){
        switch (tempo) {
            case limit-5:
                return '#90d444'
                break;
            case limit-4:
                return '#52a836' 
                break;
            case limit-3:
                    return '#cfd1cd' 
                    break;
            case limit-2:
                    return '#bfa3a3' 
                    break;
            case limit-1:
                    return '#a33e3e' 
                    break;
            case limit:
                    return '#d42020' 
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

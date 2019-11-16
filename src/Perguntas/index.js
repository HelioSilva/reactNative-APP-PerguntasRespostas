import React,{useState,useEffect} from 'react';
import { StyleSheet,View,FlatList, Text,Picker,TouchableOpacity } from 'react-native';
import {BrContent} from 'brcomponentsrn';

import Tempo from '../Components/Tempo';
import {connect} from 'react-redux';



function Perguntas({quantidades,pergunta,dispatch,navigation}){    

    const [counter, setCounter] = useState(0);

    useEffect(
    () => {

        if(counter>=10){
            setCounter(0);
            dispatch(setEscolha(pergunta.numPergunta ,-1))
            if(quantidades.respondida+1 == quantidades.total){
                navigation.navigate('Resultado');
            }else{
                dispatch(getPergunta());
            }
        } else {
            if(pergunta.alternativaEscolhida>0){

                if(quantidades.respondida+1 == quantidades.total){
                    navigation.navigate('Resultado');
                }else{
                    setCounter(0);
                    dispatch(getPergunta());
                }

            }else{
                setTimeout(() => {
                    setCounter(counter + 1);
                }, 1000);
            }
        }
        
        
    },
    [counter],
    );

    useEffect(
        ()=>{
          dispatch(
              getPergunta()
          );
        },[]
      );

    function setEscolha(_idPergunta,indexResposta){
        return{
            type:"ESCOLHA" ,
            data:{
                pergunta:_idPergunta,
                resposta:indexResposta
            }
        }
    }

    function getPergunta(){
        return{
            type:"NEXT_PERGUNTA"
        }
    }



    return(
        <BrContent flex={1} safe>
            
            <BrContent flex={0.05} middle row  bg= '#74b' style={{justifyContent: 'space-around'}}>
                <Text style={{color:'#fff'}}>Total:{quantidades.total}</Text>
                <Text style={{color:'#fff'}}>Resolvidas:{quantidades.respondida}</Text>    
                <BrContent row>
                    <Text style={{color:'#fff'}}>Tempo: </Text>
                    <Tempo limit={5} tempo={counter} />    
                </BrContent>            
                
            </BrContent>
            <BrContent flex={0.4} middle bg='#74c' style={{padding: 20,}}>
                <Text style={{color:'#fff',fontSize:22}}>{pergunta.pergunta}</Text> 
            </BrContent>
            <BrContent flex={0.4} middle vw='100%'>

            { pergunta.alternativas.map(function(item,i){
                return(

                    <TouchableOpacity onPress={ ()=>{
                        dispatch(setEscolha(pergunta.numPergunta,i+1))
                        if(quantidades.respondida+1 == quantidades.total){
                            navigation.navigate('Resultado');
                        }else{
                            dispatch(getPergunta())
                        }
                    }    
                    }>

                        <BrContent bg='#b35' style={{ borderRadius: 15,marginTop: 10,padding: 15,}}>
                            <Text style={{fontSize:25,fontWeight:'bold',color:'#fff'}}>{item.descricaoAlternativa}</Text>
                        </BrContent> 
                    </TouchableOpacity>                   
                )
            }) }

            </BrContent>

        </BrContent>
    )

}

export default connect(state => ({
    quantidades:state.qtd ,
    pergunta :state.pergunta
}))(Perguntas);
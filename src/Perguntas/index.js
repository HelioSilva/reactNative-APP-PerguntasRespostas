import React,{useState,useEffect} from 'react';
import { StyleSheet,View,FlatList, Text,Picker,TouchableOpacity } from 'react-native';
import {BrContent} from 'brcomponentsrn';

import Tempo from '../Components/Tempo';
import {connect} from 'react-redux';



function Perguntas(props){    

    const [counter, setCounter] = useState(0);

    // useEffect(
    // () => {

    //     if(counter>=10){
    //         setCounter(0);
    //         dispatch(setEscolha(pergunta.numPergunta ,-1))
    //         if(quantidades.respondida+1 == quantidades.total){
    //             navigation.navigate('Resultado');
    //         }else{
    //             dispatch(getPergunta());
    //         }
    //     } else {
    //         if(pergunta.alternativaEscolhida>0){

    //             if(quantidades.respondida+1 == quantidades.total){
    //                 navigation.navigate('Resultado');
    //             }else{
    //                 setCounter(0);
    //                 dispatch(getPergunta());
    //             }

    //         }else{
    //             setTimeout(() => {
    //                 setCounter(counter + 1);
    //             }, 1000);
    //         }
    //     }
        
        
    // },
    // [counter],
    // );

    useEffect(
        ()=>{
          props.getPergunta();
        },[]
      );

    // function setEscolha(_idPergunta,indexResposta){
    //     return{
    //         type:"ESCOLHA" ,
    //         data:{
    //             pergunta:_idPergunta,
    //             resposta:indexResposta
    //         }
    //     }
    // }

    // function getPergunta(){
    //     return{
    //         type:"NEXT_PERGUNTA"
    //     }
    // }



    return(
        <BrContent flex={1} safe>
            
            <BrContent flex={0.05} middle row  bg= '#74b' style={{justifyContent: 'space-around'}}>
                <Text style={{color:'#fff'}}>Total:{props.count.total}</Text>
                <Text style={{color:'#fff'}}>Resolvidas:{0}</Text>    
                <BrContent row>
                    <Text style={{color:'#fff'}}>Tempo: </Text>
                    <Tempo limit={5} tempo={counter} />    
                </BrContent>            
                
            </BrContent>
            <BrContent flex={0.4} middle bg='#74c' style={{padding: 20,}}>
                <Text style={{color:'#fff',fontSize:22}}>{props.question.texto}</Text> 
            </BrContent>
            <BrContent flex={0.4} middle vw='100%'>

            { props.question.alternativas.map(function(item,i){
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


const mapStateToProps = (state)=>({
    question :state.concursoReducer.question,
    count : state.concursoReducer.count 
  })
  
  const mapDispatchToProps = (dispatch)=>({
    // setDevice:(device) => dispatch({type:'SET_DEVICE' , payload:{device}}),
    // setNome:(nome) => dispatch({type:'SET_NOME', payload:{nome}}) ,
    // setDados:(dados) => dispatch({type:'SET_DADOS',payload:{dados}})
    getPergunta:()=> dispatch({type:'GET_PERGUNTA'})
  })
  
  
export default connect(mapStateToProps,mapDispatchToProps)(Perguntas);

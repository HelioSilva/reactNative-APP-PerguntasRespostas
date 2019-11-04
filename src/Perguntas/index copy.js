import React,{useState,useEffect} from 'react';
import { StyleSheet,View,FlatList, Text,Picker,TouchableOpacity } from 'react-native';
import {BrContent} from 'brcomponentsrn';

import {connect} from 'react-redux';

function Perguntas({dados,pontos,dispatch}){

    function setPonto(value){
        return{
          type:"PONTO",
          valor:value
        }
      }

    function setEscolha(_idPergunta,indexResposta){
        return{
            type:"ESCOLHA" ,
            data:{
                pergunta:_idPergunta,
                resposta:indexResposta
            }
        }
    }


    return(
        <BrContent flex safe style={{margin: 10}}>
            <Text>{pontos}</Text>
            <Text>{dados.nome}</Text>
            <Text>{dados.senha}</Text>
        <FlatList
            keyExtractor={dados.perguntas._id}

            data={dados.perguntas}

            renderItem={({item}) => ( 
                
    
            <BrContent flex={1} bg='rgba(150,42,99,0.5)' style={{marginTop: 2,padding: 15, borderRadius: 5,}} >
                  <Text style={{
                      color:'#fff',
                      fontSize:16, 
                      fontWeight:'bold'
                   }}>{item.pergunta}</Text>
    
                    <View>
                        <Text>Escolhido:{item.alternativaEscolhida}</Text>
                            <Picker
                               mode="dropdown"
                                style={{height: 50, width: '80%'}} 
                                enabled={true}
                                selectedValue={"oi"}
                                onValueChange={(itemValue, itemIndex) => {
                                    console.log();
                                    dispatch(setEscolha(item._id,itemIndex));
                                    if(itemIndex==item.numAlternativaCorreta){
                                        dispatch(setPonto(1)) ;
                                    }else{
                                        dispatch(setPonto(-1)) ;
                                    }
    
                                }}    
                            >

                            <Picker.Item label={"Vazio"} value={"Vazio"} />
                                { item.alternativas.map(function(news, i){
                                    return(<Picker.Item label={news.descricaoAlternativa} value={news.numAlternativa} />) 
                                })
                                }
                            </Picker>
                    </View>
   
                </BrContent>
     
              
            ) }
          />

      </BrContent>
    )

}

export default connect(state => ({
    dados:state.dados[0].concurso[0],
    pontos :state.pontos
}))(Perguntas);
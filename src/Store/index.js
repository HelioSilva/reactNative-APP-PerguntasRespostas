import {createStore} from 'redux';

const INITIAL = {
    dados: [] ,
    qtd:{
        total:0,
        respondida:0
    },
    pergunta:{
        pergunta:'Nenhuma Pergunta a ser feita',
        alternativas:[]
    },
    pontos: 0 ,
} ;


function rede(state=INITIAL,action){

    if (action.type == 'PROXIMA_PERGUNTA'){
        
        const x = {...state} ;
        console.log(x.dados)
        let resultado = null;
        let tot = 0 ;
        let response = 0 ;
        x.dados[0].perguntas.map(
            function(itens,i){
                console.log(tot);
                tot += 1 ;
                if (itens.alternativaEscolhida == 0){
                    resultado = itens ;
                }else{
                    response += 1 ;
                }
                
            }
        )


        return{
            ...state,
            pergunta:resultado,
            qtd:{
                total: tot,
                respondida:response
            }
            
        }
    }


    if (action.type == 'ESCOLHA'){

       const x = {...state} ; // 
       let p = 0 ;

       x.dados[0].concurso[0].perguntas.map(function(itens,i){
           if (itens.numPergunta == action.data.pergunta) {               
               itens.alternativaEscolhida = action.data.resposta ;
               if (itens.numAlternativaCorreta == action.data.resposta) {
                  p =  1 ;
               }
           }
       })

        return {
            ...state,
            dados:x.dados,
            pontos:state.pontos+p
        }
    }

    if(action.type == 'API'){
        return{
            ...state,
            dados:action.data
        }
    }

    if(action.type == 'PONTO'){
        return{
            ...state,
            pontos:state.pontos+action.valor
        }
    }

    return state; 
}

const Store =  createStore(rede) ;
  
export default Store ;
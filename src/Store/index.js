import {createStore} from 'redux';

const INITIAL = {
    user:{
        device:"123456",
        nome:"nooome"
    },
    dados: [] ,
    concurso:{},
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


function store(state=INITIAL,action){

    if(action.type == 'SET_USER'){

        return{
            ...state,
            user:action.data
        }

    }

    if (action.type == 'NEXT_PERGUNTA'){
        const x = {...state} ;
        let resultado = null;
        let tot = 0 ;
        let response = 0 ;
        x.concurso.perguntas.map(
            function(itens,i){
                tot += 1 ;
                if (itens.alternativaEscolhida == null  ||  itens.alternativaEscolhida == 0 ){
                    resultado = itens;
                    itens.alternativaEscolhida = 0 ;
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

    if (action.type == 'INIT_CONCURSO'){
        // const x = {...state} ;
        // let resultado = null;
        // let tot = 0 ;
        // let response = 0 ;
        // x.dados[0].concurso[0].perguntas.map(
        //     function(itens,i){
        //         console.log(tot);
        //         tot += 1 ;
        //         if (itens.alternativaEscolhida == 0){
        //             resultado = itens ;
        //         }else{
        //             response += 1 ;
        //         }
                
        //     }
        // )


        return{
            ...state,
            concurso: action.data 
            // pergunta:resultado,
            // qtd:{
            //     total: tot,
            //     respondida:response
            // }
            
        }
    }


    if (action.type == 'ESCOLHA'){

       const x = {...state} ; // 
       let p = 0 ;

       x.concurso.perguntas.map(function(itens,i){

           if (itens.numPergunta == action.data.pergunta) {               
               itens.alternativaEscolhida = action.data.resposta ;
               if (itens.numAlternativaCorreta == action.data.resposta) {
                  p =  1 ;
               }
           }
       })


        return {
            ...state,
            concurso:x.concurso,
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

const Store =  createStore(store) ;
  
export default Store ;
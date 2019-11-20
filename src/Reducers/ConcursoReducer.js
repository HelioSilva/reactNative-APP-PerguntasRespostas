const initalState = {
    concurso:{},
    question:{
        texto:'Nenhuma Pergunta a ser feita',
        alternativas:[]
    },
    count:{
        total:0,
        respondida:0
    }
}

export default (state = initalState, action )=>{

    switch(action.type){
        case 'SET_CONCURSO':
            let _total = action.payload.concurso.perguntas.length ;
            return {...state , concurso:action.payload.concurso,  count:{ total:_total , repondida:0 } };
            break;

        case 'GET_PERGUNTA':
            let pergunta={};
            for (let i = 0;i < state.concurso.perguntas.length;i++) {
               if (state.concurso.perguntas[i].alternativaEscolhida == null || state.concurso.perguntas[i].alternativaEscolhida == 0 ){
                pergunta={texto:state.concurso.perguntas[i].pergunta,alternativas:state.concurso.perguntas[i].alternativas}
                break;
               }
                
            }
               
            return {...state,question:pergunta}
            break;

    }

    return state ;

}
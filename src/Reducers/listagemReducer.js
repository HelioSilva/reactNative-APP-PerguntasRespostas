const initalState = {
    dados:[]
}

export default (state = initalState, action )=>{

    switch(action.type){
        case 'SET_DADOS':
            return {...state , dados:action.payload.dados};
            break;

    }

    return state ;

}
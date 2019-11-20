const initalState = {
    device:'',
    nome:''
}

export default (state = initalState, action )=>{

    switch(action.type){
        case 'SET_DEVICE':
            return {...state , device:action.payload.device};
            break;

        case 'SET_NOME':
            return {...state, nome:action.payload.nome};
            break;
    }

    return state ;

}
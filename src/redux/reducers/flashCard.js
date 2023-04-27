const initialState = {

    flashCards: []
}

function flashCardReducer(state = initialState, action){

    switch(action.type){

        case 'GET_FLASH_CARDS':
            return{
                ...state,
                flashCards: action.payload
            } 
            
        case 'CREATE_FLASH_CARD':
            return{
                ...state,
                flashCards: [...state.flashCards, action.payload]
            }

        case 'DELETE_FLASH_CARD':
            return{
                ...state,
                flashCards: state.flashCards.filter(f => f._id !== action.payload)
            }

        default:
            return state;
    }
}

export default flashCardReducer
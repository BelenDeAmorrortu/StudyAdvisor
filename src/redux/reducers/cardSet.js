const initialState = {
    cardSets: [],
    cardSet: {}
}

function cardSetReducer(state = initialState, action){

    switch(action.type){

        case 'GET_CARD_SETS':
            return{
                ...state,
                cardSets: action.payload
            }

            
        case 'GET_CARD_SET':
            return{
                ...state,
                cardSet: action.payload
            }

        case 'CREATE_CARD_SET':
            return{
                ...state,
                cardSets: [...state.cardSets, action.payload] 
            }

        case 'DELETE_CARD_SET':
            return {
                ...state,
                cardSets: state.cardSets.filter(s => s._id !== action.payload)
            } 
            
        default:
            return state;
    }
}

export default cardSetReducer
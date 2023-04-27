const initialState = {
    summaries: [],
    summary: {}
}

function summaryReducer(state = initialState, action){

    switch(action.type){
        
        case 'GET_SUMMARIES':
            return{
                ...state,
                summaries: action.payload
            }

        case 'CREATE_SUMMARY':
            return{
                ...state,
                summaries: [...state.summaries, action.payload]
            }

        
        case 'DELETE_SUMMARY':
            return{
                ...state,
                summaries: state.summaries.filter(s => s._id !== action.payload)
            }

        case 'SHOW_SUMMARY':
            return {
                ...state,
                summary: action.payload
            }

        default:
            return state;
    }
}

export default summaryReducer
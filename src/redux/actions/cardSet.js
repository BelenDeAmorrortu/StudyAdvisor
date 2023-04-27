import axios from "axios";

export function getCardSets(userId){

    return async(dispatch)=>{

        try{

            const { data } = await axios.get(`http://localhost:3003/CardSet/${userId}`)
            
            return dispatch({type: 'GET_CARD_SETS', payload: data })

        }
    
        catch(e){
    
            throw Error(e.response.data)
        }
    }
}

export function getCardSet(userId, cardSetId){

    return async(dispatch)=>{

        try{

            const { data } = await axios.get(`http://localhost:3003/CardSet/${userId}`)
            
            return dispatch({type: 'GET_CARD_SET', payload: data.find(s => s._id === cardSetId) })

        }
    
        catch(e){
    
            throw Error(e.response.data)
        }
    }
}

export function createNewCardSet(CardSet){

    return async(dispatch)=>{

        try{

            const { data } = await axios.post(`http://localhost:3003/CardSet`, CardSet)
            
            return dispatch({type: 'CREATE_CARD_SET', payload: data})

        }
    
        catch(e){
    
            throw Error(e.response.data)
        }

    }

}

export function deleteCardSet(id){

    return async(dispatch)=>{

        try{

            await axios.delete(`http://localhost:3003/CardSet/${id}`)

            return dispatch({type: 'DELETE_CARD_SET', payload: id})
        }

        catch(e){

            throw Error(e.response.data)
        }
    }
}
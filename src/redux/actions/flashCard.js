import axios from "axios";

export function getFlashCards(cardSetId){

    return async(dispatch)=>{

        try{

            const { data } = await axios.get(`http://localhost:3003/Card?cardSetId=${cardSetId}`)

            return dispatch({type: 'GET_FLASH_CARDS', payload: data})
        }
        catch(e){

            throw Error(e.response.data)
        }
    }
}

export function createFlashCard(id, input){

    return async(dispatch)=>{

        try{
            const { data } = await axios.post(`http://localhost:3003/Card?cardSetId=${id}`, input)
        
            return dispatch({type: 'CREATE_FLASH_CARD', payload: data})
        }
        catch(e){

            throw Error(e.response.data)
        }
    }
}


export function deleteFlashCard(id){

    return async(dispatch)=>{

        try{
            await axios.delete(`http://localhost:3003/Card/${id}`)
        
            return dispatch({type: 'DELETE_FLASH_CARD', payload: id})
        }
        catch(e){

            throw Error(e.response.data)
        }
    }
}
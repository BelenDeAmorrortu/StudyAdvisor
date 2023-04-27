import axios from 'axios'

export function getSummaries(userId){

    return async(dispatch)=>{

        try{
           
            const { data } = await axios.get(`http://localhost:3003/Summary/${userId}`)

            return dispatch({type: 'GET_SUMMARIES', payload: data})
        }

        catch(e){

            throw Error(e.response.data)
        }

    }
}

export function createSummary(summary){

    return async(dispatch)=>{

        try{
           
            const { data } = await axios.post(`http://localhost:3003/Summary`, summary)
           
            return dispatch({type: 'CREATE_SUMMARY', payload: data})
        }

        catch(e){

            throw Error(e.response.data)
        }

    }
}

export function deleteSummary(summaryId){

    return async(dispatch)=>{

        try{
            await axios.delete(`http://localhost:3003/Summary/${summaryId}`)
        
            return dispatch({type: 'DELETE_SUMMARY', payload: summaryId})
        }

        catch(e){
            
            throw Error(e.response.data)
        }
    }
}

export function showSummary(summary){

    return {type: 'SHOW_SUMMARY', payload: summary}
}
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../../contexts/AuthContext'
import { useTheme } from '../../../contexts/ThemeContext'
import { createNewCardSet } from '../../../redux/actions/cardSet'
import style from './Form.module.scss'

export default function Form(setDisplay) {

    const { currentTheme } = useTheme()
    const { currentUser } = useAuth()
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    useEffect(()=>{
        return ()=> setName('')
    },[])
    
    
    function handleSubmit(){

        if(name !== '') dispatch(createNewCardSet({name, userId: currentUser.uid}))
        setDisplay(false)
    }

    return (

        <form className={style.form}>

            <input
                className={style[currentTheme]}  
                type='text' 
                placeholder='Name'
                value={name}
                onChange={e => setName(e.target.value)}/>
            <button onClick={()=> handleSubmit()}>Add</button>
             
        </form>
    )
}
import React from 'react'
import { useTheme } from '../../../contexts/ThemeContext'
import style from './Form.module.scss'

export default function Form({handleOnClick, setName, name}) {

    const { currentTheme } = useTheme()
    
    return (

        <div className={style.form}>

            <input
                className={style[currentTheme]}  
                type='text' 
                placeholder='Name'
                value={name}
                onChange={e => setName(e.target.value)}/>
            <button onClick={()=> handleOnClick(name)}>Add</button>
             
        </div>
    )
}
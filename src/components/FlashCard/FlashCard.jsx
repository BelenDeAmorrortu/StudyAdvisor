import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTheme } from '../../contexts/ThemeContext'
import { deleteFlashCard } from '../../redux/actions/flashCard'
import style from './FlashCard.module.scss'
import Alert from '../../utils/Alert'

export default function FlashCard({id, question, options, answer, display}) {

    const { currentTheme } = useTheme()
    
    const [flip, setFlip] = useState(false)
    
    const dispatch = useDispatch()

    useEffect(()=>{

        if(display === 'visible') setFlip(false)

    }, [display])

    function handleCardDelete(){

        Alert(currentTheme,'Are you sure you want to delete the flash card?', 'question', 'Yes, I am sure', 'No, cancel delete',
            ()=> dispatch(deleteFlashCard(id))
        )
    }

    return (

        <div className={`${style.card} ${flip ? style.flip : ''} ${style[currentTheme]}`} onClick={() => display === 'hidden' ? setFlip(!flip) : null}>

            <button onClick={()=> handleCardDelete()} style={{visibility: display}}>X</button>

            <div className={style.front}>
                <h5 className={style.placeholder}>Question</h5>
                <h4>{question}</h4>

                {options.length > 0 ?
                
                <ul className={style[currentTheme]}>
                    {options.map(o => <li key={o}>{o}</li>)}
                </ul>

                : null }

            </div>

            <div className={style.back}>
                <h5 className={style.placeholder}>Answer</h5>
                <h4>{answer}</h4>
            </div>
        
        </div>
    )
}

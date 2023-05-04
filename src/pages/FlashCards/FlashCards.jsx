import React,  { useState, useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FlashCard, NewItemModal, FlashCardForm } from '../../components/index'
import style from './FlashCards.module.scss'
import { flash_card_form } from '../../images'
import { useNavigate, useParams } from 'react-router-dom'
import { getFlashCards } from '../../redux/actions/flashCard'
import Redirect from '../../utils/Redirect'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { getCardSet } from '../../redux/actions/cardSet'

export default function FlashCards(){

    const { currentUser } = useAuth()
    const { currentTheme } = useTheme()

    const { cardSetId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const flashCards = useSelector(state => state.flashCard.flashCards)
    const cardSet = useSelector(state => state.cardSet.cardSet)

    useEffect(()=>{

        if(!currentUser) Redirect(navigate, currentTheme)
    }, [currentTheme, currentUser])

    useEffect(()=>{

        dispatch(getCardSet(currentUser.uid, cardSetId))
        dispatch(getFlashCards(cardSetId))
    }, [cardSetId])

    const [display, setDisplay] = useState(false)
    const [edit, setEdit] = useState('hidden')

    function handleEditCards(){

        if(edit === 'hidden') setEdit('visible')
        else setEdit('hidden')
    }
    
    return (

        <div className={style.container}>

            {cardSet ? <h2>{cardSet.name}</h2> : null}
            
            <div className={style.buttons}>

                <NewItemModal itemName='flash card' formImg={flash_card_form} addForm={<FlashCardForm cardSetId={cardSet._id} setDisplay={setDisplay} />} setDisplay={setDisplay} display={display} size='half'/>
                
                <button className={`${style.button} ${style[currentTheme]}`} disabled={flashCards && flashCards.length > 0 ? false : true} onClick={handleEditCards}>{ edit === 'hidden' ? 'Edit Flash Cards' : 'Done'}</button>

            </div>

            <div className={style.cards}>
                {flashCards && flashCards.length > 0 ? flashCards.map(c => <FlashCard key={c._id} id={c._id} question={c.question} options={c.options} answer={c.answer} display={edit} />) : <span className={style.message}>This set does not have any flash cards yet</span>}
            </div>
        
        </div>
    )
}

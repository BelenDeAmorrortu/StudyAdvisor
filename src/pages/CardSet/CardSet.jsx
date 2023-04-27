import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SummaryForm, NewItemModal, Item} from '../../components/index'
import style from './CardSet.module.scss'
import { folder, card_set_form } from '../../images/index'
import { useEffect } from 'react'
import { getCardSets, deleteCardSet, createNewCardSet } from '../../redux/actions/cardSet'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import Redirect from '../../utils/Redirect'
import Alert from '../../utils/Alert'

export default function CardSet() {

    const { currentUser } = useAuth()
    const { currentTheme } = useTheme()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cardSets = useSelector(state => state.cardSet.cardSets)

    useEffect(()=>{

        if(!currentUser) Redirect(navigate, currentTheme)

        else dispatch(getCardSets(currentUser.uid))

    }, [currentTheme, currentUser])


    const [display, setDisplay] = useState('none')
    const [name, setName] = useState('')

    function handleDelete(id, name){

        Alert(currentTheme,`Are you sure you want to delete '${name}' Card Set?`, 'question', 'Yes, I am sure', 'No, cancel delete',
            ()=> dispatch(deleteCardSet(id))
        )
    }

    function handleOnClick(name){
        
        if(name === '') return
        dispatch(createNewCardSet({name, userId: currentUser.uid}))
        setName('')
        setDisplay('none')

    }

    return (

        <div className={style.cardFolders_container}>

            <NewItemModal itemName={'card set'} formImg={card_set_form} addForm={<SummaryForm name={name} setName={setName} setDisplay={setDisplay} handleOnClick={handleOnClick} />} resetFormState={setName} initialFormState={name} setDisplay={setDisplay} display={display} size='full'/>

            <div className={style.cardGroups_display}>

                {cardSets ? cardSets.map(g => <Item key={g._id} NavLinkUrl={`/flashcards/${g._id}`} imgUrl={folder} handleDelete={handleDelete} item={g} type='cardSet' />) : <span className={style.message}>You haven't created any Card Group yet</span>}

            </div>

        </div>
    )
}

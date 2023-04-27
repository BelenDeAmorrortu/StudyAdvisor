import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import style from './NewItemModal.module.scss'

export default function NewItemModal({ itemName, formImg, addForm, resetFormState, initialFormState, display, setDisplay, size}) {
    
    const {currentTheme} = useTheme()

    function showForm(){

        setDisplay('flex')
    }

    function handleOnClose(){

        resetFormState(initialFormState)
        setDisplay('none')

    }

    return (

        <div className={`${style.container} ${style[size]}`}>

            <div className={style.add_new_button} onClick={showForm}> 

                <span>+</span>
                <span> Add new {itemName}</span>

            </div>
            
            <div className={style.content} style={{display: display}} >

                <div className={`${style.new_item_form} ${style[currentTheme]}`}>

                    <img src={formImg} />

                    <div className={style.form}>

                        <h3>New {itemName}</h3>

                        {addForm}

                    </div>
                    <button className={style.close_form_button} onClick={handleOnClose}>X</button>

                </div>
            </div>
        
        </div>
    )
}

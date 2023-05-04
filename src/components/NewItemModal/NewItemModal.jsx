import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import style from './NewItemModal.module.scss'

export default function NewItemModal({ itemName, formImg, addForm, display, setDisplay, size}) {
    
    const {currentTheme} = useTheme()

    function showForm(){

        setDisplay(true)
    }

    function handleOnClose(){

        setDisplay(false)
    }

    return (

        <div className={`${style.container} ${style[size]}`}>

            <div className={style.add_new_button} onClick={showForm}> 

                <span>+</span>
                <span> Add new {itemName}</span>

            </div>
            
            {display ?

            <div className={style.content} >

                <div className={`${style.new_item_form} ${style[currentTheme]}`}>

                    <img src={formImg} />

                    <div className={style.form}>

                        <h3>New {itemName}</h3>

                        {addForm}

                    </div>
                    <button className={style.close_form_button} onClick={handleOnClose}>X</button>

                </div>
            </div>
            
            : null}
        
        </div>
    )
}

import React from 'react'
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../contexts/ThemeContext';
import style from './Item.module.scss'

export default function Item({NavLinkUrl, imgUrl, handleDelete, item, type}) {

    let { currentTheme } = useTheme()
    let navigate = useNavigate()

    function handleOnClick(){
        
        navigate(NavLinkUrl)
    }
    
    return (

        <div className={`${style.container} ${style[currentTheme]}`}>

            <div className={`${style.item}`} onClick={handleOnClick}>

                <img src={imgUrl} alt='Icon' />
                <h3>{item.name}</h3>
    
            </div>

            <button className={style[currentTheme]} onClick={()=> handleDelete(item._id, item.name)}>X</button>

        </div>

    )
}
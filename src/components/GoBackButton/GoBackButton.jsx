import React from 'react'
import { useNavigate } from 'react-router-dom'
import { chevron } from '../../images/index'
import style from './GoBackButton.module.scss'
import {useTheme} from '../../contexts/ThemeContext'

export default function GoBackButton({page, url}) {

    const navigate = useNavigate()
    const {currentTheme} = useTheme()

    return (
        <button onClick={()=> navigate(url)} className={`${style.button} ${style[currentTheme]}`}>
            <span><img src={chevron} alt="chevron"/></span>
            <p>Go Back To {page}</p>
        </button>
    )
}

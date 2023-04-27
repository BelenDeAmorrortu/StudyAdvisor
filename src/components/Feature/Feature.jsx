import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import style from './Feature.module.scss'

export default function Feature({name, icon}) {

    let {currentTheme} = useTheme()

    return (

        <div className={`${style.feature_container} ${style[currentTheme]}`}>

            <h4>{name}</h4>
            {icon}
        
        </div>
    )
}

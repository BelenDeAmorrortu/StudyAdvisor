import React from "react";
import style from './Tile.module.scss'
import { useEffect } from "react";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useTheme } from "../../contexts/ThemeContext";

export default function Tile({img, title, text, imgPosition}){

    const {currentTheme} = useTheme()

    useEffect(()=>{
        AOS.init({duration: 1000})
    }, [])

    return(

        <div className={`${style.container} ${style[imgPosition]}`} data-aos='fade-up'> 
                
            <div className={`${style.img_container} ${style[currentTheme]}`}>
                {img[0] === 'svg' ? img[1] : <img src={img[1]} alt='illustration' />}
            </div>

            <div className={style.text_container}>
                <h3>{title}</h3>
                {text}
            </div>

        </div>
            
    )
}
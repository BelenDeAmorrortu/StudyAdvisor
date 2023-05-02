import React from 'react'
import style from './BackToTop.module.scss'
import { chevron } from '../../images/index'
import { useState, useEffect} from 'react'

export default function BackToTop() {

    const [isVisible, setIsVisible] = useState(false)

    function goToTop(){
        window.scrollTo(0, 0)
    }

    function onScroll(){

        window.scrollY > 10 && !isVisible ? setIsVisible(true) : setIsVisible(false)

    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    

    return (

        <button className={style.button} onClick={goToTop} style={{opacity: isVisible ? '1' : '0'}}>
            <img src={chevron} alt='Chevron'/>
        </button>
    )
}

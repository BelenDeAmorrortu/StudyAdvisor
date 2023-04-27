import React, {useEffect} from "react";
import style from './Header.module.scss'
import { header_computer } from '../../images/index'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function Header(){

    const {currentUser} = useAuth()
    const {currentTheme} = useTheme()

    useEffect(()=>{
        AOS.init({duration: 1000})
    }, [])

    return(

        <div className={style.header}>

            <div className={style.image_and_title}>

                <div className={style.title_container}>

                    <h1>Study Advisor</h1>
                    {!currentUser?

                    <NavLink to='/signup'>
                        <button>Sign Up</button>
                    </NavLink>

                    :null
                    }
                </div>

                <div className={style.image_container} data-aos='fade-left'>
                    <img src={header_computer} alt="Two people working together on a project from a computer"/>
                </div>

            </div>

            <div className={`${style.wave} ${style[currentTheme]}`} style={{height: '150px', overflow: 'hidden'}} ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}><path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{stroke: 'none'}}></path></svg></div>

        </div>
    )
}
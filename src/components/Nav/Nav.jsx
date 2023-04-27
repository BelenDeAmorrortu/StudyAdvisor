import React, { useState } from "react";
import style from './Nav.module.scss'
import { logo, user, light_mode, dark_mode } from '../../images/index'
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function Nav(){

    const {currentUser, logOut} = useAuth()
    const {switchTheme, currentTheme} = useTheme()
    const { pathname } = useLocation()

    const [display, setDisplay] = useState('hidden')

    function handleLogOut(){

        logOut()
        setDisplay('hidden')
    }

    return(
 
        <nav className={style.nav}>

            <NavLink to='/' onClick={()=> setDisplay('hidden')}>
                
                <img className={style.logo} src={logo} alt="Study Advisor Logo" />

            </NavLink>

            <ul style={{flexDirection: currentUser ? 'row-reverse' : 'row'}}>

                {   currentUser ?

                    <>
                        <li onClick={()=> setDisplay(display === 'visible' ? 'hidden' : 'visible')}><img src={currentUser.photoURL ? currentUser.photoURL : user} alt="User profile picture" /></li>
                    </>

                    :

                    <NavLink to='/login' style={{textDecoration: 'none', visibility: pathname === '/login' ? 'hidden' : 'visible'}}>
                        <li style={{visibility: pathname === '/login' ? 'hidden' : 'visible'}}>Log In</li>
                    </NavLink>
                }

                <li onClick={()=> switchTheme()}><img src={currentTheme === 'dark' ? light_mode : dark_mode} /></li>

            </ul>

            <div className={`${style.sideBar} ${style[currentTheme]}`} style={{transform: display === 'visible' ? 'translateX(0%)' : 'translateX(150%)' }}>

                <h3>{currentUser ? currentUser.displayName : null}</h3>

                <NavLink to='/summary'onClick={()=> setDisplay('hidden')}>
                    <p>My Summaries</p>
                </NavLink>

                <NavLink to='/FlashCards' onClick={()=> setDisplay('hidden')}>
                    <p>My Flash Cards</p>
                </NavLink>

                <button onClick={handleLogOut}>Log Out</button>

            </div>

        </nav>
    )
}
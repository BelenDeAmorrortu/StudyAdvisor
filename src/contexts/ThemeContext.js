import React, { useContext, useEffect, useState } from 'react'

const ThemeContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {

    const [currentTheme, setCurrentTheme] = useState('dark')

    useEffect(()=>{

        setCurrentTheme(JSON.parse(sessionStorage.getItem('theme')) !== null ? JSON.parse(sessionStorage.getItem('theme')) : 'dark')

    }, [])

    useEffect(()=>{

        document.body.classList.add(JSON.parse(sessionStorage.getItem('theme')) !== null ? JSON.parse(sessionStorage.getItem('theme')) : 'dark')
        sessionStorage.theme = JSON.stringify(currentTheme)

    }, [currentTheme])

    function switchTheme(){

        document.body.classList.remove(currentTheme)
        currentTheme === 'dark' ? setCurrentTheme('light') : setCurrentTheme('dark')
        currentTheme === 'dark' ? sessionStorage.theme = JSON.stringify('light') : sessionStorage.theme = JSON.stringify('dark')
    }

    let value = {
        currentTheme,
        switchTheme
    }


    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
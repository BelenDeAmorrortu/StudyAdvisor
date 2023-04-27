import React, { useEffect, useState } from 'react'
import style from './Login.module.scss'
import { login } from '../../images/index'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useAuth } from '../../contexts/AuthContext'
import { validate } from '../../utils/validateLogIn'
import {useTheme} from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'

export default function LogIn() {

    const {currentTheme} = useTheme()

    const navigate = useNavigate()

    const [input, setInput] = useState({

        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    useEffect(()=>{
        AOS.init({duration: 1000})
    }, [])

    const { logIn, signInWithGoogle } = useAuth()

    function handleLogIn(e){

        e.preventDefault()
        let {email, password} = input
        logIn(email, password)

    }

    function handleSignInWithGoogle(e){
        e.preventDefault()
        signInWithGoogle()
    }

    function handleInputChange(e){

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
  
        }))
    }
    
    return(

        <div className={style.login_container}>

            <div className={style.login}>

                    
                <div className={style.img_div} data-aos='fade-right'> 

                    <img src={login} alt="Log In Ilustration" />

                </div>


                <div className={style.form_flex}>

                    <form className={style[currentTheme]}>

                        <h4>Log In</h4>

                        <div className={style.form_section}>
                            <span><label>Email</label>{errors.email ? <span className={style.error}>{errors.email}</span> : null}</span>
                            <input type="email" placeholder="Email" name='email' value={input.email} onChange={e => handleInputChange(e)} />
                        </div>

                        <div className={style.form_section}>
                            <span><label>Password</label>{errors.password ? <span className={style.error}>{errors.password}</span> : null}</span>
                            <input type="password" placeholder="Password" name='password' value={input.password} onChange={e => handleInputChange(e)} />
                        </div>

                        <div className={style.form_section}>

                            <button onClick={e => handleLogIn(e)} disabled={Object.keys(errors).length ? true : false}>Log In</button>
                            <span className={style.or}><hr /><p>or</p><hr /></span>
                            <button onClick={(e)=> handleSignInWithGoogle(e)} className={style.google_button}><svg xmlns="http://www.w3.org/2000/svg" xmlnsSvgjs="http://svgjs.com/svgjs" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" className="color4285F4 svgShape"/><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" className="color34A853 svgShape"/><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" className="colorFBBC05 svgShape"/><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" className="colorEB4335 svgShape"/></svg></svg>Log In With Google</button>
                            <p className={style.register}>You do not have an account? <span onClick={()=>navigate('/signup')}>Sign Up</span></p>
                        </div>

                    </form>

                </div>
            </div>
        
        </div>
    )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import style from './Signup.module.scss'
import {validate} from '../../utils/validateSignUp'

export default function SignUp() {

	const { signInWithGoogle, signUp } = useAuth()

	const { currentTheme } = useTheme()

	const navigate = useNavigate()

	const [input, setInput] = useState({
		
		username: '',
		email: '',
		password: '',
		confirmPassword: ''

	})

	const [errors, setErrors] = useState({})

	function handleSignUp(e){

		e.preventDefault()
		const { username, email, password } = input
		signUp(email, password, username)
		setInput({		
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		})
		setErrors({})

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

  	return (

		<div className={style.form_container}>

			<form className={`${style.form} ${style[currentTheme]}`}>

				<h4>Sign Up</h4>
                
				<div className={style.form_section}>
					<span><label>Username</label>{errors.username ? <span className={style.error}>{errors.username}</span> : null}</span>
					<input type='text' value={input.username}  name='username' placeholder='Username' onChange={e => handleInputChange(e)} />
				</div>

				<div className={style.form_section}>
					<span><label>Email</label>{errors.email ? <span className={style.error}>{errors.email}</span> : null}</span>
					<input type='email' value={input.email}  name='email' placeholder='Email' onChange={e => handleInputChange(e)} />
				</div>

				<div className={style.form_section}>
					<span><label>Password</label>{errors.password ? <span className={style.error}>{errors.password}</span> : null}</span>
					<input type='password' value={input.password} name='password' placeholder='Password'onChange={e => handleInputChange(e)} />
				</div>

				<div className={style.form_section}>
					<span><label>Confirm Password</label>{errors.confirmPassword ? <span className={style.error}>{errors.confirmPassword}</span> : null}</span>
					<input type='password' value={input.confirmPassword} name='confirmPassword' placeholder='Confirm Password' onChange={e => handleInputChange(e)} />
				</div>

				<button onClick={e => handleSignUp(e)} disabled={Object.keys(errors) ? true : false}>Sign Up</button>	
				<span className={style.or}><hr /><p>or</p><hr /></span>
				<button onClick={(e)=> handleSignInWithGoogle(e)} className={style.google_button}><svg xmlns="http://www.w3.org/2000/svg" xmlnsSvgjs="http://svgjs.com/svgjs" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" className="color4285F4 svgShape"/><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" className="color34A853 svgShape"/><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" className="colorFBBC05 svgShape"/><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" className="colorEB4335 svgShape"/></svg></svg>Sign Up With Google</button>
				<p className={style.logIn}>You already have an account? <span onClick={()=>navigate('/login')}>Log In</span></p>

			</form>
		</div>
  	)
}

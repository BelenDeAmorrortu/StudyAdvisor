import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createFlashCard } from '../../../redux/actions/flashCard'
import style from './Form.module.scss'
import { useTheme } from '../../../contexts/ThemeContext'

export default function FlashCardForm({cardSetId, setDisplay}) {

    const { currentTheme } = useTheme()

    const dispatch = useDispatch()
    const [input, setInput] = useState({

        question: '',
        options: [ '', '', '', ''],
        answer: ''
    })

    useEffect(()=>{
        return ()=> setInput({        
            question: '',
            options: [ '', '', '', ''],
            answer: ''
        })
    }, [])

    function handleChange(e){

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleOptionChange(e){

        let newArr = [...input.options]
        newArr[e.target.name] = e.target.value

        setInput({
            ...input,
            options: newArr
        })
    }

    function handleSubmit(e){

        e.preventDefault()

        if(input.question === '' || !input.answer === '') return alert('Please complete the required fields (question - answer)')
        
        dispatch(createFlashCard(cardSetId, {...input, options: input.options.filter(e => e !== '' && e !== ' ')}))   
        
        setDisplay(false)
     
    }

    return (
        <form className={`${style.form} ${style[currentTheme]}`} style={{flexDirection: 'column'}}>
            <input type='text' value={input.question} placeholder='Question' name='question' onChange={e => handleChange(e)} />
            <input type='text' value={input.answer} placeholder='Answer' name='answer' onChange={e => handleChange(e)} />
            <input type='text' value={input.options[0]} placeholder='Option 1 (optional)' name={0} onChange={e => handleOptionChange(e)} />
            <input type='text' value={input.options[1]} placeholder='Option 2 (optional)' name={1} onChange={e => handleOptionChange(e)} />
            <input type='text' value={input.options[2]} placeholder='Option 3 (optional)' name={2} onChange={e => handleOptionChange(e)} />
            <input type='text' value={input.options[3]} placeholder='Option 4 (optional)' name={3} onChange={e => handleOptionChange(e)} />
            <button onClick={e => handleSubmit(e)}>Add</button>
        </form>
    )
}

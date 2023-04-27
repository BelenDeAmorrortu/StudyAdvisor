import React, { useCallback, useEffect, useState} from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './SummaryEditor.scss'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'

let toolbarOptions = [

    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  
    [{ 'font': [] }],
    [{ 'color': [ '#85C7DE', '#9A2CA0', '#B91372', '#F1E4E8', '#000'] }, { 'background': ['#85C7DE', '#9A2CA0', '#B91372', '#F1E4E8', '#f5f5f51d', '#343e5c1c'] }],
    ['bold', 'italic', 'underline'],     
    [{ 'align': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],    
    [{ 'indent': '-1'}, { 'indent': '+1' }],     
    ['blockquote', 'image'],             
    [{ 'script': 'sub'}, { 'script': 'super' }]

];

const save_interval = 2000
const port = 3003

export default function SummaryEditor() {

    const {id: documentId} = useParams()

    const [socket, setSocket] = useState() // save socket to access it
    const [quill, setQuill] = useState()   // save quill to access it

    // Socket connection --------------------------------------------------------------

    useEffect(()=>{

        window.scrollTo(0,0)

        const s = io(`http://localhost:${port}`)

        s.on('connection')

        setSocket(s)

        return () =>{
            s.disconnect()
        }

    }, [])

    // -------------------------------------------------------------------------------------------

    // Load Document -----------------------------------------------------------------------------

    useEffect(()=>{

        if(!socket || !quill) return

        socket.once('load-document', document =>{

            quill.setContents(document)
            quill.enable()
        })

        socket.emit('get-document', documentId)

    }, [socket, quill, documentId])

    // -------------------------------------------------------------------------------------------

    useEffect(()=>{

        if(!socket || !quill) return

        // Save Document -------------------------------------------------------------------------
        const interval = setInterval(()=>{

            socket.emit('save-document', quill.getContents())

            return ()=> clearInterval(interval)

        }, save_interval)

        // Send User Text Change To Server --------------------------------------------------------

        const sendChangeHandler = (delta, oldDelta, source) =>{ // delta --> only the changes made
            //                                                     source --> who made the changes
            if(source !== 'user') return
            socket.emit('send-changes', delta)
        }

        quill.on('text-change', sendChangeHandler)

        // Receive Changes From Server ----------------------------------------------------------

        const receiveChangesHandler = (delta) =>{

            quill.updateContents(delta)
        }

        socket.on('receive-changes', receiveChangesHandler)

        return ()=>{
            quill.off('text-change', sendChangeHandler)
            socket.off('receive-changes', receiveChangesHandler)
        }

    }, [socket, quill])

    const wrapperRef = useCallback((wrapper)=>{

        if(!wrapper) return

        wrapperRef.innerHTML = ""

        const editor = document.createElement('div')
        wrapper.append(editor)

        const q = new Quill( editor, {theme: 'snow', modules:{ toolbar: toolbarOptions}})

        q.disable()
        q.setText('Loading...')
        setQuill(q)

    }, [])

    return (

        <div className='container' ref={wrapperRef}>
        
        </div>
    )
}
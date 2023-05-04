import React, { useState, useEffect } from "react";
import style from './Summary.module.scss'
import { document, summary_form } from '../../images/index'
import { NewItemModal, Item, SummaryForm } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { getSummaries, deleteSummary} from "../../redux/actions/summary";
import { useAuth } from "../../contexts/AuthContext";
import Alert from '../../utils/Alert'
import { useTheme } from "../../contexts/ThemeContext";
import Redirect from '../../utils/Redirect'
import { useNavigate } from "react-router-dom";

export default function Summaries() {

    const { currentUser } = useAuth()
    const { currentTheme } = useTheme()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const summaries = useSelector(state => state.summary.summaries)

    useEffect(()=>{

        window.scrollTo(0,0)
        if(!currentUser) Redirect(navigate, currentTheme)
        else dispatch(getSummaries(currentUser.uid))

    }, [])

    const [display, setDisplay] = useState(false)

    function handleDelete(id, name){

        Alert(currentTheme, `Are you sure you want to delete '${name}' ?`, 'question', 'Yes, I am sure', 'No, cancel delete', ()=> dispatch(deleteSummary(id)))
    }

    return (

        <div className={style.summaries_container}>

            <NewItemModal itemName='Summary' formImg={summary_form} addForm={<SummaryForm setDisplay={setDisplay} />} setDisplay={setDisplay} display={display} size='full'/>

            <div className={style.summaries_display}>

                {summaries.length > 0 ? summaries.map(s => <Item imgUrl={document} NavLinkUrl={`/summary/${s._id}`} handleDelete={handleDelete} key={s._id} item={s} type='summary'/>) : <span className={style.message}>You don't have any summaries yet</span> }

            </div>

        </div>
    )
}
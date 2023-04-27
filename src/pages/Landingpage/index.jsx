import React from "react";
import { Header, Tile, Feature, LordIcon } from '../../components/index'
import { landing_section_2 } from '../../images/index'
import { useTheme } from "../../contexts/ThemeContext.js";
import style from './index.module.scss'
import { NavLink } from "react-router-dom";

export default function Landingpage(){

    const {currentTheme} = useTheme()

    return(

        <>

            <Header />

            <Tile 
            img={['svg', <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><g data-name="katman 2" fill="#6e44ff" class="color000000 svgShape"><path fill="none" stroke="#b33c86" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M100 60V80.58a12 12 0 0 1-6.16 10.48M28 60V80.58a12 12 0 0 0 6.63 10.74l18.64 9.31a24 24 0 0 0 21.46 0l12.61-6.29" class="colorStrokeF1E4E8 svgStroke"></path><polygon fill="none" stroke="#b33c86" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" points="12 52 64 78 116 52 64 26 12 52" class="colorStrokeF1E4E8 svgStroke"></polygon><polygon fill="none" stroke="#9A2CA0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" points="28 52 64 34 100 52 64 70 28 52" class="colorStrokeffa45a svgStroke"></polygon><ellipse cx="64" cy="52" fill="none" stroke="#b33c86" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" rx="6" ry="3" class="colorStrokeF1E4E8 svgStroke"></ellipse><polyline fill="none" stroke={currentTheme === 'dark' ? '#F1E4E8' : '#000'} stroke-linecap="round" stroke-linejoin="round" stroke-width="4" points="90 84 90 65 68.24 54.12"></polyline><polyline fill="none" stroke={currentTheme === 'dark' ? '#F1E4E8' : '#000'} stroke-linecap="round" stroke-linejoin="round" stroke-width="4" points="92.53 93.21 94 105 90 103 86 105 87.48 93.19"></polyline><path fill="none" stroke="#9A2CA0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M94,89.56a4.84,4.84,0,0,1-1,3.17,4.2,4.2,0,0,1-6,0,4.84,4.84,0,0,1-1-3.17C86,86.49,87.79,84,90,84S94,86.49,94,89.56Z" class="colorStrokeF1E4E8 svgStroke"></path><path fill="none" stroke="#9A2CA0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M51.88,91l5,2.48a16.1,16.1,0,0,0,14.32,0l5-2.48" class="colorStrokeffa45a svgStroke"></path><rect width="128" height="128" fill="none"></rect></g></svg>]}
            imgPosition='left'
            title={"What's Study Advisor?"}
            text={<p>Study Advisor is an e-learning website which provides a variety of study methods. Our aim is for each user to find the most efficient way to carry out their studies.</p>} 
            />

           <Tile 
            img={['src', landing_section_2]}
            imgPosition='right'
            title={"Studying Tools"}
            text={<p>We believe a dynamic study methodology is the best way to learn new concepts, thats why we offer features such as 
            a <span>Flash Card Generatior</span>, <span>Summary Editor</span> and a <span>Calendar</span> to keep your education as fun and orginized as possible.</p>} 
            />

            <div className={style.features}>

                <Feature name='Calendar' icon={<LordIcon src='https://cdn.lordicon.com/uutnmngi.json' />} />

                <NavLink to='/summary' style={{textDecoration: 'none'}}>

                    <Feature name='Summary' icon={<LordIcon src='https://cdn.lordicon.com/hiqmdfkt.json'/>} />

                </NavLink>
                
                <NavLink to='/flashcards' style={{textDecoration: 'none'}} >

                    <Feature name='Flash Cards' icon={<LordIcon src='https://cdn.lordicon.com/xhsumrcb.json'/>}/>

                </NavLink>

            </div>

        </> 
    )

}
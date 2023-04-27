import React from 'react'
import style from './LordIcon.module.scss'


export default function LordIcon({src}) {

    return (

        <div className={style.icon_container}>

            <lord-icon

                src={src}

                trigger={Number(window.innerWidth) > 450 ? "loop-on-hover" : "loop"}

                colors="primary:#B91372,secondary:#85C7DE"

                state="loop"

                style={{width:'100%', height:'100%' }}

                >

            </lord-icon>

        </div>
    )
}

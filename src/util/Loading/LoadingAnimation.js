import React from 'react'
import { TailSpin } from 'react-loading-icons';
import { useSelector } from 'react-redux';
import style from './LoadingStyle.module.css';
export default function LoadingAnimation() {
    const {isShow} = useSelector(state => state.LoadingState);
    //console.log(isShow)
    return (    
        <div className={style.loading} style={{display: !isShow? "none": "" }}>
            <TailSpin  fill='#cc6a23' stroke='#2b8de7' height="6rem" />
            <p className='text-lg mb-0' style={{color:"#2b8de7"}}>Loading</p>
        </div>

    )
}

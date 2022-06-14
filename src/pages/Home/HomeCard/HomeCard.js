import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MultipleRowSlick from '../../../components/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { SET_COMMINGSOON_MOVIE, SET_CURRENT_MOVIE } from '../../../redux/actions/types/QuanLyPhimType';
import style from './style.module.css'
export default function HomeCard(props) {
    const {arrFilms} = useSelector(state => {
        return state.QuanLyPhimState
    })
  
    const dispacth = useDispatch()
    useEffect(()=>{
        let action = layDanhSachPhimAction("");
        dispacth (action); // dispacth direct to middleWare
    },[])
    // const renderFilm = () => {
    //     return arrFilms.map((film, index) => {
    //         return <Film key={index}></Film>

    //     })
    // }
    const [activeButton,setActiveButton] = useState(true);
    const activeClass = style["active-button"];
    

    return <React.Fragment >
        <div className='mb-4'>
            <button className={`${style['button']} px-8 py-3 font-semibold rounded text-white border-2  mr-2 ${activeButton ? activeClass: ""}`} onClick={()=>{
                setActiveButton(true)
                dispacth({
                    type: SET_CURRENT_MOVIE
                })
            }}>Current</button>
            <button className={`${style['button']} px-8 py-3 font-semibold rounded text-white  border-2 mr-2 ${!activeButton ? activeClass:"" }`} onClick={()=>{
                setActiveButton(false)
                dispacth({
                    type: SET_COMMINGSOON_MOVIE
                })
            }}>Comming Soon</button>
        </div>
        <MultipleRowSlick arrFilms={arrFilms}></MultipleRowSlick>
        {/* {renderFilm()} */}
    </React.Fragment>


}



import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import Film from '../../../components/Film/Film';
import MultipleRowSlick from '../../../components/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { SET_COMMINGSOON_MOVIE, SET_CURRENT_MOVIE } from '../../../redux/actions/types/QuanLyPhimType';


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
    const activeClass = 'px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-2'
    const defaultClass = 'px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border'
    

    return <React.Fragment >
        <div className='mb-4'>
            <button className={activeButton? activeClass : defaultClass} onClick={()=>{
                setActiveButton(true)
                dispacth({
                    type: SET_CURRENT_MOVIE
                })
            }}>Current</button>
            <button className={!activeButton ? activeClass: defaultClass} onClick={()=>{
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



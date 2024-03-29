import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick'
import { SHOW_LOADING_ACTION } from '../../redux/actions/LoadingAction,'
import { layDanhSachRapAction } from '../../redux/actions/QuanLyRapActions'
import { SET_RAP_PHIM } from '../../redux/actions/types/QuanLyRapTypes'
import CarouselLayout from '../../templates/HomeTemplate/Layout/Carousel/CarouselLayout'
import HomeCard from './HomeCard/HomeCard'
import HomeMenu from './HomeMenu/HomeMenu'

export default function Home() {
  const { heThongRapChieu } = useSelector(state => {
    return state.QuanLyRapState
  })

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch len middleware
    let action = layDanhSachRapAction();
    dispatch(action);
    dispatch(SHOW_LOADING_ACTION());
  }, [])

  return (
    <div>
       <CarouselLayout></CarouselLayout>
        <HomeCard></HomeCard>
        <HomeMenu hethongRapChieu={heThongRapChieu}></HomeMenu>
    </div>
  )
}

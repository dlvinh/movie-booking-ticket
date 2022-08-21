import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import style from './CarouselStyle.module.css';
import { layDanhSachPhimAction } from '../../../../redux/actions/QuanLyPhimActions';
import _ from "lodash";
import MovieDetailBanner from '../../../../components/MovieDetail/MovieDetailBanner';
const contentStyle = {
  height: '710px',
  color: '#fff',
  lineHeight: "0",
  textAlign: "center",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "100%",

};
export default function CarouselLayout() {

  const dispatch = useDispatch();
  // Call API de goi gia tri cua carousel ben backend ve
  // su dung AXIOS de ung dung ham async
  useEffect(() => {
    let action = layDanhSachPhimAction(" "); // NOTE: chi la getCarouselAction chu khong phai getCarouselAction() vi 
    // ly do: dispatch chi nhan vao opbject. (type, data)
    // cach 2: phai su dung middleware, va getCarouselAction la 1 callbackfunction
    // va vi getCarouselAction khong co return <=> 
    // de su dung action() ta can cho mot return ben getCarouselAction
    dispatch(action)
  }, [])

  // GET DU LIEU thong qua reducer
  const bannersList = useSelector(state => {
    const arrFilms = state.QuanLyPhimState.arrFilms;
   // console.log({ arrFilms });
    let topMovieLst = _.filter(arrFilms, function (item) {
      return item.danhGia > 7
    })
   topMovieLst =  _.orderBy(topMovieLst,["danhGia"],["desc"]);
    if (topMovieLst.length > 5) {
      topMovieLst = topMovieLst.splice(0, 4);
    }
   // console.log({ topMovieLst })
    return topMovieLst
  })
  // console.log(bannersList);

  const renderBanner = () => {
    return bannersList.map((item, index) => {
      return <div key={index}>
        <div style={{ ...contentStyle, backgroundImage: `url(${item?.hinhAnh})` }}>
          <div className={style.banner} >
            <img className='w-full h-full opacity-0' src={item?.hinhAnh} alt='...' />
            <div style={{ position: "absolute", top: 30, width: "100%" }}>
              <MovieDetailBanner movieItem={item}></MovieDetailBanner>
            </div>
          </div>
        </div>
      </div>
    })

  }

  return (
    <Carousel>
      {renderBanner()}
    </Carousel>
  )
}

import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';
const contentStyle = {
  height: '600px',
  color: '#fff',
  lineHeight: "0",
  textAlign: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
};
export default function CarouselLayout() {

  const dispatch = useDispatch();
  // Call API de goi gia tri cua carousel ben backend ve
  // su dung AXIOS de ung dung ham async
  useEffect(() => {
      let action = getCarouselAction(); // NOTE: chi la getCarouselAction chu khong phai getCarouselAction() vi 
      // ly do: dispatch chi nhan vao opbject. (type, data)
      // cach 2: phai su dung middleware, va getCarouselAction la 1 callbackfunction
      // va vi getCarouselAction khong co return <=> 
      // de su dung action() ta can cho mot return ben getCarouselAction
      dispatch(action)
  }, [])

  // GET DU LIEU thong qua reducer
  const bannersList = useSelector(state => {
    return state.CarouselState.arrImg
  })
  // console.log(bannersList);

  const renderBanner = () => {
    return bannersList.map((item, index) => {
      return <div className='banner' key={index}>
        <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }} >
          <img className='w-full h-full opacity-0' src={item.hinhAnh} alt='...' />
        </div>
      </div>
    })
  }

  return (
    <Carousel autoplay>
      {renderBanner()}
      {/* <div className='abc'>
        <div style={{ ...contentStyle,backgroundImage:`url(${bannersList[1].hinhAnh})`}} >
          <img className='w-full h-full opacity-0' src={bannersList[1].hinhAnh} alt='...' />
        </div>
      </div>
      <div className='abc'>
        <div style={{ ...contentStyle,backgroundImage:`url(${bannersList[2].hinhAnh})`}} >
          <img className='w-full h-full opacity-0' src={bannersList[2].hinhAnh} alt='...' />
        </div>
      </div> */}

    </Carousel>
  )
}

/**
 * Su dung redux thunk de call API va de su dung duoc redux
 * 
 * 
 */
 import axios from 'axios'
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { SET_CAROUSEL } from './types/CarouselType';
export const getCarouselAction =(arr)=>{
    // Ham nay se tra ve mot function dua theo redux thunk 
    //dispacth nay khong phai dispact that cua redux mà là cua redux thunk
   return (dispatch)=>{
    try {
        quanLyPhimService.layDanhSachBanner()
          .then((res) => {
            // console.log("bannerres",res)
            let { content, statusCode } = res.data;
            // Neu thanh cong dua len reducer
            if (statusCode === 200) {
              dispatch({
                type: SET_CAROUSEL,
                data: content
              })
            }
          })
          .catch((err) => {
  
          })
      } catch (error) {
        console.log(error)
      }
   }
}
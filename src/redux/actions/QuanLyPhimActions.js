import { map } from "lodash";
import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { SET_FILM_DETAIL, SET_PHIM } from "./types/QuanLyPhimType";

export const layDanhSachPhimAction = ()=>{
    return (dispatch)=>{
        try {
            quanLyPhimService.layDangSachPhim()
            .then((res)=>{
                let {content, statusCode} = res.data;
                if (statusCode === 200){
                    dispatch({ // sau khi co res => se dispatch len redux store de luu state
                        type: SET_PHIM,
                        data: content
                    })
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        } catch (error) {
            console.log("error",error)
        }
    }
}

export const layThongTinLichChieuPhimAction =(maPhim)=>{
    return async (dispatch)=>{
        try {
            let {status, data} = await quanLyPhimService.layThongTinLichChieuPhim(maPhim);
            if (status === 200){
                // dispatch len reducer
                dispatch({
                    type: SET_FILM_DETAIL,
                    data: data.content
                })
            }
        }catch(err){
            console.log(err)
        }
    }
}
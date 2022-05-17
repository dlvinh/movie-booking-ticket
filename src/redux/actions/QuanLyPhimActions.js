import { map } from "lodash";
import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { openNotificationWithIcon } from "../../util/Notification/Notification";
import { HIDE_LOADING_ACTION, SHOW_LOADING_ACTION } from "./LoadingAction,";
import { HIDE_LOADING, SHOW_LOADING } from "./types/LoadingType";
import { SET_FILM_DETAIL, SET_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";

export const layDanhSachPhimAction = ()=>{
    return  async (dispatch)=>{
        dispatch(SHOW_LOADING_ACTION());
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
        dispatch(HIDE_LOADING_ACTION());
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

// ADD NEW MOVIE
export const themPhimUploadHinhAction = (formData)=>{
   console.log("tenPhimformDAta", formData.get("File"))
    return async(dispatch)=>{
        dispatch(SHOW_LOADING_ACTION());
        try {
            let res = await quanLyPhimService.themPhimUploadHinh(formData);
            if (res.data.statusCode === 200){
                openNotificationWithIcon("success","Adding Success", "New task has been added", "top");
                window.location.reload()
            }
            console.log("result", res.data);
        } catch (error) {
            let data = error.response.data;
            openNotificationWithIcon("error",`Error ${data.statusCode}`, data.content, "top");
            console.log({error})
        }
        // dispatch(HIDE_LOADING_ACTION());
    }
}

// LAY THONG TIN PHIM ACTION
export const layThongTinPhimAction = (maPhim)=>{
    return async(dispatch)=>{
        dispatch(SHOW_LOADING_ACTION());
        try{
            let res = await quanLyPhimService.layThongTinPhimService(maPhim);
            if (res.data.statusCode === 200){
                dispatch({
                    type: SET_THONG_TIN_PHIM,
                    data: res.data.content
                })
            }

        }catch(error){
            let data = error.response.data;
            openNotificationWithIcon("error",`Error ${data.statusCode}`, data.content,"top")
        }
        dispatch(HIDE_LOADING_ACTION());
    }
}
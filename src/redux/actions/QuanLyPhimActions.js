import { map } from "lodash";
import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { openNotificationWithIcon } from "../../util/Notification/Notification";
import { HIDE_LOADING_ACTION, HIDE_LOADING_TABLE_ACTION, SHOW_LOADING_ACTION, SHOW_LOADING_TABLE_ACTION } from "./LoadingAction,";
import { HIDE_LOADING, SHOW_LOADING, SHOW_LOADING_TABLE } from "./types/LoadingType";
import { SET_FILM_DETAIL, SET_LOADING_TABLE_STATE, SET_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";
import {history} from "../../App";
export const layDanhSachPhimAction = (keyWord)=>{
    return async(dispatch)=>{
       await dispatch(SHOW_LOADING_TABLE_ACTION());
        try {
            // console.log("aydanh sach",keyWord)
            quanLyPhimService.layDangSachPhim(keyWord)
            .then((res)=>{
                let {content, statusCode} = res.data;
                if (statusCode === 200){
                    dispatch({ // sau khi co res => se dispatch len redux store de luu state
                        type: SET_PHIM,
                        data: content
                    })
                    dispatch(HIDE_LOADING_TABLE_ACTION())
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

// ADD NEW MOVIE
export const themPhimUploadHinhAction = (formData)=>{
   //console.log("tenPhimformDAta", formData.get("File"))
    return async(dispatch)=>{
       //await dispatch(SHOW_LOADING_ACTION());
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

// CAP NHAT THONG TIN PHIM
export const capNhatPhimUploadAction = (formData)=>{
    return async(dispatch)=>{
        console.log("Updating...",formData.get("ngayKhoiChieu"));
        dispatch(SHOW_LOADING_ACTION());
        try {
            let res = await quanLyPhimService.capNhatPhimUploadService(formData);
            //console.log("res")
            if (res.data.statusCode === 200){
                openNotificationWithIcon("success",`Success`, res.data.message, "top");
                history.push("/admin/films")
            }
        } catch (error) {
            let data = error.response.data;
            console.log("error",error)
            openNotificationWithIcon("error",`Error ${data.statusCode}`, data.content,"top")
        }
        dispatch(HIDE_LOADING_ACTION());
    }
}

// DELETE MOVIE 
export const xoaPhimAction =(maPhim)=>{
    return async(dispatch)=>{
        try{
            let res = await quanLyPhimService.xoaPhimService(maPhim);
            if (res.data.statusCode === 200){
                openNotificationWithIcon("success",res.data.message,res.data.content,"top");
                dispatch(layDanhSachPhimAction(" "));
            }
        }catch(error){
            let data = error.response.data;
            openNotificationWithIcon("error",data.message,data.content,"top");
        }
    }
}
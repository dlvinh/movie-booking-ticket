import { quanLyRapService } from "../../services/QuanLyRapService"
import { openNotificationWithIcon } from "../../util/Notification/Notification";
import { HIDE_LOADING } from "./types/LoadingType";
import { SET_RAP_PHIM, SET_THONG_TIN_CUM_RAP, SET_THONG_TIN_HE_THONG_RAP_CHIEU } from "./types/QuanLyRapTypes";

export const layDanhSachRapAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.layThongTinLichChieuHeThongRap();

            if (result.status === 200) {
                // console.log("content", result.data.content)
                //dispatch len redux store
                await dispatch({
                    type: SET_RAP_PHIM,
                    data: result.data.content
                })
                await dispatch({ type: HIDE_LOADING })

            } else {
                console.log(result.statusText)
            }
        } catch (error) {
            console.log("error", error)
            await dispatch({ type: HIDE_LOADING })
        }
    }
}

export const layThongTinHeThongRap = () => {
    return async (dispatch) => {
        try {
            const res = await quanLyRapService.layThongTinHeThongRap();
            if (res.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_HE_THONG_RAP_CHIEU,
                    data: res.data.content
                })
            }
        } catch (err) {
            let data = err.response.data;
            openNotificationWithIcon("error", data.message, data.content, "top");
        }
    }
}

export const layThongTinCumRapTheoHeThongAction= (maHeThongRap)=>{
    return async (dispatch)=>{
        try{
            const res = await quanLyRapService.layThongTinCumRapTheoHeThong(maHeThongRap);
            if (res.data.statusCode === 200){
                dispatch({
                    type: SET_THONG_TIN_CUM_RAP,
                    data: res.data.content
                })
            }
        }catch(error){
            let data = error.response.data;
            openNotificationWithIcon("error", data.message, data.content, "top");
        }
    }
}
import { quanLyRapService } from "../../services/QuanLyRapService"
import { HIDE_LOADING } from "./types/LoadingType";
import { SET_RAP_PHIM } from "./types/QuanLyRapTypes";

export const layDanhSachRapAction = ()=>{
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.layThongTinLichChieuHeThongRap();
            
            if (result.status === 200){
               // console.log("content", result.data.content)
                //dispatch len redux store
                await dispatch({
                    type: SET_RAP_PHIM,
                    data: result.data.content
                })
                await dispatch({ type: HIDE_LOADING})
             
            }else{
                console.log(result.statusText)
            }
        } catch (error) {   
            console.log("error",error)
            await dispatch({ type: HIDE_LOADING})
        }
    }
}
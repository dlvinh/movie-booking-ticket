import { quanLyRapService } from "../../services/QuanLyRapService"
import { SET_RAP_PHIM } from "./types/QuanLyRapTypes";

export const layDanhSachRapAction = ()=>{
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.layThongTinLichChieuHeThongRap();
            
            if (result.status === 200){
               // console.log("content", result.data.content)
                //dispatch len redux store
                dispatch({
                    type: SET_RAP_PHIM,
                    data: result.data.content
                })
            }else{
                console.log(result.statusText)
            }
        } catch (error) {   
            console.log("error",error)
        }
    }
}
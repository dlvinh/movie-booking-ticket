import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { SET_PHIM } from "./types/QuanLyPhimType";

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
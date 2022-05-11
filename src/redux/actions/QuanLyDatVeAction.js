import { notification } from "antd";
import { quanLyDatVe } from "../../services/QuanlyDatVe"
import { openNotificationWithIcon } from "../../util/Notification/Notification";
import { CHUYEN_TAB_ACTION } from "./ChuyenTabAction";
import { HIDE_LOADING_ACTION, SHOW_LOADING_ACTION } from "./LoadingAction,";
import { HIDE_LOADING, SHOW_LOADING } from "./types/LoadingType";
import { DAT_VE_HOAN_TAT, SET_PHONG_VE } from "./types/QuanLyDatVe";

export const layDanhSachPhongVeAction = (maLichChieu)=>{
    return async (dispacth)=>{
        dispacth(SHOW_LOADING_ACTION())
        try{
            let {data, status} = await quanLyDatVe.layDanhSachPhongVe(maLichChieu);
            console.log("Danh Sach Phong ve",data.content);
            if (status === 200){
                dispacth({
                    type: SET_PHONG_VE,
                    data: data.content
                })
                dispacth(HIDE_LOADING_ACTION())
            }
        }catch(err){
            console.log("err",err);
            let {data} = err.response
            openNotificationWithIcon("error","Failure",data.content,"top");
        }
    } 
}

export const datVeAction = (thongTinDatVe)=>{
    return async (dispatch)=>{
        dispatch(SHOW_LOADING_ACTION())
        try{
            let {data,status} = await quanLyDatVe.datVe(thongTinDatVe);
            if (status === 200){
                openNotificationWithIcon("success","Buy ticket",data.content.message,"top");
                // SET TO chitietphongve reducer
                await dispatch(layDanhSachPhongVeAction(thongTinDatVe.maLichChieu)) // su dung await de doi cho viet lay dispacth hoan tat thi  HIDELOADING moi duoc executed
                await dispatch({type:DAT_VE_HOAN_TAT});
                await dispatch(CHUYEN_TAB_ACTION(2));
                dispatch(HIDE_LOADING_ACTION())

            }
        
        }catch(err){
            openNotificationWithIcon("error","Failure", err.response.data.content.message,"top");
        }   
    }
}
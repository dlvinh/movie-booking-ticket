import { notification } from "antd";
import { quanLyDatVe } from "../../services/QuanlyDatVe"
import { openNotificationWithIcon } from "../../util/Notification/Notification";
import { SET_PHONG_VE } from "./types/QuanLyDatVe";

export const layDanhSachPhongVeAction = (maLichChieu)=>{
    return async (dispacth)=>{
        try{
            let {data, status} = await quanLyDatVe.layDanhSachPhongVe(maLichChieu);
            console.log("Danh Sach Phong ve",data.content);
            if (status === 200){
                dispacth({
                    type: SET_PHONG_VE,
                    data: data.content
                })
            }
        }catch(err){
            console.log("err",err);
            let {data} = err.response
            openNotificationWithIcon("error","Failure",data.content,"top");
        }
    } 
}
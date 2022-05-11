import { USER_LOGIN } from "../../../util/setting.js/config";
import { ThongTinDatVe } from "../../../_core/models/ThongTinDatVe";
import { ThongTinTaiKhoan } from "../../../_core/models/ThongTInTaiKhoan";
import { LOGIN, SAVE_THONG_TIN_TAI_KHOAN } from "../../actions/types/QuanLyNguoiDung"

let initialUser={}
if (!localStorage.getItem(USER_LOGIN)){
  initialUser ={}
}else{
    initialUser = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
    userLogin:initialUser,
    thongTinTaiKhoan:{}
}

export const QuanLyNguoiDungReducer = (state = stateDefault , action)=>{
    switch(action.type){
        case LOGIN:{
            state.userLogin = action.data;
            return {...state};
        }
        case SAVE_THONG_TIN_TAI_KHOAN:{
            state.thongTinTaiKhoan = action.data;
            return {...state};
        }
        default: return {...state}
    }
}
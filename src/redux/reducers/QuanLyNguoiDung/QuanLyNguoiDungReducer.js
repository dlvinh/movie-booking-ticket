import { USER_LOGIN } from "../../../util/setting.js/config";
import { LOGIN } from "../../actions/types/QuanLyNguoiDung"

let initialUser={}
if (!localStorage.getItem(USER_LOGIN)){
  initialUser ={}
}else{
    initialUser = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
    userLogin:initialUser
}

export const QuanLyNguoiDungReducer = (state = stateDefault , action)=>{
    switch(action.type){
        case LOGIN:{
            state.userLogin = action.data;
            return {...state};
        }
        default: return {...state}
    }
}
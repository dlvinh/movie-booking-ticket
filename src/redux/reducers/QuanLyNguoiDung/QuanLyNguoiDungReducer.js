import { LOGIN } from "../../actions/types/QuanLyNguoiDung"

const stateDefault = {
    userLogin:{}
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
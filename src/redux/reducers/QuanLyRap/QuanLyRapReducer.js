import { SET_RAP_PHIM } from "../../actions/types/QuanLyRapTypes"

const stateDefault = {
    heThongRapChieu:[]
}

export const QuanLyRapReducer = (state = stateDefault,action)=>{
    switch(action.type){
        case SET_RAP_PHIM:{
            //console.log(action.data);
            state.heThongRapChieu = action.data;
            return {...state};
        }
        default: return {...state}
    }
}
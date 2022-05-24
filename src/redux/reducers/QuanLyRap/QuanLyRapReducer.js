import { SET_RAP_PHIM, SET_THONG_TIN_CUM_RAP, SET_THONG_TIN_HE_THONG_RAP_CHIEU } from "../../actions/types/QuanLyRapTypes"

const stateDefault = {
    heThongRapChieu:[],
    thongTinHeThongRapChieu:[],
    thongTinCumRap:[],
}

export const QuanLyRapReducer = (state = stateDefault,action)=>{
    switch(action.type){
        case SET_RAP_PHIM:{
            //console.log(action.data);
            state.heThongRapChieu = action.data;
            return {...state};
        }
        case SET_THONG_TIN_HE_THONG_RAP_CHIEU:{
            state.thongTinHeThongRapChieu = action.data
            return {...state};
        }
        case SET_THONG_TIN_CUM_RAP:{
            state.thongTinCumRap = action.data;
            return{...state};
        }
        default: return {...state}
    }
}
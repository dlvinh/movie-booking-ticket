import { HIDE_LOADING, SHOW_LOADING } from "../../actions/types/LoadingType"

const initialState = {
    isShow: true
}

export const LoadingReducer = (state = initialState, action)=>{
    switch(action.type){
        case SHOW_LOADING:{
            state.isShow = true;
            return {...state};
        }
        case HIDE_LOADING:{
            state.isShow = false;
            return {...state};
        }
       default: return {...state}
    }
}
import { HIDE_LOADING, HIDE_LOADING_TABLE, SHOW_LOADING, SHOW_LOADING_TABLE } from "../../actions/types/LoadingType"

const initialState = {
    isShow: false,
    isTableLoadingShow: true // loading is showing
}

export const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADING: {
            state.isShow = true;
            return { ...state };
        }
        case HIDE_LOADING: {
            state.isShow = false;
            return { ...state };
        }
        case SHOW_LOADING_TABLE: {
            //console.log("Table Loading show")
            state.isTableLoadingShow = true;
            return { ...state };
        }
        case HIDE_LOADING_TABLE: {
           // console.log("Table Loading hide")
            state.isTableLoadingShow = false;
            return { ...state };
        }
        default: return { ...state }
    }
}

import { HIDE_LOADING, SHOW_LOADING } from "./types/LoadingType"

export const SHOW_LOADING_ACTION =()=>{
    return {
        type: SHOW_LOADING
    }
}

export const HIDE_LOADING_ACTION = ()=>{
    return {
        type: HIDE_LOADING
    }
}
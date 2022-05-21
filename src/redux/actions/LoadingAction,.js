import { HIDE_LOADING, HIDE_LOADING_TABLE, SHOW_LOADING, SHOW_LOADING_TABLE } from "./types/LoadingType"

export const SHOW_LOADING_ACTION =()=>{
    console.log("testitng");
    return {
        type: SHOW_LOADING
    }
}

export const HIDE_LOADING_ACTION = ()=>{
    return {
        type: HIDE_LOADING
    }
}

export const SHOW_LOADING_TABLE_ACTION = ()=>{
    return {
        type: SHOW_LOADING_TABLE
    }
}
export const HIDE_LOADING_TABLE_ACTION = ()=>{
    return {
        type: HIDE_LOADING_TABLE
    }
}
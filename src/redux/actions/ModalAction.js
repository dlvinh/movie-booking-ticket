import { HIDE_CONFIRMATION_MODAL, SHOW_CONFIRMATION_MODAL } from "./types/QuanLyDatVe"

export const SHOW_CONFIRMATION_ACTION = ()=>{
    return {
        type: SHOW_CONFIRMATION_MODAL,
    }
}

export const HIDE_CONFIMRATION_ACTION =()=>{
    return {
        type: HIDE_CONFIRMATION_MODAL,
    }
}
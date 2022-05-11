import { CHUYEN_TAB } from "./types/QuanLyDatVe"

export const CHUYEN_TAB_ACTION = (moveTo)=>{
    console.log("chuyentabAction".moveTo);
    return {
        type: CHUYEN_TAB,
        data: moveTo
    }
}
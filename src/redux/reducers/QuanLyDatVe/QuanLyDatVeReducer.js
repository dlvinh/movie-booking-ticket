import { ThongTinLichChieu } from "../../../_core/models/ThongTinPhongVe";
import { DAT_VE, SET_PHONG_VE } from "../../actions/types/QuanLyDatVe"

const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [{
        daDat: false,
        giaVe: 75000,
        loaiGhe: "Thuong",
        maGhe: 47401,
        maRap: 451,
        stt: "01",
        taiKhoanNguoiDat: null,
        tenGhe: "01"}
    ]
}

export const QuanlyDatVeReducer = (state= stateDefault, action)=>{
    switch(action.type){
        case SET_PHONG_VE:{
            state.chiTietPhongVe = action.data;
            return {...state};
        }
        case DAT_VE:{
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex(ghe => ghe.maGhe === action.data.maGhe);
            if (index !=-1){
                danhSachGheCapNhat.splice(index, 1);
            }else{
                danhSachGheCapNhat.push(action.data);
            }
            return {...state, danhSachGheDangDat:danhSachGheCapNhat}
        }
        default: return {...state}
    }
}


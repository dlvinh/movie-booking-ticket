import { ThongTinLichChieu } from "../../../_core/models/ThongTinPhongVe";
import { DAT_VE, DAT_VE_HOAN_TAT, SET_PHONG_VE, CHUYEN_TAB} from "../../actions/types/QuanLyDatVe"

const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [],
    tabActive : 1,
    danhSachGheKhachDat:[{maGhe:47562}]

}

export const QuanlyDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_PHONG_VE: {
            state.chiTietPhongVe = action.data;
            return { ...state };
        }
        case DAT_VE: {
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex(ghe => ghe.maGhe === action.data.maGhe);
            if (index != -1) {
                danhSachGheCapNhat.splice(index, 1);
            } else {
                danhSachGheCapNhat.push(action.data);
            }
            return { ...state, danhSachGheDangDat: danhSachGheCapNhat }
        }
        case DAT_VE_HOAN_TAT: {
            state.danhSachGheDangDat = [];
            return {...state};
        }
        case CHUYEN_TAB:{
            console.log("CGUTENTAB", action.data)
            state.tabActive = action.data;
            return {...state};
        }

        default: return { ...state }
    }
}


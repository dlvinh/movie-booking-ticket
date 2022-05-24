import { GROUPID } from "../util/setting.js/config";
import { BaseService } from "./baseService";

export class QuanLyRapService extends BaseService {
    constructor() {
        super()
    }

    layThongTinLichChieuHeThongRap=()=> {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
    }
    layThongTinHeThongRap=()=>{
        return this.get(`api/QuanLyRap/LayThongTinHeThongRap`);
    }
    layThongTinCumRapTheoHeThong=(maHeThongRap)=>{
        if (maHeThongRap.trim() === " "){
            return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong`);
        }
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    }
}
export const quanLyRapService = new QuanLyRapService();
import { GROUPID } from "../util/setting.js/config";
import { BaseService } from "./baseService";

export class QuanLyRapService extends BaseService {
    constructor() {
        super()
    }

    layThongTinLichChieuHeThongRap=()=> {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
    }
}
export const quanLyRapService = new QuanLyRapService();
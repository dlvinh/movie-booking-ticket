import { GROUPID } from "../util/setting.js/config";
import { BaseService } from "./baseService";

export class QuanLyPhimService extends BaseService{
    constructor(){
        super()
    }

    layDanhSachBanner = () =>{
        return this.get("/api/QuanLyPhim/LayDanhSachBanner");
    }
    layDangSachPhim=()=>{
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
    }
}

export const quanLyPhimService = new QuanLyPhimService()
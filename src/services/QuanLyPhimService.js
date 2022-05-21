import { map } from "lodash";
import { GROUPID } from "../util/setting.js/config";
import { BaseService } from "./baseService";

export class QuanLyPhimService extends BaseService {
    constructor() {
        super()
    }

    layDanhSachBanner = () => {
        return this.get("/api/QuanLyPhim/LayDanhSachBanner");
    }
    layDangSachPhim = (keyWord) => {
        if (keyWord?.trim().length !== 0){
            return  this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${keyWord}`)
        }
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
    }
    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    themPhimUploadHinh = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData)
    }
    layThongTinPhimService = (maPhim) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    }
    capNhatPhimUploadService = (formData) => {
        return this.post(`api/QuanLyPhim/CapNhatPhimUpload`, formData);
    }
    xoaPhimService = (maPhim) => {
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    }
}

export const quanLyPhimService = new QuanLyPhimService()
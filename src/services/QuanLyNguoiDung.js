import { GROUPID } from "../util/setting.js/config";
import { BaseService } from "./baseService"

export class QuanLyNguoiDung extends BaseService{
    constructor(){
        super();
    }
    dangNhap = (data)=>{
        return this.post('api/QuanLyNguoiDung/DangNhap',data)
    }
    layThongTinTaiKhoan = ()=>{
        return this.post('api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
    dangKy = (data)=>{
        return this.post('api/QuanLyNguoiDung/DangKy',data);
    }
    layDanhSachNguoiDungPhanTrang =(keyWord)=>{
        if (keyWord.trim() === ""){
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${GROUPID}`);
        }
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${GROUPID}&tuKhoa=${keyWord}`)
    }
}

export const quanLyNguoiDung = new QuanLyNguoiDung();


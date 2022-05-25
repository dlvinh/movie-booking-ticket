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
    layDanhSachNguoiDung =(keyWord)=>{
        if (keyWord.trim() === ""){
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`);
        }
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${keyWord}`)
    }
    layDanhSachLoaiNguoiDung = ()=>{
        return this.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
    }
    themNguoiDung =(newUser)=>{
        return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`,newUser);
    }
}

export const quanLyNguoiDung = new QuanLyNguoiDung();


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
}

export const quanLyNguoiDung = new QuanLyNguoiDung();


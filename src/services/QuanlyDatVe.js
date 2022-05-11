import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { BaseService } from "./baseService"

export class QuanLyDatVe extends BaseService{
    constructor(){
        super();
    }
    layDanhSachPhongVe = (maLichChieu)=>{
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }
    datVe = (thongTinDatVe = new ThongTinDatVe())=>{
        return this.post(`api/QuanLyDatVe/DatVe/`, thongTinDatVe);
    }
}

export const quanLyDatVe = new QuanLyDatVe();
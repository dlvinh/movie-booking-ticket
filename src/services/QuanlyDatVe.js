import { BaseService } from "./baseService"

export class QuanLyDatVe extends BaseService{
    constructor(){
        super();
    }
    layDanhSachPhongVe = (maLichChieu)=>{
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }
}

export const quanLyDatVe = new QuanLyDatVe();
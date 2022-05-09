import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { history } from '../../App'
import { layDanhSachPhongVeAction } from '../../redux/actions/QuanLyDatVeAction'
import { TOKEN } from '../../util/setting.js/config'
import checkoutStyle from "../Checkout/CheckoutStyle.module.css"
import {
  CloseOutlined
} from '@ant-design/icons';
import { DAT_VE } from '../../redux/actions/types/QuanLyDatVe'
import _ from 'lodash'
export default function Checkout(props) {
  let maLichChieu = props.propsRoute.match.params.maLichChieu;
  const { userLogin } = useSelector(state => state.QuanlyNguoiDungState);
  const { chiTietPhongVe, danhSachGheDangDat} = useSelector(state => state.QuanLyDatVeState);
  const {thongTinPhim, danhSachGhe} = chiTietPhongVe;
  const dispacth = useDispatch();
  useEffect(() => {
    // dispacth mot funciton len redux thunk
    let action = layDanhSachPhongVeAction(maLichChieu);
    dispacth(action);
  }, [])
  console.log(userLogin);
  if (!localStorage.getItem(TOKEN)) {
    return <Redirect to="/login"></Redirect> // dung redirect moi co the dung history.goBack()
  };

  const renderSeats = () => {
    return danhSachGhe.map((seat, index) => {
      let gheStyle = "";
      let gheDaDatStyle = "";
      let gheDangDatStyle ="";
      let indexgheDangDat = danhSachGheDangDat.findIndex(ghe => ghe.maGhe === seat.maGhe);
      if (indexgheDangDat != -1){
        gheDangDatStyle = checkoutStyle.gheDangDat;
      }
      if (seat.loaiGhe == "Vip") {
        gheStyle = checkoutStyle.gheVip;
      }
      if (seat.daDat == true) {
        gheDaDatStyle = checkoutStyle.gheDaDat;

      }
      return <React.Fragment key={index}>
        <button key={index}
        onClick={()=>{
          dispacth({
            type:DAT_VE,
            data: seat
          })
        }}
        disabled={seat.daDat} className={checkoutStyle.ghe + " " + gheStyle + " " + gheDaDatStyle + " "+ gheDangDatStyle}>{seat.daDat ? <CloseOutlined style={{fontSize:"30px"}} /> : seat.stt }</button>
        {(index + 1) % 16 == 0 ? <br /> : ""}
      </React.Fragment>

    })
  }

  return (
    <div className='container min-h-screen'>
      <div className='grid grid-cols-12'>
        {/* Screen container */}
        <div className='col-span-9'>
          <div className="screen_container" style={{ width: "80%", margin: "1rem auto auto" }} >
            <div id={checkoutStyle.screen}></div>
            <div id={checkoutStyle.shadowScreen}></div>
          </div>
          {/* Render Seats */}
          <div className='seat_container text-center'>
            {renderSeats()}
          </div>
        </div>
        {/* Ticket container */}
        <div className='col-span-3'>
          <h3 className='text-center text-green-400 text-2xl'>0d</h3>
          <hr></hr>
          <h3 className='text-xl'>{thongTinPhim.tenPhim}</h3>
          <p>Location: {thongTinPhim.tenCumRap}</p>
          <p>Date: {moment(thongTinPhim.ngayChieu).format("LL")} - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}</p>
          <hr />
          <div className='flex justify-between'>
            <p className='text-red-400'>Seat</p>
            {_.sortBy(danhSachGheDangDat,['stt']).map((ghe,index)=>{
              return <span key={index} className='text-green-400'>{ghe.stt} </span>
            })}
            <p className='text-green-400'>{danhSachGheDangDat.reduce((tongtien, ghe, index)=>{
              return  tongtien += ghe.giaVe
            },0)}</p>
           
          </div>
          <hr />
          <div className='my-5'>
            <i>Email</i> <br /> {userLogin.email}
          </div>
          <div className='my-5'>
            <i>Phone</i> <br />
            {userLogin.soDT === null ? "Not available" : userLogin.soDt}
          </div>
          <hr />
          <div className='mb-0 h-full flex flex-col items-center'>
            <div className='bg-green-500 text-white w-full text-center py-3 font-bold cursor-pointer'>
              Buy Ticket
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

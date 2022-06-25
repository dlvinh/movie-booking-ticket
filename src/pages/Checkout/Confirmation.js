import moment from 'moment'
import React, { useEffect, useState } from 'react'
import _, { isUndefined } from "lodash"
import { ThongTinPhim } from '../../_core/models/ThongTinPhongVe';
export default function Confirmation(props) {
  const [state,setState] = useState({
    thongTinPhim : props.thongTinPhim,
    danhSachGheDangDat: props.danhSachGheDangDat
  })
  return (

    <section className="text-gray-600 body-font">
         <div className="container px-5 mx-auto">
           <div className="flex flex-col text-center w-full">
             <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"> -Welcome to MyMovieTheater-</h1>
             <p>Your purchase informaiton</p>
             <h3 className='text-xl text-center'>{state.thongTinPhim?.tenPhim}</h3>
              <p className='px-2'>Location: {state.thongTinPhim?.tenCumRap}</p>
              <p className='px-2'>Date: {moment(state.thongTinPhim?.ngayChieu).format("LL")} - {state.thongTinPhim?.gioChieu} - {state.thongTinPhim?.tenRap}</p>
              <hr />
              <table className='table-auto w-full text-left'>
                  <thead>
                    <tr className='mb-1'>
                      <th>Number</th>
                      <th>Seat</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_?.sortBy(state.danhSachGheDangDat, ['stt']).map((ghe, index) => {
                      return <tr>
                        <td>{index + 1}</td>
                        <td>{ghe.stt}</td>
                        <td>{ghe.giaVe}</td>
                      </tr>
                    })}
                  </tbody>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Total:</th>
                      <th>{state.danhSachGheDangDat?.reduce((tongtien, ghe, index) => {
                        return tongtien += ghe.giaVe
                      }, 0)}</th>
                    </tr>
                  </thead>
                </table>
                <hr />
                <h3 className="lg:w-2/3 mx-auto leading-relaxed text-xl">Please confirm to finish your purchase</h3>
           </div>
        </div>
      </section>
  )
}

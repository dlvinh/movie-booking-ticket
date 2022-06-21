import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { history } from '../../App'
import { datVeAction, layDanhSachPhongVeAction } from '../../redux/actions/QuanLyDatVeAction'
import { TOKEN, USER_LOGIN } from '../../util/setting.js/config'
import checkoutStyle from "../Checkout/CheckoutStyle.module.css"
import {
  UserOutlined
} from '@ant-design/icons';
import { DAT_VE } from '../../redux/actions/types/QuanLyDatVe'
import _ from 'lodash';
import { Dropdown, Popconfirm, Tabs, Menu, Button } from 'antd';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe'
import { layThongTinLichChieuPhimAction } from '../../redux/actions/QuanLyPhimActions'
import { layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoIDungActions'
import { CHUYEN_TAB_ACTION } from '../../redux/actions/ChuyenTabAction'
import UserHeader from '../../components/UserAvatar/UserHeader'
import MovieDetailBanner from '../../components/MovieDetail/MovieDetailBanner'
import { useSpring, animated, useTransition } from 'react-spring';
import { SHOW_LOADING_ACTION } from '../../redux/actions/LoadingAction,'
import { SHOW_ANIMATION_ACTION } from '../../redux/actions/AnimationActions'


export default function Checkout(props) {
  let maLichChieu = props.propsRoute.match.params.maLichChieu;
  const { userLogin } = useSelector(state => state.QuanlyNguoiDungState);
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeState);
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  // USE SPRING ANIMATION
  const show = useSelector(state => state.AnimationState);
 const transitionStyle = useTransition(show,{
  from: {
    opacity: 0,
    transform: "translateX(-100%)"
  },
  enter: {
    opacity: 1,
    transform: "translateX(0%)"
  },
 })
 const ticketTransitionStyle = useTransition(show,{
  from: {
    opacity: 0,
    transform: "translateX(100%)"
  },
  enter: {
    opacity: 1,
    transform: "translateX(0%)"
  },
 })
  const dispacth = useDispatch();
  useEffect(() => {
    // dispacth mot funciton len redux thunk
    let action = layDanhSachPhongVeAction(maLichChieu);
    dispacth(action);
  }, [])
  //console.log(userLogin);
  if (!localStorage.getItem(TOKEN)) {
    return <Redirect to="/login"></Redirect> // dung redirect moi co the dung history.goBack()
  };

  const renderSeats =   () => {
  let danhSach =   danhSachGhe.map((seat, index) => {
      let gheStyle = "";
      let gheDaDatStyle = "";
      let gheDangDatStyle = "";
      let gheKhachDat = ""
      let indexgheDangDat = danhSachGheDangDat.findIndex(ghe => ghe.maGhe === seat.maGhe);
      let indexgheKhachDat = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === seat.maGhe);
      if (indexgheDangDat != -1) {
        gheDangDatStyle = checkoutStyle.gheDangDat;
      }
      if (seat.loaiGhe == "Vip") {
        gheStyle = checkoutStyle.gheVip;
      }
      if (seat.daDat == true) {
        gheDaDatStyle = checkoutStyle.gheDaDat;
      }
      if (indexgheKhachDat != -1) {
        gheKhachDat = checkoutStyle.gheKhachDat;
      }
      return <React.Fragment key={index}>
        <button key={index}
          onClick={() => {
            dispacth({
              type: DAT_VE,
              data: seat
            })
          }}
          disabled={seat.daDat} className={checkoutStyle.ghe + " " + gheStyle + " " + gheDaDatStyle + " " + gheDangDatStyle + " " + gheKhachDat}>{seat.daDat ? <UserOutlined style={{ fontSize: "30px" }} /> : gheKhachDat !== "" ? <UserOutlined style={{ fontSize: "30px" }} /> : seat.stt}</button>
        {(index + 1) % 16 == 0 ? <br /> : ""}
      </React.Fragment>
    })
    return <div className='seat_container text-center'> {transitionStyle((style,item)=> item ?  <animated.div  style={style}> {danhSach} </animated.div> :"" )} </div>
  }

  return (
    <div className={`min-h-screen text-white w-11/12 m-auto`}>
      <div className='grid grid-cols-12 overflow-hidden'>
        {/* Screen container */}
        <div className='col-span-9'>
          <div className="screen_container text-white" style={{ width: "80%", margin: "1rem auto 1rem auto" }} >
            <div id={checkoutStyle.shadowScreen}></div>
          </div>
          {transitionStyle((style,item)=> {
            if (item){
              return <animated.div style={style}>
  <div className="seat_legent flex justify-center">
              <div className='text-center px-3'>
                  <div  className={`${checkoutStyle.ghe} ${checkoutStyle.gheVip}`}></div>
                  <p>VIP</p>
              </div>
             
              <div className='text-center px-3'>
                  <div className={`${checkoutStyle.ghe} ${checkoutStyle.gheDaDat}`}></div>
                  <p>Occupied</p>
              </div>
              <div className='text-center px-3'>
              <div className={`${checkoutStyle.ghe} ${checkoutStyle.gheDangDat}`}></div>
              <p>Current</p>
              </div>
          </div>
              </animated.div>
            }
            return ""
          })}
        
          {/* Render Seats */}
          {renderSeats()}
          {/* <animated.div  className='seat_container text-center' style={show? transitionStyle: {}}> {renderSeats()} </animated.div> */}
          {/* <div className='seat_container text-center'>
            
            {/* {renderSeats()} 
           </div> */} 
        </div>
        {/* Ticket container */}
        <div className='col-span-3 text-white'>
        {ticketTransitionStyle((style,item)=> item ?  
        
        <animated.div className="ticket-area"  style={style}>   
        <h3 className='text-center text-green-400 text-2xl'>0d</h3>
          <hr></hr>
          <h3 className='text-xl text-white text-center'>{thongTinPhim.tenPhim}</h3>
          <p className='px-2'>Location: {thongTinPhim.tenCumRap}</p>
          <p className='px-2'>Date: {moment(thongTinPhim.ngayChieu).format("LL")} - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}</p>
          <hr />
          <div className='flex justify-between px-8'>
            <table className='table-auto w-full text-left'>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Seat</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                {_.sortBy(danhSachGheDangDat, ['stt']).map((ghe, index) => {
              return <tr>
                   <td>{index +1}</td>
                   <td>{ghe.stt}</td>
                   <td>{ghe.giaVe}</td>
                  </tr>
            })}
               
                </tbody>
                <thead>
                  <tr>
                    <th></th>
                    <th>Total:</th>
                    <th>{danhSachGheDangDat.reduce((tongtien, ghe, index) => {
              return tongtien += ghe.giaVe
            }, 0)}</th>
                 </tr>
                </thead>
            </table>
       
            {/* <p className='text-green-400'>{danhSachGheDangDat.reduce((tongtien, ghe, index) => {
              return tongtien += ghe.giaVe
            }, 0)}</p> */}

          </div>
          <hr />
          <div className='my-5 px-2'>
            <i>Email</i> <br /> {userLogin.email}
          </div>
          <div className='my-5 px-2'>
            <i>Phone</i> <br />
            {userLogin.soDT === null ? "Not available" : userLogin.soDt}
          </div>
          <hr />
          <div className='mb-0 flex flex-col items-center'>
        
            <button onClick={() => {
              const thongTinDatVe = new ThongTinDatVe();
              thongTinDatVe.maLichChieu = props.propsRoute.match.params.maLichChieu;
              thongTinDatVe.danhSachVe = danhSachGheDangDat;
              let action = datVeAction(thongTinDatVe);
              dispacth(action)
            }} className='bg-green-500 text-white w-full text-center py-3 font-bold cursor-pointer mb-4'>
              Buy Ticket
            </button>
            <button onClick={() => {
              history.goBack();
            }} className='bg-red-500 text-white w-full text-center py-3 font-bold cursor-pointer'>
              Cancel
            </button>
          </div>
          </animated.div> :"" )}
        
        </div>
      </div>
    </div>
  )
}

const { TabPane } = Tabs;
// export default function Main(props) {
//   console.log("mainprops", props)
//   let maLichChieu = props.propsRoute.match.params.maLichChieu;
//   const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeState);
//   const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
//   const dispacth = useDispatch();
//   useEffect(() => {
//     // dispacth mot funciton len redux thunk
//     let action = layDanhSachPhongVeAction(maLichChieu);
//     dispacth(action);
//   }, [])
//   const dropDownHandler = ({ key }) => {
//     // message.info(`Click on item ${key}`);

//   };
//   const taiKhoan = JSON.parse(localStorage.getItem(USER_LOGIN));
//   const menu = (
//     <Menu
//       onClick={dropDownHandler}
//       items={[
//         {
//           label: (
//             <p onClick={() => {
//               history.push(`/profile/${taiKhoan.taiKhoan}`)
//             }}>Profile</p>
//           ),
//           key: "profile"
//         },

//         {
//           label: (
//             <Popconfirm placement="top" title="Do you want to sign out" onConfirm={() => {
//               localStorage.clear();
//               // refresh whole pages to refresh all store in redux
//               window.location.reload();
//             }} okText="Yes" cancelText="No">
//               <p>Sign Out</p>
//             </Popconfirm>
//           ),
//           key: 'signOut'
//         },
//       ]}
//     />
//   );
//   const { tabActive } = useSelector(state => state.QuanLyDatVeState);
//   const { userLogin } = useSelector(state => state.QuanlyNguoiDungState);
//   // const operations =  <Dropdown overlay={menu} trigger={['click']}>
//   //     <div className="items-center flex cursor-pointer mr-16">
//   //       <img src="https://picsum.photos/50" className='rounded-full' />
//   //       <p className='m-0 ml-2'>Hello, {userLogin.hoTen}</p>
//   //     </div>
//   //   </Dropdown>
//   const operations = <UserHeader menu={menu}></UserHeader>


//   return <>

    
//     <Tabs size='large' tabBarExtraContent={operations} defaultActiveKey="1" activeKey={tabActive.toString()} type="card" onTabClick={(e) => {
//       dispacth(CHUYEN_TAB_ACTION(e))
//     }}>
//       <TabPane tab="01-CHON GHE THANH TOAN" key="1">
//         <Checkout {...props}></Checkout>
//       </TabPane>
//       <TabPane tab="02 KET QUA DAT VE" key="2">
//         <KetQuaDatVe {...props}></KetQuaDatVe>
//       </TabPane>
//     </Tabs>

//   </>
// };


// function KetQuaDatVe(props) {
//   const { thongTinTaiKhoan } = useSelector(state => state.QuanlyNguoiDungState);
//   const { tabActive } = useSelector(state => state.QuanLyDatVeState);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     let action = layThongTinTaiKhoanAction();
//     dispatch(action);
//   }, [tabActive])
//   console.log({ thongTinTaiKhoan });
//   const renderHistory = () => {
//     return thongTinTaiKhoan?.thongTinDatVe?.map((info, index) => {
//       return <div className='mb-10' key={index}>
//         <h1 className='text-xl font-bold'>Ma ve: <span className='text-indigo-600'>{info.maVe}</span></h1>
//         <h2 className='text-xl font-bold'>Date:<span className='text-indigo-600'>{moment(info.ngayDat).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span></h2>
//         <h2 className='text-xl font-bold'>Movie name: <span className='text-indigo-600'>{info.tenPhim}</span></h2>
//         <div className='text-xl font-bold'>Ticket List</div>
//         <div className="flex flex-wrap -m-2" key={index}>
//           {info.danhSachGhe.map((ghe, index) => {
//             return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
//               <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
//                 <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={info.hinhAnh} />
//                 <div className="flex-grow">
//                   <h2 className="text-gray-900 title-font font-medium">Theater Group:{ghe.tenHeThongRap}</h2>
//                   <p className="text-gray-500"> Theater - {ghe.tenRap} - Seat - {ghe.tenGhe}</p>
//                 </div>
//               </div>
//             </div>
//           })}
//         </div>

//       </div >
//     })

//   }
//   return <section className="text-gray-600 body-font overflow-hidden">

//     <div className="container px-5 py-15 mx-auto">

//       <section className="text-gray-600 body-font">
//         <div className="container px-5 mx-auto">
//           <div className="flex flex-col text-center w-full mb-10">
//             <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Thank you {thongTinTaiKhoan.hoTen}</h1>
//             <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Welcome to MyMovieTheater - Enjoy your movie in your own style</p>
//           </div>
//           <div>
//             <Button onClick={() => {
//               history.push('/')
//             }}>Back To Home</Button>
//           </div>
//           {/* Movie ticket render */}
//           <div>
//             {renderHistory()}
//           </div>
//         </div>
//       </section>

//     </div>
//   </section>

// }
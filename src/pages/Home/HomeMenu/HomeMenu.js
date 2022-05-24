import React, { useEffect, useState } from 'react'
import { Tabs, Radio, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { SET_RAP_PHIM } from '../../../redux/actions/types/QuanLyRapTypes';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { history } from '../../../App';
const { TabPane } = Tabs;
function HomeMenu(props) {
    //console.log("HomeMenuprops", props)
    const { hethongRapChieu } = props;
    const renderTheaterTabPane = () => {
        return hethongRapChieu.map((item, index) => {
            return <TabPane tab={<img className='rounded-full' width="50" src={item.logo} alt={item.tenHeThongRap} />} key={index}>
                <Tabs tabPosition="left">
                    {item.lstCumRap?.map((cumRap, index) => {
                        return <TabPane key={index} tab={
                            <div style={{ width: '300px' }} className="flex items-center">
                                <img className='rounded-full cursor-pointer' width="50" src={`https://picsum.photos/id/${index}/200/200`} alt={item.tenHeThongRap} onClick={()=>{
                                   
                                }} />
                                <br />
                                <div className='text-left ml-2'>
                                    {cumRap.tenCumRap}
                                </div>

                            </div>
                        } >
                            {/* Load film */}
                            {cumRap.danhSachPhim?.map((film, index) => {
                                return <React.Fragment key={index}>
                                    <div className=' flex my-5' >
                                        <div className='flex' >
                                            <img style={{height:'fit-content',
                                        width:100}} src={film.hinhAnh} alt={film.tenPhim} />
                                            <div className='film_des text-green-800 ml-2 '>
                                                <h2 className='text-2xl '>
                                                    {film.tenPhim}
                                                </h2>
                                                <p>{cumRap.diaChi}</p>
                                                {/* Load lich chieu */}
                                                <div className='grid grid-cols-6 gap-6'>
                                                    {film.lstLichChieuTheoPhim?.slice(0,12).map((time, index) => {
                                                        return <NavLink className='px-2 py-2 font-semibold rounded bg-gray-800 text-white ' key={index} to={`checkout/${time.maLichChieu}`}>
                                                            {moment(time.ngayChieuGioChieu).format("hh:mm A")}
                                                        </NavLink>
                                                    })}
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                    <hr />
                                </React.Fragment>

                            })}
                        </TabPane>
                    })}
                </Tabs>

            </TabPane>
        })
    }
    return (
        <React.Fragment>
            <Tabs tabPosition="left">
                {renderTheaterTabPane()}
            </Tabs>
        </React.Fragment>
    )
}
export default React.memo(HomeMenu); // use memo to ensure Homemenu only render when it's props changed, any changed in Home which not effect state of Homemenu will affect Homemenu


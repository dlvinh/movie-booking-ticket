import React, { useEffect, useState } from 'react'
import { Tabs, Radio, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { SET_RAP_PHIM } from '../../../redux/actions/types/QuanLyRapTypes';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import '../../../GlobalStyle/globalStyle.css'
import MovieTimeTable from './MovieTimeTable';
const { TabPane } = Tabs;
function HomeMenu(props) {
    //console.log("HomeMenuprops", props)
    const { hethongRapChieu } = props;
    
    const renderTheaterTabPane = () => {
        console.log({hethongRapChieu});
        return hethongRapChieu.map((item, index) => {
            return <TabPane tab={<img className='rounded-full' width="50" src={item.logo} alt={item.tenHeThongRap} />} key={index}>
                <Tabs className='my-tap'  tabPosition="left">
                    {item.lstCumRap?.map((cumRap, index) => {
                        let randIndex = Math.floor(Math.random()* 40);
                        return <TabPane className='my-tap'  key={index}  tab={
                            <div style={{ width: '300px' }} className="cum_rap_list flex items-center">
                                
                                <img className='rounded-full cursor-pointer' width="50" src={`https://picsum.photos/id/${randIndex}/200/200`} alt={item.tenHeThongRap} onClick={()=>{
                                    
                                }} />
                                <br />
                                <div className='cum_rap_name text-left ml-2 w-full'>
                                    {cumRap.tenCumRap}
                                </div>

                            </div>
                        } >
                            {/* Load film */}
                            <MovieTimeTable danhSachPhim={cumRap.danhSachPhim} tenCumRap={cumRap.tenCumRap} diaChi={cumRap.diaChi}></MovieTimeTable>
                            {/* {cumRap.danhSachPhim?.slice(0,10).map((film, index) => {
                                return <React.Fragment key={index}>
                                    <div className=' flex my-5' >
                                        <div className='flex' >
                                            <img style={{height:'fit-content',
                                        width:100}} src={film.hinhAnh} alt={film.tenPhim} />
                                            <div className='film_des text-white ml-2 '>
                                                <h2 className='text-2xl text-white '>
                                                    {film.tenPhim}
                                                </h2>
                                                <p>{cumRap.diaChi}</p>
                                                {/* Load lich chieu 
                                                <div className='grid grid-cols-6 gap-6'>
                                                    {film.lstLichChieuTheoPhim?.slice(0,12).map((time, index) => {
                                                        return <NavLink className='custom-btn-hover px-2 py-2 font-semibold rounded border-2 text-white ' key={index} to={`checkout/${time.maLichChieu}`}>
                                                            {moment(time.ngayChieuGioChieu).format("hh:mm A")}
                                                        </NavLink>
                                                    })}
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                    <hr />
                                </React.Fragment>

                            })} */}
                        </TabPane>
                    })}
                </Tabs>

            </TabPane>
        })
    }
    return (
        <React.Fragment className="home__menu">
            <Tabs className='main-tap' tabPosition="left">
                {renderTheaterTabPane()}
            </Tabs>
        </React.Fragment>
    )
}

export default React.memo(HomeMenu); // use memo to ensure Homemenu only render when it's props changed, any changed in Home which not effect state of Homemenu will affect Homemenu


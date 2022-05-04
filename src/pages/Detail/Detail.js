import React, { useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../Detail/DetailStyle.css';
import { Tabs } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinLichChieuPhimAction } from '../../redux/actions/QuanLyPhimActions';
import moment from 'moment';

const { TabPane } = Tabs;
export default function Detail(props) {
    const { propsRoute } = props;
    const { filmDetail } = useSelector(state => state.QuanLyPhimState);
    const { heThongRapChieu } = filmDetail;
    const dispatch = useDispatch();
    const id = propsRoute.match.params.id;
    useEffect(() => {
        let action = layThongTinLichChieuPhimAction(id);
        // dispatch len middleware
        dispatch(action);
    }, [])
    const backGroundStyle = {
        backgroundImage: `url(${filmDetail?.hinhAnh})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    const renderTheaterTabPane = () => {
        if (heThongRapChieu?.length === 0){
            return <div>
                NO data
            </div>
        }
        return heThongRapChieu?.map((item, index) => {
            return <TabPane tab={<img className='rounded-full' width="50" src={item.logo} alt={item.tenHeThongRap} />} key={index}>
                <Tabs tabPosition="left">
                    {item.cumRapChieu?.map((cumRap, index) => {
                        return <TabPane key={index} tab={
                            <div style={{ width: '300px' }} className="flex items-center">
                                <img className='rounded-full' width="50" src={cumRap.hinhAnh} alt={item.tenHeThongRap} />
                                <br />
                                <div className='text-left ml-2'>
                                    <p className='mb-1'>{cumRap.tenCumRap}</p>
                                    <p className='mb-1'> {cumRap.diaChi}</p>
                                </div>


                            </div>
                        } >
                            {/* Load film */}
                            {cumRap.lichChieuPhim?.map((film, index) => {
                                return <React.Fragment key={index}>
                                    <p>{film?.tenRap}</p>
                                    <p>{film?.thoiLuong}</p>
                                    <p>{film?.giaVe} VND</p>
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
        <div style={backGroundStyle}>
            <CustomCard
                effectColor="#FFF" // required
                color="#14AEFF" // default color is white
                blur={20} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
                style={{ height: "fit-content" }}
            >
                {/* DEtial content */}
                <div className="detail_container">
                    <div className='detail_content grid grid-cols-12'>
                        <div className='col-span-6'>
                            <div className="grid grid-cols-2 detail_movieImage">
                                <div style={backGroundStyle}>
                                    <img style={{ marginLeft: "auto", marginRight: "2px", height: '400px', opacity: 0 }} src={filmDetail?.hinhAnh} alt="..." />
                                </div>

                                <div className='detail_movieInfo text-white'>
                                    <p>{filmDetail?.tenPhim}</p>
                                    <p>{filmDetail?.moTa}</p>
                                    <p>{filmDetail?.dangChieu ? "On Theater" : "Comming Soon"}</p>
                                    <p>{moment(filmDetail?.ngayKhoiChieu).format("LL")}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-6 flex justify-center items-center'  >
                            <div className={`c100 big p${filmDetail?.danhGia * 10}`}>
                                <span>{filmDetail?.danhGia * 10} %</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className='text-2xl text-center'>SCHEDULES</h2>
                {/* Render Lich chieu cua phim */}
                <div className='movie_schedule_container rounded-lg'>
                    <Tabs tabPosition="left">
                        {renderTheaterTabPane()}
                    </Tabs>
                </div>
            </CustomCard>

        </div>
    )
}

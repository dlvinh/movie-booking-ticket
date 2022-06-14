import React, { useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../Detail/DetailStyle.css';
import { Tabs } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinLichChieuPhimAction } from '../../redux/actions/QuanLyPhimActions';
import moment from 'moment';
import MovieDetailBanner from '../../components/MovieDetail/MovieDetailBanner';

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
    const statusStyel = {
        padding: "10px",
        backgroundColor: `${filmDetail?.dangChieu ? "#54c3e5" : "Green"}`,
        textTransform: "uppercase",
        width: "fit-content",
        border: `solid ${filmDetail?.dangChieu ? "#2a65b6" : "darkseagreen"} `,
        borderRadius: "10px"
    }
    const renderTheaterTabPane = () => {
        if (heThongRapChieu?.length === 0) {
            return <div>
                NO data
            </div>
        }
        return heThongRapChieu?.map((item, index) => {
            return <TabPane tab={
                <div className='flex items-center m-0'>
                    <img className='rounded-full' width="50" src={item.logo} alt={item.tenHeThongRap} />
                    <p className='mb-0 ml-2 text-lg'>{item.tenHeThongRap}</p>
                </div>


            } key={index}>
                {item.cumRapChieu?.map((cumRap, index) => {
                    return <div key={index} className="grid grid-cols-12 mb-8">
                            <img className='rounded-lg' width={100} src={cumRap.hinhAnh} alt={item.tenHeThongRap} />
                            <div className=' col-span-10 ml-2'>
                                <div>
                                    <p className='mb-1 font-bold text-2xl'>{cumRap.tenCumRap}</p>
                                    <p className='mb-1  font-semibold text-lg text-gray-400'> {cumRap.diaChi}</p>
                                </div>
                                <div className='timetable grid grid-cols-6 gap-6 mt-2'>
                                    {cumRap?.lichChieuPhim?.map((lichChieu, index) => {
                                        return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="text-center px-2 py-2 font-semibold rounded bg-gray-800 text-white active">
                                            {moment(lichChieu?.ngayChieuGioChieu).format("LT")}
                                        </NavLink>
                                    })}
                                </div>
                            </div>
                        </div>
                })}

            </TabPane>
        })
    }
    const renderMovieDetail = () => {
        return <div className="detail_container">
            <div className='detail_content grid grid-cols-12'>
                <div className='col-span-6'>
                    <div className="grid grid-cols-2 detail_movieImage">
                        <div style={backGroundStyle}>
                            <img style={{ marginLeft: "auto", marginRight: "2px", height: '400px', opacity: 0 }} src={filmDetail?.hinhAnh} alt="..." />
                        </div>

                        <div className='detail_movieInfo text-white'>
                            <h2 className='text-3xl text-white'>{filmDetail?.tenPhim}</h2>
                            <p><span className='text-xl text-white'>Description </span>{filmDetail?.moTa}</p>
                            <p className='font-bold' style={statusStyel}>{filmDetail?.dangChieu ? "On Theater" : "Comming Soon"}</p>
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
            {/* <MovieDetailBanner movieItem = {filmDetail} ></MovieDetailBanner> */}
        </div>
        // return <MovieDetailBanner movieItem = {filmDetail} ></MovieDetailBanner>
    }
    return (
        <div style={backGroundStyle}>
            <CustomCard
                effectColor="#5f5f60c2" // required
                color="#14AEFF" // default color is white
                blur={20} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
                style={{ height: "fit-content", backgroundColor: "#00091d85" }}
            >
                {/* DEtial content */}
                {renderMovieDetail()}
                <h2 className='text-2xl text-center'>SCHEDULES</h2>
                {/* Render Lich chieu cua phim */}
                <div className='movie_schedule_container rounded-lg detail_container'>
                    <Tabs size='large' centered type="card" tabPosition='top'>
                        <TabPane size='large' tab="Schedule" key="schedule">
                            <Tabs tabPosition="left">
                                {renderTheaterTabPane()}
                            </Tabs>
                        </TabPane>
                        <TabPane tab="Details" key="detail">
                            <p>No infomation</p>
                        </TabPane>
                        <TabPane tab="Rating" key="rating">
                            <p>No infomation</p>
                        </TabPane>
                    </Tabs>

                </div>
            </CustomCard>

        </div>
    )
}

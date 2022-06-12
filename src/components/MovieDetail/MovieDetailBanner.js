import React, { useState } from 'react'
import moment from 'moment';
import { NavLink } from 'react-router-dom';
export default function MovieDetailBanner(props) {
    const filmDetail = props.movieItem;
    const [moreDes, setMoreDes] = useState(false);
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
    const renderDescription = (string) => {
        let newString = ""
            if (string.length > 100) {
               return <>{string.substring(0, 200)} ...</> ;
            }
            return <>{string}</>
    }
    return (
        <div className="detail_container">
            <div className='detail_content grid grid-cols-12'>
                <div className='col-span-8'>
                    <div className="grid grid-cols-2 detail_movieImage">
                        <div style={backGroundStyle}>
                            <img style={{ marginLeft: "auto", marginRight: "2px", height: '400px', opacity: 0 }} src={filmDetail?.hinhAnh} alt="..." />
                        </div>

                        <div className='detail_movieInfo text-white text-left'>
                            <h2 className='text-3xl text-white'>{filmDetail?.tenPhim}</h2>
                            <p><span className='text-xl text-white'>Description </span><span style={{lineHeight:"2rem"}}>{renderDescription(filmDetail.moTa)}  <NavLink to={`/detail/${filmDetail.maPhim}`} style={{color: "#54c3e5"}}>Read more</NavLink></span>  </p>
                            <p className='font-bold' style={statusStyel}>{filmDetail?.dangChieu ? "On Theater" : "Comming Soon"}</p>
                            <p>{moment(filmDetail?.ngayKhoiChieu).format("LL")}</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-4 flex justify-center items-center'  >
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
    )
}

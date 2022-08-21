import React, { useState } from 'react'
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { Rate } from 'antd';
export default function MovieDetailBanner(props) {
    const filmDetail = props.movieItem;
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
            if (string?.length > 100) {
               return <>{string?.substring(0, 200)} ...</> ;
            }
            return <>{string}</>
    }
    return (
        <div className=" detail_container ">
            <div className='detail_content'>
                    <div className="lg:grid lg:grid-cols-2 detail_movieImage">
                        <div  style={backGroundStyle} className= "film-avatar sm:hidden md:hidden lg:block" >
                            <img  style={{ marginLeft: "auto", marginRight: "2px", height: '400px', opacity: 0 }} src={filmDetail?.hinhAnh} alt="..." />
                        </div>

                        <div className='detail_movieInfo text-white text-left'>
                            <h2 className='text-3xl text-white'>{filmDetail?.tenPhim}</h2>
                            <p><span className='text-xl text-white'>Description </span><span style={{lineHeight:"2rem"}}>{renderDescription(filmDetail?.moTa)}  <NavLink to={`/detail/${filmDetail?.maPhim}`} style={{color: "#54c3e5"}}>Read more</NavLink></span>  </p>
                            <p className='font-bold' style={statusStyel}>{filmDetail?.dangChieu ? "On Theater" : "Comming Soon"}</p>
                            <p>{moment(filmDetail?.ngayKhoiChieu).format("LL")}</p> 
                            <Rate  allowHalf disabled defaultValue={filmDetail?.danhGia /2} />
                        </div>
                    </div>
            </div>
        </div>
    )
}

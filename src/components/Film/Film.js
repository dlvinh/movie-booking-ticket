import React from 'react'
import {NavLink} from 'react-router-dom'
export default function Film(props) {
    const { tenPhim, hinhAnh, moTa,maPhim } = props.film;
   
    const backgroundStyle = {
        backgroundImage: `url(${hinhAnh})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "lightgray",
        width: "100%",
        height: "150px"
    }
    const shortDes = moTa.length > 50 ? moTa.toString().substring(0, 30) + "..." : moTa
    return (
        <div className="max-w-xs rounded-md shadow-md bg-coolGray-900 text-coolGray-50" style={{ backgroundColor: "#cdcdcd29", height: "100%" }} >
            <article className="flex flex-col dark:bg-coolGray-900">
                <div style={backgroundStyle}>
                    <img alt={tenPhim} className="object-cover w-full h-32 dark:bg-coolGray-500" src={hinhAnh} style={{opacity:0}} />
              </div>
                <div className="flex flex-col flex-1 p-6">
                    <NavLink to="/" className="text-lg tracking-wider uppercase hover:underline dark:text-violet-400 h-16" >{tenPhim}</NavLink>
                    <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-coolGray-400">
                        <NavLink to={`/detail/${maPhim}`} className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-400 dark:text-coolGray-900 text-white">BUY TICKET</NavLink>
                    </div>
                </div>
            </article>

        </div>

    )
}

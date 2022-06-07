import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { YoutubeOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import _ from 'lodash'

function Footer() {
    const { heThongRapChieu } = useSelector(state => {
        return state.QuanLyRapState
    })
    // _.map de loop qua hethongrapchiieu (la mot array cua nhieu Obj <=> hethongRap la opjec)
    const arrCumRap = _.map(heThongRapChieu, (hethongRap) => {
        // he thong rap la 1 object 
        // {"lstCumRap": [...]
        //     "maHeThongRap": "BHDStar",
        //     //     "tenHeThongRap": "BHD Star Cineplex",
        //     //     "logo": "http://movieapi.cyberlearn.vn/hinhanh/bhd-star-cineplex.png",
        //     //     "mahom": "GP00"
        // }
        // 
        return _.pick(hethongRap, ['maHeThongRap', "tenHeThongRap", "logo", "mahom"]);
    })
   // console.log("arrCumRap", arrCumRap);
    const renderPartner = () => {
        return arrCumRap?.map((rapFilm, index) => {
            return <li  key={index} className='ml-5'>
                <img className='rounded-full cursor-pointer' width="50" src={rapFilm.logo} alt={rapFilm.tenHeThongRap} />
            </li>
        })

    }
    return (
        <footer className="px-4 py-8 dark:bg-coolGray-800 dark:text-coolGray-400 bg-gray-700 text-white ">
            <div className="container px-10 flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
                <div className="flex flex-row pr-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-violet-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 rounded-full dark:text-coolGray-900">
                            <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z" />
                        </svg>
                    </div>
                    <ul className="flex flex-wrap items-center mb-0">
                        <li className='ml-5'>
                            <NavLink to="/home" className="text-white">Terms of Use</NavLink>
                        </li>
                        <li className='ml-5'>
                            <NavLink to="#" className="text-white">Policy</NavLink>
                        </li>
                    </ul>
                </div>
                {/* RENDER PARTNERS */}
                <div className='Partners'>
                    <ul className="flex flex-wrap items-center mb-0">
                        {/* <li className='ml-5'>
                            <NavLink to="/home" className="text-white">Terms of Use</NavLink>
                        </li>
                        <li className='ml-5'>
                            <NavLink to="#" className="text-white">Policy</NavLink>
                        </li> */}
                        {renderPartner()}
                    </ul>
                </div>
                {/* RENDER SOCIAL MEDIA */}
                <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
                    <li>
                        <NavLink to="#" className="text-white"><YoutubeOutlined style={{ "fontSize": "2.15rem" }} /></NavLink>
                    </li>
                    <li>
                        <NavLink to="#" className="text-white"><FacebookOutlined style={{ "fontSize": "2.15rem" }} /></NavLink>
                    </li>
                    <li>
                        <NavLink to="#" className="text-white"><TwitterOutlined style={{ "fontSize": "2.15rem" }} /></NavLink>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default React.memo(Footer);

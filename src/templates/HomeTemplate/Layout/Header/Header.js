import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import { Login } from '../../../../pages/Login/Login';
import { USER_LOGIN } from '../../../../util/setting.js/config';
import _ from "lodash"
import { Dropdown, Menu, message, Popconfirm } from 'antd';
import UserHeader from '../../../../components/UserAvatar/UserHeader';
import style from "./HeaderStyle.module.css";
export default function Header(props) {
    const history = useHistory();
    const { userLogin } = useSelector(state => state.QuanlyNguoiDungState);

    //console.log({ userLogin })

    const loginValidation = () => {
        if (!_.isEmpty(userLogin)) {
            return <UserHeader></UserHeader>

        }
        return <>
            <button className="px-8 py-3 font-semibold rounded bg-gray-500 mx-1" onClick={() => {
                history.push("/login");
            }}>Login</button>
            <button className="px-8 py-3 font-semibold rounded bg-gray-500 mx-1" onClick={() => {
                history.push("/register");
            }}>Register</button>
        </>


    }

    return (
        <header className={`${style.header} p-4 dark:bg-coolGray-800 dark:text-coolGray-100 relative z-10 bg-gray-700 text-white `}>
            <div className=" container flex justify-between h-16 mx-auto md:justify-center md:space-x-8">
                <ul className="items-stretch hidden space-x-3 md:flex">
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white" activeClassName='border-b-1 border-violet-400 text-violet-400'>Home</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white" activeClassName='border-b-1 border-violet-400 text-violet-400'> News</NavLink>
                    </li>

                </ul>
                <NavLink to="/" className="flex items-center p-2">
                    <img src='https://c8.alamy.com/comp/RC04FA/old-fashioned-movie-film-camera-logo-design-template-black-and-white-vector-illustration-RC04FA.jpg' alt='...' className='rounded-full w-16 h-16' />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 md:flex">
                    <li className="flex">
                        <NavLink to="/theater" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white" activeClassName='border-b-1 border-violet-400 text-violet-400'>Theaters</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white" activeClassName='border-b-1 border-violet-400 text-violet-400'>Contact</NavLink>
                    </li>
                    {/* <li className="flex">
                        <NavLink  to="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white" activeClassName='border-b-1 border-violet-400 text-violet-400'>Link</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white" activeClassName='border-b-1 border-violet-400 text-violet-400'> Link</NavLink>
                    </li> */}
                </ul>

                <button title="Button" type="button" className="p-4 md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="items-center flex-shrink-0 hidden lg:flex absolute" style={{ "top": "25%", "right": "5%" }}>
                    {loginValidation()}
                </div>
            </div>

        </header>

    )
}

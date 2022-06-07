import { Dropdown, Menu, Popconfirm } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoIDungActions';

export default function UserHeader(props) {
    const { thongTinTaiKhoan } = useSelector(state => state.QuanlyNguoiDungState);
    const dispatch = useDispatch()
    useEffect(() => {
        let action = layThongTinTaiKhoanAction();
        dispatch(action);
    }, [])

    const dropDownHandler = ({ key }) => {
        // message.info(`Click on item ${key}`);
 
    };
        const menu = (
            <Menu
                onClick={dropDownHandler}
                items={[
                    {
                        label: (
                            <NavLink to={`/profile/${thongTinTaiKhoan.taiKhoan}`}>Profile</NavLink>
                        ),
                        key: "profile"
                    },
                    {
                        label: (
                            <NavLink to="/admin">Management</NavLink>
                        ),
                        key: "management"
                    },
                    {
                        label: (
                            <Popconfirm placement="top" title="Do you want to sign out" onConfirm={()=>{
                                localStorage.clear();
                                // refresh whole pages to refresh all store in redux
                                window.location.reload( );
                            }} okText="Yes" cancelText="No">
                            <p>Sign Out</p>
                        </Popconfirm>
                        ),
                        key: 'signOut'
                    },
                ]}
            />
        );
    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <div className="items-center flex cursor-pointer mr-16">
                <img src="https://picsum.photos/50" className='rounded-full' />
                <p className='m-0 ml-2'>Hello, {thongTinTaiKhoan.hoTen}</p>
            </div>
        </Dropdown>
    )
}

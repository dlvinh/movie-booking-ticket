import React, { useState } from 'react'
import { NavLink, Route } from 'react-router-dom';
//import { Breadcrumb, Layout, Menu } from 'antd';
import { Layout, Menu } from 'antd';

import { UserAddOutlined } from '@ant-design/icons';
import { FileOutlined } from '@ant-design/icons';
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { FileAddOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
//const { Header, Content, Footer, Sider } = Layout;
export const AdminTemplate = (props) => {
    const [collapsedState, setState] = useState(false)
    const onCollapse = () => {
        setState(!collapsedState);
    }
    const { DestinationComponent, ...resProps } = props

    return (
        <Route {...resProps} render={(propsRoute) => {
            // voi render ta moi co the render ra duoc DestinationComponent, if not ta khong the render compoent
            // propsRoute is option => propsRoute (thong thuong la history, map, location) duoc truyen cho Destination component as a props de chuyen huong trang
            return <Layout style={{ minHeight: '100vh' }}>

                <Sider collapsible collapsed={collapsedState} onCollapse={onCollapse} style={{ backgroundColor: "rgb(55, 65, 81)" }}>
                    <div className="logo flex justify-center">
                        <img src='https://c8.alamy.com/comp/RC04FA/old-fashioned-movie-film-camera-logo-design-template-black-and-white-vector-illustration-RC04FA.jpg' alt='...' className='rounded-full w-16 h-16' />
                    </div>

                    <Menu style={{ backgroundColor: "rgb(55, 65, 81)", color: "white" }} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />} >
                            Users Management
                        </Menu.Item>

                        <Menu.SubMenu key="sub2" icon={<FileOutlined />} title="Movies Management" style={{background: "rgb(55, 65, 81)"}}>
                            <Menu.Item key="2.1" icon={<FileOutlined />} >
                                <NavLink to="/admin/films">Movie List</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2.2" icon={<FileAddOutlined />}>
                                <NavLink to="/admin/films/addnewmovie">Add New Movie</NavLink>
                            </Menu.Item>
                        </Menu.SubMenu >

                        <Menu.Item key="3" icon={<FundProjectionScreenOutlined />} >
                            Show Times Mangament
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">

                    <Header className="site-layout-background" style={{ padding: 0, color: "black", backgroundColor: "white" }} />

                    <Content style={{ backgroundColor: 'rgb(236 236 236 / 98%)' }}>
                        <DestinationComponent propsRoute={propsRoute}></DestinationComponent>
                    </Content>
                </Layout>
            </Layout>
        }}>

        </Route>
    )
}
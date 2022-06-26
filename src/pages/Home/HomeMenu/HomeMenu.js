import React, { useEffect,useRef } from 'react'
import { Tabs, } from 'antd';


import '../../../GlobalStyle/globalStyle.css'
import MovieTimeTable from './MovieTimeTable';
import { useState } from 'react';
const { TabPane } = Tabs;

function HomeMenu(props) {
    //console.log("HomeMenuprops", props)
    const { hethongRapChieu } = props;
    const [widthState,setWidthState] = useState();
    const ref = useRef();

    useEffect(()=>{
        if (ref.current.clientWidth < 800){
            setWidthState("md");
        }
        const handleResize = ()=>{
            // ref.current.offsetWidth = window.innerWidth;
            console.log(ref.current.clientWidth)
            if (ref.current.clientWidth < 800){
                setWidthState("md");
            }else{
                setWidthState("xl")
            }
        }
        window.addEventListener("resize",handleResize)
        return ()=>{
            window.removeEventListener("resize",handleResize)
        }
    },[ref.current])
    const renderTheaterTabPane = () => {
        console.log({hethongRapChieu});
        return hethongRapChieu.map((item, index) => {
            return <TabPane tab={<img className='rounded-full' width="50" src={item.logo} alt={item.tenHeThongRap} />} key={index}>
                <Tabs className='my-tap'  tabPosition={widthState == "md" ? "top":"left"}>
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
                        </TabPane>
                    })}
                </Tabs>

            </TabPane>
        })
    }
    return (
        <div className="home__menu container  mx-auto  lg:px-40 lg:py-10"  ref= {ref}>
            <Tabs className='main-tap' tabPosition={widthState == "md" ? "top":"left"} >
                {renderTheaterTabPane()}
            </Tabs>
        </div>
    )
}

export default React.memo(HomeMenu); // use memo to ensure Homemenu only render when it's props changed, any changed in Home which not effect state of Homemenu will affect Homemenu


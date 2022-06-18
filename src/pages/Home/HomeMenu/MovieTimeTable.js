import moment from 'moment'
import React, { useState, useEffect, useRef } from 'react'
import TailSpin from 'react-loading-icons/dist/components/tail-spin';
import { NavLink } from 'react-router-dom'
import LoadingAnimation from '../../../util/Loading/LoadingAnimation';
import { openNotificationWithIcon } from '../../../util/Notification/Notification';

export function MovieTimeTable(props) {
    const danhSachPhimDefault = props.danhSachPhim;
    const [state, setState] = useState({
        danhSachPhim: props.danhSachPhim.slice(0, 10),
        showLoadMore: true,
        showLoading:false
    });
    console.log({ danhSachPhimDefault });
    console.log({ state });
    const prevState = useRef();
    const ref = useRef();
    useEffect(() => {
        console.log("height",ref.current.scrollHeight);
        prevState.current = state.danhSachPhim;
    }, [state.danhSachPhim]);

    return (
      <>
       <div className='film__list' ref={ref} onTouchMove={()=>{
        console.log("onchange")
            if (ref.current.scrollHeight == ref.current.clientHeight){
                setState({
                    ...state,
                    showLoading:false,
                    showLoadMore:false
                })
            } 
       }} onScroll={(e) => {
            // console.log("Scroll", e.target.scrollHeight);
            // console.log("ScrollTop", e.target.scrollTop);
           
            let reachBottom = Math.abs(e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop);
            //console.log(reachBottom);
            if (reachBottom < 1) {
                //  console.log("bottom");
                // Check the the last index of entire danhSachPhim
                if (danhSachPhimDefault.length - prevState.current.length <= 0) {
                    console.log("het danh sach phim ");
                    setState({
                        ...state,showLoading:false,showLoadMore:false
                    })
                } else {
                    setState({...state,showLoadMore:false,showLoading:true});
                    setTimeout(()=>{
                        try{
                            console.log("Load more");
                            let newLst = danhSachPhimDefault.slice(prevState.current.length, state.danhSachPhim.length +10);
                           // console.log({...prevState.current,newLst})
                            setState({
                                ...state,
                                showLoadMore:true,
                                showLoading:false,
                                danhSachPhim:prevState.current.concat(newLst)
                            })
                        }catch(error){
                            openNotificationWithIcon("error","Error","No more Movie","top");
                        }
                      
                    },1000)
                  

                }
            }
        }}>
           
            {
                state.danhSachPhim?.map((film, index) => {
                    return <React.Fragment key={index}>
                        <div className=' flex my-5' >
                            <div className='flex' >
                                <img style={{
                                    height: 'fit-content',
                                    width: 100
                                }} src={film.hinhAnh} alt={film.tenPhim} />
                                <div className='film_des text-white ml-2 '>
                                    <h2 className='text-2xl text-white '>
                                        {film.tenPhim}
                                    </h2>
                                    <p>{props.diaChi}</p>
                                    {/* Load lich chieu */}
                                    <div className='grid grid-cols-6 gap-6'>
                                        {film.lstLichChieuTheoPhim?.slice(0, 12).map((time, index) => {
                                            return <NavLink className='custom-btn-hover px-2 py-2 font-semibold rounded border-2 text-white ' key={index} to={`checkout/${time.maLichChieu}`}>
                                                {moment(time.ngayChieuGioChieu).format("hh:mm A")}
                                            </NavLink>
                                        })}
                                    </div>

                                </div>
                            </div>

                        </div>
                        <hr />

                    </React.Fragment>
                })}
                 
            {state.showLoadMore ? <div className='text-white p-7 text-center'>
                <h1 className='text-xl text-white '>LOAD MORE</h1>
                <div className='loadmore'></div>
            </div> : state.showLoading? <div><TailSpin style={{margin:"auto"}}  fill='#cc6a23' stroke='#fe019a' height="6rem" /> <p className='text-lg mb-0 text-center' style={{color:"#fe019a"}}>Loading</p> </div>:"" }
        </div>
      </>
       
    )
}

export default React.memo(MovieTimeTable);
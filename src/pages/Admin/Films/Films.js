import React, { useEffect } from 'react'
import { Button, Table } from 'antd';
import { Input, AutoComplete } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector, } from 'react-redux';
import { layDanhSachPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { Fragment } from 'react/cjs/react.production.min';
import { NavLink } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
const data = [
    {
        "maPhim": 10534,
        "tenPhim": "PHÙ THỦY TỐI THƯỢNG TRONG ĐA VŨ TRỤ HỖN LOẠN",
        "biDanh": "phu-thuy-toi-thuong-trong-da-vu-tru-hon-loan",
        "trailer": "https://www.youtube.com/watch?v=aWzlQ2N6qqg",
        "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/phu-thuy-toi-thuong-trong-da-vu-tru-hon-loan_gp01.jpg",
        "moTa": "Sau các sự kiện của Avengers: Endgame, Tiến sĩ Stephen Strange tiếp tục nghiên cứu về Viên đá Thời gian. Nhưng một người bạn cũ đã trở thành kẻ thù tìm cách tiêu diệt mọi phù thủy trên Trái đất, làm xáo trộn kế hoạch của Strange và cũng khiến anh ta mở ra một tội ác khôn lường.",
        "maNhom": "GP01",
        "ngayKhoiChieu": "2022-05-04T00:00:00",
        "danhGia": 10,
        "hot": true,
        "dangChieu": true,
        "sapChieu": false
    }

];
export default function Films() {
    const dispatch = useDispatch();
    // Lay danh sach phim khi moi bat dau render
    useEffect(() => {
        let action = layDanhSachPhimAction();
        dispatch(action);
    }, [])
    const arrFilms = useSelector(state => state.QuanLyPhimState.arrFilms);
    console.log("arrFilms", arrFilms)
    const columns = [
        {
            title: 'Id',
            dataIndex: 'maPhim',
            key: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim, // only sort when click 
            sortDirections: ["ascend", "descend"],
            defaultSortOrder: "descend",
            width: "10%"
        },
        {
            title: 'Image',
            //dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            width: "10%",
            render:(text, record, index)=>{
                console.log(record);
                return <img className='rounded-md' key={index} src={record.hinhAnh} alt={record.tenPhim} style={{width:50, height:50}} onError={(e)=>{
                    e.target.onError = null;
                    e.target.src=`https://picsum.photos/seed/picsum/50/50`
                }}/>
            },
         
        },

        {
            title: 'Movie Name',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB){
                    return 1;
                }
                return -1;
            },
        },

        {
            title: 'Description',
            dataIndex: 'moTa',
            render: (text, record, index)=>{
                if (record.moTa.length >50){
                    return <Fragment>
                        {record.moTa.substring(0,200) + "..."}
                    </Fragment>
                }
                return <Fragment>
                {record.moTa}
            </Fragment>
            },
            sorter: (a, b) => {
                let moTaPhimA = a.moTa.toLowerCase().trim();
                let moTaPhimB = b.moTa.toLowerCase().trim();
                if (moTaPhimA > moTaPhimB){
                    return 1;
                }
                return -1;
            },
        },
        {
            title: "Actions",
            dataIndex:'actions',
            render: (text, record)=>{
                return <div>
                    <Button className='mx-2'  type="primary" icon={<EditOutlined />} size="medium" />
                    <Button className="mx-2" type="danger" icon={<DeleteOutlined />} size="medium" />
                </div>
            },
            width: "10%",
        }
        // {
        //     title: '',
        //     dataIndex: 'math',
        //     key=""
        //     sorter: {
        //         compare: (a, b) => a.math - b.math,
        //         multiple: 2,
        //     },
        // },
        // {
        //     title: 'English Score',
        //     dataIndex: 'english',
        //     sorter: {
        //         compare: (a, b) => a.english - b.english,
        //         multiple: 1,
        //     },
        // },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <div className='bg-white m-4 w-auto' >
            <div className='p-3'>
                <h1 className='text-2xl'>Movie Management</h1>

                <AutoComplete
                    dropdownMatchSelectWidth={252}
                    className="w-1/2 "
                >
                    <Input.Search size="large" placeholder="input here" enterButton />
                </AutoComplete>
                <div className='func_group flex justify-end'>
                    <Button type='primary' size='medium'>Add Movie</Button>

                </div>
                {/* Render Table */}
                <Table className="" columns={columns} dataSource={arrFilms} onChange={onChange} />
            </div>


        </div>
    )
}

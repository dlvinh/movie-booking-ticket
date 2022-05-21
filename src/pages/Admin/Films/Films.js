import React, { useEffect, useState ,useCallback} from 'react'
import { Button, Table } from 'antd';
import { Input, AutoComplete } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector, } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { Fragment } from 'react/cjs/react.production.min';
import { NavLink } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { history } from '../../../App';
import moment from "moment";
import _ from "lodash"

import { confirmAlert } from 'react-confirm-alert';

const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});
export default function Films() {
    const dispatch = useDispatch();
    // Lay danh sach phim khi moi bat dau render
    useEffect(() => {
        let action = layDanhSachPhimAction(" ");
        dispatch(action);
    }, [])
    const DefaultarrFilm = useSelector(state => state.QuanLyPhimState.DefaultarrFilm);
    const loadingTableState = useSelector(state => state.LoadingState.isTableLoadingShow);
    //console.log("DefaultarrFilm", DefaultarrFilm)
    // DELETE MOVIE 
    const deleteMovieHandler = (maPhim) => {
        confirmAlert({
            title: `Delete Movie ${maPhim}`,
            message: 'Confirmation',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        let action = xoaPhimAction(maPhim);
                        await dispatch(action);
                        // let reRenderPage = layDanhSachPhimAction(" ");
                        // await dispatch(reRenderPage);
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);
    // const onSearch = async searchText => {
    //    //await dispatch({ type: SET_LOADING_TABLE_STATE });
    //    setTimeout(()=>{
    //         let action = layDanhSachPhimAction(searchText);
    //         dispat ch(action);
    //     },1000)
       
    // };
    const onSearch = useCallback(
        // DEBOUNCE TECHINQUE
        _.debounce(async(searchText)=>{
            let action = layDanhSachPhimAction(searchText);
            dispatch(action);
        },1000),[]
    )

    const onSearchHandler = (text) => {
        setValue(text);
    }
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
            render: (text, record, index) => {
                //console.log(record);
                return <img className='rounded-md' key={index} src={record.hinhAnh} alt={record.tenPhim} style={{ width: 50, height: 50 }} onError={(e) => {
                    e.target.onError = null;
                    e.target.src = `https://picsum.photos/seed/picsum/50/50`
                }} />
            },

        },

        {
            title: 'Movie Name',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
        },
        {
            title: "Release Date",
            dataIndex: 'ngayKhoiChieu',
            render: (text, record) => {
                return moment(record.ngayKhoiChieu).format("DD/MM/YYYY")
            }

        },
        {
            title: 'Description',
            dataIndex: 'moTa',
            render: (text, record, index) => {
                if (record.moTa.length > 50) {
                    return <Fragment>
                        {record.moTa.substring(0, 200) + "..."}
                    </Fragment>
                }
                return <Fragment>
                    {record.moTa}
                </Fragment>
            },
            sorter: (a, b) => {
                let moTaPhimA = a.moTa.toLowerCase().trim();
                let moTaPhimB = b.moTa.toLowerCase().trim();
                if (moTaPhimA > moTaPhimB) {
                    return 1;
                }
                return -1;
            },
        },
        {
            title: "Actions",
            dataIndex: 'actions',
            render: (text, record) => {
                return <div key={record.maPhim}>
                    <Button onClick={() => {
                        history.push(`/admin/films/editmovie/${record.maPhim}`);
                    }} className="mx-2" type="primary" icon={<EditOutlined />} size="medium" />

                    <Button onClick={() => {
                        deleteMovieHandler(record.maPhim);
                    }} className="mx-2" type="danger" icon={<DeleteOutlined />} size="medium" />
                </div>
            },
            width: "10%",
        }
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
                    onChange={onSearch}

                    //onSearch={onSearch}
                    options={DefaultarrFilm.map((item,index)=>{return {value: item.tenPhim, label: item.tenPhim}})}
                />
                {/* <Input.Search size="large" placeholder="input here" enterButton /> */}

                <div className='func_group flex justify-end'>
                    <Button type='primary' size='medium' onClick={() => {
                        history.push('/admin/films/addnewmovie')
                    }}>Add Movie</Button>

                </div>
                {/* Render Table */}
                <Table loading={loadingTableState} className="" columns={columns} dataSource={DefaultarrFilm} onChange={onChange} />
            </div>


        </div>
    )
}

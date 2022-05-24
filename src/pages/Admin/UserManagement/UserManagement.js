import { CalendarOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Table } from 'antd';
import React ,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../App';
import { layDanhSachNguoiDungPhanTrangAction } from '../../../redux/actions/QuanLyNguoIDungActions';

const data = [
    {
      "taiKhoan": "0901959488",
      "matKhau": "123456789",
      "email": "nguyenhuyhoanglong2016@gmail.com",
      "soDt": "905222333",
      "maNhom": null,
      "maLoaiNguoiDung": "KhachHang",
      "hoTen": "trter123123123"
    },
    {
      "taiKhoan": "0941234234",
      "matKhau": "12345600000",
      "email": "lamhoang1@gmail.com",
      "soDt": "9999999991",
      "maNhom": null,
      "maLoaiNguoiDung": "QuanTri",
      "hoTen": "string12341324"
    },
    {
      "taiKhoan": "1111",
      "matKhau": "1111",
      "email": "1@c",
      "soDt": "1",
      "maNhom": null,
      "maLoaiNguoiDung": "KhachHang",
      "hoTen": "a"
    },
]
export default function UserManagement() {
    const dispatch = useDispatch();
    const loadingTableState = useSelector(state => state.LoadingState.isTableLoadingShow);
    const danhSachNguoiDung = useSelector(state => state.QuanlyNguoiDungState.danhSachNguoiDung);
    useEffect(() => {
        dispatch(layDanhSachNguoiDungPhanTrangAction(""));
    }, [])
    
    const columns = [
        {
            title: 'Username',
            dataIndex: "taiKhoan",
            key: 'taiKhoan',
            sorter: (a, b) => a.maPhim - b.maPhim, // only sort when click 
            sortDirections: ["ascend", "descend"],
            defaultSortOrder: "descend",
            width: "10%"
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key:"email"
            // sorter: (a, b) => {
            //     let tenPhimA = a.tenPhim.toLowerCase().trim();
            //     let tenPhimB = b.tenPhim.toLowerCase().trim();
            //     if (tenPhimA > tenPhimB) {
            //         return 1;
            //     }
            //     return -1;
            // },
        },
        {
            title: "Phone",
            dataIndex: 'soDt',
            // render: (text, record) => {
            //     return moment(record.ngayKhoiChieu).format("DD/MM/YYYY")
            // }

        },
        {
            title: 'Group Id',
            dataIndex: 'maNhom',
            // render: (text, record, index) => {
            //     if (record.moTa.length > 50) {
            //         return <Fragment>
            //             {record.moTa.substring(0, 200) + "..."}
            //         </Fragment>
            //     }
            //     return <Fragment>
            //         {record.moTa}
            //     </Fragment>
            // },
            // sorter: (a, b) => {
            //     let moTaPhimA = a.moTa.toLowerCase().trim();
            //     let moTaPhimB = b.moTa.toLowerCase().trim();
            //     if (moTaPhimA > moTaPhimB) {
            //         return 1;
            //     }
            //     return -1;
            // },
        },
        {
            title: 'User Type',
            dataIndex: 'maLoaiNguoiDung',
         
        },
        {
            title: "Actions",
            dataIndex: 'actions',
            render: (text, record) => {
                return <div key={record.maPhim}>
                    <Button onClick={() => {

                        // history.push(`/admin/films/editmovie/${record.maPhim}`);
                    }} className="mx-2" type="primary" icon={<EditOutlined />} size="medium" />

                    <Button onClick={() => {
                        
                    }} className="mx-2" type="danger" icon={<DeleteOutlined />} size="medium" />

                    <Button onClick={() => {
                        
                    }} className="mx-2" type="primary" icon={<CalendarOutlined />} size="medium" />
                </div>
            },
            width: "15%",
        }
    ];
  return (
    <div className='bg-white' >
    <div className='p-3'>
        <h1 className='text-2xl'>User Management</h1>

        <AutoComplete
            dropdownMatchSelectWidth={252}
            className="w-1/2 "
            // onChange={onSearch}

            //onSearch={onSearch}
            // options={DefaultarrFilm.map((item, index) => { return { value: item.tenPhim, label: item.tenPhim } })}
        />
        {/* <Input.Search size="large" placeholder="input here" enterButton /> */}

        <div className='func_group flex justify-end'>
            <Button type='primary' size='medium' onClick={() => {
                history.push('/admin/films/addnewmovie')
            }}>Add New User</Button>

        </div>
        {/* Render Table */}
        <Table loading={loadingTableState} className="" columns={columns} dataSource={danhSachNguoiDung} />
    </div>


</div>
  )
}

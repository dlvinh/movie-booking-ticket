import { CalendarOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Modal, Table, Select, Form } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector,connect } from 'react-redux';
import { layDanhSachNguoiDungAction, themNguoiDungAction } from '../../../redux/actions/QuanLyNguoIDungActions';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { GROUPID } from '../../../util/setting.js/config';
import { loaiNguoiDung } from '../../../_core/models/LoaiNguoiDungModel';
import { quanLyNguoiDung } from '../../../services/QuanLyNguoiDung';
import { openNotificationWithIcon } from '../../../util/Notification/Notification';

const { Option } = Select;

export function UserManagement(props) {
    const dispatch = useDispatch();
    const loadingTableState = useSelector(state => state.LoadingState.isTableLoadingShow);
    const danhSachNguoiDung = useSelector(state => state.QuanlyNguoiDungState.danhSachNguoiDung);
    const [loaiNguoiDungOption, setLoaiNguoiDungOption] = useState([loaiNguoiDung]);
    // console.log("loaiNguoiDung", loaiNguoiDungOption);
    const [visible, setVisible] = useState(false);
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    //console.log("prop",props)
    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction(""));
        dispatch(async () => {
            try {
                let res = await quanLyNguoiDung.layDanhSachLoaiNguoiDung();
                if (res.data.statusCode === 200) {
                    setLoaiNguoiDungOption(res.data.content);
                }
            } catch (error) {
                console.log(error.response.data);
            }
        })
    }, [])
    const showModal = () => {
        setVisible(true)
    };

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
            key: "email"
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
                        showModal()
                    }}>Add New User</Button>

                </div>
                {/* Render Table */}
                <Table loading={loadingTableState} className="" columns={columns} dataSource={danhSachNguoiDung} />
                <Modal title="ADD NEW USER" visible={visible} width={800} footer={null}>
                    <h1 className='text-3xl text-center'>New User</h1>
                    <form id="modalForm" onSubmit={handleSubmit}>
                        <div className='grid grid-cols-2 gap-4'>
                            {/* Tai Khoang */}
                            <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
                                <input onChange={handleChange} name="taiKhoan" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter you username" />
                                {errors?.taiKhoan ? <div id="feedback" className='text-red-600 text-sm'>{errors.taiKhoan}</div> : ""}
                            </div>
                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                </div>
                                <input onChange={handleChange} name="matKhau" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Enter your password" />
                                {errors?.matKhau ? <div id="feedback" className="text-red-600 text-sm" >{errors.matKhau}</div> : ""}
                            </div>

                            {/* Email */}
                            <div className='mt-2'>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                                <input onChange={handleChange} name="email" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" placeholder="example@gmail.com" />
                                {errors?.email ? <div id="feedback" className='text-red-600 text-sm'>{errors.email}</div> : ""}
                            </div>
                            {/* Ho ten */}
                            <div className='mt-2'>

                                <div className="text-sm font-bold text-gray-700 tracking-wide">Name</div>
                                <input onChange={handleChange} name="hoTen" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="example" />
                                {errors?.hoTen ? <div id="feedback" className='text-red-600 text-sm'>{errors.hoTen}</div> : ""}

                            </div>

                            {/* Phone No */}
                            <div className="mt-2">

                                <div className="text-sm font-bold text-gray-700 tracking-wide">Phone</div>
                                <input onChange={handleChange} name="soDt" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="0412345678" />
                                {errors?.soDt ? <div id="feedback" className='text-red-600 text-sm'>{errors.soDt}</div> : ""}

                            </div>
                            {/* Loai Nguoi Dung */}
                            <div className="mt-2">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">User Type</div>
                                <select className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500' name="maLoaiNguoiDung" placeholder="Select User Type" style={{ width: "100%", padding: "0.5rem 0" }} onChange={handleChange}>
                                    <option defaultChecked value="NONE">---Select Type---</option>
                                    {loaiNguoiDungOption?.map((item, index) => {
                                        return <option value={item.maLoaiNguoiDung} key={index}>{item.tenLoai}</option>
                                    })}
                                </select>
                                {errors?.maLoaiNguoiDung ? <div id="feedback" className='text-red-600 text-sm'>{errors.maLoaiNguoiDung}</div> : ""}
                            </div>
                      
                        </div>
                        <div className='py-12 text-right'>
                            <button onChange={()=>{
                                setVisible(false);
                            }} className=" bg-red-500 text-gray-100 p-2 mx-2 rounded-md tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600 shadow-lg">
                                Cancel
                            </button>
                            <button type="submit" onChange={handleChange} className=" bg-blue-500 text-gray-100 p-2 mx-2 rounded-md tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                                Add New
                            </button>
                        </div>

                    </form>
                </Modal>
            </div>


        </div>
    )
}
const HandleAddNewUserFormWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: "",
        matKhau: '',
        taiKhoan: "",
        soDt: 0,
        maNhom: GROUPID,
        hoTen: "",
        maLoaiNguoiDung: "",
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().email("Email invalid").required("This field is required!"),
        matKhau: Yup.string().required("This field is required!"),
        taiKhoan: Yup.string().required("This field is required!"),
        hoTen: Yup.string().required("This field is required!"),
        maLoaiNguoiDung: Yup.string().required("This field is required").test("test-option-valid","This option is invalid", (value)=>{
            if (value?.trim() !== "NONE") {
                return true
            }
        })
    }),
    handleSubmit: async (values, { props }) => {
        console.log("values", values);
        console.log("prosp", props)
        // dispact actions as a function to middleware
          const dispatch = props.dispatch; // dispatch khong can phair props.dispatch()
            let action = themNguoiDungAction(values);
            dispatch(action);
        //   let action  = dangKyAction(values);
        //   dispatch(action);
        // try{
        //   let res = await quanLyNguoiDung.dangNhap(values);
        //   if (res.data.statusCode === 200){
        //     openNotificationWithIcon("success","Register Success",res.data.message,"top");
        //     history.push('/login')
        //   }
        // }catch(errors){
        //   let data = errors.response.data;
        //   openNotificationWithIcon("error",data.message, data.content,"top");
        // }
    },

    displayName: 'Add new user',
})(UserManagement);
const mapStateToProps = ()=>{
    return {
        visible: false
    }
}

export default connect()(HandleAddNewUserFormWithFormik);
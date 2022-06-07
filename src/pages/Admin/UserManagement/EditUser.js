import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinNguoiDungByAdminAction, layDanhSachLoaiNguoiDungAction, layDanhSachNguoiDungAction, layThongTinTaiKhoanAction } from '../../../redux/actions/QuanLyNguoIDungActions';
import { openNotificationWithIcon } from '../../../util/Notification/Notification';
import { Button, Typography } from 'antd';
import { history } from '../../../App';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import _ from "lodash";
import { GROUPID } from '../../../util/setting.js/config';
import { User } from '../../../_core/models/UserModel';
import { confirmAlert } from 'react-confirm-alert';
import { SHOW_LOADING_ACTION } from '../../../redux/actions/LoadingAction,';
const { Text, Title } = Typography;

export function EditUser(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    const propsRoute = props.propsRoute;
    const dispatch = useDispatch();

    // const taiKhoanEdit = useSelector((state) => {
    //     const danhSachNguoiDung = state.QuanlyNguoiDungState.danhSachNguoiDung;
    //     return _.find(danhSachNguoiDung, (user) => {
    //         return user.taiKhoan === propsRoute.match.params.taiKhoan;
    //     })
    // })
    const loaiNguoiDungOption = useSelector(state => state.QuanlyNguoiDungState.loaiNguoiDung);

    useEffect(() => {
        async function fetchData() {
            let taiKhoan = propsRoute.match.params.taiKhoan;
            await dispatch(layDanhSachNguoiDungAction(taiKhoan));
            await dispatch(layDanhSachLoaiNguoiDungAction());
        }
        fetchData();
    }, [])
    return (
        <div className='bg-white'>
            <div className='p-3'>
                Edit User {propsRoute.match.params.taiKhoan}
                <form id="modalForm" onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4'>
                        {/* Tai Khoang */}
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
                            <input onChange={handleChange} value={values?.taiKhoan} readOnly disabled name="taiKhoan" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter you username" />
                            {errors?.taiKhoan ? <div id="feedback" className='text-red-600 text-sm'>{errors.taiKhoan}</div> : ""}
                        </div>
                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Password
                                </div>
                            </div>
                            <input value={values?.matKhau} disabled readOnly onChange={handleChange} name="matKhau" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Enter your password" />
                            {errors?.matKhau ? <div id="feedback" className="text-red-600 text-sm" >{errors.matKhau}</div> : ""}
                        </div>

                        {/* Email */}
                        <div className='mt-2'>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                            <input onChange={handleChange} value={values?.email} name="email" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" placeholder="example@gmail.com" />
                            {errors?.email ? <div id="feedback" className='text-red-600 text-sm'>{errors.email}</div> : ""}
                        </div>
                        {/* Ho ten */}
                        <div className='mt-2'>

                            <div className="text-sm font-bold text-gray-700 tracking-wide">Name</div>
                            <input onChange={handleChange} value={values?.hoTen} name="hoTen" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="example" />
                            {errors?.hoTen ? <div id="feedback" className='text-red-600 text-sm'>{errors.hoTen}</div> : ""}

                        </div>

                        {/* Phone No */}
                        <div className="mt-2">

                            <div className="text-sm font-bold text-gray-700 tracking-wide">Phone</div>
                            <input onChange={handleChange} value={values?.soDt} name="soDt" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="0412345678" />
                            {errors?.soDt ? <div id="feedback" className='text-red-600 text-sm'>{errors.soDt}</div> : ""}

                        </div>
                        {/* Loai Nguoi Dung */}
                        <div className="mt-2">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">User Type</div>
                            <select value={values.maLoaiNguoiDung} className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500' name="maLoaiNguoiDung" placeholder="Select User Type" style={{ width: "100%", padding: "0.5rem 0" }} onChange={handleChange}>
                                <option  value="NONE">---Select Type---</option>
                                {loaiNguoiDungOption?.map((item, index) => {
                                    if (item.maLoaiNguoiDung === values.maLoaiNguoiDung){
                                        return <option defaultValue={item.maLoaiNguoiDung} value={item.maLoaiNguoiDung} key={index}>{item.tenLoai}</option>
                                    }
                                    return <option value={item.maLoaiNguoiDung} key={index}>{item.tenLoai}</option>
                                })}
                            </select>
                            {errors?.maLoaiNguoiDung ? <div id="feedback" className='text-red-600 text-sm'>{errors.maLoaiNguoiDung}</div> : ""}
                        </div>

                    </div>
                    <div className='py-12 text-right'>
                        <button onClick={() => {
                            history.push('/admin/usermanagement')
                        }} className=" bg-red-500 text-gray-100 p-2 mx-2 rounded-md tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-red-600 shadow-lg">
                            Cancel and Back
                        </button>
                        <button type="submit" onChange={handleChange} className=" bg-blue-500 text-gray-100 p-2 mx-2 rounded-md tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                            Update
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
const HandleEditNewUserFormWithFormik = withFormik({
    enableReinitialize:true,
    mapPropsToValues: (props) => {
        console.log("propsFormik", props);
        const user = _.find(props.danhSachNguoiDung,(user)=>{
            return user.taiKhoan === props.propsRoute.match.params.taiKhoan;
        })
        console.log("userformik", user);
        if (user === undefined){
            return new User("","","","","","","");
        }
        return {
            email: user.email,
            matKhau: user.matKhau,
            taiKhoan: user.taiKhoan,
            soDt: user.soDt,
            maNhom: user.maNhom === undefined? GROUPID:user.maNhom,
            hoTen:user.hoTen,
            maLoaiNguoiDung: user.maLoaiNguoiDung,
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email("Email invalid").required("This field is required!"),
        matKhau: Yup.string().required("This field is required!"),
        taiKhoan: Yup.string().required("This field is required!"),
        hoTen: Yup.string().required("This field is required!"),
        maLoaiNguoiDung: Yup.string().required("This field is required").test("test-option-valid", "This option is invalid", (value) => {
            if (value?.trim() !== "NONE") {
                return true
            }
        })
    }),
    handleSubmit: async (values, { props }) => {
        console.log("values", values);
        console.log(props.danhSachNguoiDung);
        const dispatch = props.dispatch;
        confirmAlert({
            title:"Edit User",
            message:"Do you want to edit this user?",
            buttons:[
                {
                    label:"Save",
                    onClick:async ()=>{
                        // console.log("newUser",values); 
                        await dispatch(capNhatThongTinNguoiDungByAdminAction(values));
                    }
                },
                {
                    label:"Cancel",
                    onClick:()=>{  
                        

                    }
                }
            ]
        })
        // console.log("prosp", props)
        // dispact actions as a function to middleware
        // const dispatch = props.dispatch; // dispatch khong can phair props.dispatch()
        // let action = themNguoiDungAction(values);
        // dispatch(action);
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
})(EditUser);
const mapStateToProps = (state) => {
    return {
        danhSachNguoiDung: state.QuanlyNguoiDungState.danhSachNguoiDung
    }
}
export default connect(mapStateToProps)(HandleEditNewUserFormWithFormik)
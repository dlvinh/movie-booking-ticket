import React, { Component } from 'react'
import { connect } from 'react-redux'
import { capNhatThongTinNguoiDungByAdminAction, layThongTinTaiKhoanAction } from '../../../redux/actions/QuanLyNguoIDungActions'
import style from './Profile.module.css';
import { Button, Tabs } from 'antd';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import _ from "lodash";
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
const { TabPane } = Tabs;

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfileTab: true,
            showBookingHistortyTab: false,
            updateProfile: false,
        };
    }
    onClickProfileTab() {
        this.setState({
            ...this.state,
            showProfileTab: true,
            showBookingHistortyTab: false
        })
    }
    renderBookingHistoryContent() {
        let thongTinDatVeLst = this.props.thongTinDatVe;
        return thongTinDatVeLst?.map((info, index) => {
            return <div className='p-10' key={index}>
                <h1 className='text-xl font-bold'>Ma ve: <span className='text-indigo-600'>{info.maVe}</span></h1>
                <h2 className='text-xl font-bold'>Date: <span className='text-indigo-600'>{moment(info.ngayDat).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span></h2>
                <h2 className='text-xl font-bold'>Movie name: <span className='text-indigo-600'>{info.tenPhim}</span></h2>
                <div className='text-xl font-bold'>Ticket List</div>
                <div className="flex flex-wrap -m-2" key={index}>
                    {info.danhSachGhe.map((ghe, index) => {
                        return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={info.hinhAnh} />
                                <div className="flex-grow">
                                    <h2 className="text-gray-900 title-font font-medium">Theater Group:{ghe.tenHeThongRap}</h2>
                                    <p className="text-gray-500"> Theater - {ghe.tenRap} - Seat - {ghe.tenGhe}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

            </div >
        })
    }
    cancelFormHandler() {
        let compareRes = _.isEqual(this.props.values, this.props.initialValues);
       // console.log({ compareRes });
        if (!compareRes) {
            if (window.confirm("Cancel your changes?") == true) {
                this.props.setFieldValue("email", this.props.thongTinTaiKhoan.email);
                this.props.setFieldValue("matKhau", this.props.thongTinTaiKhoan.matKhau);
                this.props.setFieldValue("taiKhoan", this.props.thongTinTaiKhoan.taiKhoan);
                this.props.setFieldValue("soDt", this.props.thongTinTaiKhoan.soDT);
                this.props.setFieldValue("maNhom", this.props.thongTinTaiKhoan.maNhom);
                this.props.setFieldValue("hoTen", this.props.thongTinTaiKhoan.hoTen);
                this.setState({
                    ...this.state,
                    updateProfile: false
                })
            }
        }
        if (compareRes) {
            this.setState({
                ...this.state,
                updateProfile: false
            })
        }

    }

    renderProfileContent() {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
        } = this.props;
        if (!this.state.updateProfile) {
             return <div className="px-20 py-5 bg-gray-50 text-white rounded-lg" id="profile" role="tabpanel" aria-labelledby="profile-tab" style={{ backgroundColor: "#f8cb837a" }}>
                 <div className='grid grid-cols-2 mb-3'>
                    {/* Email */}
                    <div>
                        <div className="text-2xl mb-3 font-bold text-white tracking-wide">Email:</div>
                        <input onChange={handleChange} disabled readOnly value={values.email} name="email" className=" w-10/12 text-black text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" placeholder="Enter you username" />
                        {/* {errors?.taiKhoan ? <div id="feedback" className='text-red-600 text-sm'>{errors.taiKhoan}</div> : ""} */}
                    </div>
                    <div>
                        <div className="text-2xl mb-3 font-bold text-white tracking-wide">Username</div>
                        <input onChange={handleChange} value={values.taiKhoan} name="taiKhoan" disabled readOnly className="w-10/12 px-2 text-black text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter you username" />
                    </div>
                    <div>
                        <div className="text-2xl mb-3 font-bold text-white tracking-wide">Name:</div>
                        <input onChange={handleChange} disabled readOnly value={values.hoTen} name="hoTen" className="w-10/12 text-black text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter you username" />
                    </div>
                    <div>
                        <div className="text-2xl mb-3 font-bold text-white tracking-wide">Password:</div>
                        <input onChange={handleChange} readOnly value={values.matKhau} name="matKhau" disabled  className="w-10/12 text-black text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Enter you username" />
                    </div>
                    <div>
                        <div className="text-2xl mb-3 font-bold text-white tracking-wide">Phone:</div>
                        <input onChange={handleChange} disabled readOnly value={values.soDt} name="soDt" className="w-10/12 text-black text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter you phone number" />
                    </div>
                </div>
                 <button className={style['button-style']} onClick={() => {
                    this.setState({
                        ...this.state,
                        updateProfile: true
                     })
                }}>Update Profile</button>
            </div>
        }
        return <div className="px-20 py-5 bg-gray-50 text-white rounded-lg" id="profile" role="tabpanel" aria-labelledby="profile-tab" style={{ backgroundColor: "#f8cb837a" }}>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 mb-3'>
                    {/* Email */}
                    <div>
                        <div className="text-2xl mb-3 font-bold text-white tracking-wide">Email:</div>
                        <input onChange={handleChange} value={values.email} name="email" className=" w-10/12 text-black text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" placeholder="Enter you username" />
                        {/* {errors?.taiKhoan ? <div id="feedback" className='text-red-600 text-sm'>{errors.taiKhoan}</div> : ""} */}
                    </div>
                    <div>
                        <div className="text-2xl mb-3 font-bold text-white tracking-wide">Username</div>
                        <input onChange={handleChange} value={values.taiKhoan} name="taiKhoan" disabled readOnly className="w-10/12 px-2 text-black text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter you username" />
                    </div>
                    <div>
                        <div className="text-2xl mb-3 font-bold text-white tracking-wide">Name:</div>
                        <input onChange={handleChange} value={values.hoTen} name="hoTen" className="w-10/12 text-black text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter you username" />
                    </div>
                    <div>
                        <div className="text-2xl mb-3 font-bold text-white tracking-wide">Password:</div>
                        <input onChange={handleChange} value={values.matKhau} name="matKhau" disabled readOnly className="w-10/12 text-black text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Enter you username" />
                    </div>
                    <div>
                        <div className="text-2xl mb-3 font-bold text-white tracking-wide">Phone:</div>
                        <input onChange={handleChange} value={values.soDt} name="soDt" className="w-10/12 text-black text-lg py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter you phone number" />
                    </div>
                </div>
                <button className={style['button-style']} onChange={handleChange} htmlType="submit">Update</button>
                <button className={style['button-style']} style={{backgroundColor:"#ff4141"}}onClick={() => {
                    this.cancelFormHandler();
                }}>Cancel</button>
            </form>


        </div>
    }
    componentDidMount() {
       // console.log("didmount")
        this.props.layThongTinTaiKhoan();
    }
    render() {
      //  console.log("renderProps", this.props);
        return (
            <div className={`border-b border-gray-200 dark:border-gray-700 py-10`} style={{ backgroundColor: `rgb(228 190 148)`, height: 'auto', backgroudPosition: `center`, backgroundRepeat: 'no-repeat', backgroundSize: `cover` }}>
               <div className={`${style['glassmorphism-style']} w-10/12 mx-auto mt-20`} >
               <img class="w-52 h-52 mx-auto p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://picsum.photos/500" alt="Bordered avatar" />
               <Tabs defaultActiveKey="1" size='large' style={{ marginBottom: 32 }}>
                    <TabPane tab="Profile" key="1">
                        {this.renderProfileContent()}
                    </TabPane>
                    <TabPane tab="Booking Historty" key="2">
                        {this.renderBookingHistoryContent()}
                    </TabPane>
                </Tabs>
               </div>
               
            </div>

        )
    }

}
const mapStateToProps = (state) => {
    //console.log(state.QuanlyNguoiDungState)
    return {
        thongTinTaiKhoan: state.QuanlyNguoiDungState.thongTinTaiKhoan,
        thongTinDatVe: _.reverse(state.QuanlyNguoiDungState.thongTinTaiKhoan.thongTinDatVe)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        layThongTinTaiKhoan: () => {
            dispatch(layThongTinTaiKhoanAction());
        },
        capNhatThongTinNguoiDungByAdmin: (values) => {
            dispatch(capNhatThongTinNguoiDungByAdminAction(values));
        }
    }
}
const HandleUpdateUserFormWithFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
      //  console.log("propsFormik", props);
        const thongTinTaiKhoan = props.thongTinTaiKhoan;
        //console.log("thongTinTaiKhoanFormik", thongTinTaiKhoan);
        return {
            email: thongTinTaiKhoan.email,
            matKhau: thongTinTaiKhoan.matKhau,
            taiKhoan: thongTinTaiKhoan.taiKhoan,
            soDt: thongTinTaiKhoan.soDT,
            maNhom: thongTinTaiKhoan.maNhom,
            hoTen: thongTinTaiKhoan.hoTen,
            maLoaiNguoiDung: thongTinTaiKhoan.loaiNguoiDung === "Quản trị" ? "QuanTri" : "KhachHang",
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
        // console.log("values", values);
        // console.log("prosp", props);
        confirmAlert({
            title: 'Confirm to to save changes',
            message: 'Update Profile',
            buttons: [
                {
                    label: 'Save Changes',
                    onClick: async () => {
                      //  console.log("PROFILE EDDITING")
                        await props.capNhatThongTinNguoiDungByAdmin(values);

                    }
                },
                {
                    label: 'No',
                    onClick: () => ({// Action when cancel
                    })
                }
            ]
        });
    },

    displayName: 'Update Profile',
})(Profile);

export default connect(mapStateToProps, mapDispatchToProps)(HandleUpdateUserFormWithFormik);
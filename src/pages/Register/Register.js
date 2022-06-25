import { withFormik } from 'formik';
import React from 'react'
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { GROUPID } from '../../util/setting.js/config';

import { dangKyAction } from '../../redux/actions/QuanLyNguoIDungActions';
// "taiKhoan": "string",
// "matKhau": "string",
// "email": "string",
// "soDt": "string",
// "maNhom": "string",
// "hoTen": "string"
function Register(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm py-20 bg-white">
      <div className="mt-0 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-0 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Register</h2>
        <div className="mt-12">
          <form onSubmit={handleSubmit}>
            {/* Tai Khoang */}
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
              <input onChange={handleChange} name="taiKhoan" className="w-full text-lg text-black py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter you username" />
              {errors?.taiKhoan ? <div id="feedback" className='text-red-600 text-sm'>{errors.taiKhoan}</div> : ""}
            </div>
            {/* Password */}
            <div className="mt-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Password
                </div>
                <div>
                  <NavLink to="/home" className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    Forgot Password?
                  </NavLink>
                </div>
              </div>
              <input onChange={handleChange} name="matKhau" className=" w-full text-black text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Enter your password" />
              {errors?.matKhau ? <div id="feedback" className="text-red-600 text-sm" >{errors.matKhau}</div> : ""}
            </div>
            {/* Email */}
            <div className='mt-2'>
              <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
              <input onChange={handleChange} name="email" className="w-full text-black text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" placeholder="example@gmail.com" />
              {errors?.email ? <div id="feedback" className='text-red-600 text-sm'>{errors.email}</div> : ""}
            </div>
            {/* Ho ten */}
            <div className='mt-2'>
            
                <div className="text-sm font-bold text-gray-700 tracking-wide">Name</div>
                <input onChange={handleChange} name="hoTen" className="w-full text-black text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="example" />
                {errors?.hoTen ? <div id="feedback" className='text-red-600 text-sm'>{errors.hoTen}</div> : ""}
           
            </div>


            {/* Phone No */}
            <div className="mt-2">
             
                <div className="text-sm font-bold text-gray-700 tracking-wide">Phone</div>
                <input onChange={handleChange} name="soDt" className="w-full text-black text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="0412345678" />
                {errors?.soDt ? <div id="feedback" className='text-red-600 text-sm'>{errors.soDt}</div> : ""}
           
            </div>
            <button type="submit" onChange={handleChange} className="mt-10 bg-indigo-500 w-full text-gray-100 p-4 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
              Register
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

const HandleRegisterFormWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    matKhau: '',
    taiKhoan: "",
    soDt: 0,
    maNhom: GROUPID,
    hoTen: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Email invalid").required("This field is required!"),
    matKhau: Yup.string().required("This field is required!"),
    taiKhoan: Yup.string().required("This field is required!"),
    hoTen: Yup.string().required("This field is required!")
  }),
  handleSubmit: async (values, { props }) => {
    console.log("values", values);
    console.log("prosp",props)
    // console.log("FormikProps",props);
    // dispact actions as a function to middleware
    const dispatch = props.dispatch; // dispatch khong can phair props.dispatch()
    let action  = dangKyAction(values);
    dispatch(action);
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

  displayName: 'Register',
})(Register);

const mapStateToProps = () => {

}

export default connect(Register)(HandleRegisterFormWithFormik);
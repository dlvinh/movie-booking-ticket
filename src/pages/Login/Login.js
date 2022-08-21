import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { connect } from 'react-redux';

import { dangNhapAction } from '../../redux/actions/QuanLyNguoIDungActions';
import style from "./LoginStyle.module.css"
// {
//   "statusCode": 200,
//   "message": "Xử lý thành công!",
//   "content": {
//     "taiKhoan": "hoangyenchibi@gmail.com",
//     "matKhau": "password",
//     "email": "hoangyenchibi@gmail.com",
//     "soDt": "1231231233",
//     "maNhom": "GP00",
//     "hoTen": "Hoang Yen"
//   },
//   "dateTime": "2022-05-07T15:01:56.8116848+07:00",
//   "messageConstants": null
// }
export function Login(props) {
  const {
    errors,
    handleChange,
    handleSubmit,
  } = props;

  return (
    <div className={`${style["center-container"]} text-black h-screen`}>
      <div className={`${style["center-section"]}`}>
      <h2 className="text-center tracking-wider text-4xl text-white font-display font-semibold xl:text-5xl xl:text-bold">Login</h2>
        <div className="mt-12">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="text-lg font-bold text-white text-left tracking-wide">Username</div>
              <input onChange={handleChange} name="email" className="w-full px-3 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter your username" />
              {errors?.email ? <div id="feedback" className='text-red-600 text-left text-sm'>{errors.email}</div> : ""}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-white tracking-wide">
                  Password
                </div>
                <div>
                  <NavLink to="/home" className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    Forgot Password?
                  </NavLink>
                </div>
              </div>
              <input onChange={handleChange} name="password" className="w-full px-3 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Enter your password" />
              {errors?.password ? <div id="feedback" className="text-red-600 text-sm text-left" >{errors.password}</div> : ""}
            </div>
            <div className="mt-10">
              <button type='submit' className={`${style["button-hover-efx"]} p-4 w-full rounded-full tracking-wide
      font-semibold font-display focus:outline-none focus:shadow-outline text-lg hover:text-white hover:text-2xl
      shadow-lg`}>
                Login
              </button>
            </div>
          </form>
          <div className="mt-12 text-sm font-display font-semibold text-white text-center">
            Don't have an account ? <NavLink to="/register" className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign up</NavLink>
          </div>
        </div>
      </div>
    
      
    </div>
  )
}

const HandleFormWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ''
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("Password is required")
  }),
  handleSubmit: (values, { props }) => {
    // console.log("values", values);
    // console.log(props, props);
    let obj = { taiKhoan: values.email, matKhau: values.password }
    // dispact actions as a function to middleware
    let action = dangNhapAction(obj);
    props.dispatch(action);
  },

  displayName: 'LoginForm',
})(Login);


export default connect(Login)(HandleFormWithFormik);
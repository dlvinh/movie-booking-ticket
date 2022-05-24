import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup';
import {withFormik } from 'formik';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { quanLyNguoiDung } from '../../services/QuanLyNguoiDung';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoIDungActions';

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
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
            <svg className="w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 225 225" style={{ enableBackground: 'new 0 0 225 225' }} xmlSpace="preserve">
              <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                " }} />
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path id="Layer0_0_1_STROKES" className="st0" d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8" />
                </g>
              </g>
            </svg>
          </div>
          <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">blockify</div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Log in</h2>
        <div className="mt-12">
          <form onClick={handleSubmit}>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
              <input onChange={handleChange} name="email" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Enter your username" />
              {errors?.email ? <div id="feedback" className='text-red-600 text-sm'>{errors.email}</div> : ""}
            </div>
            <div className="mt-8">
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
              <input onChange={handleChange} name="password" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Enter your password" />
              {errors?.password ? <div id="feedback" className="text-red-600 text-sm" >{errors.password}</div> : ""}
            </div>
            <div className="mt-10">
              <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
      shadow-lg">
                Log In
              </button>
            </div>
          </form>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
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
  handleSubmit: (values,{props}) => {
    console.log("values", values);
    console.log(props,props);
    let obj = {taiKhoan: values.email, matKhau:values.password}
    // dispact actions as a function to middleware
    let action = dangNhapAction(obj);
    props.dispatch(action);
  },

  displayName: 'LoginForm',
})(Login);

const mapStateToProps = ()=>{

}

export default connect(Login)(HandleFormWithFormik);
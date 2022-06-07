import { useSelector } from "react-redux";
import { history } from "../../App";
import { quanLyNguoiDung } from "../../services/QuanLyNguoiDung"
import { openNotificationWithIcon } from "../../util/Notification/Notification";
import { TOKEN, USER_LOGIN, USER_SESSION } from "../../util/setting.js/config";
import { HIDE_LOADING_ACTION, HIDE_LOADING_TABLE_ACTION, SHOW_LOADING_ACTION, SHOW_LOADING_TABLE_ACTION } from "./LoadingAction,";
import { LOGIN, SAVE_THONG_TIN_TAI_KHOAN, SET_DANH_SACH_NGUOI_DUNG, SET_LOAI_NGUOI_DUNG } from "./types/QuanLyNguoiDung";

export const dangNhapAction = (user) => {
    return async (dispatch) => {
        try {
            dispatch(SHOW_LOADING_ACTION())
            let response = await quanLyNguoiDung.dangNhap(user);
            console.log("response", response);
            let { data, status } = response;
            if (status === 200) {
                openNotificationWithIcon("success", "Success", "Login Success", "top");
                localStorage.setItem(TOKEN, data.content.accessToken);
                localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
                // dispatch len reducer
                dispatch({
                    type: LOGIN,
                    data: data.content
                });
                console.log("history", history)
                history.push("/");
            }
        } catch (error) {
            console.log("err", error);
            let { data } = error.response;
            openNotificationWithIcon("error", "Error", data.content, "top");
        }
        dispatch(HIDE_LOADING_ACTION());
    }
}

export const layThongTinTaiKhoanAction = () => {
    return async (dispatch) => {
        try {
            let response = await quanLyNguoiDung.layThongTinTaiKhoan();
            let { data, status } = response;
            if (status === 200) {
               // console.log("thongTinTaiKhoan", data.content);
                dispatch({
                    type: SAVE_THONG_TIN_TAI_KHOAN,
                    data: data.content
                })
            }
        } catch (error) {
            let { data } = error.response;
            openNotificationWithIcon("error", "Error", data.content, "top");
        }
    }
}

export const dangKyAction = (values) => {
    console.log("dangKydispatch", values);
    return async (dispatch) => {
        try {
            dispatch(SHOW_LOADING_ACTION());
            let res = await quanLyNguoiDung.dangKy(values);
            if (res.data.statusCode === 200) {
                openNotificationWithIcon("success", "Register Success", res.data.message, "top");
                history.push('/login')
            }
        } catch (errors) {
            let data = errors.response.data;
            openNotificationWithIcon("error", `Error ${data.statusCode}`, data.content, "top");
            console.log({ errors })
        }
        dispatch(HIDE_LOADING_ACTION());
    }
}

export const layDanhSachNguoiDungAction = (keyWord) => {
    return async (dispatch) => {
        dispatch((SHOW_LOADING_TABLE_ACTION()));
        try {
            let res = await quanLyNguoiDung.layDanhSachNguoiDung(keyWord);
            if (res.data.statusCode === 200) {
                console.log("res", res);
                await dispatch({
                    type: SET_DANH_SACH_NGUOI_DUNG,
                    data: res.data.content
                });

            }
        } catch (error) {
            let data = error.response.data;
            openNotificationWithIcon("error", `Error ${data.statusCode}`, data.content, "top");
            console.log({ error })
        }
        await dispatch(HIDE_LOADING_TABLE_ACTION());
    }
}

export const themNguoiDungAction = (newUser) => {
    return async (dispatch) => {
        await dispatch(SHOW_LOADING_ACTION());
        try {
            let res = await quanLyNguoiDung.themNguoiDung(newUser);
            console.log({ res })
            if (res.data.statusCode === 200) {
                openNotificationWithIcon("success", "SUCCESS", res.data.message, "top");
                window.location.reload();
            }
        } catch (error) {
            let data = error.response.data;
            openNotificationWithIcon("error", data.message, data.content, "top");
        }
        await dispatch(HIDE_LOADING_ACTION());
    }
}
export const layDanhSachLoaiNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            let res = await quanLyNguoiDung.layDanhSachLoaiNguoiDung();
            if (res.data.statusCode === 200) {
                dispatch({
                    type: SET_LOAI_NGUOI_DUNG,
                    data: res.data.content
                })
            }
        } catch (error) {
            // console.log(error.response.data);
        }
    }
}
export const capNhatThongTinNguoiDungByAdminAction = (user)=>{
    return async(dispatch)=>{
        try{
            dispatch(SHOW_LOADING_ACTION());
            let res = await quanLyNguoiDung.capNhatThongTinNguoiDungByAdmin(user);
            if (res.data.statusCode === 200){
                openNotificationWithIcon("success","SUCCESS",res.data.message,"top");
                await dispatch(layThongTinTaiKhoanAction());
                console.log({history,user});
                history.goBack();
                
              
            }
        }catch(error){
            let data = error.response.data;
            openNotificationWithIcon("error","Error",data.message,"top");
        }
        dispatch(HIDE_LOADING_ACTION());
    }
}
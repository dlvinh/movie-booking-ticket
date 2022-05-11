import { useSelector } from "react-redux";
import { history } from "../../App";
import { quanLyNguoiDung } from "../../services/QuanLyNguoiDung"
import { openNotificationWithIcon } from "../../util/Notification/Notification";
import { TOKEN, USER_LOGIN, USER_SESSION } from "../../util/setting.js/config";
import { LOGIN, SAVE_THONG_TIN_TAI_KHOAN } from "./types/QuanLyNguoiDung";

export const dangNhapAction = (user) => {
    return async (dispatch) => {
        try {
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
                history.goBack();
            }
        } catch (error) {
            console.log("err", error);
            let { data } = error.response;
            openNotificationWithIcon("error", "Error", data.content, "top");
        }

    }
}

export const layThongTinTaiKhoanAction = () => {
    return async (dispatch) => {
        try {
            let response = await quanLyNguoiDung.layThongTinTaiKhoan();
            let { data, status } = response;
            if (status === 200){
                console.log("thongTinTaiKhoan",data.content);
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
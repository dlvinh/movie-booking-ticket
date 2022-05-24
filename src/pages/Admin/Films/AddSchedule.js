import React, { useEffect,useState } from 'react'
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Space,

} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from '../../../util/setting.js/config';
import { Select } from 'antd';
import { layThongTinCumRapTheoHeThongAction, layThongTinHeThongRap } from '../../../redux/actions/QuanLyRapActions';
import * as Yub from 'yup';
import { quanLyDatVe } from '../../../services/QuanlyDatVe';
import { openNotificationWithIcon } from '../../../util/Notification/Notification';
import { HIDE_LOADING_ACTION, SHOW_LOADING_ACTION } from '../../../redux/actions/LoadingAction,';
const { Option } = Select;
const { RangePicker } = DatePicker;
export default function AddSchedule(props) {
    console.log(props);
    const dispatch = useDispatch();
    const [rapChieuValue, setRapChieuValue] = useState(null)
    useEffect(() => {
        let action = layThongTinHeThongRap();
        dispatch(action);
    }, [])
    const heThongRapChieuArr = useSelector(state => state.QuanLyRapState.thongTinHeThongRapChieu);
    const thongTinCumRap = useSelector(state => state.QuanLyRapState.thongTinCumRap);
    const formik = useFormik({
        initialValues: {
            // cac fields API need
            maPhim: parseInt(props.propsRoute.match.params.id),
            maRap:"",
            ngayChieuGioChieu:"",
            giaVe:""
        },
        onSubmit:async (values)=>{
            dispatch(SHOW_LOADING_ACTION());
            try {
                let res = await quanLyDatVe.taoLichChieu(values);
                if (res.data.statusCode === 200){
                    openNotificationWithIcon("success",res.data.content,res.data.message,"top"); 
                    window.location.reload();
                }
            } catch (error) {
                let data = error.response.data;
                openNotificationWithIcon("error", data.content,data.message,"top")
            }
            dispatch(HIDE_LOADING_ACTION());
            // console.log("On submit value",values)
        },
        validate: (values)=>{
            const errors ={};
            // let schema = Yub.object().shape({
            //     heThongRapChieu: Yub.string().required(),
            //     rapChieu: Yub.string().required(),
            //     xuatChieu:Yub.string().required(),
            //     giaVe:Yub.number().required()
            //   });
            //   schema.validate(values).then((res)=>{
            //       console.log("validate",res)
            //   }).catch((err)=>{
            //     console.log("err",err)
            //   })

            if (!values.maRap){
                errors.maRap = "This field is required"
            }
            if (!values.xuatChieu){
                errors.xuatChieu = "This field is required"
            }
            if (!values.giaVe){
                errors.giaVe = "This field is required"
            }
            console.log("errors",errors);
            console.log("values",values);
            return errors;
        }
    })

    // DATEP PICKER
    const onOk = (value) => {
        console.log('onOk: ', value);
        console.log("onOkFormat",moment(value).format("DD/MM/YYYY hh:mm:ss"))
        formik.setFieldValue("ngayChieuGioChieu",moment(value).format("DD/MM/YYYY hh:mm:ss"))
    };
    const onDateChange = (value, dateString) => {
        // console.log('Selected Time: ', value);
        // console.log('Formatted Selected Time: ', dateString);
        // formik.setFieldValue("xuatChieu",dateString);
    };
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    };
    // const handleChangeDatePicker = (value) => {
    //     // console.log("datepicker",moment(value).format("DD/MM/YYYY"));
    //     console.log("value", value)
    //     // formik.setFieldValue("ngayKhoiChieu", moment(value).format("DD/MM/YYYY"));

    // }

    return (
        <div style={{ backgroundColor: 'white' }} className="px-20 py-10">
            <header className='text-2xl'>Add New Schedule</header>
            <div className='scheduel_form_container'>
                <Form
                    style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                    }}
                    size="default"
                    onSubmitCapture={formik.handleSubmit}

                >
                    <Form.Item label="Movie Name">
                        <Input disabled value={props.propsRoute.match.params.tenPhim}></Input>
                    </Form.Item>

                    <Form.Item label="He Thong Rap Chieu">
                        <Select
                        name="heThongRapChieu"
                            showSearch
                            placeholder="Chon He Thong Rap"
                            onChange={(value) => {
                                console.log("selected", value);
                                setRapChieuValue(null);
                                let action = layThongTinCumRapTheoHeThongAction(value);
                                dispatch(action);
                            }}
                        >
                            {heThongRapChieuArr?.map((item, index) => {
                                return <Option key={index} value={item.maHeThongRap}>{item.tenHeThongRap}</Option>
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Rap Chieu" required>
                        <Select
                        name="rapChieu"
                            value={rapChieuValue}
                            showSearch
                            placeholder="Chon Rap"
                            onChange={(value) => {
                                setRapChieuValue(value);
                                console.log("Rap Chieu", value);
                                formik.setFieldValue("maRap",value)
                            }}
                        >
                            {thongTinCumRap?.map((item, index) => {
                                return <Option key={index} value={item.maCumRap}>{item.tenCumRap}</Option>
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Xuat Chieu" required>
                        <Space direction="vertical" size={12}>
                            <DatePicker name='ngayChieuGioChieu' showTime disabledDate={disabledDate} format="DD/MM/YYYY hh:mm:ss"  onChange={onDateChange} onOk={onOk}  />

                        </Space>
                    </Form.Item>

                    <Form.Item label="Gia Ve" required>
                        <InputNumber name='giaVe' onChange={(e) => {
                            console.log("giave", e)
                            formik.setFieldValue("giaVe",e)
                        }} min="75000" step="200000" />
                    </Form.Item>
                    <div className='text-center'>
                        <Button className='w-1/4 rounded-md' type='primary' htmlType='submit'>Create</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

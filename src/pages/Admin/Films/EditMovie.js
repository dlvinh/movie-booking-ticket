import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinPhimAction, themPhimUploadHinhAction } from '../../../redux/actions/QuanLyPhimActions';
import _ from "lodash";
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { GROUPID } from '../../../util/setting.js/config';
export default function EditMovie(props) {
    const dispatch = useDispatch();
    const propsRoute = props.propsRoute;
    const { history, location, match } = propsRoute;
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimState);
    const {tenPhim,trailer,moTa,ngayKhoiChieu,dangChieu,sapChieu,hot,danhGia,hinhAnh,maNhom} = thongTinPhim;

    useEffect(() => {
        // lay thong tin phim theo param sau do store tren redux
        let action = layThongTinPhimAction(match.params.id);
        dispatch(action);
    }, [])

    const [imgSrc, setImgSrc] = useState(null)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            // cac fields API need
            tenPhim: tenPhim,
            trailer: trailer,
            moTa: moTa,
            ngayKhoiChieu: ngayKhoiChieu,
            dangChieu: dangChieu,
            sapChieu: sapChieu,
            hot: hot,
            danhGia: danhGia,
            hinhAnh: null, // vi ben BE se tu dong giu laii hinh anh cu khi gia tri edit la null
            maNhom: maNhom // hinh anh la mot du kieu dang file (object)
        },
        onSubmit: (values) => {
            console.log("value", values);
            // tao doi tuong form data" => nhu object form json
            // let formData = new FormData();
            // formData.append("tenPhim", formik.values.tenPhim);
            // console.log("tenPhimformDAta", formData.get())
            // let formData = new FormData();
            // formData.append("tenPhim", formik.values.tenPhim);
            // for (let key in values){
                
            //     if (key !== "hinhAnh"){
            //         formData.append(key,values[key]);
            //     }else{
            //         //tao form data cho object file
            //         // de tao form data cho fiile can co du 3 params, ban dau la dinh dang, sau la object file, va 3 la ten (ten bat ki)
            //         formData.append("File", values.hinhAnh, values.hinhAnh.name) // 
            //     }
            // }
            // //console.log("tenPhimformDAta", formData.get("File"))
            // // Send data to api
            // let action = themPhimUploadHinhAction(formData);
            // dispatch(action);
        }
    })
    const handleChangeDatePicker =(value)=>{
        // console.log("datepicker",moment(value).format("DD/MM/YYYY"));
         formik.setFieldValue("ngayKhoiChieu",moment(value).format("DD/MM/YYYY"));
     }
     // closure function technique
     const handlChangeSwitch =(name)=>{
         return (value)=>{
             formik.setFieldValue(name,value)
         }
     }
 
     // Xu ly upload image 
     const handleFileUpload = (e)=>{
         let file = e.target.files[0]; // lay file dau tien
         console.log("file",file);
         if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg"){
             let reader = new FileReader();
             reader.readAsDataURL(file);// tu file, reader se tao url cho file hinh anh theo dang base 64
             reader.onload = (e)=>{
                 //console.log(e.target.result) //
                 setImgSrc(e.target.result);
             }
             formik.setFieldValue("hinhAnh",file);
         }
         // tao doi tuogn de doc file 
        
 
     }
    return (
        <div className='bg-white m-4'>
            <h2 className='text-2xl'>Add New Movie</h2>
            <Form
                style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                size="default"
                onSubmitCapture={formik.handleSubmit}
            >

                <Form.Item label="Movie Name">
                    <Input name="tenPhim" id="tenPhim"
                        type="text"
                        onChange={formik.handleChange}
                        value = {formik.values.tenPhim}
                        />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" id='trailer'  onChange={formik.handleChange} type="text"  value = {formik.values.trailer} />
                </Form.Item>
                <Form.Item label="Description">
                    <Input name="moTa" id='moTa'  onChange={formik.handleChange} type="text"  value = {formik.values.moTa}/>
                </Form.Item>
                <Form.Item label="Released Date">
                    <DatePicker format="DD-MM-YYYY" name='ngayKhoiChieu' onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu, 'DD-MM-YYYY')}  />
                </Form.Item>
                <Form.Item label="On Theater" valuePropName="checked" >
                    <Switch name="dangChieu" onChange={handlChangeSwitch("dangChieu")} checked={formik.values.dangChieu}  />
                </Form.Item>
                <Form.Item label="Up Comming" valuePropName="checked">
                    <Switch name="sapChieu" onChange={handlChangeSwitch("sapChieu")} checked={formik.values.sapChieu}/>
                </Form.Item>
                <Form.Item label="Top Movie" valuePropName="checked">
                    <Switch name="hot" onChange={handlChangeSwitch("hot")}  checked={formik.values.hot}/>
                </Form.Item>
                <Form.Item label="Rating">
                    <InputNumber name='danhGia' onClick={(value)=>{
                        formik.setFieldValue("danhGia",value)
                    }} min="1" max='10' value = {formik.values.danhGia}/>
                </Form.Item>
                <Form.Item label="Image">
                    <input type="file" onChange={handleFileUpload} accept="image/png, image/gif, image/jpg , image/jpeg"/>
                    <br/>
                    <img width="150px" height="150px" src={imgSrc === null? thongTinPhim.hinhAnh: imgSrc} alt="..."/>
                </Form.Item>
                <div className='text-center'>
                    <Button className='w-1/4 rounded-md' type='primary' htmlType='submit'>Save</Button>
                </div>

            </Form>
        </div>
    )
}

import React, { useState } from 'react'
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
export default function AddNewMovie(props) {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState(null)
    const formik = useFormik({
        initialValues: {
            // cac fields API need
            tenPhim: "",
            trailer: "",
            moTa: "",
            ngayKhoiChieu: "",
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {} // hinh anh la mot du kieu dang file (object)
        },
        onSubmit: (values) => {
            console.log("value", values)
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
                    size: componentSize,
                }}
                size="default"
                onSubmitCapture={formik.handleSubmit}
            >

                <Form.Item label="Movie Name">
                    <Input name="tenPhim" id="tenPhim"
                        type="text"
                        onChange={formik.handleChange}
                        />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" id='trailer'  onChange={formik.handleChange} type="text" />
                </Form.Item>
                <Form.Item label="Description">
                    <Input name="moTa" id='moTa'  onChange={formik.handleChange} type="text" />
                </Form.Item>
                <Form.Item label="Released Date">
                    <DatePicker format={"DD/MM/YYYY"} name='ngayKhoiChieu' onChange={handleChangeDatePicker}/>
                </Form.Item>
                <Form.Item label="On Theater" valuePropName="checked" >
                    <Switch name="dangChieu" onChange={handlChangeSwitch("dangChieu")} />
                </Form.Item>
                <Form.Item label="Up Comming" valuePropName="checked">
                    <Switch name="sapChieu" onChange={handlChangeSwitch("sapChieu")} />
                </Form.Item>
                <Form.Item label="Top Movie" valuePropName="checked">
                    <Switch name="hot" onChange={handlChangeSwitch("hot")}  />
                </Form.Item>
                <Form.Item label="Rating">
                    <InputNumber name='danhGia' onClick={(value)=>{
                        formik.setFieldValue("danhGia",value)
                    }} min="1" max='10'/>
                </Form.Item>
                <Form.Item label="Image">
                    <input type="file" onChange={handleFileUpload} accept="image/png, image/jpeg, image/gif, image/jpg"/>
                    <br/>
                    <img width="150px" height="150px" src={imgSrc} alt="..."/>
                </Form.Item>
                <div className='text-center'>
                    <Button className='w-1/4 rounded-md' type='primary' htmlType='submit'>Save</Button>
                </div>

            </Form>
        </div>
    );
}

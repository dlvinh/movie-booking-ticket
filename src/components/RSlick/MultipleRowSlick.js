import React, { Component } from 'react';
import Slider from "react-slick";

import customSlick from "./MultipleRowSlickStyle.module.css"
import Film from '../Film/Film';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${customSlick["slick-next"]}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${customSlick["slick-prev"]}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}
export default class MultipleRowSlick extends Component {

    renderFilms() {
        return this.props.arrFilms?.map((film, index) => {
            return <div key={index} className={`${customSlick["width-item"]}`} style={{height:"100%",marginBottom:"30px"}}>
                <Film film={film}></Film>
            </div>
        })
    }
    render() {
        const settings = {
            className: "center variable-width",
            centerMode: true,
            infinite: true,
            height:500,
            slidesToShow: 3,
            speed: 500,
            rows: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            adaptiveHeight: false,
            responsive:[
                {
                    breakpoint: 1529,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                    }
                },
                {
                    breakpoint: 1280,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                    }
                },
                {
                    breakpoint: 780,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    }
                }
            ]
        };
        return (
            <div>
                <Slider {...settings}>
                    {this.renderFilms()}
                </Slider>
            </div>
        )
    }
}

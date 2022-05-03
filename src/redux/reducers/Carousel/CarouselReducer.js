import { DOMAIN } from "../../../util/setting.js/config";
import { SET_CAROUSEL } from "../../actions/types/CarouselType";

const stateDefault = {
    arrImg: [
        {
            "maBanner": 1,
            "maPhim": 1282,
            "hinhAnh": `${DOMAIN}/hinhanh/ban-tay-diet-quy.png`
        },
    ]
}

export const CarouselReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_CAROUSEL:{
            console.log("Reducer-set-carousel",action.data);
            state.arrImg = action.data;
            return {...state}
        }
        default: return { ...state };
    }
}
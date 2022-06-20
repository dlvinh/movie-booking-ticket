import { HIDE_ANIMATION, SHOW_ANIMATION } from "../../actions/types/AnimationType";

const stateDefault = false;

export const AnimationReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SHOW_ANIMATION:{

            console.log("show animation");
            state = true
            return state
        }
        case HIDE_ANIMATION:{
            console.log("hide animation");
            state = false
            return state
        }
        default: return state;
    }
}
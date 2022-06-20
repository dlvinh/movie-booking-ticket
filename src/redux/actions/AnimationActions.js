import { HIDE_ANIMATION, SHOW_ANIMATION } from "./types/AnimationType";

export function SHOW_ANIMATION_ACTION(){
    return {
        type: SHOW_ANIMATION,
    }
}
export function HIDE_ANIMATION_ACTION(){
    return {
        type:HIDE_ANIMATION,
    }
}
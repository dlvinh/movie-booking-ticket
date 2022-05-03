import { SET_COMMINGSOON_MOVIE, SET_CURRENT_MOVIE, SET_PHIM } from "../../actions/types/QuanLyPhimType";

const stateDefault = {
    DefaultarrFilm: [],
    arrFilms:[]
}

export const QuanLyPhimReducer = (state = stateDefault, action)=>{
    switch(action.type){
        case SET_PHIM: {
           // console.log("Setting-phim",action.data);
            const currentMovie = action.data.filter(movie => { return movie.sapChieu === true});
            state.arrFilms = currentMovie;
            state.DefaultarrFilm = action.data;
            return {...state};
        }
        case SET_CURRENT_MOVIE:{
           // console.log("Setting-currentMovie");
            const currentMovie = state.DefaultarrFilm.filter(movie => movie.sapChieu === true);
            state.arrFilms = currentMovie;
            return {...state};
        }
        case SET_COMMINGSOON_MOVIE:{
           // console.log("Setting-commingsoon");
            const commingsoon = state.DefaultarrFilm.filter(movie => movie.sapChieu === false);
            state.arrFilms = commingsoon
            return {...state};
        }
        default: return {...state};
    }
}
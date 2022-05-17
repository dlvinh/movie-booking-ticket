import { SET_COMMINGSOON_MOVIE, SET_CURRENT_MOVIE, SET_FILM_DETAIL, SET_PHIM, SET_THONG_TIN_PHIM } from "../../actions/types/QuanLyPhimType";

const stateDefault = {
    DefaultarrFilm: [],
    arrFilms:[],
    filmDetail:"",
    thongTinPhim:{}
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
        case SET_FILM_DETAIL:{
            state.filmDetail = action.data;
            return {...state};
        }
        case SET_THONG_TIN_PHIM:{
            console.log("Set thong tin phim....", action.data)
            state.thongTinPhim = action.data;
            return {...state};
        }
        
        default: return {...state};
    }
}
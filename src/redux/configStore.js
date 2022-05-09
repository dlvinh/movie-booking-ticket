import {applyMiddleware, combineReducers,createStore} from 'redux';
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducers/Carousel/CarouselReducer';
import { QuanlyDatVeReducer } from './reducers/QuanLyDatVe/QuanLyDatVeReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDung/QuanLyNguoiDungReducer';
import { QuanLyPhimReducer } from './reducers/QuanLyPhim/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRap/QuanLyRapReducer';

const rootReducer = combineReducers({
    // All states will be here
    CarouselState: CarouselReducer,
    QuanLyPhimState: QuanLyPhimReducer,
    QuanLyRapState: QuanLyRapReducer,
    QuanlyNguoiDungState : QuanLyNguoiDungReducer,
    QuanLyDatVeState: QuanlyDatVeReducer
})

// vi createStore is deprecated => replace with configureStore => recommened 
export const store = createStore(rootReducer, applyMiddleware(thunk))
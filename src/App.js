import './App.css';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import 'antd/dist/antd.css';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from './pages/Detail/Detail';
import Checkout from './pages/Checkout/Checkout';
// import CheckoutTemplate from './templates/HomeTemplate/CheckoutTemplate/CheckoutTemplate';
import { lazy, Suspense } from 'react';
import UserTemplate from './templates/UserTemplate/UserTemplate';
import { LoginTemplate } from './templates/LoginTemplate/LoginTemplate';
import LoadingAnimation from './util/Loading/LoadingAnimation';
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Films from './pages/Admin/Films/Films';
import AddNewMovie from './pages/Admin/Films/AddNewMovie';
import EditMovie from './pages/Admin/Films/EditMovie';

// Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import AddSchedule from './pages/Admin/Films/AddSchedule';
import UserManagement from './pages/Admin/UserManagement/UserManagement';

// NOTE: lazy load cua CheckoutTemplate this CheckoutTemplate can phai export default
const CheckoutTemplate = lazy(() => import("./templates/CheckoutTemplate/CheckoutTemplate"));
// DIEU HUONG CAC THANH CONG CU ROUTE TOI CAC PAGE KHAC
export const history = createBrowserHistory();


function App() {
  return (
    <div style={{height: "100%"}}>
<Router history={history}>
      <LoadingAnimation></LoadingAnimation>
      <Switch>
        {/* ROUTE TO HOME COMPONENT */}
        <HomeTemplate exact path="/" abc="restProps day ne" DestinationComponent={Home}></HomeTemplate>
        <HomeTemplate exact path="/home" abc="restProps day ne" DestinationComponent={Home}></HomeTemplate>
        {/* ADMIN */}
        <AdminTemplate exact path='/admin' DestinationComponent={Dashboard}></AdminTemplate>
        <AdminTemplate exact path='/admin/users' DestinationComponent={Dashboard} ></AdminTemplate>
        <AdminTemplate exact path='/admin/films' DestinationComponent={Films} ></AdminTemplate>
        <AdminTemplate exact path='/admin/films/addnewmovie' DestinationComponent={AddNewMovie} ></AdminTemplate>
        <AdminTemplate exact path='/admin/films/editmovie/:id' DestinationComponent={EditMovie}></AdminTemplate>
        <AdminTemplate exact path="/admin/films/addnewschedule/:id/:tenPhim" DestinationComponent={AddSchedule}></AdminTemplate>
        <AdminTemplate exact path="/admin/usermanagement" DestinationComponent={UserManagement}></AdminTemplate>
        {/* ROUTE TO CONTACT */}
        <HomeTemplate exact path='/contact' DestinationComponent={Contact}></HomeTemplate>

        {/* ROUTE TO NEWS */}
        <HomeTemplate exact path='/news' DestinationComponent={News}></HomeTemplate>

        {/* ROUTE TO MOVIE DETAIL BY MOVIE ID */}
        <HomeTemplate exact path='/detail/:id' DestinationComponent={Detail}></HomeTemplate>


        {/* ROUTE TO LOGIN */}
        <LoginTemplate exact path='/login' DestinationComponent={Login}></LoginTemplate>

        {/* ROUTE TO Register */}
        <LoginTemplate exact path='/register' DestinationComponent={Register}></LoginTemplate>

        {/* ROUTE TO CHECKOUT */}
        <Suspense fallback={<h1>LOADING...</h1>}>
          <CheckoutTemplate exact path='/checkout/:maLichChieu' DestinationComponent={Checkout} ></CheckoutTemplate>
        </Suspense>




      </Switch>

    </Router>
    </div>
    
  );
}

export default App;

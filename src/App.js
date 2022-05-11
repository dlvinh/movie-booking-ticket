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

// NOTE: lazy load cua CheckoutTemplate this CheckoutTemplate can phai export default
const CheckoutTemplate = lazy(() => import("./templates/CheckoutTemplate/CheckoutTemplate"));
// DIEU HUONG CAC THANH CONG CU ROUTE TOI CAC PAGE KHAC
export const history = createBrowserHistory();
function App() {
  return (
    
    <Router history={history}>
      <LoadingAnimation></LoadingAnimation>
      <Switch>
        {/* ROUTE TO HOME COMPONENT */}
        <HomeTemplate exact path="/" abc="restProps day ne" DestinationComponent={Home}></HomeTemplate>
        <HomeTemplate exact path="/home" abc="restProps day ne" DestinationComponent={Home}></HomeTemplate>

        {/* ROUTE TO CONTACT */}
        <HomeTemplate exact path='/contact' DestinationComponent={Contact}></HomeTemplate>

        {/* ROUTE TO NEWS */}
        <HomeTemplate exact path='/news' DestinationComponent={News}></HomeTemplate>

        {/* ROUTE TO MOVIE DETAIL BY MOVIE ID */}
        <HomeTemplate exact path='/detail/:id' DestinationComponent={Detail}></HomeTemplate>


        {/* ROUTE TO LOGIN */}
        <LoginTemplate exact path='/login' DestinationComponent={Login}></LoginTemplate>

        {/* ROUTE TO Resigter */}
        <Route exact path='/register'> <Register></Register></Route>

        {/* ROUTE TO CHECKOUT */}
        <Suspense fallback={<h1>LOADING...</h1>}>
          <CheckoutTemplate exact path='/checkout/:maLichChieu' DestinationComponent={Checkout} ></CheckoutTemplate>
        </Suspense>


      </Switch>

    </Router>
  );
}

export default App;

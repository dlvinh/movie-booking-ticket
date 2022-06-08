import React from 'react'
import { Route } from 'react-router-dom';
import CarouselLayout from './Layout/Carousel/CarouselLayout';
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';

// HOC componen is not offically a component but it actually template that it will accept an actual component as a props
export const HomeTemplate = (props)=> {
    // Destination se la main component se
    const {DestinationComponent,...resProps} = props 
   // console.log("propsHere",props);
  return ( 
    <Route {...resProps} render={(propsRoute)=>{
        // voi render ta moi co the render ra duoc DestinationComponent, if not ta khong the render compoent
        // propsRoute is option => propsRoute (thong thuong la history, map, location) duoc truyen cho Destination component as a props de chuyen huong trang
       // console.log("propsRoute",propsRoute); // let see what is it 
        return <React.Fragment>
           <Header></Header>
          
            {/* THIS IS DYNAMIC PART THAT can be changede according to the props that passed among  */}
            <DestinationComponent propsRoute={propsRoute}></DestinationComponent>
           <Footer></Footer>
        </React.Fragment>
    }}> 

    </Route>
  )
}

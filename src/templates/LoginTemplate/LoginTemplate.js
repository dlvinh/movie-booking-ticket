import React, { Fragment } from 'react'
import { Route } from 'react-router-dom';


export const LoginTemplate = (props) => {
    // Destination se la main component se
    const { DestinationComponent, ...resProps } = props;
    // if (!localStorage.getItem(USER_LOGIN)){
    //     return <Redirect to="/login"></Redirect>
    // }
    // console.log("propsHere",props);
    return (
        <Route {...resProps} render={(propsRoute) => {
            // voi render ta moi co the render ra duoc DestinationComponent, if not ta khong the render compoent
            // propsRoute is option => propsRoute (thong thuong la history, map, location) duoc truyen cho Destination component as a props de chuyen huong trang
           // console.log("propsRoute", propsRoute); // let see what is it 
            return <Fragment>        
                    {/* THIS IS DYNAMIC PART THAT can be changede according to the props that passed among  */}
                    <DestinationComponent propsRoute={propsRoute}></DestinationComponent>
            </Fragment>
        }}>
        </Route>
    )
}



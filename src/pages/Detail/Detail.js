import React from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'

export default function Detail(props) {
    return (
        <div style={{backgroundImage: `url(https://picsum.photos/1920/720)`}}>
                <CustomCard
                    effectColor="#FFF" // required
                    color="#14AEFF" // default color is white
                    blur={20} // default blur value is 10px
                    borderRadius={0} // default border radius value is 10px
                    style={{height:"720px"}}
                >
                    <h1>Hello</h1>
                    <p>This is an example</p>
                </CustomCard>

        </div>

    )
}

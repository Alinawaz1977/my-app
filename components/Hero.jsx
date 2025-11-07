import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import HeroBlog from './HeroBlog'

const Hero = () => {
    return (
        <div className='' >
            <Navbar />
            <div className='flex gap-2.5' >
                <Sidebar />
                <HeroBlog />
            </div>
        </div>
    )
}
export default Hero
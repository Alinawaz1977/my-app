import React from 'react'

const Navbar = () => {
    return (
        <div className='flex mx-4 my-3 border-b border-gray-300 pb-5 justify-between items-center' >
            <div className='flex gap-1 items-center' >
                <p className='text-[#7e39f2] text-4xl font-bold'>G</p>
                <p className='font-bold text-2xl' >Blog</p>
            </div>
            <input className='border rounded-full border-gray-500 w-1/2 px-2 py-1' type="text" placeholder='seach anything' />
            <div>
                <button className='px-5 py-1 rounded-full text-white bg-[#7e39f2] ' >Sign out</button>
            </div>
        </div>
    )
}
export default Navbar
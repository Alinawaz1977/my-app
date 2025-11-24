"use client"
import React from 'react'

const BlogPost = ({ image, title, logo, date, username }) => {
    return (
        <div className='flex gap-2' >

            <div className='border p-2 h-[322px] overflow-hidden w-[290px]  rounded-lg border-gray-300' >
                <div className='flex gap-3 pb-3 items-center' >
                    <img className='w-10 h-10 rounded-full object-top object-cover' src={logo} alt="logo" />
                    <p className='text-lg' >{username}</p>
                </div>
                <div>
                    <img className='rounded-lg w-full  h-40 object-cover' src={image} alt="blog image" />
                </div>
                <div className='mt-3' >
                    <div>
                        <div className='flex items-center gap-2' >
                            <div>
                                <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 13V15H6V13H8ZM13 13V15H11V13H13ZM18 13V15H16V13H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path></svg></div>
                            date here 2024</div>
                    </div>
                </div>
                <div className='font-medium text-md' >{title}</div>
            </div>
        </div>
    )
}
export default BlogPost
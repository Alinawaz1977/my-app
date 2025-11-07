import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-[20vw] pl-3 h-screen ' >
      <div className='flex items-center gap-1.5' >
        <p className='w-7' ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="  "><path d="M13 19H19V9.97815L12 4.53371L5 9.97815V19H11V13H13V19ZM21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20Z"></path></svg></p>
        <p>Home</p>
      </div>
      <div className='mt-10' >
        <p className='font-bold text-gray-400' >Category</p>
        <div className='flex flex-col gap-2' >
          <Link href={"/category/travelblog"} className='flex items-center gap-2 mt-3 ' >
            <div className='border border-gray-600 w-3 rounded-full h-3' ></div>
            <div>travel blog</div>
          </Link>
          <div className='flex items-center gap-2 mt-3 ' >
            <div className='border border-gray-600 w-3 rounded-full h-3' ></div>
            <div>travel blog</div>
          </div>
          <div className='flex items-center gap-2 mt-3 ' >
            <div className='border border-gray-600 w-3 rounded-full h-3' ></div>
            <div>travel blog</div>
          </div>
          <div className='flex items-center gap-2 mt-3 ' >
            <div className='border border-gray-600 w-3 rounded-full h-3' ></div>
            <div>travel blog</div>
          </div>
          <div className='flex items-center gap-2 mt-3 ' >
            <div className='border border-gray-600 w-3 rounded-full h-3' ></div>
            <div>travel blog</div>
          </div>
          <div className='flex items-center gap-2 mt-3 ' >
            <div className='border border-gray-600 w-3 rounded-full h-3' ></div>
            <div>travel blog</div>
          </div>
          <div className='flex items-center gap-2 mt-3 ' >
            <div className='border border-gray-600 w-3 rounded-full h-3' ></div>
            <div>travel blog</div>
          </div>
          <div className='flex items-center gap-2 mt-3 ' >
            <div className='border border-gray-600 w-3 rounded-full h-3' ></div>
            <div>travel blog</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
"use client"
import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const Sidebar = () => {
  const { token, blogLists, allCategories } = useContext(AppContext)
  const router = useRouter()

  return (
    <div className='w-[20vw] hidden md:block pl-3 h-screen ' >
      <div className='flex flex-col' >
        <div className='flex items-center gap-1.5' >
          <p className='w-7' ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="  "><path d="M13 19H19V9.97815L12 4.53371L5 9.97815V19H11V13H13V19ZM21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20Z"></path></svg></p>
          <p onClick={() => {
            router.push("/")
          }} >Home</p>
        </div>
        <div>
          {token ? <div onClick={() => {
            router.push("/user/blogs")
          }} className='flex flex-col' >
            <div className='flex gap-1.5' >
              <div className='w-7' >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9.00886C3 5.69022 5.69071 2.99951 9.00935 2.99951H12C15.3093 2.99951 17.9942 5.67508 18.0093 8.98082H18.9533C20.1037 8.98082 21 9.87713 21 11.0275V14.9902C21 18.3088 18.3093 20.9995 14.9907 20.9995H9.00935C5.69071 20.9995 3 18.3088 3 14.9902V9.00886ZM9.00935 4.99951C6.79528 4.99951 5 6.79479 5 9.00886V14.9902C5 17.2042 6.79528 18.9995 9.00935 18.9995H14.9907C17.2047 18.9995 19 17.2042 19 14.9902V11H18C16.9243 11 16 10.0756 16 9C16 6.78593 14.2141 4.99951 12 4.99951H9.00935ZM8 9C8 8.44772 8.44772 8 9 8H12.5C13.0523 8 13.5 8.44772 13.5 9C13.5 9.55228 13.0523 10 12.5 10H9C8.44772 10 8 9.55228 8 9ZM9 14C8.44772 14 8 14.4477 8 15C8 15.5523 8.44772 16 9 16H15C15.5523 16 16 15.5523 16 15C16 14.4477 15.5523 14 15 14H9Z"></path></svg>
              </div>
              <p>blogs</p>
            </div>
          </div> : null
          }
        </div>
      </div>
      <div className='mt-10' >
        <p className='font-medium ' >Category</p>
        <div className='h-[70vh]  overflow-scroll' >
          {
            allCategories.map((item) => (
              <div onClick={() => { router.push(`/category/${item}`) }} className='flex items-center gap-2' >
                <div className='h-2 w-2 border border-black rounded-full' ></div>
                <p>{item} blogs</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar
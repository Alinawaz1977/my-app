"use client"
import React, { useContext, useEffect, useState } from 'react'
import BlogPost from './BlogPost'
import { AppContext } from '@/context/AppContext'
import { Router } from 'next/navigation'
import { useRouter } from 'next/navigation'
import animationData from "@/public/Insider-loading.json"
import Lottie from 'lottie-react'
import Link from 'next/link'

const HeroBlog = () => {
  const { blogLists, searchValue } = useContext(AppContext)
  const router = useRouter()
  const [searchedBlogs, setsearchedBlogs] = useState([])

  const fetchSearchedBlogs = () => {
    const searchingBlogs = blogLists.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    setsearchedBlogs(searchingBlogs)
  }

  useEffect(() => {
    fetchSearchedBlogs()
  }, [blogLists, searchValue])

  if (!blogLists) {
    return <div className='flex  justify-center items-center w-full h-screen' >
      <Lottie className='w-50' animationData={animationData} loop={true} />
    </div>
  }

  return (
    <div className='w-full justify-center md:justify-normal  md:w-[75vw] flex flex-wrap overflow-scroll gap-3 h-[83vh]' >
      {
        searchedBlogs ? searchedBlogs.map((item, index) => (
          <Link href={`blog/${item._id}`}
            key={index} >
            <BlogPost image={item.featuredImage} username={item.userData.username} logo={item.userData.profilePic} date={item.date} title={item.title} />
          </Link>
        )) : blogLists.map((item, index) => (
          <Link href={`blog/${item._id}`}
         className=' h-fit w-fit ' key={index} >
            <BlogPost date={item?.date} username={item?.userData?.username} logo={item.userData?.profilePic} image={item.featuredImage} title={item.title} />
          </Link>
        ))
      }
    </div>
  )
}

export default HeroBlog
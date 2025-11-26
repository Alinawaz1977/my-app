"use client"
import React, { useContext, useEffect, useState } from 'react'
import BlogPost from './BlogPost'
import { AppContext } from '@/context/AppContext'
import { Router } from 'next/navigation'
import { useRouter } from 'next/navigation'

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
    return <div className='flex justify-center items-center w-full h-screen' > <p>Nothing blogs to show</p></div>
  }

  return (
    <div className='w-full justify-center md:justify-normal  md:w-[75vw] flex flex-wrap overflow-scroll gap-3 h-[83vh]' >
      {
        searchedBlogs ? searchedBlogs.map((item, index) => (
          <div onClick={() => {
            router.push(`blog/${item._id}`)
          }}
            key={index} >
            <BlogPost image={item.featuredImage} username={item.userData.username} logo={item.userData.profilePic} date={item.date} title={item.title} />
          </div>
        )) : blogLists.map((item, index) => (
          <div onClick={() => {
            router.push(`blog/${item._id}`)
          }} className=' h-fit w-fit ' key={index} >
            <BlogPost date={item?.date} username={item?.userData?.username} logo={item.userData?.profilePic} image={item.featuredImage} title={item.title} />
          </div>
        ))
      }
    </div>
  )
}

export default HeroBlog
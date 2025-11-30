"use client"
import BlogPost from '@/components/BlogPost'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { AppContext } from '@/context/AppContext'
import Lottie from 'lottie-react'
import { useParams } from 'next/navigation'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import animationData from "@/public/Insider-loading.json"
import Link from 'next/link'

const page = () => {
  const { blogLists } = useContext(AppContext)

  const [categoryBlog, setcategoryBlog] = useState([])

  const params = useParams()

  const findCategoryBlog = () => {
    const categoryBlogs = blogLists.filter((item) => item.category.toLowerCase()==params.slug.toLowerCase())
    setcategoryBlog(categoryBlogs)
  }
  useEffect(() => {
    findCategoryBlog()
  }, [blogLists])

  if(!findCategoryBlog){
    return <div className='flex justify-center items-center h-screen w-full' >
      <Lottie animationData={animationData} loop={true} />
    </div>
  }

  return (
    <div>
      <Navbar />
      <div className='flex' >
        <Sidebar />
        <div className='w-[75vw] flex flex-wrap overflow-scroll gap-3 h-[83vh]' >
          {
            categoryBlog.map((item, index) => (
              <Link href={`/blog/${item._id}`} key={index}>
                <BlogPost title={item.title} username={item.userData.username} image={item.featuredImage} logo={item.userData.profilePic} />
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default page
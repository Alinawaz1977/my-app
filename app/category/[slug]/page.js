"use client"
import BlogPost from '@/components/BlogPost'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { AppContext } from '@/context/AppContext'
import { useParams } from 'next/navigation'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'

const page = () => {
  const { blogLists } = useContext(AppContext)
  console.log(blogLists);

  const [categoryBlog, setcategoryBlog] = useState([])
  console.log(categoryBlog);

  const params = useParams()

  const findCategoryBlog = () => {
    const categoryBlogs = blogLists.filter((item) => item.category.toLowerCase()==params.slug.toLowerCase())
    setcategoryBlog(categoryBlogs)
    console.log(params.slug);

  }
  useEffect(() => {
    findCategoryBlog()
  }, [blogLists])

  return (
    <div>
      <Navbar />
      <div className='flex' >
        <Sidebar />
        <div className='w-[75vw] flex flex-wrap overflow-scroll gap-3 h-[83vh]' >
          {
            categoryBlog.map((item, index) => (
              <div key={index}>
                <BlogPost title={item.title} username={item.userData.username} image={item.featuredImage} logo={item.userData.profilePic} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default page
"use client"
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  const { token, blogLists, fetchBlogData } = useContext(AppContext)
  const router = useRouter()
  const [userBlogs, setuserBlogs] = useState([])


  const fetchUserBlogs = async () => {
    try {
      const response = await axios.post("/api/userBlogs", {}, { headers: { token: token } })
      if (response.data.success) {
        setuserBlogs(response.data.userBlogs)
      } else {
        toast.error(response.data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  const deletedBlog = async (id) => {
    try {
      const response = await axios.post("/api/userDeleteBlog", { blogId: id }, { headers: { token: token } })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchBlogData()
        fetchUserBlogs()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!token) return
    fetchUserBlogs()
  }, [token])

  return token ? (
    <div>
      <Navbar />
      <div className='flex' >
        <Sidebar />
        <div className='w-full border mx-5 md:mx-0 h-[80vh] overflow-scroll border-gray-300 md:w-[70vw]' >
          <div className='my-4 ' >
      <Link href={"/user/addblog"} className='text-white px-3 py-1 rounded-md  bg-[#7e39f2] mx-2 roundedmd' >Add blog</Link>
          </div>
          <div className='grid font-medium bg-gray-300 py-3 text-center px-2 grid-cols-5' >
            <p>Author</p>
            <p className='' >Title</p>
            <p>Category</p>
            <p>Date</p>
            <p>Actions</p>
          </div>
          {
            userBlogs.map((item, index) => (
              <div key={index} className='grid border-b h-8 text-center overflow-hidden border-gray-300 py-1 px-2 grid-cols-5' >
                <p>{item.userData.username}</p>
                <p className='' >{item.title}</p>
                <p>{item.category}</p>
                <p>2025</p>
                <div className='flex gap-3 justify-center'>
                  <div onClick={() => {
                    router.push(`/user/edit/${item._id}`)
                  }} >
                    <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg>
                  </div>
                  <div onClick={() => deletedBlog(item._id)} >
                    <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
    : router.push("/login")
}

export default page
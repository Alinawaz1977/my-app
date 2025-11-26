"use client"
import React, { useContext } from 'react'
import Sidebar from './Sidebar'
import RelatedBlogs from './RelatedBlogs'
import Image from 'next/image'
import Comment from './Comment'
import Navbar from './Navbar'
import ShowComment from './ShowComment'
import { useState } from 'react'
import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const BlogPage = ({ title, relatedBlogs, likes, blogComments, blogId, bloggerName, blogContent, featuredImage, userLogo, blogDate, }) => {
  const { token, fetchBlogData } = useContext(AppContext)
  const localDate = new Date(blogDate).toLocaleDateString()
  const [liked, setliked] = useState(false)

  // const [likes, setlikes] = useState('')


  const likeFun = async (blogId) => {
    try {
      const response = await axios.post("/api/userLike", { blogId: blogId }, { headers: { token: token } })
      if (response.data.success) {
        const likes = response.data.blog.like
        if (likes.includes(response.data.userId)) {
          setliked(true)
        } else {
          setliked(false)
        }
        fetchBlogData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <Navbar />
      <div className='flex gap-1.5' >
        <Sidebar />
        <div className=' w-full md:w-[50vw] overflow-scroll h-screen border px-4 mb-10   pb-5 pt-3 border-gray-300 min-h-screen ' >
          <p className='text-2xl font-medium' >
            {title}
          </p>
          <div className='flex justify-between items-center  w-full' >
            <div className='flex  w-fit gap-2 items-center' >
              <Image width={100} height={100} className='object-cover object-top rounded-full w-10 h-10' src={userLogo} alt='usreprofilePic' />
              <div className='' >
                <p className='font-medium' >{bloggerName}</p>
                <p className='text-[14px]' >{localDate}</p>
              </div>
            </div>
            <div onClick={() => likeFun(blogId)} className='flex items-center' >
              {liked ? <span className='flex flex-col items-center' ><svg className='w-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(245,14,14,1)"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>{likes}</span> : <span className='flex flex-col items-center' ><svg className='w-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path></svg>{likes}</span>}
            </div>
          </div>
          <div className='' >
            <Image width={500} height={550} src={featuredImage} alt='featuredImage'
              className='w-full md:w-[50vw] object-contain rounded-md my-2'
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: blogContent }} >

          </div>
          <div>
            <Comment blogId={blogId} />
          </div>
          <div className='' >
            {
              blogComments.map((item, index) => (
                <div key={index} >
                  <ShowComment commentDate={item.date} commentUserLogo={item.userId.profilePic} comment={item.comment} commentUserName={item.userId.username} />
                </div>
              ))
            }
          </div>
        </div>
        <div className=' h-fit pb-2 w-full hidden md:block md:w-[25vw] border border-gray-300 rounded-md px-2' >
          <p className='text-2xl text-center text-black font-medium' >Related Blogs</p>
          <div className=' mt-2 ' >
            {relatedBlogs.map((item, index) => (
              <div key={index} >
                <RelatedBlogs id={item._id} RelatedBlogFeaturedImage={item.featuredImage} RelatedBlogTitle={item.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPage
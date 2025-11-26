"use client"
import BlogPage from '@/components/BlogPage'
import BlogPost from '@/components/BlogPost'
import { AppContext } from '@/context/AppContext'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import React, { useContext } from 'react'

const page = () => {
  const { blogLists, allComments } = useContext(AppContext)
  const params = useParams()
  const [blog, setBlog] = useState(null)

  const [relatedBlogs, setrelatedBlogs] = useState([])
  const [blogComments, setblogComments] = useState([])


  useEffect(() => {
    if (blogLists && params.slug) {
      const foundBlog = blogLists.find((item) => item._id === params.slug);
      setBlog(foundBlog);
    }
  }, [blogLists, params.slug]);
  const findingRelatedBlogs = () => {
    const relatedBlogs = blogLists.filter((item) => item.category === blog?.category)
    setrelatedBlogs(relatedBlogs)
  }

  const fetchBlogComments = () => {
    const currentBlogComments = allComments.filter((item) => item.blogId == blog?._id)
    setblogComments(currentBlogComments)
  }

  useEffect(() => {
    findingRelatedBlogs()
  }, [blog])

  useEffect(() => {
    fetchBlogComments()
  }, [allComments, blog])


  if (!blog) {
    return <div>Loading...</div>; // handle null state
  }

  return (
    <div>
      <BlogPage likes={blog.like.length} title={blog.title} blogComments={blogComments} relatedBlogs={relatedBlogs} blogId={blog._id} blogContent={blog.content} bloggerName={blog.userData?.username} featuredImage={blog.featuredImage} blogDate={blog.date} userLogo={blog.userData.profilePic} />
    </div>
  )
}

export default page
import React from 'react'
import Sidebar from './Sidebar'
import RelatedBlogs from './RelatedBlogs'
import Image from 'next/image'
import Comment from './Comment'
import Navbar from './Navbar'
import ShowComment from './ShowComment'

const BlogPage = ({ title, relatedBlogs,blogComments, blogId, bloggerName, blogContent, featuredImage, userLogo, blogDate, }) => {
  return (
    <>
      <Navbar />
      <div className='flex gap-1.5' >
        <Sidebar />
        <div className=' w-full md:w-[50vw] overflow-scroll h-screen border px-4 mb-10   pb-5 pt-3 border-gray-300 min-h-screen ' >
          <p className='text-2xl font-medium' >
            {title}
          </p>
          <div className='flex  gap-2 items-center' >
            <Image width={100} height={100} className='object-cover object-top rounded-full w-10 h-10' src={userLogo} alt='usreprofilePic' />
            <div className='' >
              <p className='font-medium' >{bloggerName}</p>
              <p className='text-[14px]' >{blogDate}</p>
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
            <Comment  blogId={blogId} />
          </div>
          <div className='' >
            {
              blogComments.map((item, index) => (
                <div key={index} >
                  <ShowComment commentUserLogo={item.userId.profilePic} comment={item.comment} commentUserName={item.userId.username} />
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
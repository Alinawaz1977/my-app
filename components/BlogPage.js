import React from 'react'
import Sidebar from './Sidebar'

const BlogPage = ({title,content}) => {
  return (
    <div className='flex ' >
      <Sidebar />
      <div className='w-[50vw] min-h-screen bg-blue-800' >

      </div>
      <div className='w-[20vw] bg-green-800 min-h-[20vh]' >

      </div>
    </div>
  )
}

export default BlogPage
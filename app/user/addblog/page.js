import AddBlog from '@/components/AddBlog'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <>
      <Navbar />
      <div className='flex gap-3' >
        <Sidebar />
        <AddBlog />
      </div>
    </>
  )
}

export default page
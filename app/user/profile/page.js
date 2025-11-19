import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import UpdateProfile from '@/components/UpdateProfile'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen overflow-hidden' >
      <Navbar />
      <div className='flex gap-20' >
        <Sidebar />
        <UpdateProfile />
      </div>
    </div>
  )
}

export default page
"use client"
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import UpdateProfile from '@/components/UpdateProfile'
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const {token}=useContext(AppContext)
  const router=useRouter()
  return token? (
    <div className='h-screen overflow-hidden' >
      <Navbar />
      <div className='flex gap-20' >
        <Sidebar />
        <UpdateProfile />
      </div>
    </div>
  ):router.push("/login")
}

export default page
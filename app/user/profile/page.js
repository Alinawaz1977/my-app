"use client"
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import UpdateProfile from '@/components/UpdateProfile'
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AppContext } from '@/context/AppContext'

const page = () => {
  const { token } = useContext(AppContext)
  const router = useRouter()
  return token ? (
    <div className='h-screen overflow-hidden' >
      <Navbar />
      <div className='flex gap-20' >
        <Sidebar />
        <UpdateProfile />
      </div>
    </div>
  ) : router.push("/login")
}

export default page
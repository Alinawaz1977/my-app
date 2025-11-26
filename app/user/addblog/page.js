"use client"
import AddBlog from '@/components/AddBlog'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const page = () => {
  const {token}=useContext(AppContext)
  const router=useRouter()
  return token? (
    <>
      <Navbar />
      <div className='flex gap-3' >
        <Sidebar />
        <AddBlog />
      </div>
    </>
  ):router.push("/login")
}

export default page
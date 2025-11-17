"use client"
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import react, { useContext, useState } from 'react'
const Navbar = () => {
    const router = useRouter()
    const { token, settoken } = useContext(AppContext)
    const [visible, setvisible] = useState(false)
    return (
        <div className='flex mx-4 my-3 border-b border-gray-300 pb-5 justify-between items-center' >
            <div className='flex gap-1 items-center' >
                <p className='text-[#7e39f2] text-4xl font-bold'>G</p>
                <p className='font-bold text-2xl' >Blog</p>
            </div>
            <input className='border rounded-full border-gray-500 w-1/2 px-2 py-1' type="text" placeholder='seach anything' />
            <div onClick={() => setvisible(!visible)}>
                {token ? <div className='h-10 w-10 rounded-full bg-amber-950 relative' >
                    {visible ?
                        <div className='h-30 w-40 rounded-md flex flex-col justify-center items-center bg-gray-300 absolute left-[-120px] bottom-[-120px]' >
                            <h1 onClick={()=>{
                                localStorage.removeItem("token")
                                router.push("/login")
                            }
                            } >log out</h1>
                            <h1>home</h1>
                            <h1>home</h1>
                        </div>
                        : null}
                </div> : <button onClick={() => router.push("/login")} className='px-5 py-1 rounded-full text-white bg-[#7e39f2] ' >Log In</button>}
            </div>
        </div>
    )
}
export default Navbar
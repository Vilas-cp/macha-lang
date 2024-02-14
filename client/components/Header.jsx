"use client"
import React from 'react'
import {useRouter,redirect} from 'next/navigation'

const Header = () => {
    let router=useRouter();
  return (
    <header className='fixed bg-white h-[60px] w-full z-10 shadow-2xl px-9'>
      <nav className='flex justify-between items-center p-4'>
        <div className='flex justify-between items-center'>
      <div className='font-extrabold text-2xl'>ಮಚ್ಚಾ ಲ್ಯಾಂಗ್</div>
      <div className='flex justify-between pl-[50px] gap-[40px]'>
      <div onClick={()=>router.push("/")} className='hover:cursor-pointer'>Home</div>
      <div onClick={()=>router.push("Docs")} className='cursor-pointer'>Docs</div>
      <div onClick={() => router.push("/Editor")} className='cursor-pointer'>Code Editor</div>
      <div onClick={()=>router.push("Aboutus")} className='cursor-pointer'>About us</div>
      </div>
      </div>
      <div>
      <div className='flex justify-between '>
        <button className='mr-2 bg-[#04AA6D] rounded-3xl h-[30px] w-[70px] text-white'>Sign up</button>
        <button className='active:bg-green-500 hover:rounded-3xl '>Sign in</button>
      </div>
      </div>
        </nav>
    </header>
  )
}

export default Header


import React from 'react'

const Footer = () => {
   
  return (
    <footer className='text-white '>
        <div className='p-[70px] flex flex-col lg:flex-row lg:justify-between justify-center items-center text-center
            bg-[#1f1f1f] '>
            <div className='flex flex-col gap-6'>
            <h1 className='font-extrabold text-2xl '>Machalang.lang</h1>
            <div className='flex justify-between items-center  '>
            <img className='invert' src='	https://cdn-icons-png.flaticon.com/128/5968/5968830.png' width={30} />
            <img className='invert' src=' 	https://cdn-icons-png.flaticon.com/128/1384/1384014.png' width={35} />
            <img className='invert' src='	https://cdn-icons-png.flaticon.com/128/1384/1384031.png' width={32} />
            <img className='invert' src='	https://cdn-icons-png.flaticon.com/128/5968/5968968.png' width={33} />
            </div>
            <h1 className='font-extrabold text-2xl text-yellow-200 hover:underline font-sans'>Give Feedback</h1>
           <div className='flex justify-center items-center text-center lg:hidden'><p className='font-light '>BGS College of Engineering And Technology 
                    <br></br>
                Mahalakshmi Layout 
                <br></br>
                Banglore
                <br></br>
                +91 9876543210</p></div>
            <h1 className='text-xs text-gray-400'>© MachaLang 2024</h1>
            </div>
            <div className='hidden  lg:flex flex-col gap-4'>
                <p className='font-light '>BGS College of Engineering And Technology 
                    <br></br>
                Mahalakshmi Layout 
                <br></br>
                Banglore
                <br></br>
                +91 9876543210
                <br></br>
                <span className='text-xl font-bold'>Contact Us</span>
                <br></br>
                +91 1234567890
                </p>
            </div>
        </div>
        
    </footer>
  )
}

export default Footer
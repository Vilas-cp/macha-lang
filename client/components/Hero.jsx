"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  let router=useRouter();
    return (
    <div className='text-black pt-[60px] '>
        <div className='w-full h-[500px] bg-[#282A35!important] 
        flex items-center justify-center flex-col gap-[30px]'>
            <div className='font-extrabold text-[75px] text-white'>
            <TypeAnimation
      sequence={[
        
        'ಮಚ್ಚ ಲ್ಯಾಂಗ್',
        1000,

        'Macha  Lang',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '.6em', display: 'inline-block' }}
      repeat={Infinity}
    />
            </div>
            <div className='text-[#FFF4A3!important] font-bold text-[25px] hidden lg:block'>ಕರ್ನಾಟಕದಲ್ಲಿ  ಕನ್ನಡಿಗನೇ ಸಾರ್ವಭೌಮ</div>
            <div className='text-[#FFF4A3!important] font-bold text-[25px] lg:hidden text-center'>   ಕರ್ನಾಟಕದಲ್ಲಿ  <br></br>ಕನ್ನಡಿಗನೇ ಸಾರ್ವಭೌಮ</div>
            <button className='bg-[#04AA6D] h-[35px] rounded-3xl w-[250px] text-white font-semibold hover:bg-[#028555]' onClick={()=>router.push("Docs")}>ಕಲಿಯಿರಿ  -&gt;</button>
            
            </div>
    <div className='lg:w-full  h-[500px] bg-[#D9EEE1!important]'>
        <div className='flex flex-col lg:flex-row justify-center items-center pt-[90px] lg:gap-[40px] gap-[40px] '>
            <div>
                <div className='lg:text-[60px] text-[40px] font-bold pb-4'>About lang</div>
        <div className='text-xl font-semibold'>The language for kannadigas</div>
        <div>"code in your regional language"</div>
        </div>
    <div className="flex justify-center lg:w-[400px] w-64 mr-4 lg:mr-1">
      <div className="bg-[#E7E9EB] flex flex-col pl-6 gap-[15px] pb-3 w-[100vh] pr-6 shadow-2xl ">
        <div className="font-semibold text-[30px] pt-2">Example</div>
        <div className="bg-white font-mono font-semi ">
        <span>
        <br/>idu a = 10;<br/>idu b = 15;<br/>
        </span>
        </div>
        <div className="bg-[#04AA6D!important] w-[150px] h-[5vh] flex items-center justify-center rounded-lg font-semibold text-white">Try it yourself -&gt;</div>
      </div>
    </div>
    </div>
    </div>
    
    <div className='w-full h-[500px] bg-[#FFF4A3!important]'></div>
    </div>
  )
}

export default Hero
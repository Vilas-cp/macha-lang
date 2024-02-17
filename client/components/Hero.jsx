"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { TypeAnimation } from 'react-type-animation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Image} from "@nextui-org/react";


  

const Hero = () => {
  let router=useRouter();
  const result = ["https://static.toiimg.com/thumb/msid-70064013,width-400,resizemode-4/70064013.jpg",
  "https://images.livemint.com/rf/Image-621x414/LiveMint/Period1/2015/02/09/Photos/schoolinternet-kejB--621x414@LiveMint.jpg",
  "https://dtnext-prod.s3.ap-south-1.amazonaws.com/imported/import/Articles/2021/Mar/202103012321191832_Computerbased-test-likely-for-classes-911-in-schools_SECVPF.gif",
  "https://images.edexlive.com/uploads/user/imagelibrary/2022/11/8/original/13BG01_14-07-2012_20_0_2_11543236.jpg",
  "https://www.gmhs40a.in/wp-content/uploads/2022/04/DSC_5220.jpg"].map((i, index) => {
    return <SwiperSlide>
     <img key={index} src={i} alt="" width={550} />    
    </SwiperSlide>;
  })
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
    
    <div className='w-full h-[700px] bg-[#FFF4A3!important]'>
    <h1 className='pt-[20px] px-[40px] text-[60px] font-bold'>
          Isuue
        </h1>
        <div className='flex justify-center items-center  h-fit pt-[40px] gap-[20px] '>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper w-[60vh] mr-0 pr-0">
            {result}
          </Swiper>
          <div className='font-semi w-[800px] pr-[100px] text-xl'>
          Rural schools may lack adequate English language learning materials such as textbooks,
           workbooks, and audiovisual aids. Without these resources,
           children may struggle to develop their English language skills effectively. 
           Rural areas often experience shortages of qualified English language teachers. As a result, children may not receive the necessary 
           instruction and support to improve their English proficiency.
           Unlike urban areas where exposure to English through media, social interactions, 
           and cultural events is more prevalent, rural communities may offer fewer opportunities for immersion in the language. 
           This lack of exposure can hinder children's language acquisition and fluency.
           In some rural communities, there may be a stronger emphasis on local languages or 
           dialects, with less importance placed on learning English. Cultural attitudes towards English learning may vary, and some 
           families may not prioritize investing time and resources in English language education.
          </div>
        </div>

    </div>
    </div>
  )
}

export default Hero
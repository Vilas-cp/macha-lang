"use client";
import React from "react";
import { useRouter, redirect } from "next/navigation";
import confetti from 'canvas-confetti';
import {  Menu, MenuItem,MenuButton, MenuList, Button, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Header = () => {
  let router = useRouter();
  const handleConfetti = () => {
    confetti();
  };

  return (
    <header className="lg:fixed lg:flex-none bg-white lg:h-[60px] lg:w-full lg:z-10 lg:shadow-2xl lg:px-9  fixed ">
      <nav className="flex justify-between items-center p-4">
        <div className="flex justify-between items-center whitespace-pre-wrap break-words ">
          <div className="font-extrabold text-2xl" onClick={handleConfetti}>ಮಚ್ಚಾ ಲ್ಯಾಂಗ್</div>
          <div className="flex justify-between pl-[22px] gap-[40px]">
          <div className="lg:hidden  z-50  bg-slate-200 rounded-md p-2  mb-5 mr-2">
            <Menu  >
      <MenuButton as={IconButton} colorScheme="blue"  
            >
  <HamburgerIcon/>
       
      </MenuButton>
      <MenuList bg="#f5f5f5">
   
        <MenuItem onClick={() => router.push("/Docs")}> Docs</MenuItem>
        <MenuItem onClick={() => router.push("/Editor")}> Code Editor</MenuItem>
        <MenuItem onClick={() => router.push("/Aboutus")}> About us</MenuItem>
        <MenuItem onClick={() => router.push("/LiveClass")}> Live Class</MenuItem>
        <MenuItem onClick={() => router.push("/AdvancePrograms")}> AdvancePrgrams</MenuItem>
      </MenuList>
    </Menu>
            </div>
       
            <div
              onClick={() => router.push("/")}
              className=" lg:hover:cursor-pointer hidden lg:block"
            >
              Home
            </div>
            <div onClick={() => router.push("Docs")} className="cursor-pointer hidden lg:block">
              Docs
            </div>
            <div
              onClick={() => router.push("/Editor")}
              className="cursor-pointer hidden lg:block"
            >
              Code Editor
            </div>
            <div
              onClick={() => router.push("/Aboutus")}
              className="cursor-pointer hidden lg:block"
            >
              About us
            </div>
            <div
              onClick={() => router.push("/AdvancePrograms")}
              className="cursor-pointer hidden lg:block"
            >
              AdvancePrograms
            </div>
            <div
              onClick={() => router.push("/LiveClass")}
              className="cursor-pointer mt-3 lg:mt-0 "
            >
              <a className="cursor-pointer hidden md:block">
                <img
                  src="https://img.icons8.com/?size=100&id=3651&format=png"
                  width={25}
                />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between ">
            <button className="mr-2 bg-[#04AA6D] rounded-3xl h-[30px] w-[70px] text-white hidden lg:block">
              Sign up
            </button>
            <button className="active:bg-green-500  hover:rounded-3xl lg:mr-0">
              Sign in
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

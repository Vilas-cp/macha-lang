"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import text from "./data";

export default function Home() {
  const router = useRouter();
  let data = text.map((item) => (
    <div className=" h-full w-full hover:hover:bg-[#04AA6D] hover:cursor-pointer">
      <div className="flex justify-center pt-2 items-center "> {item.Name}</div>
    </div>
  ));
  let dataset = text.map((items) => (
    <div className="p-[20px] flex flex-col gap-[30px] ">
      <div className="text-[50px] font-mono font-bold bg-green-500 h-[70px] w-fit">
        {items.Name}
      </div>

      <div className="flex justify-center">
        <div className=" bg-[#D9EEE1!important]  w-[100vh] ">
          <div className="p-[40px] ">
            {items.Description.split(".").map((desc, i) => (
              <span key={i}>
                {desc}
                {i < items.Description.split(".").length - 1 ? <br /> : null}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-[#E7E9EB] flex flex-col pl-6 gap-[15px] pb-3 w-[100vh] pr-6 shadow-2xl ">
          <div className="font-semibold text-[30px] pt-2">Example</div>
          <div
            id={`example_${items.Name}`}
            className="bg-white font-mono font-semi "
          >
            {/* {items.Example.split("<br/>").map((desc, i) => (
              // <span key={i}>
              //   {desc}
              //   {i < items.Example.split("<br/>").length - 1 ? <br /> : null}
              // </span>
              
            ))} */}
          </div>
          <div
            id={`try_it_yourself_${items.Name}`}
            className="bg-[#04AA6D!important] cursor-pointer w-[150px] h-[5vh] flex items-center justify-center rounded-lg font-semibold text-white"
          >
            Try it yourself -&gt;
          </div>
        </div>
      </div>
      <div className="text-l bg-[#ffffcc] p-5 w-[100vh] h-[30vh]">
        <span className="font-semi text-3xl">Note:</span>
        <br></br>
        {items.Type}
      </div>
    </div>
  ));

  useEffect(() => {
    text.map((desc, i) => {
      window.document.getElementById(`example_${desc.Name}`).innerHTML =
        desc.Example;
      let examCode = desc.Example;
      examCode = examCode.replace(/<br\/>/g, "\n");
      examCode = examCode.replace(
        /<pre style='display: inline;'>    <\/pre>/g,
        "\t"
      );
      window.document.getElementById(`try_it_yourself_${desc.Name}`).onclick =
        () => {
          router.push(`/Editor?code="${examCode}"`);
        };
    });
  }, []);
  return (
    <div>
      <Header />
      <div
        className=" pt-[60px] bg-[#282A35!important] text-white  h-[100px]
      items-center flex flex-row justify-between  py-0 fixed  w-full"
      >
        {data}
      </div>
      <div className="text-black pt-[84px]">{dataset}</div>
      <Footer />
    </div>
  );
}

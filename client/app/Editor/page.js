import Parent from "./components/Parent";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

export default function Home({searchParams}) {
  const code = searchParams.code;
  return (
    <div>
      {/* <button className="h-10 w-24 bg-slate-400 border-black rounded-lg hover:bg-slate-600 mx-24 my-24">
        Code editor
       </button> */}
      <Parent code={code} mlserverapi={process.env.AWS_ML_SERVER_API} />
    </div>
  );
}

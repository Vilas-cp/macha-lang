import Parent from "./components/Parent";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

export default function Home({searchParams}) {
  // console.log(process.env.AWS_ML_SERVER_API);
  // console.log(searchParams);
  const code = searchParams.code;
  // const searchQuery = useSearchParams();
  // const [code, setCode] = useState("");
  // useEffect(() => {
  //   if (searchQuery.has("code")) {
  //     console.log(searchQuery.get("code"));
  //     if (searchQuery.get("code") !== null) {
  //       setCode(searchQuery.get("code").toString());
  //     }
  //   }
  // }, []);
  return (
    <div>
      {/* <button className="h-10 w-24 bg-slate-400 border-black rounded-lg hover:bg-slate-600 mx-24 my-24">
        Code editor
       </button> */}
      <Parent code={code} mlserverapi={process.env.AWS_ML_SERVER_API} />
    </div>
  );
}

"use client";
import Image from "next/image";
import Parent from "./components/Parent";
import Trial from "./components/Trial";
import Langselector from "./components/Langselector";
import Codeeditor from "./components/Codeeditor";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchQuery = useSearchParams();
  const [code, setCode] = useState("");
  useEffect(() => {
    if (searchQuery.has("code")) {
      console.log(searchQuery.get("code"));
      if (searchQuery.get("code") !== null) {
        setCode(searchQuery.get("code").toString());
      }
    }
  }, []);
  return (
    <div>
      {/* <button className="h-10 w-24 bg-slate-400 border-black rounded-lg hover:bg-slate-600 mx-24 my-24">
        Code editor
       </button> */}
      <Parent code={code} />
    </div>
  );
}

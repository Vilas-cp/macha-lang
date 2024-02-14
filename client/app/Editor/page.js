import Image from "next/image";
import Parent from "./components/Parent";
import Trial from "./components/Trial";
import Langselector from "./components/Langselector";
import Codeeditor from "./components/Codeeditor";

export default function Home({paramas}) {
  return (
    <div>
      {/* <button className="h-10 w-24 bg-slate-400 border-black rounded-lg hover:bg-slate-600 mx-24 my-24">
        Code editor
       </button> */}
      <Parent />
    </div>
  );
}

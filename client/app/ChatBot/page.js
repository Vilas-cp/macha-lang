import dynamic from "next/dynamic";

const DynamicChatBot = dynamic(() => import("./components/ChatBot"), {
  loading: () => <p className="w-full text-center pt-10 h-[100vh] bg-black text-white text-xl">Loading...</p>,
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <DynamicChatBot />
    </div>
  );
}

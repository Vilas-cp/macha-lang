import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";



export default function Home() {
  console.log(process.env.AWS_ML_SERVER_API);
  return (
    <div>
      <Header/>
      <Hero/>
      <Footer/>
    </div>
  );
}

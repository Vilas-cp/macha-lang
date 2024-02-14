import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";



export default function Home() {
  return (
    <div className="bg-[#e7e9eb] ">
    <Header/>
    <div className="p-[60px] font-bold text-[80px] ">
        Members
    </div>
    <div className="pr-[40px] pl-[40px] gap-[40px] flex justify-betweem items-center ">
    <Card className="py-4 shadow-2xl  z-0">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Manoja.D</p>
        <small className="text-default-500">3rd Sem,BGSCET</small>
        <h4 className="font-bold text-large">Backend Dev</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://www.amongusavatarcreator.com/assets/img/characters/600/blue.png"
          width={270}
        />
      </CardBody>
    </Card>
    <Card className="py-4 shadow-2xl z-0">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Vilas.C.P</p>
        <small className="text-default-500">3rd Sem,BGSCET</small>
        <h4 className="font-bold text-large">Frontend Dev</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://www.amongusavatarcreator.com/assets/img/characters/600/darkgreen.png"
          width={270}
        />
      </CardBody>
    </Card>
    <Card className="py-4 shadow-2xl z-0">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Giridhara.D</p>
        <small className="text-default-500">3rd sem,BGSCET</small>
        <h4 className="font-bold text-large">Documentation</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://www.amongusavatarcreator.com/assets/img/characters/600/white.png"
          width={270}
        />
      </CardBody>
    </Card>
    
    </div>
    <div className="flex pl-[40px] gap-[40px] pr-[40px] pb-[50px] mt-[100px]">
    <Card className="py-4 shadow-2xl z-0">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Aditya.S</p>
        <small className="text-default-500">3rd Sem,BGSCET</small>
        <h4 className="font-bold text-large">Frontend Dev</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://www.amongusavatarcreator.com/assets/img/characters/600/black.png"
          width={270}
        />
      </CardBody>
    </Card>
    <Card className="py-4 shadow-2xl z-0">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Rahul.S</p>
        <small className="text-default-500">3rd Sem,BGSCET</small>
        <h4 className="font-bold text-large">Documentation</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://www.amongusavatarcreator.com/assets/img/characters/600/cyan.png"
          width={270}
        />
      </CardBody>
    </Card>
    </div>
    <Footer/>
    </div>
  );
}

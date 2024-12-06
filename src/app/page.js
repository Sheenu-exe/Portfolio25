import Image from "next/image";
import Header from "./components/header";
import Main from "./home/page";
import "./globals.css";
import DockDemo from "./components/dock";
// import { Dock } from "@/components/ui/dock";
export default function Home() {
  return (
    <div className="flex bg-black justify-center flex-col items-center">
     
      <Main/>
      <div className="sticky bottom-10 left-0 w-full flex justify-center items-center">
        <DockDemo/>
      </div>
    </div>
  );
}

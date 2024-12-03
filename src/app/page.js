import Image from "next/image";
import Header from "./components/header";
import Main from "./home/page";
import "./globals.css";
export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center">
      <Header/>
      <Main/>
    </div>
  );
}

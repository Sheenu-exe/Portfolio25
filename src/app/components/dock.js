import React from "react";
import { Dock,DockIcon } from "@/components/ui/dock";
import { FaXTwitter,FaWhatsapp,FaGithub,FaInstagram } from "react-icons/fa6";
import { RiPagesLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { SiEagle } from "react-icons/si";
import { TbMailShare } from "react-icons/tb";


import Link from "next/link";

function DockDemo() {
  return (
    <div className="relative">
      <Dock direction="middle"> 
        <DockIcon className="text-white text-3xl">
          <Link href="/">
            <IoMdHome title="Home"/>
          </Link>
        </DockIcon>
        <DockIcon className="text-white text-3xl">
          <Link href={'/aboutMe'}>
            <SiEagle title="About me"/>
          </Link>
        </DockIcon>
        <DockIcon className="text-white text-3xl">
          <Link href={"/blog"}>
          <RiPagesLine title="Blogs"/>
          </Link>
        </DockIcon>
        <div className="w-[1px] bg-white sm:block hidden h-[5vh] text-3xl"></div>
        <DockIcon className="text-white text-3xl">
          <Link target="_blank" href="https://github.com/Sheenu-exe">
          <FaGithub title="GitHub"/>
          </Link>
        </DockIcon>
        <DockIcon className="text-white text-3xl">
        <Link target="_blank" href="https://twitter.com/Sheenu_exe">
          <FaXTwitter title="GitHub"/>
          </Link>
        </DockIcon>
        <DockIcon className="text-white text-3xl">
        <Link target="_blank" href="https://www.instagram.com/sachinn.code/">
          <FaInstagram title="GitHub"/>
          </Link>
        </DockIcon>
        <DockIcon className="text-white text-3xl">
        <Link target="_blank" href="mailto:pariharsachin5002@gmail.com">
          <TbMailShare title="GitHub"/>
          </Link>
        </DockIcon>
        <DockIcon>
          <a target="_blank" className="text-white text-3xl" href="https://wa.me/+918668369314">
            <FaWhatsapp title="WhatsApp" />
          </a>
        </DockIcon>
      </Dock>
    </div>
  );
}

export default DockDemo;
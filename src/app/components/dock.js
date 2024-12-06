import React from "react";
import { Dock,DockIcon } from "@/components/ui/dock";

// Import images for icons
// import githubIcon from './icons/github.png';
// import googleDriveIcon from './icons/google-drive.png';
// import notionIcon from './icons/notion.png';
// import whatsappIcon from './icons/whatsapp.png';

import { FaGithub } from "react-icons/fa";
import { FaGoogleDrive } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";


function DockDemo() {
  return (
    <div className="relative">
      <Dock direction="middle">
        <DockIcon className="text-white text-3xl">
          <FaGithub/>
        </DockIcon>
        <DockIcon className="text-white text-3xl">
        <FaGoogleDrive/>
        </DockIcon>
        <DockIcon className="text-white text-3xl">
        <RiNotionFill />
        </DockIcon>
        <div className="w-[1px] bg-white h-[5vh] text-3xl">
        </div>
        <DockIcon className="text-white text-3xl">
        <FaWhatsapp />
        
        </DockIcon>
      </Dock>
    </div>
  );
}

export default DockDemo;
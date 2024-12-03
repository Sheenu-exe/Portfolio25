'use client'
import { useEffect, useRef } from "react";
import Typed from "typed.js";

const Header = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Sachin Parihar"], // Add multiple strings for rotation
      typeSpeed: 50, // Speed of typing
      backSpeed: 30, // Speed of backspacing
      loop: true, // Enable looping
      backDelay: 1000, // Delay before backspacing starts
    });

    return () => {
      typed.destroy(); // Cleanup Typed.js instance when the component unmounts
    };
  }, []);

  return (
    <header className="h-[10vh] bg-black w-full flex justify-center items-center sticky top-0 left-0">
      <div className="w-[80vw] flex items-center">
        <p className="tracking-tighter Jetbrains text-lg font-extralight">
          &gt;_ <span className="Jetbrains text-base" ref={typedRef}></span>
        </p>
      </div>
      <div className="sm:flex hidden none gap-x-2 ">
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Blogs</a>
      </div>
    </header>
  );
};

export default Header;

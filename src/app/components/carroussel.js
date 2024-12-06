'use client';

import React from 'react';
import { useSpringCarousel } from 'react-spring-carousel';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Image from 'next/image';

const Carousel = ({ items = [], visibleItems = 4, autoPlay = false, interval = 3000, className = '' }) => {
    const { carouselFragment, slideToPrevItem, slideToNextItem } = useSpringCarousel({
      items: items.map((item, index) => ({
        id: `card-${index}`,
        renderItem: (
          <div className="w-full h-full flex items-center justify-center p-2">
            <div className="w-full h-[300px] rounded-lg shadow-lg overflow-hidden">
            <Image 
  src={item.image} 
  alt={item.content || "Slide"} 
  width={500} 
  height={300} 
  className="w-full h-full object-cover" 
/>
              {item.content && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-semibold">
                  {item.content}
                </div>
              )}
            </div>
          </div>
        ),
      })),
      itemsPerSlide: visibleItems,
      autoPlay: autoPlay ? interval : undefined,
      enableLoop: true,
    });

    return (
      <div className={`relative w-full h-[350px] overflow-hidden ${className}`}>
        {/* Carousel Fragment */}
        <div>{carouselFragment}</div>

        {/* Navigation Buttons */}
        {/* Navigation Buttons */}
<button
  className="absolute left-0 top-1/2 transform -translate-y-1/2 p-3 shadow-lg h-full w-[8vw] bg-gradient-to-r from-black via-black/50 to-transparent flex items-center "
  onClick={slideToPrevItem}
>
  <IoIosArrowBack className="text-white" />
</button>
<button
  className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 shadow-lg h-full w-[8vw] bg-gradient-to-l from-black via-black/50 to-transparent flex items-center justify-end  "
  onClick={slideToNextItem}
>
  <IoIosArrowForward className="text-white" />
</button>

      </div>
    );
};

export default Carousel;

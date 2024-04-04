"use client"
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from "@/lib/utils";
import { ListBlobResultBlob, list } from '@vercel/blob';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
interface CarousselProps{
  titleCaroussel:string,
  data:ListBlobResultBlob[] | null
}
const CarousselHome:React.FC<CarousselProps> = ({titleCaroussel,data}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])
  return (
    <div className="w-full px-8 flex justify-center" ref={emblaRef}>
    <Carousel className="w-[300px] md:w-[800px]"
     plugins={[plugin.current]}
    onMouseEnter={plugin.current.stop}
    onMouseLeave={plugin.current.reset}
    opts={{
     
        align: "start",
        loop:true
      }}
      ref={emblaRef}
    
    >
        <h1 className="text-center text-lg mb-2 text-blue-700">{titleCaroussel}</h1>
     <CarouselContent className="-ml-1 md:-ml-4"> 
    {/* {data === null &&  (
      <CarouselItem>fffffffff</CarouselItem>
    )} */}
{data?.map((img,index) =>{
      return (
        <CarouselItem key={index}  className="w-full pl-1 md:basis-1/2 lg:basis-1/3">
     <div className="w-full ">
              <Card>
                <CardContent className="w-full p-0 grow aspect-square flex h-[300px]">
                  <Image src={img.url} width={400} height={400} alt="ff" className="w-full object-contain"/>

                </CardContent>
              </Card>
            </div>

     </CarouselItem>
      )
    })}
      
     
     
      </CarouselContent>
    
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  );
};

export default CarousselHome;

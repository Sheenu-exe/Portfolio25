
import Carousel from "../components/carroussel";
import Slide1 from "../assets/imgs/slide1.jpeg";
import Slide2 from "@/app/assets/imgs/Slide2.jpg"
import Slide3 from "@/app/assets/imgs/Slide3.jpg"
import Slide4 from "@/app/assets/imgs/Slide4.jpg"
import Slide5 from "@/app/assets/imgs/Slide5.jpg" 
import Slide6 from "@/app/assets/imgs/Slide6.jpg" 
import Slide7 from "@/app/assets/imgs/Slide7.jpg" 
import Slide8 from "@/app/assets/imgs/Slide8.jpg" 
import Slide9 from "@/app/assets/imgs/Slide9.jpg" 

const Blog = () => {
    const slides = [
        { image: Slide1 },
        { image: Slide2 },
        { image: Slide3 },
        { image: Slide4 },
        { image: Slide5 },
        { image: Slide6 },
        { image: Slide7 },
        { image: Slide8 },
        { image: Slide9 },
    ];

    return(
        <div className="container mx-auto mt-10">
        <Carousel items={slides} visibleItems={4} autoPlay interval={4000} />
    </div>
    )
}
export default Blog
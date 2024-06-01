import FooterProduct from "./Footer";
import NavBar from "./NavBar";
import ProductCard from "./ProductCard";
import Products from "./ProductCard";
import SlideShow from "./SlideShow";

const HomeProduct = () => {
    return (
        <div>
            <NavBar/>
            <SlideShow/>
            <ProductCard/>
            <FooterProduct/>
        </div>
    );
};

export default HomeProduct;
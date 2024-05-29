import FooterProduct from "./Footer";
import NavBar from "./NavBar";
import Products from "./Products";
import SlideShow from "./SlideShow";

const HomeProduct = () => {
    return (
        <div>
            <NavBar/>
            <SlideShow/>
            <Products/>
            <FooterProduct/>
        </div>
    );
};

export default HomeProduct;
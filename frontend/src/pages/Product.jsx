import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext";
import { assets } from "../assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  const loadProductData = () => {
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setSelectedImage(foundProduct.image[0]);
    }
  };

  const loadRelatedProducts = () => {
    if (productData) {
      const related = products.filter(item => 
        item.category === productData.category &&
        item.subCategory === productData.subCategory &&
        item._id !== productData._id
      );
      setRelatedProducts(related);
    }
  };

  useEffect(() => {
    loadProductData();
  }, [productId]);

  useEffect(() => {
    if (productData) {
      loadRelatedProducts();
    }
  }, [productData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex gap-3 flex-col sm:flex-row sm:w-[70%]">
          <div className="flex sm:flex-col overflow-x-auto overflow-y-scroll w-full sm:w-[20%] gap-3">
            {productData.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`product image ${index}`}
                className="w-[25%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] flex-shrink-0">
            <div className="relative w-full h-96 sm:h-[500px]">
              <img
                src={selectedImage}
                alt="Selected Product"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between sm:w-[30%]">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, index) => (
              <img key={index} src={assets.star} alt="Star" className="w-4" />
            ))}
            <img src={assets.dull} alt="Star" className="w-3" />
            <p className="pl-2">(200)</p>
          </div>
          <p className="mt-5 text-2xl font-medium">{productData.price}{currency}</p>
          <p className="mt-5 text-gray-600 md:w-4/5">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((sizeOption, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(sizeOption)}
                  className={`border py-2 px-4 bg-gray-100 ${selectedSize === sizeOption ? 'border-red-400' : ''}`}
                >
                  {sizeOption}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            className="bg-black text-white px-4 py-2 text-xs active:bg-gray-700 w-[200px]"
          >
            Add To My Cart
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-center mb-6 font-serif">
          Related Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Link key={relatedProduct._id} to={`/product/${relatedProduct._id}`} className="group">
              <div className="relative">
                <img
                  src={relatedProduct.image[0]}
                  alt={relatedProduct.name}
                  className="w-full h-64 object-cover"
                />
                <h3 className="mt-4 text-lg font-medium">{relatedProduct.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{relatedProduct.price}{currency}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

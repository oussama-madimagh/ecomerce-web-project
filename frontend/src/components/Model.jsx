import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Model = () => {
  const [product, setProduct] = useState(null);
  const productId = "67634a902763d3a3e8c2f2ff";

  const fetchProduct = async () => {
    try {
      const response = await fetch("http://localhost:6009/api/product/single", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (data.success) {
        setProduct(data.product);
      } else {
        console.error("Failed to fetch product:", data.message);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return product ? (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="relative w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <Link
          to={`/product/${product._id}`}
          className="absolute inset-0 flex items-center justify-center sm:justify-start text-white p-6 sm:p-10 z-10"
        >
          <div className="text-center sm:text-left bg-black bg-opacity-50 p-6 sm:p-10">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <p className="w-8 md:w-11 h-[2px] bg-white"></p>
              <p className="font-medium text-sm md:text-base">Our BestSeller</p>
            </div>
            <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <p className="font-semibold text-sm md:text-base">Buy Now</p>
              <p className="w-8 md:w-11 h-[2px] bg-white"></p>
            </div>
          </div>
        </Link>
        <img
          className="w-full h-full object-cover"
          src={product.image[0]} 
          alt={product.name}
        />
      </div>
      <div className="w-full sm:w-1/2 h-full">
        <Link to={`/product/${product._id}`}>
          <img
            className="w-full h-full object-cover"
            src={product.image[2] || product.image[0]}
            alt={product.name}
          />
        </Link>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Model;

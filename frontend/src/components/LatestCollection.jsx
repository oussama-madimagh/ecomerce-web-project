import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/Shopcontext.jsx";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  
  useEffect(() => {
    if (products.length > 0) {
      const sortedLatestProducts = [...products].reverse().slice(0, 10);
      setLatestProducts(sortedLatestProducts);
    }
  }, [products]);

  return (
    <section className="my-10">
      
      <div className="text-center py-8">
        <h2 className="text-3xl font-semibold">
          <Title text1="Latest" text2="Additions" />
        </h2>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum nobis fuga, delectus iste adipisci est vitae. Laborum quod rem eaque sequi, quidem suscipit porro omnis culpa. Debitis, quis? Suscipit, doloribus!
        </p>
      </div>

     
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;

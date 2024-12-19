import { useContext } from "react";
import { ShopContext } from "../context/Shopcontext.jsx";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="relative overflow-hidden">
        <img className="w-full h-full object-cover" src={image[0]} alt={name} />
        <img
          className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 hover:opacity-100"
          src={image[1]}
          alt={`${name} second view`}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">{price}{currency}</p>
    </Link>
  );
};

export default ProductItem;

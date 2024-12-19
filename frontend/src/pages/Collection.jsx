import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("relavent");

  
  useEffect(() => {
    let productsToDisplay = [...products];

    
    if (selectedCategory.length > 0) {
      productsToDisplay = productsToDisplay.filter((product) =>
        selectedCategory.includes(product.category)
      );
    }

    
    if (selectedSubCategory.length > 0) {
      productsToDisplay = productsToDisplay.filter((product) =>
        selectedSubCategory.includes(product.subCategory)
      );
    }

 
    if (search.trim()) {
      const lowercasedSearch = search.toLowerCase();
      productsToDisplay = productsToDisplay.filter((product) =>
        product.name.toLowerCase().includes(lowercasedSearch)
      );
    }

    setFilteredProducts(productsToDisplay);
  }, [selectedCategory, selectedSubCategory, products, search, showSearch]);


  const handleCategoryToggle = (event) => {
    const category = event.target.value;
    setSelectedCategory((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category]
    );
  };

 
  const handleSubCategoryToggle = (event) => {
    const subCategory = event.target.value;
    setSelectedSubCategory((prevSubCategories) =>
      prevSubCategories.includes(subCategory)
        ? prevSubCategories.filter((item) => item !== subCategory)
        : [...prevSubCategories, subCategory]
    );
  };

  
  const sortFilteredProducts = (products, sortOrder) => {
    const productsCopy = [...products];
    switch (sortOrder) {
      case "ascending":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "descending":
        return productsCopy.sort((a, b) => b.price - a.price);
      case "relavent":
        return productsCopy.sort(() => Math.random() - 0.5);
      default:
        return productsCopy;
    }
  };

  const sortedProducts = sortFilteredProducts(filteredProducts, sortOrder);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
     
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-3"
          onClick={() => setIsFilterVisible(!isFilterVisible)}
        >
          FILTER BY
        </p>
        <div className={`border border-gray-400 pl-5 py-3 mt-6 ${isFilterVisible ? "" : "hidden"}`}>
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Men" onChange={handleCategoryToggle} />
              Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Women" onChange={handleCategoryToggle} />
              Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Kids" onChange={handleCategoryToggle} />
              Kids
            </p>
          </div>
        </div>

 
        <div className={`border border-gray-400 pl-5 py-3 mt-6 ${isFilterVisible ? "" : "hidden"}`}>
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Topwear" onChange={handleSubCategoryToggle} />
              Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Bottomwear" onChange={handleSubCategoryToggle} />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Accessories" onChange={handleSubCategoryToggle} />
              Accessories
            </p>
          </div>
        </div>
      </div>

      
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collections"} />
          <select onChange={(e) => setSortOrder(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="ascending">Sort by: Ascending</option>
            <option value="descending">Sort by: Descending</option>
          </select>
        </div>
        <div className="grid grid-col-4 md:grid-cols-4 gap-4 gap-y-6">
          {sortedProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

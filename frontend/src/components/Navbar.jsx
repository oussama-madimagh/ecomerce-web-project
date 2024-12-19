import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount,navigate,token,setToken,setCartItems } = useContext(ShopContext);
   const SignOut = ()=> {
    navigate('/SignIn')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
   
   }
  return (
    <div className="flex items-center justify-between py-7 px-5 bg-gray-100 shadow-lg font-semibold">
      <Link to="/">
        <img src={assets.logo} className="w-48" alt="Logo" />
      </Link>
      <ul className=" sm:flex gap-10 text-md text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-all duration-300 
            ${isActive ? "scale-110 shadow-md bg-gray-200 rounded-lg px-3 py-2" : ""}
            hover:scale-105 hover:shadow-lg hover:bg-gray-50 px-3 py-2`
          }
        >
          Home
          
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-all duration-300 
            ${isActive ? "scale-110 shadow-md bg-gray-200 rounded-lg px-3 py-2" : ""}
            hover:scale-105 hover:shadow-lg hover:bg-gray-50 px-3 py-2`
          }
        >
          Collection
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-all duration-300 
            ${isActive ? "scale-110 shadow-md bg-gray-200 rounded-lg px-3 py-2" : ""}
            hover:scale-105 hover:shadow-lg hover:bg-gray-50 px-3 py-2`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-all duration-300 
            ${isActive ? "scale-110 shadow-md bg-gray-200 rounded-lg px-3 py-2" : ""}
            hover:scale-105 hover:shadow-lg hover:bg-gray-50 px-3 py-2`
          }
        >
          Contact
        </NavLink>
      </ul>
      <div className="flex items-center gap-7">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search}
          className="w-7 cursor-pointer hover:scale-110 transition-all duration-200"
          alt="Search"
        />
        <div className="group relative">
     
            <img onClick={()=>token ? null : navigate('/SignIn')}
              className="w-7 cursor-pointer hover:scale-110 transition-all duration-200"
              src={assets.profile}
              alt="Profile"
            />
         {token && 
         <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-2">
            <div className="flex flex-col gap-3 w-40 py-3 px-5 bg-slate-100 text-gray-400 rounded shadow-lg">
        
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={SignOut} className="cursor-pointer hover:text-black">Sign Out</p>
            </div>
          </div>}
          
        </div>
        <Link to="/cart" className="relative">
          <img
            src={assets.cart}
            className="w-7 min-w-5 cursor-pointer hover:scale-110 transition-all duration-200"
            alt="Cart"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-5 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu}
          className="w-6 cursor-pointer sm:hidden hover:scale-110 transition-all duration-200"
          alt="Menu"
        />
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex item-center gap-4 p-3 cursor-pointer hover:text-black hover:font-bold"
          >
            <img src={assets.dropdown} alt="Back" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 px-6 border text-lg hover:bg-gray-100"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 px-6 border text-lg hover:bg-gray-100"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 px-6 border text-lg hover:bg-gray-100"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 px-6 border text-lg hover:bg-gray-100"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

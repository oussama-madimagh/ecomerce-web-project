import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/Shopcontext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const location = useLocation();

 
  useEffect(() => {
    setIsSearchVisible(location.pathname.includes('collection'));
  }, [location]);

  
  if (!showSearch || !isSearchVisible) return null;

  return (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
          type='text'
          placeholder='Search'
        />
        <img className='w-4' src={assets.search} alt='Search Icon' />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className='inline w-3 cursor-pointer'
        src={assets.cross}
        alt='Close Search'
      />
    </div>
  );
};

export default SearchBar;

import React, { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";
import ImageList from "./components/ImageList";
import NoImage from "./components/NoImage";
import searchImages from "./api/api";
import "./App.css";
import Loader from "./components/Loader";
import Copyright from "./components/Copyright";
import { getRandomWord } from "./components/Random";
import ImagePopup from "./components/ImagePopup";
import { Outlet } from "react-router-dom";

function App() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [noImageFound, setNoImageFound] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImageUrl, setPopupImageUrl] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isRefreshed = urlParams.get("refreshed");

    if (isRefreshed) {
      toast.success("Refresh successfully");
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  // Get random word
  const randomGenerate=()=>{
    setSearchTerm(getRandomWord());
  }

  const onSearchSubmit = async () => {
    setLoading(true);

    if (!searchTerm) {
      toast.error("Please enter a search term");
      setLoading(false);
      return;
    }

    const result = await searchImages(searchTerm);

    if (result.length === 0) {
      setLoading(false);
      setLoadingComplete(true);
      toast.error("No images found");
      setNoImageFound(true);
      return;
    }

    setImages(result);
    setSearched(true);

    setTimeout(() => {
      setLoading(false);
      setLoadingComplete(true);
      toast.success("Images search successful");
    }, 3000);
  };

  const handleImageClick = (imageUrl) => {
    setShowPopup(true);
    setPopupImageUrl(imageUrl);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupImageUrl("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearchSubmit();
    }
  };

  const handleRefresh = () => {
    window.location.href = `?refreshed=true`;
  };

  const clearSearchTerm = () => {
    setSearchTerm("");
    setNoImageFound(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="
          hover:scale-110
          transition
          transform
          duration-700
          ease-in-out
          cursor-pointer
        ">
        <img 
        src="/logo.png" 
        className="
        App-logo
        " 
        alt="logo" 
        />
        </div>
        
        <h2 className="header-text font-bold text-3xl text-center text-white">
          Imagify
        </h2>
        <div className="flex flex-col items-center mt-10">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className="input-search border-2 border-gray-400 bg-gray-800 h-10 px-5 pr-10 rounded-lg text-sm w-full text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search Image ex. Cats, Cars, etc."
            />
            {searchTerm && (
              <button
                className="absolute right-2 top-2"
                onClick={clearSearchTerm}
              >
                <AiOutlineClose className="text-gray-500 mt-1" />
              </button>
            )}
          </div>
          <div className="mt-2 flex justify-center space-x-2">
            <button whileHover={{ scale: 0.9 }}>
              <button
                className="button-search bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                onClick={onSearchSubmit}
              >
                Search
              </button>
            </button>
            <button whileHover={{ scale: 0.9 }}>
              <button
                className="button-search bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                onClick={randomGenerate}
              >
                Random
              </button>
            </button>
            <button whileHover={{ scale: 0.9 }}>
              <button
                className="button-refresh bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                onClick={handleRefresh}
              >
                <FiRefreshCw className="text-2xl" />
              </button>
            </button>
          </div>
        </div>
        {loading && <Loader />}
        {searched && images.length === 0 && !loading && noImageFound && (
          <NoImage />
        )}
        {loadingComplete && images.length > 0 && (
          <ImageList images={images} onImageClick={handleImageClick} />
        )}
        {showPopup && (
          <>
            <div className="overlay"></div>
            <ImagePopup image={popupImageUrl} onClose={closePopup} />
          </>
        )}
        <Copyright />
      </header>
      <Outlet/>
      <Toaster />
    </div>
  );
}

export default App;

import React from "react";

const ImageShow = ({ image, onImageClick }) => {
  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(image);
    }
  };

  return (
    <div
      className="
        flex
        justify-center
        items-center
        border-2
        border-gray-300
        rounded-lg
        p-3
        mb-5
      "
    >
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="
                rounded-lg
                max-w-full
                h-auto
                cursor-pointer
            "
        whileTap={{ scale: 0.9 }}
        onClick={handleImageClick}
      />
    </div>
  );
};

export default ImageShow;

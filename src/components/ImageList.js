import React from "react";
import ImageShow from "./ImageShow";

const ImageList = ({ images, onImageClick }) => {
  const renderedImages = images.map((image) => {
    return (
      <ImageShow key={image.id} image={image} onImageClick={onImageClick} />
    );
  });

  return (
    <div className="xl:columns-5 lg:columns-4 md:columns-3 sm:columns-2 mt-5 mb-5 rounded-lg p-5 gap-5">
      {renderedImages}
    </div>
  );
};

export default ImageList;

import React, { createContext, useContext, useState } from "react";

const ImageContext = createContext();

export function useImageContext() {
  return useContext(ImageContext);
}

export function ImageProvider({ children }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [otherData, setOtherData] = useState(null);

  const contextValue = {
    selectedImage,
    setSelectedImage,
    otherData,
    setOtherData,
  };

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
}

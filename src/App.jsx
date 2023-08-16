import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import Home from "./components/home/home";
import ImageUpload from "./components/imageUpload/image_upload";
import { ImageProvider } from "./components/context/imageContext";

import "./App.css";
import { LoadingProvider } from "./components/context/loadingContext";

const App = () => {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <ImageProvider>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/image" element={<ImageUpload />} />

            {/* Fallback route for unmatched paths */}
            <Route path="*" element={<Home />} />
          </Routes>
        </ImageProvider>
      </LoadingProvider>
    </BrowserRouter>
  );
};

export default App;

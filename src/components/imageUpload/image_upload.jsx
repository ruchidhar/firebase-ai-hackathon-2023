import React from "react";

import Uploader from "../imageUpload/uploader";
import TopSection from "../imageUpload/top_section";
import ImageGallery from "../imageUpload/image_gallery";

const ImageUpload = () => {
  return (
    <div>
      <main>
        <div className="main">
          <div className="gradient" />
        </div>

        <div className="app max-w-4xl mx-auto">
          <TopSection />
          <Uploader />
          <ImageGallery />
        </div>
      </main>
    </div>
  );
};

export default ImageUpload;

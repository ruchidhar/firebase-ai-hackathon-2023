import React from "react";
import { useState, useEffect } from "react";
import {
  uploadToBucket,
  getBucketFilePath,
  extractedTextFromImage,
} from "../../lib/api";

import { useImageContext } from "../context/imageContext";

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [fetchedData, setFetchedData] = useState([]); // Initialize with an empty array
  const { setSelectedImage, setOtherData } = useImageContext();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Clear previous selected image
    setOtherData(null);

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      setLoading(true);
      const data = await uploadToBucket(selectedFile);
      const filePath = getBucketFilePath(data);
      setFilePath(filePath);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filePath) {
      const fetchImageSummary = async () => {
        setLoading(true);

        const result = await extractedTextFromImage(filePath);
        setFetchedData(result);
        setOtherData(result);
        setLoading(false);
      };

      fetchImageSummary();
    }
  }, [filePath]);

  return (
    <div className="text-center mt-10">
      <form
        className="flex items-center flex-col gap-8"
        onSubmit={handleUpload}
      >
        <input
          type="file"
          accept=".jpg, .png"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full max-w-xs bg-gray-200 text-gray-700 font-mono"
        />
        <button
          type="submit"
          className={`btn gap-3 ${
            Boolean(loading) && "loading"
          } font-mono text-white`}
          disabled={!selectedFile}
          style={{ backgroundColor: "black" }}
        >
          Upload 🖼️
        </button>
      </form>
    </div>
  );
};

export default Uploader;

import React, { useState } from "react";
import { useImageContext } from "../context/imageContext";
import { copy, download, tick } from "../../assets";

const ImageGallery = () => {
  const { selectedImage, otherData } = useImageContext();
  const [copied, setCopied] = useState("");

  const handleCopy = (data) => {
    const textToCopy = data;
    setCopied(textToCopy);
    navigator.clipboard.writeText(textToCopy);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleDownload = (text) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);

    const currentTimestamp = new Date().toISOString();
    element.download = `${currentTimestamp}.txt`;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section>
      {selectedImage && (
        <div className="grid md:grid=cols-3 justify-center gap-4 my-10 relative">
          <div className="card card-compact w-full relative max-w-2xl overflow-hidden shadow-lg group">
            <figure className="max-h-[15rem] w-full h-[15rem] overflow-hidden">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-200"
              />
            </figure>
            {otherData && (
              <div className="card-body inset-0 flex items-end my-2 relative">
                {otherData.map((item, index) => {
                  return (
                    <div key={index}>
                      <pre className="font-medium text-sm text-gray-700 break-all whitespace-pre-wrap">
                        <h3 className="text-xl font-bold mb-2">
                          Text from Image
                        </h3>
                        <p>{item.text}</p>
                      </pre>
                      <div className="absolute top-0 right-0 mt-2 mr-2 rounded-full flex space-x-2">
                        <div
                          className="copy_btn"
                          onClick={() => handleCopy(item.text)}
                        >
                          <img
                            src={copied === item.text ? tick : copy}
                            alt="my_icon"
                            className="w-[40%] h-[40%] object-contain"
                          />
                        </div>
                        <div
                          className="copy_btn"
                          onClick={() => handleDownload(item.text)}
                        >
                          <img
                            src={download}
                            alt="my_icon"
                            className="w-[40%] h-[40%] object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;

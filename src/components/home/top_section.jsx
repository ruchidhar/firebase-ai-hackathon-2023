import React from "react";
import { useNavigate } from "react-router-dom";

import { summExt } from "../../assets";

const TopSection = () => {
  const navigate = useNavigate();

  const openImageRoute = () => {
    navigate("/image", { replace: true });
  };

  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={summExt} alt="my_logo" className="w-36 object-contain" />

        <button
          type="button"
          onClick={openImageRoute}
          className="black_btn font-mono"
        >
          Image Extractor
        </button>
      </nav>

      <h1 className="head_text">
        Summarize <br className="max-md:hidden" />
        <span className="orange_gradient">your text</span>
      </h1>

      <h2 className="desc">Instant Insights, Concisely Delivered</h2>
    </header>
  );
};

export default TopSection;

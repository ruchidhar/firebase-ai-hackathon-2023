import React from "react";
import { useNavigate } from "react-router-dom";
import { summExt } from "../../assets";

const TopSection = () => {
  const navigate = useNavigate();

  const openHomeRoute = () => {
    navigate("/", { replace: true });
  };

  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={summExt} alt="my_logo" className="w-36 object-contain" />

        <button
          type="button"
          onClick={openHomeRoute}
          className="black_btn font-mono"
        >
          Summarize Text
        </button>
      </nav>

      <h1 className="head_text">
        Extract Text
        <br className="max-md:hidden" />
        <span className="orange_gradient"> from image</span>
      </h1>

      <h2 className="desc">Effortlessly extract text from your visuals</h2>
    </header>
  );
};

export default TopSection;

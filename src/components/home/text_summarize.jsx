import React from "react";

import { useState } from "react";

import { callGetSummary } from "../../lib/api";
import { textIcon } from "../../assets";

import DocumentChangesListener from "./text_listener";
import { useLoading } from "../context/loadingContext";

const TextSummarize = () => {
  const [text, setText] = useState({
    inputText: "",
    summary: "",
    id: "",
  });

  const { isLoading, setIsLoading } = useLoading();

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [textDocID, setTextDocID] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setText({
      ...text,
      inputText: value,
    });

    setSubmitButtonDisabled(value.trim() === "" || value.length < 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submitButtonDisabled) {
      setIsLoading(true);
      setText({
        inputText: "",
        summary: "",
        id: "",
      });

      const docId = await callGetSummary(text.inputText);
      setTextDocID(docId);
    }
  };

  return (
    <div className="mt-16 w-full max-w-4xl">
      {/* SEARCH*/}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={textIcon}
            alt="my_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="text"
            placeholder="Enter text to summarize"
            value={text.inputText}
            onChange={handleInputChange}
            required
            className="url_input peer text-black"
          />
        </form>
        <div className="flex justify-center items-center my-4">
          <button
            type="submit"
            className={`btn gap-3 font-mono text-white`}
            onClick={handleSubmit}
            disabled={submitButtonDisabled || isLoading}
          >
            Summarize 🤘
          </button>
        </div>
      </div>

      <DocumentChangesListener documentId={textDocID} />
    </div>
  );
};

export default TextSummarize;
